import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import Init.Data
import LeanBackend.Nodes.Registry

open Lean Meta

namespace ProofDAG

structure LiteralData (β : Type) where
  value : β
  deriving FromJson, ToJson, Inhabited

def IntNode : Node.NodeF <| LiteralData Int :=
  simpleDataNode "Int" (LiteralData Int)
  fun _ _ => do
    let (_, as) ← get
    let val := as.value
    defineSockets [] [.expr <| .mk none ""]
    let expr := mkIntLit val
    modifyOutputSocket (.expr <| .mk (some expr) "")
    return true
  Inhabited.default

def NatNode : Node.NodeF <| LiteralData Nat :=
  simpleDataNode "Nat" (LiteralData Nat)
  fun _ _ => do
    let (_, as) ← get
    let val := as.value
    defineSockets [] [.expr <| .mk none ""]
    let expr := mkNatLit val
    modifyOutputSocket (.expr <| .mk (some expr) "")
    return true
  Inhabited.default

def SortNode : Node.NodeF <| LiteralData Nat :=
  simpleDataNode "Nat" (LiteralData Nat)
  fun _ _ => do
    let (_, as) ← get
    let val := as.value
    defineSockets [] [.expr <| .mk none ""]
    let expr := mkSort (Level.ofNat val)
    modifyOutputSocket (.expr <| .mk (some expr) "")
    return true
  Inhabited.default
end ProofDAG

initialize
addNodeConstructor "Int" ProofDAG.IntNode
addNodeConstructor "Nat" ProofDAG.NatNode
addNodeConstructor "Sort" ProofDAG.SortNode
