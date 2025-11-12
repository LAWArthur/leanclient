import Lean
import Std.Data.HashMap

namespace ProofDAG

open Lean Meta Elab

inductive Error where
| err : String → Error
| invalid : Error

/-- Unique identifier for nodes -/
abbrev NodeId := String

/-- Unique identifier for sockets -/
abbrev SocketId := String

abbrev ContextId := String

/-- Direction of data flow for a socket -/
inductive SocketDirection where
  | input : SocketDirection
  | output : SocketDirection
  deriving Inhabited, BEq

/-- Input socket for expressions - doesn't carry data, only type signature -/
structure ExprInputSocket where
  expectedType : Option Expr
  id : String
  deriving Inhabited

/-- Output socket for expressions - carries the computed expression -/
structure ExprOutputSocket where
  data : Option Expr  -- The actual expression (when node is valid)
  id : String
  deriving Inhabited

/-- Input socket for goals - carries the goal to be solved -/
structure GoalInputSocket where
  goal : Option MVarId  -- The goal to solve (present when node is valid)
  id : String
  deriving Inhabited

/-- Output socket for goals - doesn't carry data, just a placeholder -/
structure GoalOutputSocket where
  id : String
  deriving Inhabited

/-- Unified socket type -/
class Socket (α : Type) : Type where
  id : α → String

inductive InputSocket where
  | expr : ExprInputSocket → InputSocket
  | goal : GoalInputSocket → InputSocket

inductive OutputSocket where
  | expr : ExprOutputSocket → OutputSocket
  | goal : GoalOutputSocket → OutputSocket

instance : Socket ExprInputSocket where
  id := (·.id)

instance : Socket ExprOutputSocket where
  id := (·.id)

instance : Socket GoalInputSocket where
  id := (·.id)

instance : Socket GoalOutputSocket where
  id := (·.id)

instance : Socket InputSocket where
  id := (match · with | .expr s => s.id | .goal s => s.id)

instance : Socket OutputSocket where
  id := (match · with | .expr s => s.id | .goal s => s.id)

/-- Connection between two sockets -/
structure Connection where
  fromSocket : NodeId × SocketId
  toSocket : NodeId × SocketId
  deriving Inhabited, BEq

inductive NodeValidity where
  | pending : NodeValidity
  | working : NodeValidity
  | invalid : NodeValidity
  | valid : NodeValidity
  deriving Inhabited, BEq, Repr -- pending

/-- Node in the proof DAG -/
structure NodeState where
  inputs : List InputSocket
  outputs : List OutputSocket
  lctx : Option LocalContext
  deriving Inhabited

structure Context where
  contextId : ContextId
  possessor : Option NodeId -- Root context has no possessor
  inputNode : NodeId
  outputNode : NodeId
  mvar : IO.Ref <| MVarId
  fvars : IO.Ref <| List FVarId

instance : BEq Context where
  beq := (·.contextId == ·.contextId)

structure Node where
  execute : MetaM Unit -- Closure
  update : Json → MetaM Unit
  getState : MetaM NodeState
  setState : NodeState → MetaM Unit
  getValidity : MetaM NodeValidity
  setValidity : NodeValidity → MetaM Unit
  getContext : MetaM Context
  setContext : Context → MetaM Unit
  getData : MetaM Json
  nodeId : NodeId
  type : String

/-- Proof graph containing nodes and connections -/
structure ProofGraph where
  nodes : IO.Ref <| List Node
  connections : IO.Ref <| List Connection
  baseContext : IO.Ref <| Context
  contexts : IO.Ref <| List Context
  goal : Expr
  paramDepth : Option Nat

def ProofGraph.getNode? (pg : ProofGraph) (id : NodeId) : MetaM <| Option Node := do
  return (← pg.nodes.get).find? (·.nodeId == id)

def ProofGraph.getNode! (pg : ProofGraph) (id : NodeId) : MetaM Node := do
  let some node ← pg.getNode? id | throwError "Node not found"
  return node

namespace Node
abbrev Execute (α : Type) := NodeId → ProofGraph → StateT (NodeState × α) MetaM Bool
abbrev Update (α : Type) := Json → StateT α MetaM Unit
abbrev GetData (α : Type) := α → MetaM Json
abbrev NodeF (α : Type) := String × Execute α × Update α × GetData α × α

def modifyState (node : Node) (f : NodeState → MetaM NodeState) : MetaM Unit := do
  node.setState (← f (← node.getState))

def getLCtx (node : Node) : MetaM LocalContext := do
  match (← node.getState).lctx with
  | some lctx =>
    return lctx
  | none => return (← (← (← node.getContext).mvar.get).getDecl).lctx
end Node

namespace Context
def getNodes (pg : ProofGraph) (context : Context) : MetaM <| List Node := do
  (← pg.nodes.get).filterM fun n => do pure <| (← n.getContext) == context

def process (pg : ProofGraph) (context : Context) : MetaM Unit := do
  let nodes ← context.getNodes pg
  nodes.forM fun node => node.setValidity .pending
  nodes.forM fun node => do
    match (← node.getValidity) with
    | .pending => node.execute
    | _ => return

def parentContext (pg : ProofGraph) (context : Context) : MetaM <| Option Context := do
  match context.possessor with
  | some id =>
    let node ← pg.getNode? id
    match node with
    | some node => node.getContext
    | none => pure none
  | none => pure none

partial def checkContextCompatible (pg : ProofGraph) (conn : Connection) : MetaM Bool := do
  let beginNode ← pg.getNode? conn.fromSocket.1
  let endNode ← pg.getNode? conn.toSocket.1
  match (beginNode, endNode) with
  | (none, _)
  | (_, none) => pure false
  | (some beginNode, some endNode) => do
    let beginContext ← beginNode.getContext
    let endContext ← endNode.getContext
    let rec checkCompatible : Context → MetaM Bool := fun cont =>
      if cont == beginContext then pure true
      else do
        let some parentCont ← cont.parentContext pg | pure false
        checkCompatible parentCont
    checkCompatible endContext

