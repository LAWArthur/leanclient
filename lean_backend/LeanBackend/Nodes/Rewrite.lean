import LeanBackend.ProofGraph
import LeanBackend.Nodes.Basic
import LeanBackend.Environ
import LeanBackend.Nodes.Registry

open Lean Meta

namespace ProofDAG
structure RewriteData where
  symm: Bool
  deriving FromJson, ToJson, Inhabited

def RewriteNode : Node.NodeF RewriteData :=
  simpleDataNode "Rewrite" RewriteData
  fun pg node => do
    defineSockets [.expr <| .mk none "equation", .expr <| .mk none "target"] [.expr <| .mk none ""]
    let some e ← (pg.getExprSocketPayload (node.nodeId, "target")).run | return false
    let some heq ← (pg.getExprSocketPayload (node.nodeId, "equation")).run | return false
    let ty ← inferType e
    let mvar ← (← node.getContext).mvar.get
    let symm := (← get).2.symm
    try
      let result ← mvar.rewrite ty heq symm
      let eNew ← mkEqMP result.eqProof e
      modifyOutputSocket (.expr <| .mk eNew "")
    catch e => throw e
    return true
  default

def RewriteGoalNode : Node.NodeF RewriteData :=
  simpleDataNode "RewriteGoal" RewriteData
  fun pg node => do
    defineSockets [.expr <| .mk none "equation", .goal <| .mk none ""] [.goal <| .mk ""]
    let some heq ← (pg.getExprSocketPayload (node.nodeId, "equation")).run | return false
    let some mvar ← (pg.getMVarSocketPayload (node.nodeId, "")).run | return false
    let symm := (← get).2.symm
    try
      let result ← mvar.rewrite (← mvar.getType) heq symm
      let newMVar ← mkFreshExprMVar result.eNew
      mvar.assign (← mkEqMPR result.eqProof newMVar)
      modifyInputSocket (.goal <| .mk newMVar.mvarId! "")
    catch e => throw e
    return true
  default
end ProofDAG

initialize
addNodeConstructor "Rewrite" ProofDAG.RewriteNode
addNodeConstructor "RewriteGoal" ProofDAG.RewriteGoalNode
