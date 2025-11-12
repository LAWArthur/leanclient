import LeanBackend.Nodes.IO
import LeanBackend.ProofGraph
import Lean.Meta
open Lean Meta
namespace ProofDAG
def Context.mkContext (pg : ProofGraph) (possessor : Option NodeId)
  (mvar : IO.Ref <| MVarId) (fvars : IO.Ref <| List FVarId)
  : MetaM Context := do
  let ngen ← getNGen
  let id := ngen.curr.toString
  setNGen ngen.next
  let innode ← pg.newNode InputNode
  let outnode ← pg.newNode OutputNode
  let ctx : Context :=
    {contextId := id, possessor := possessor,
      mvar := mvar, fvars := fvars,
      inputNode := innode, outputNode := outnode}

  match ← pg.getNode? innode with
  | some node => node.setContext ctx
  | none => panic! "WT???"

  match ← pg.getNode? outnode with
  | some node => node.setContext ctx
  | none => panic! "WT???"

  pg.contexts.modify (ctx :: ·)
  return ctx

def ProofGraph.mkPG (goal : Expr) (paramDepth : Option Nat) : MetaM ProofGraph := do
  let nodeList ← IO.mkRef ([] : List Node)
  let connList ← IO.mkRef ([] : List Connection)
  let (mvar, fvars) ← ProofGraph.mkFreshContext goal paramDepth
  let mvarRef ← IO.mkRef mvar
  let fvarsRef ← IO.mkRef fvars
  let pseudoContext : Context :=
    {contextId := "", possessor := none,
      mvar := mvarRef, fvars := fvarsRef,
      inputNode := "", outputNode := ""}
  let contextR ← IO.mkRef pseudoContext
  let contextsR : IO.Ref <| List Context ← IO.mkRef []
  let pg := ProofGraph.mk nodeList connList contextR contextsR goal paramDepth
  pg.baseContext.set (← Context.mkContext pg none mvarRef fvarsRef)
  return pg
end ProofDAG