end Context

namespace ProofGraph

def getMVarSocketPayload (pg : ProofGraph) (socketId : NodeId × SocketId) : OptionT MetaM MVarId := do
  let conn := (← pg.connections.get).filter (·.fromSocket == socketId)
  unless conn.length == 1 do
    failure
  let conn := conn[0]!
  let node ← pg.getNode? conn.toSocket.1
  match (← node.getValidity) with
  | .pending =>
    node.execute
    unless (← node.getValidity) == .valid do failure
    let some sock := (← node.getState).inputs.find? (Socket.id · == conn.toSocket.2) | failure
    match sock with
    | .expr _ => failure
    | .goal sock => OptionT.mk (pure sock.goal)
  | .working =>
    -- let some sock := (← node.getState).inputs.find? (Socket.id · == conn.toSocket.2) | failure
    -- match sock with
    -- | .goal _ => throwError "{socketId}->{node.type} Cyclic dependence in graph! " -- Things are good unless the goal socket do exists
    -- | .expr _ => failure
    failure
  | .valid =>
    let some sock := (← node.getState).inputs.find? (Socket.id · == conn.toSocket.2) | failure
    match sock with
    | .expr _ => failure
    | .goal sock => OptionT.mk (pure sock.goal)
  | .invalid =>
    failure

def getExprSocketPayload (pg : ProofGraph) (socketId : NodeId × SocketId) : OptionT MetaM Expr := do
  let conn := (← pg.connections.get).filter (·.toSocket == socketId)
  if conn.length != 1 then failure
  let conn := conn[0]!
  let node ← pg.getNode? conn.fromSocket.1
  match (← node.getValidity) with
  | .pending =>
    node.execute
    unless (← node.getValidity) == .valid do failure
    let some sock := (← node.getState).outputs.find? (Socket.id · == conn.fromSocket.2) | failure
    match sock with
    | .expr sock => OptionT.mk (pure sock.data)
    | .goal _ => failure
  | .working =>
    -- let some sock := (← node.getState).outputs.find? (Socket.id · == conn.fromSocket.2) | failure
    -- match sock with
    -- | .expr _ => throwError "{node.type}->{socketId} Cyclic dependence in graph! " -- Things are good unless the expr socket do exists
    -- | .goal _ => failure
    failure
  | .valid =>
    let some sock := (← node.getState).outputs.find? (Socket.id · == conn.fromSocket.2) | failure
    match sock with
    | .expr sock => OptionT.mk (pure sock.data)
    | .goal _ => failure
  | .invalid => failure

def mkFreshContext (goal : Expr) (paramDepth : Option Nat) : MetaM (MVarId × List FVarId) := do
  forallBoundedTelescope goal paramDepth fun fvars target => do
    let g ← mkFreshExprMVar (some target)
    return (g.mvarId!, (fvars.map (·.fvarId!)).toList)


def process (pg : ProofGraph) : MetaM Unit := do
  (← pg.nodes.get).forM (·.setValidity .pending)
  let ctx ← pg.baseContext.get
  let (mvar, fvars) ← ProofGraph.mkFreshContext pg.goal pg.paramDepth
  ctx.mvar.set mvar
  ctx.fvars.set fvars
  ctx.process pg

def isDone (pg : ProofGraph) : MetaM Bool := do
  let ctx ← pg.baseContext.get
  let mvar ← ctx.mvar.get
  mvar.withContext do
    let ty ← mvar.getType
    let mvar ← instantiateMVars (Expr.mvar mvar)
    let fvars := ((← ctx.fvars.get).map (Expr.fvar ·)).toArray
    if mvar.hasMVar then
      return false
    let type ← mkForallFVars fvars ty
    let proof ← mkLambdaFVars fvars mvar
    withoutModifyingEnv do
      let name ← mkFreshUserName `_tmpThm
      -- collect universe params that appear in type/proof
      let lps := (collectLevelParams {} proof).params.toList
      let decl := Declaration.defnDecl {
        name := name
        levelParams := lps
        type := type
        value := proof
        safety := .safe
        hints := .opaque
      }
      let result := (← getEnv).addDecl {} decl   -- this deprecated method is crucial to catch kernel errors
      match result with
      | .ok _ => return true
      | .error err =>
        dbg_trace ← (err.toMessageData {}).toString
        return false

def addConnection (pg : ProofGraph) (frm to : NodeId × SocketId) : MetaM Bool := do
  pg.connections.modify fun cs =>  (.mk frm to) :: cs
  return true -- just in case I want to add a validation

def removeConnection (pg : ProofGraph) (frm to : NodeId × SocketId) : MetaM Unit := do
  pg.connections.modify fun cs => cs.erase (.mk frm to)

def removeNode (pg : ProofGraph) (nodeId : NodeId) : MetaM Unit := do
  pg.nodes.modify fun ns => ns.filter (·.nodeId != nodeId)

def getContext? (pg : ProofGraph) (id : ContextId) : MetaM <| Option Context := do
  return (← pg.contexts.get).find? (·.contextId == id)

def setNodeContext (pg : ProofGraph) (nodeId : NodeId) (ctxId : ContextId) : MetaM Unit := do
  let node ← pg.getNode? nodeId
  let ctx ← pg.getContext? ctxId
  match (node, ctx) with
  | (some node, some ctx) => do node.setContext ctx
  | (_, _) => return

end ProofGraph

end ProofDAG
