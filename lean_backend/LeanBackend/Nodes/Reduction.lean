import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Nodes.Registry

open Lean Meta

namespace ProofDAG
structure ReductionData where
  synthesize : List Bool
  deriving FromJson, ToJson, Inhabited

def ReductionNode : Node.NodeF ReductionData :=
  simpleDataNode "Reduce" ReductionData
  fun pg node => do
    defineSockets [.expr <| ExprInputSocket.mk none ""] [.expr <| ExprOutputSocket.mk none ""]
    let some f ← (pg.getExprSocketPayload (node.nodeId, "")).run | return false
    forallTelescope (← inferType f) fun params _ => do
      let params := params.map (·.fvarId!)
      setNodeLCtx <| some (← getLCtx)
      let syns := (← get).2.synthesize
      let socks ← params.mapIdxM fun idx param => do
        let sock := ExprInputSocket.mk (some (← param.getType)) s!"{idx}"
        if h : idx < syns.length then return (sock, syns[idx])
        match ← param.getBinderInfo with
        | .default => return (sock, false)
        | _ => return (sock, true)
      socks.forM (addInputSocket <| .expr ·.1)
      modify fun (ns, as) =>
        (ns, {as with synthesize := socks.unzip.2.toList})
      let mut payloads : Array (Option Expr) := #[]
      let mut hasTerminated := false
      let mut isValid := true
      for (sock, syn) in socks do
        match ← (pg.getExprSocketPayload (node.nodeId, sock.id)).run with
        | some expr =>
          if hasTerminated then
            isValid := false
            break
          payloads := payloads ++ [some expr]
        | none =>
          if hasTerminated then break
          if syn then do
            payloads := payloads ++ [@none Expr]
          else
            hasTerminated := true
      if !isValid then return false
      try
        let expr ← mkAppOptM' f payloads
        modifyOutputSocket (.expr  <| .mk (some expr) "")
        return true
      catch e =>
        return false
  Inhabited.default


end ProofDAG

initialize
addNodeConstructor "Reduce" ProofDAG.ReductionNode
