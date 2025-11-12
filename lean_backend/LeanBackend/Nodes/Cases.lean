import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Environ
import LeanBackend.Nodes.Registry
import Std

open Lean Meta

namespace ProofDAG

structure CasesDataInternal where
  contexts : List (Name × ContextId)
  deriving FromJson, ToJson, Inhabited

structure CasesData where
  contexts : Std.HashMap Name ContextId
  internal : CasesDataInternal
  deriving Inhabited

private def getContext (pg : ProofGraph) (node : Node) (name : Name)
  : StateT (NodeState × CasesData) MetaM Context := do
  let (ns, as) ← get
  let subctx ← (match as.contexts.get? name with
  | none => do
    let mvarRef : IO.Ref MVarId ← IO.mkRef (← mkFreshExprMVar none).mvarId! -- placeholder
    let fvarsRef : IO.Ref <| List FVarId ← IO.mkRef []
    let subctx ← Context.mkContext pg (some node.nodeId) mvarRef fvarsRef
    set (ns, {as with contexts := as.contexts.insert name subctx.contextId})
    return subctx
  | some id => do
    let subctx ← pg.getContext? id
    match subctx with
    | some subctx => return subctx
    | none => failure
  )
  return subctx

def CasesNode : Node.NodeF CasesData :=
  basicNode "Cases" CasesData
  fun pg node => do
    defineSockets [.expr <| .mk (mkSort .zero) ""] [.goal <| .mk ""]
    modify fun (ns, as) => (ns, {as with internal := {contexts := []}})
    let some expr ← (pg.getExprSocketPayload (node.nodeId, "")).run | return false
    let some mvar ← (pg.getMVarSocketPayload (node.nodeId, "")).run | return false
    let ty ← inferType expr
    try -- Cases
      let mvarId ← mvar.assert `exprToCase ty expr
      let (fvarId, mvarId) ← mvarId.intro1
      let subgoals ← mvarId.cases fvarId
      let ctxs ← subgoals.mapM fun subgoal => do
        let subctx ← getContext pg node subgoal.ctorName
        let fvarids := subgoal.fields.map (·.fvarId!)
        subctx.mvar.set subgoal.mvarId
        subctx.fvars.set fvarids.toList
        subctx.process pg
        return (subgoal.ctorName, subctx.contextId)
      modify fun (ns, as) => (ns, {as with internal := {contexts := ctxs.toList}})
      return true
    catch _ => -- try byCases
      return false

  fun _ => do return ()
  fun a => return toJson a.internal
  Inhabited.default

def ByCasesNode : Node.NodeF CasesData :=
  basicNode "ByCases" CasesData
  fun pg node => do
    defineSockets [.expr <| .mk none ""] [.goal <| .mk ""]
    modify fun (ns, as) => (ns, {as with internal := {contexts := []}})
    let some expr ← (pg.getExprSocketPayload (node.nodeId, "")).run | return false
    let some mvar ← (pg.getMVarSocketPayload (node.nodeId, "")).run | return false
    let ty ← inferType expr
    unless ← isDefEq ty (.sort .zero) do return false
    let (s₁, s₂) ← mvar.byCases expr
    let subctx₁ ← getContext pg node `pos
    subctx₁.mvar.set s₁.mvarId
    subctx₁.fvars.set [s₁.fvarId]
    subctx₁.process pg
    let subctx₂ ← getContext pg node `neg
    subctx₂.mvar.set s₂.mvarId
    subctx₂.fvars.set [s₂.fvarId]
    subctx₂.process pg
    modify fun (ns, as) =>
      (ns, {as with internal := {contexts := [(`pos, subctx₁.contextId), (`neg, subctx₂.contextId)]}})
    return true

  fun _ => do return ()
  fun a => return toJson a.internal
  Inhabited.default

end ProofDAG

initialize
addNodeConstructor "Cases" ProofDAG.CasesNode
addNodeConstructor "ByCases" ProofDAG.ByCasesNode
