import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Nodes.Registry

open Lean Meta

namespace ProofDAG
structure AppConstData where
  name : Name
  deriving FromJson, ToJson, Inhabited

def AppConstNode : Node.NodeF AppConstData :=
  simpleDataNode "AppConst" AppConstData
  fun pg node => do
    defineSockets [] [.expr <| ExprOutputSocket.mk none ""]
    let ci ← try getConstInfo (← get).2.name catch _ => return false
    forallTelescope (ci.type) fun params _ => do
      setNodeLCtx (← getLCtx)
      let params := params.map (·.fvarId!)
      let socks ← params.mapIdxM fun idx param => do
        match ← param.getBinderInfo with
        | .default => do
          let sock := ExprInputSocket.mk (some (← param.getType)) s!"{idx}"
          return some sock
        | _ => do -- Automatically synthesize implicit and instance vars
          return none
      socks.forM (match · with | some sock => addInputSocket <| .expr sock | _ => return)
      let mut payloads : Array Expr := #[]
      let mut isValid : Bool := true
      for sock in socks do
        match sock with
        | some sock =>
          let expr ← (pg.getExprSocketPayload (node.nodeId, sock.id)).run
          match expr with
          | some expr => payloads := payloads ++ #[expr]
          | none =>
            isValid := false
            break
        | none => pure ()

      if !isValid then return false

      try
        let expr ← mkAppM (← get).2.name payloads
        modifyOutputSocket (.expr  <| .mk (some expr) "")
        return true
      catch _ =>
        return false
  default


end ProofDAG

initialize
addNodeConstructor "AppConst" ProofDAG.AppConstNode
