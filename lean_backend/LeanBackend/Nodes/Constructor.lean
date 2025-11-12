import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Environ
import LeanBackend.Nodes.Registry

open Lean Meta

namespace ProofDAG

def ConstructorNode : Node.NodeF Unit :=
  nodeWithoutData "Constructor"
  fun pg node => do
    defineSockets [] [.goal <| .mk ""]
    let some mvar ← (pg.getMVarSocketPayload (node.nodeId, "")).run | return false
    try
      let mvarIds' ← mvar.constructor
      mvarIds'.zipIdx.forM fun (mvarid, idx) => addInputSocket (.goal <| .mk mvarid s!"{idx}" )
    catch _ =>
      return false
    return true

def SplitAppNode : Node.NodeF Unit :=
  nodeWithoutData "SplitApp"
  fun pg node => do
    defineSockets [.expr <| .mk none ""] []
    let some e ← (pg.getExprSocketPayload (node.nodeId, "")).run | return false
    let ty ← whnf (← inferType e)
    forallTelescopeReducing ty fun args head => do
      let .const I _ := head.getAppFn | return false
      match (getStructureInfo? (← getEnv) I) with
      | none      =>
        match head.eq? with -- make a hole for eq
        | none => return false
        | some _ =>
          let eApplied := mkAppN e args
          let e₁ ← mkLambdaFVars args (← mkAppM ``Eq.mp #[eApplied])
          let e₂ ← mkLambdaFVars args (← mkAppM ``Eq.mpr #[eApplied])
          addOutputSocket (.expr <| .mk e₁ "Eq.mp")
          addOutputSocket (.expr <| .mk e₂ "Eq.mpr")
          return true
      | some info =>
        let flds := info.fieldNames
        flds.zipIdx.forM fun (n, idx) => do
          let eApplied := mkAppN e args
          let expr := eApplied.proj I idx
          let expr ← mkLambdaFVars args expr
          addOutputSocket (.expr <| .mk expr n.toString)
        return true
end ProofDAG

initialize
addNodeConstructor "Constructor" ProofDAG.ConstructorNode
addNodeConstructor "SplitApp" ProofDAG.SplitAppNode
