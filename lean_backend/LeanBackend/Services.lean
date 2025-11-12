import Lean
import LeanBackend.Rpc
import LeanBackend.Nodes
import LeanBackend.ProofGraph
import LeanBackend.Info
open Lean Meta ProofDAG Rpc

namespace Services
initialize pgRef : IO.Ref $ Option ProofGraph ← IO.mkRef none

def getPG : MetaM ProofGraph := do
  let pg ← pgRef.get
  match pg with | some pg => return pg | none => throwError "No ProofGraph available!"

def setPG : Option ProofGraph → MetaM Unit := pgRef.set

def mkGoalFromDecl (n : Name)
  : MetaM Expr := do
  let ci ← getConstInfo n
  return ci.type

structure InitializeParams where
  declName : Name
  depth : Option Nat
  deriving FromJson

initialize registerService "initialize" InitializeParams fun params => do
  let some params := params | throwError "Param error"
  let goal ← mkGoalFromDecl params.declName
  let pg ← ProofGraph.mkPG goal params.depth
  setPG pg
  pg.process
  return ← pg.mkInfo

def mkGoalFromStr (s : String) : MetaM Expr := do
  let stx ←
    match Parser.runParserCategory (← getEnv) `term s with
    | .ok stx    => pure stx
    | .error msg => throwError m!"Failed to parse. {msg}"

  -- Run Term elaboration
  -- Minimal term context: a fake file name; no locals.
  let tctx : Elab.Term.Context := {
  }
  let tstate : Elab.Term.State := {}

  let (e, _) ←
    (do
      let e ← Elab.Term.elabTerm stx none
      -- Solve synthetic mvars (instances, coercions, etc.)
      -- Optionally, fail if anything remains postponed:
      Elab.Term.synthesizeSyntheticMVarsNoPostponing
      let e ← instantiateMVars e
      pure e
    ).run tctx tstate
  if e.hasSorry || e.hasMVar then throwError m!"Invalid Expression. "
  return e

structure InitializeByInputParams where
  decl : String
  depth : Option Nat
  deriving FromJson

initialize registerService "initializeByInput" InitializeByInputParams fun params => do
  let some params := params | throwError "Param error"
  let goal ← mkGoalFromStr params.decl
  let pg ← ProofGraph.mkPG goal params.depth
  setPG pg
  pg.process
  return ← pg.mkInfo

structure ConnectionSocket where
  nodeId : NodeId
  sockId : SocketId
  deriving FromJson

structure ConnectionParams where
  frm : ConnectionSocket
  to : ConnectionSocket
  deriving FromJson

initialize registerService "addConnection" ConnectionParams fun params => do
  let some params := params | throwError "Param error"
  let pg ← getPG
  pg.addConnection (params.frm.nodeId, params.frm.sockId) (params.to.nodeId, params.to.sockId)

initialize registerService "removeConnection" ConnectionParams fun params => do
  let some params := params | throwError "Param error"
  let pg ← getPG
  pg.removeConnection (params.frm.nodeId, params.frm.sockId) (params.to.nodeId, params.to.sockId)
  return .null

structure AddNodeParams where
  type : String
  deriving FromJson

initialize registerService "addNode" AddNodeParams fun params => do
  let some params := params | throwError "Param error"
  let pg ← getPG
  let id ← (← nodeConstructor params.type) pg
  return .mkObj [("nodeId", id)]

structure RemoveNodeParams where
  nodeId : String
  deriving FromJson

initialize registerService "removeNode" RemoveNodeParams fun params => do
  let some params := params | throwError "Param error"
  let pg ← getPG
  pg.removeNode params.nodeId
  return .null

structure SetNodeContextParams where
  nodeId : NodeId
  contextId : ContextId
  deriving FromJson

initialize registerService "setNodeContext" SetNodeContextParams fun params => do
  let some params := params | throwError "Param error"
  let pg ← getPG
  pg.setNodeContext params.nodeId params.contextId
  return .null

structure SetNodeDataParams where
  nodeId : NodeId
  data : Json
  deriving FromJson

initialize registerService "setNodeData" SetNodeDataParams fun params => do
  let some params := params | throwError "Param error"
  let pg ← getPG
  match ← pg.getNode? params.nodeId with
  | some node =>
    node.update params.data
  | none => pure ()
  return .null

initialize registerService "processGraph" Unit fun _ => do
  let pg ← getPG
  pg.process
  return ← pg.mkInfo
end Services
