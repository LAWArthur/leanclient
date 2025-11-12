import LeanBackend.ProofGraph
open Lean Meta
namespace ProofDAG
instance : FromJson Unit where
  fromJson? (_ : Json) := pure ()

def addInputSocket {α : Type} (socket : InputSocket) : StateT (NodeState × α) MetaM Unit :=
  modify fun (ns, as) =>
    ({ns with inputs := ns.inputs ++ [socket]}, as)

def addOutputSocket {α : Type} (socket : OutputSocket) : StateT (NodeState × α) MetaM Unit :=
  modify fun (ns, as) =>
    ({ns with outputs := ns.outputs ++ [socket]}, as)

def defineSockets {α : Type} (inputs : List InputSocket) (outputs : List OutputSocket) : StateT (NodeState × α) MetaM Unit :=
  modify fun (ns, as) =>
    ({ns with inputs := inputs, outputs := outputs}, as)

partial def defineExprInputList {α : Type} (pg : ProofGraph) (nodeId : NodeId) (p : String)
   : StateT (NodeState × α) MetaM (List Expr) := do
  let rec addSocksAndGet : Nat → StateT (NodeState × α) MetaM (List Expr) := fun n => do
    addInputSocket (.expr <| .mk none s!"{p}.{n}")
    let expr ← (pg.getExprSocketPayload (nodeId, s!"{p}.{n}")).run
    match expr with
    | some expr =>
      return expr :: (← addSocksAndGet (n+1))
    | none => return .nil
  addSocksAndGet 0

def setNodeLCtx {α : Type} (lctx : Option LocalContext)  : StateT (NodeState × α) MetaM Unit :=
  modify fun (ns, as) =>
    ({ns with lctx := lctx}, as)

def modifyInputSocket {α : Type} (socket : InputSocket) : StateT (NodeState × α) MetaM Unit :=
  modify fun (ns, as) =>
    let newInputs := match ns.inputs.findIdx? (Socket.id · == Socket.id socket) with
    | some idx => ns.inputs.set idx socket
    | none => ns.inputs ++ [socket]
    ({ns with inputs := newInputs}, as)

def modifyOutputSocket {α : Type} (socket : OutputSocket) : StateT (NodeState × α) MetaM Unit :=
  modify fun (ns, as) =>
    let newOutputs := match ns.outputs.findIdx? (Socket.id · == Socket.id socket) with
    | some idx => ns.outputs.set idx socket
    | none => ns.outputs ++ [socket]
    ({ns with outputs := newOutputs}, as)

def trySolveGoals {α : Type} (pg : ProofGraph) (nodeId : NodeId) : StateT (NodeState × α) MetaM Unit := do
  (← get).1.inputs.forM fun sock =>
    match sock with
    | .expr _ => return
    | .goal sock =>
      match sock.goal with
      | none => return
      | some mvarid => do
        let some inexpr ← (pg.getExprSocketPayload (nodeId, sock.id)).run | return
        if ← isDefEq (.mvar mvarid) inexpr then -- MVar assignment should happen here...
          if !(← mvarid.isAssigned) then
            mvarid.assign inexpr -- BUT IT MAY FAIL!!!

def Node.Pmk {α : Type} (id : NodeId) (pg : ProofGraph)
        (fα : NodeF α)
        (context : Context)
        (inits : NodeState := Inhabited.default)
         :
        MetaM Node := do
  let ⟨type, ex, upd, gd, initα⟩ := fα
  let r ← IO.mkRef (inits, initα)
  let v ← IO.mkRef NodeValidity.pending
  let c ← IO.mkRef context
  let getValidity : MetaM NodeValidity := v.get
  let setValidity : NodeValidity → MetaM Unit := (v.set ·)
  pure {
    nodeId := id
    type := type
    execute := do
      let mvar ← (← c.get).mvar.get
      mvar.withContext do
        let s ← r.get
        setValidity .working
        try
          let ⟨b, s'⟩ ← (ex id pg).run s
          r.set s' -- ** This is important!!!
          setValidity (match b with | true => .valid | false => .invalid)
          let ⟨_, s''⟩ ← (trySolveGoals pg id).run s'
          r.set s''
        catch e =>
          logError e.toMessageData
          setValidity .invalid
    update := fun json => do
      let (ns, as) ← r.get
      let ⟨_, as'⟩ ← (upd json).run as
      r.set (ns, as')
    getData := do
      let (_, as) ← r.get
      return ← gd as
    getState := do pure (← r.get).fst
    setState := (r.set ⟨·, (← r.get).2⟩)
    getValidity := getValidity
    setValidity := setValidity
    getContext := c.get
    setContext := c.set
  }

def ProofGraph.newNode {α : Type} (pg : ProofGraph) (nf : Node.NodeF α) : MetaM NodeId := do
  let ngen ← getNGen
  let id := ngen.curr.toString
  setNGen ngen.next
  let node ← Node.Pmk id pg nf (← pg.baseContext.get)
  pg.nodes.modify fun l => node::l
  return id

def basicNode (type : String) (α : Type)
  (f : ProofGraph → Node → StateT (NodeState × α) MetaM Bool)
  (upd : Json → StateT α MetaM Unit)
  (gd : α → MetaM Json)
  (init : α)
  : Node.NodeF α :=
  (
    type,
    fun id pg => do
      match ← pg.getNode? id with
      | none => pure false
      | some node => do
        let b ← f pg node
        pure b

    , upd, gd, init
  )

def nodeWithoutData (type : String)
  (f : ProofGraph → Node → StateT (NodeState × Unit) MetaM Bool) : Node.NodeF Unit :=
  basicNode type Unit f (fun _ => do return ()) (fun _ => do return Json.mkObj []) ()

def simpleDataNode (type : String) (α : Type) [inst : FromJson α] [inst' : ToJson α]
  (f : ProofGraph → Node → StateT (NodeState × α) MetaM Bool) (init : α) : Node.NodeF α :=
  basicNode type α f
    fun json => do
      let aex := inst.fromJson? json
      match aex with
      | .error s => throwError s
      | .ok a => set a
    fun a => do
      return inst'.toJson a
    init
end ProofDAG
