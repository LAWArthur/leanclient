import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Environ
import LeanBackend.Nodes.Registry

open Lean Meta

namespace ProofDAG

structure ForallData where
  bvars : List Name
  subcontext : Option ContextId
  deriving FromJson, ToJson, Inhabited

def ForallNode : Node.NodeF ForallData :=
  basicNode "Forall" ForallData
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
    let bvars := (← get).2.bvars
    let insocks : List ExprInputSocket := .ofFn fun n : Fin bvars.length => .mk none s!"{n}"
    defineSockets (insocks.map (.expr ·)) [.expr <| .mk none ""]
    let tys ← insocks.mapM fun sock => do return (← (pg.getExprSocketPayload (node.nodeId, sock.id)).run)
    if tys.all (·.isSome) then
      let declInfo :=
        bvars.zip ((tys.map (·.get!)).map
          (fun x => (fun _  => do return x)))
          |> List.toArray
      withLocalDeclsD declInfo fun fvars => do
        let mvar := (← mkFreshExprMVar none).mvarId!
        subctx.mvar.set mvar
        subctx.fvars.set (fvars.map (·.fvarId!)).toList
        subctx.process pg
        try
          let expr ← mkForallFVars fvars (.mvar mvar) false false
          let expr ← instantiateMVars expr
          if expr.hasMVar then return false
          modifyOutputSocket (.expr <| .mk (some expr) "")
          return true
        catch _ => return false
    else return false
  fun json => do
    let a := @FromJson.fromJson? ForallData _ json
    match a with
    | .ok a => do modify ({a with subcontext := ·.subcontext})
    | .error _ => do return ()
  fun a => return toJson a
  Inhabited.default


end ProofDAG

initialize
addNodeConstructor "Forall" ProofDAG.ForallNode
