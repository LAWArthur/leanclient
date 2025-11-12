import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Environ
import LeanBackend.Nodes.Registry

open Lean Meta

namespace ProofDAG

structure IntroData where
  depth : Nat
  subcontext : Option ContextId
  deriving FromJson, ToJson, Inhabited

def IntroNode : Node.NodeF IntroData :=
  basicNode "Intro" IntroData
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
    let (fvarids, mvarid) ←
      try
        mvar.introNP as.depth
      catch _ =>
        let (fvarids, mvarid) ← mvar.intros
        modify fun (ns, as) => (ns, {as with depth := fvarids.size})
        pure (fvarids, mvarid)
    subctx.fvars.set fvarids.toList
    subctx.mvar.set mvarid
    subctx.process pg
    return true
  fun json => do
    let a := @FromJson.fromJson? IntroData _ json
    match a with
    | .ok a => do modify ({a with subcontext := ·.subcontext})
    | .error _ => do return ()
  fun a => do return ToJson.toJson a
  Inhabited.default


end ProofDAG

initialize
addNodeConstructor "Intro" ProofDAG.IntroNode
