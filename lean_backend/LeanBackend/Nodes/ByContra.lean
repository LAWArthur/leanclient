import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Environ
import LeanBackend.Nodes.Registry

open Lean Meta

namespace ProofDAG

structure ByContraData where
  subcontext : Option ContextId
  deriving FromJson, ToJson, Inhabited

def ByContraNode : Node.NodeF ByContraData :=
  basicNode "ByContra" ByContraData
  fun pg node => do
    let (ns, as) ← get
    let subctx ← (match as.subcontext with
    | none => do
      let mvarRef : IO.Ref MVarId ← IO.mkRef (← mkFreshExprMVar none).mvarId! -- placeholder
      let fvarsRef : IO.Ref <| List FVarId ← IO.mkRef []
      let subctx ← Context.mkContext pg (some node.nodeId) mvarRef fvarsRef
      set (ns, {as with subcontext := subctx.contextId})
      return subctx
    | some id => do
      let subctx ← pg.getContext? id
      match subctx with
      | some subctx => return subctx
      | none => failure
    )
    defineSockets [] [.goal <| .mk ""]
    let some mvar ← (pg.getMVarSocketPayload (node.nodeId, "")).run | return false
    let some mvar ← mvar.byContra? | return false
    let (fvar, mvar) ← try mvar.intro1 catch _ => return false
    subctx.mvar.set mvar
    subctx.fvars.set [fvar]
    subctx.process pg
    return true
  fun _ => return
  fun a => return toJson a
  Inhabited.default

def AbsurdNode : Node.NodeF Unit :=
  nodeWithoutData "Absurd"
  fun pg node => do
    defineSockets [.expr <| .mk none "0", .expr <| .mk none "1"] [.goal <| .mk ""]
    let some expr1 ← (pg.getExprSocketPayload (node.nodeId, "0")).run | return false
    let some expr2 ← (pg.getExprSocketPayload (node.nodeId, "1")).run | return false
    let some mvar ← (pg.getMVarSocketPayload (node.nodeId, "")).run | return false
    let ty1 ← inferType expr1
    let ty2 ← inferType expr2
    let some nty2 ← matchNot? ty2 | return false
    unless ← isDefEq ty1 nty2 do return false
    let ty ← mvar.getType
    let e ← mkAbsurd ty expr1 expr2
    mvar.assign e
    return true

end ProofDAG

initialize
addNodeConstructor "ByContra" ProofDAG.ByContraNode
addNodeConstructor "Absurd" ProofDAG.AbsurdNode
