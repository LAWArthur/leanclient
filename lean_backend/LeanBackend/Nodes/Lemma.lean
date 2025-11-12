import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Environ
import LeanBackend.Nodes.Registry

open Lean Meta

namespace ProofDAG

structure LemmaData where
  subcontext : Option ContextId
  deriving FromJson, ToJson, Inhabited

def LemmaNode : Node.NodeF LemmaData :=
  basicNode "Lemma" LemmaData
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
    defineSockets [.expr <| .mk (some (.sort .zero)) ""] [.expr <| .mk none ""]
    let some expr ← (pg.getExprSocketPayload (node.nodeId, "")).run | return false
    let mvar := (← mkFreshExprMVar (some expr)).mvarId!
    modifyOutputSocket (.expr <| .mk (some (.mvar mvar)) "")
    subctx.mvar.set mvar
    subctx.process pg
    return true
  fun _ => return
  fun a => return toJson a
  Inhabited.default


end ProofDAG

initialize
addNodeConstructor "Lemma" ProofDAG.LemmaNode
