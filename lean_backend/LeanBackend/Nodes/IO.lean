import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Nodes.Registry

open Lean

namespace ProofDAG
def InputNode : Node.NodeF Unit :=
  nodeWithoutData "Input"
    fun _ node => do
      let context ← node.getContext
      defineSockets [] []
      (← context.fvars.get).zipIdx.forM fun (fvarid, idx) => do
        addOutputSocket <| ExprOutputSocket.mk (some <| .fvar fvarid) s!"{idx}" |> .expr
      pure true

def OutputNode : Node.NodeF Unit :=
  nodeWithoutData "Output"
    fun _ node => do
      let context ← node.getContext
      let mvar ← context.mvar.get
      let inSock := GoalInputSocket.mk (some mvar) ""
      modify fun (ns, as) =>
        ({ns with inputs := [.goal inSock], outputs := .nil}, as)
      pure true
end ProofDAG


initialize
addNodeConstructor "Input" ProofDAG.InputNode
addNodeConstructor "Output" ProofDAG.OutputNode
