import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Environ
import LeanBackend.Nodes.Registry

open Lean Meta

namespace ProofDAG

structure ExistsData where
  name : String
  subcontext : Option ContextId
  deriving FromJson, ToJson, Inhabited

def ExistsNode : Node.NodeF ExistsData :=
  basicNode "Exists" ExistsData
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
    defineSockets [.expr <| .mk none ""] [.expr <| .mk none ""]
    let some ty ← (pg.getExprSocketPayload (node.nodeId, "")).run | return false
    withLocalDeclD (as.name.toName) ty fun fvar => do
        let mvar := (← mkFreshExprMVar none).mvarId!
        subctx.mvar.set mvar
        subctx.fvars.set [fvar.fvarId!]
        subctx.process pg
        try
          let expr ← mkLambdaFVars #[fvar] (.mvar mvar) false false
          let expr ← instantiateMVars expr
          if expr.hasMVar then return false
          let outexpr ← mkAppM ``Exists #[expr]
          modifyOutputSocket (.expr <| .mk (some outexpr) "")
          return true
        catch _ => return false
  fun json => do
    let a := @FromJson.fromJson? ExistsData _ json
    match a with
    | .ok a => do modify ({a with subcontext := ·.subcontext})
    | .error _ => do return ()
  fun a => return toJson a
  Inhabited.default


end ProofDAG

initialize
addNodeConstructor "Exists" ProofDAG.ExistsNode
