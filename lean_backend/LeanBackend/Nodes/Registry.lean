import Std
import LeanBackend.ProofGraph
import Lean
import LeanBackend.Nodes.Basic
open Lean Meta ProofDAG

initialize nodeCons : IO.Ref <| Std.HashMap String (ProofGraph → MetaM NodeId) ← IO.mkRef {}


def nodeConstructor (type : String) : MetaM (ProofGraph → MetaM NodeId) := do
  match (← nodeCons.get).get? type with
  | some f => return f
  | none => throwError "Unknown Constructor Name"

def addNodeConstructor {α : Type} (type : String) (node : Node.NodeF α) : IO Unit :=
  nodeCons.modify fun nc => nc.insert type (fun pg => pg.newNode node)
