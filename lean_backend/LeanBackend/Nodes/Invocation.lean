import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Nodes.Registry

open Lean

namespace ProofDAG
structure InvokeData where
  name : Option Name
  deriving FromJson, ToJson, Inhabited

def InvokeNode : Node.NodeF InvokeData :=
  simpleDataNode "Invoke" InvokeData
  fun _ _ => do
    defineSockets [] [.expr <| ExprOutputSocket.mk none ""]
    let some name := (← get).2.name | return false
    unless (← getEnv).contains name do return false
    let expr ← mkConstWithLevelParams name
    modify fun (ns, as) =>
      ({ns with outputs := [.expr <| ExprOutputSocket.mk (some expr) ""]}, as)
    return true
  Inhabited.default


end ProofDAG

initialize
addNodeConstructor "Invoke" ProofDAG.InvokeNode
