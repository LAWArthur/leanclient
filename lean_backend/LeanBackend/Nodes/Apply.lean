import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Nodes.Registry

open Lean Meta

namespace ProofDAG

def ApplyNode : Node.NodeF Unit :=
  nodeWithoutData "Apply"
  fun pg node => do
    defineSockets [.expr <| .mk none ""] [.goal <| .mk ""]

    let some mvar ← (pg.getMVarSocketPayload (node.nodeId, "")).run | return false
    let some f ← (pg.getExprSocketPayload (node.nodeId, "")).run | return false
    let subs ← try mvar.apply f
      catch _ =>
        return false
    subs.zipIdx.forM fun (sub, _) => do
      addInputSocket (.goal <| .mk sub s!"{(← sub.getDecl).userName}")
    return true


end ProofDAG


initialize
addNodeConstructor "Apply" ProofDAG.ApplyNode
