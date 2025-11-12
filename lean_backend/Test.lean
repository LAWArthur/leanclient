import LeanBackend
import Lean

open Lean Meta

def mkGoalFromDecl (n : Name)
  : MetaM Expr := do
  let ci ← getConstInfo n
  return ci.type

def printExpr (expr : Expr) : MetaM String := do
  let t ← inferType expr
  let tt ← inferType t
  if ← isDefEq tt (mkSort .zero) then return toString (← ppExpr t)
  else return s!"{← ppExpr expr}:{← ppExpr t}"

open ProofDAG in
def mkNodeWithData {α : Type} (pg : ProofGraph) (n : Node.NodeF α) (data : String) : MetaM NodeId := do
  let id ← pg.newNode n
  let invok ← pg.getNode! id
  let json := Json.parse data
  match json with
  | .ok json => invok.update json
  | .error err => throwError err
  return id

open ProofDAG in
def inspectNode (pg : ProofGraph) (node : NodeId) : MetaM Unit := do
  let some node ← pg.getNode? node | return
  let ctx ← node.getContext
  (← ctx.mvar.get).withContext do
    let lctx ← node.getLCtx
    withLCtx lctx (← getLocalInstances) do
      let ns ← node.getState
      let ins ← ns.inputs.mapM fun sock =>
        do
          match sock with
          | .expr sock =>
            match sock.expectedType with
            | some expr => return sock.id ++ ":" ++ (← ppExpr expr)
            | none => return sock.id ++ ":" ++ "none"

          | .goal sock =>
            match sock.goal with
            | some goal => return sock.id ++ ":" ++ "goal " ++ toString (← ppExpr (← goal.getType))
            | none => return sock.id ++ ":" ++ "none"
      let outs ← ns.outputs.mapM fun sock =>
        do
          match sock with
          | .expr sock =>
            match sock.data with
            | some expr => do return sock.id ++ ":" ++ toString (← printExpr expr)
            | none => do return sock.id ++ ":" ++ "none"

          | .goal sock =>
            return sock.id ++ ":" ++ "goal"
      logInfo m!"{node.nodeId} {node.type} | Inputs: {ins}, Outputs: {outs},
        Validity: {match (← node.getValidity) with | .valid => "valid" | _ => "not valid"}"

theorem test1 {P : Prop} (p : P) : P := by assumption
theorem test2 : True := by trivial
theorem test3 {P Q : Prop} (np : ¬P) (hpq : P ∨ Q) : Q := Or.resolve_left hpq np
def test4 {P Q : Prop} : Prop := ∀ (x : Nat), P ∧ Q ∨ (x = 1)
theorem test5 {P Q R : Prop} (hab : P ∨ Q) : (P ∨ R) ∨ (Q ∨ R) := by grind
theorem test6 {P : Prop} : P ∨ ¬ P:= by grind
theorem test7 {P Q : Prop} (hpq : P ∧ Q) : P := by grind
theorem test8 {P Q : Prop} (hp : P) (hq : Q) :  P ∧ Q := by grind
theorem test9 {P Q : Prop} (hpq : ∃ (p : P), Q) : P ∧ Q := by grind

open ProofDAG in
def demo1 : MetaM Unit := do
  let goal ← mkGoalFromDecl ``test1
  let pg ← ProofGraph.mkPG goal none
  let ctx ← pg.baseContext.get
  let _ ← pg.addConnection (ctx.inputNode, "p") (ctx.outputNode, "")
  pg.process
  let mvar ← ctx.mvar.get
  mvar.withContext do
    logInfo m!"{← Meta.ppGoal mvar}"
    logInfo m!"{← (← ctx.fvars.get).mapM (·.getUserName)}"
    logInfo m!"{← pg.isDone}"

elab "demo1" : tactic => demo1

open ProofDAG in
def demo2 : MetaM Unit := do
  let goal ← mkGoalFromDecl ``test2
  let pg ← ProofGraph.mkPG goal none
  let ctx ← pg.baseContext.get
  let iid ← pg.newNode InvokeNode
  let some invok :=  ← pg.getNode? iid | return
  let data := "{\"name\": \"True.intro\"}"
  let json := Json.parse data
  match json with
  | .ok json => invok.update json
  | .error err => logInfo err
  let _ ← pg.addConnection (iid, "") (ctx.outputNode, "")
  pg.process

  let mvar ← ctx.mvar.get
  mvar.withContext do
    logInfo m!"{← Meta.ppGoal mvar}"
    logInfo m!"{← (← ctx.fvars.get).mapM (·.getUserName)}"
    logInfo m!"{← pg.isDone}"

elab "demo2" : tactic => demo2

open ProofDAG in
def demo3 : MetaM Unit := do
  let goal ← mkGoalFromDecl ``test3
  let pg ← ProofGraph.mkPG goal none
  let ctx ← pg.baseContext.get

  let iid ← pg.newNode InvokeNode
  let some invok :=  ← pg.getNode? iid | return
  let data := "{\"name\": \"Or.resolve_left\"}"
  let json := Json.parse data
  match json with
  | .ok json => invok.update json
  | .error err => logInfo err
  let red1 ← pg.newNode ReductionNode
  let _ ← pg.addConnection (iid, "") (red1, "")
  let _ ← pg.addConnection (ctx.inputNode, "hpq") (red1, "2")
  let _ ← pg.addConnection (ctx.inputNode, "np") (red1, "3")
  let _ ← pg.addConnection (red1, "") (ctx.outputNode, "")
  pg.process
  logInfo m!"{← pg.isDone}"
  let mvar ← ctx.mvar.get
  mvar.withContext do
    logInfo m!"{← Meta.ppGoal mvar}"
    logInfo m!"{← (← ctx.fvars.get).mapM (·.getUserName)}"
    -- let _ ← pg.addConnection (ctx.inputNode, "p") (ctx.outputNode, "")
    inspectNode pg ctx.inputNode
    inspectNode pg iid
    inspectNode pg red1
    inspectNode pg ctx.outputNode
    logInfo m!"{← pg.isDone}"
    logInfo m!"{← pg.mkInfo}"

elab "demo3" : tactic => demo3

open ProofDAG in
def demo4 : MetaM Unit := do
  let goal ← mkGoalFromDecl ``test3
  let pg ← ProofGraph.mkPG goal none
  let ctx ← pg.baseContext.get
  let iid ← pg.newNode InvokeNode
  let some invok :=  ← pg.getNode? iid | return
  let data := "{\"name\": \"Or.resolve_left\"}"
  let json := Json.parse data
  match json with
  | .ok json => invok.update json
  | .error err => logInfo err
  let app1 ← pg.newNode ApplyNode
  let _ ← pg.addConnection (iid, "") (app1, "")
  let _ ← pg.addConnection (app1, "") (ctx.outputNode, "")
  let _ ← pg.addConnection (ctx.inputNode, "hpq") (app1, "0")
  let _ ← pg.addConnection (ctx.inputNode, "np") (app1, "1")
  let _ ← pg.addConnection (ctx.inputNode, "P") (app1, "2")
  pg.process

  let mvar ← ctx.mvar.get
  mvar.withContext do
    logInfo m!"{← Meta.ppGoal mvar}"
    logInfo m!"{← (← ctx.fvars.get).mapM (·.getUserName)}"
    inspectNode pg ctx.inputNode
    inspectNode pg iid
    inspectNode pg app1
    inspectNode pg ctx.outputNode
    logInfo m!"{← pg.isDone}"

elab "demo4" : tactic => demo4

open ProofDAG in
def demo5 : MetaM Unit := do
  let goal ← mkGoalFromDecl ``test3
  let pg ← ProofGraph.mkPG goal (some 0)
  let ctx ← pg.baseContext.get
  let iid1 ← pg.newNode InvokeNode
  let some invok :=  ← pg.getNode? iid1 | return
  let data := "{\"name\": \"Or.resolve_left\"}"
  let json := Json.parse data
  match json with
  | .ok json => invok.update json
  | .error err => logInfo err
  let inid1 ← pg.newNode IntroNode
  let some intro := ← pg.getNode? inid1 | return
  let data := "{\"depth\": 4}"
  let json := Json.parse data
  match json with
  | .ok json => intro.update json
  | .error err => logInfo err

  discard <| pg.addConnection (inid1, "") (ctx.outputNode, "")
  pg.process
  let json ← intro.getData
  let .ok ctxid := json.getObjVal? "subcontext" >>= Json.getStr? | return
  let some subctx ← pg.getContext? ctxid | return
  let app1 ← pg.newNode ReductionNode
  pg.setNodeContext app1 ctxid
  discard <| pg.addConnection (app1, "") (subctx.outputNode, "")
  discard <| pg.addConnection (iid1, "") (app1, "")
  -- discard <| pg.addConnection (ctx.inputNode, "P") (app1, "2")

  pg.process

  discard <| pg.addConnection (subctx.inputNode, "np") (app1, "3")
  discard <| pg.addConnection (subctx.inputNode, "hpq") (app1, "2")

  pg.process

  let mvar ← ctx.mvar.get
  mvar.withContext do
    (← subctx.mvar.get).withContext do
      logInfo m!"{← (← subctx.mvar.get).isAssigned}"
    logInfo m!"{← (← ctx.fvars.get).mapM (·.getUserName)}"
    inspectNode pg ctx.inputNode
    inspectNode pg iid1
    inspectNode pg inid1
    inspectNode pg ctx.outputNode
    inspectNode pg subctx.inputNode
    inspectNode pg app1
    inspectNode pg subctx.outputNode
    logInfo m!"{← intro.getData}"
    logInfo m!"{← pg.isDone}"

elab "demo5" : tactic => do
  let t0 ← IO.monoNanosNow
  demo5
  let t1 ← IO.monoNanosNow
  logInfo m!"Time elapsed {(t1 - t0).toFloat / 1_000_000} ms"

open ProofDAG in
def demo6 : MetaM Unit := do
  let goal ← mkGoalFromDecl ``test4
  let pg ← ProofGraph.mkPG goal none
  let ctx ← pg.baseContext.get
  let fa1 ← mkNodeWithData pg ForallNode "{\"bvars\": [\"x\"]}"
  let iv1 ← mkNodeWithData pg InvokeNode "{\"name\": \"Nat\"}"
  pg.process
  let json ← (← pg.getNode! fa1).getData
  let .ok ctxid := json.getObjVal? "subcontext" >>= Json.getStr? | return
  let some subctx ← pg.getContext? ctxid | return
  let ac1 ← mkNodeWithData pg AppConstNode "{\"name\": \"And\"}"
  let ac2 ← mkNodeWithData pg AppConstNode "{\"name\": \"Or\"}"
  let ac3 ← mkNodeWithData pg AppConstNode "{\"name\": \"Eq\"}"
  let li1 ← mkNodeWithData pg NatNode "{\"value\": 1}"
  pg.setNodeContext ac1 ctxid
  pg.setNodeContext ac2 ctxid
  pg.setNodeContext ac3 ctxid
  pg.setNodeContext li1 ctxid

  discard <| pg.addConnection (iv1, "") (fa1, "0")
  discard <| pg.addConnection (ctx.inputNode, "P") (ac1, "0")
  discard <| pg.addConnection (ctx.inputNode, "Q") (ac1, "1")
  discard <| pg.addConnection (ac1, "") (ac2, "0")
  discard <| pg.addConnection (subctx.inputNode, "x") (ac3, "1")
  discard <| pg.addConnection (li1, "") (ac3, "2")
  discard <| pg.addConnection (ac3, "") (ac2, "1")
  discard <| pg.addConnection (ac2, "") (subctx.outputNode, "")
  discard <| pg.addConnection (fa1, "") (ctx.outputNode, "")
  pg.process

  let mvar ← ctx.mvar.get
  mvar.withContext do
    logInfo m!"{mvar}"
    logInfo m!"{← (← ctx.fvars.get).mapM (·.getUserName)}"
    inspectNode pg fa1
    inspectNode pg iv1
    inspectNode pg ac1
    inspectNode pg ac2
    inspectNode pg ac3
    inspectNode pg subctx.inputNode
    inspectNode pg subctx.outputNode
    logInfo m!"{← pg.isDone}"

elab "demo6" : tactic => demo6

open ProofDAG in
def demo7 : MetaM Unit := do
  let goal ← mkGoalFromDecl ``test5
  let pg ← ProofGraph.mkPG goal none
  let ctx ← pg.baseContext.get

  let ca1 ← pg.newNode CasesNode
  discard <| pg.addConnection (ctx.inputNode, "hab") (ca1, "")
  discard <| pg.addConnection (ca1, "") (ctx.outputNode, "")
  pg.process
  let json ← (← pg.getNode! ca1).getData
  let .ok cdata := @fromJson? CasesDataInternal _ json | return
  let [(_, ctxid1), (_, ctxid2)] := cdata.contexts | return
  let some ctx1 ← pg.getContext? ctxid1 | return
  let some ctx2 ← pg.getContext? ctxid2 | return
  let ivl ← mkNodeWithData pg InvokeNode "{\"name\": \"Or.inl\"}"
  let ivr ← mkNodeWithData pg InvokeNode "{\"name\": \"Or.inr\"}"
  let app1 ← pg.newNode ApplyNode
  let app2 ← pg.newNode ApplyNode
  let app3 ← pg.newNode ApplyNode
  let app4 ← pg.newNode ApplyNode
  pg.setNodeContext app1 ctxid1
  pg.setNodeContext app2 ctxid1
  pg.setNodeContext app3 ctxid2
  pg.setNodeContext app4 ctxid2
  discard <| pg.addConnection (ivl, "") (app1, "")
  discard <| pg.addConnection (ivl, "") (app2, "")
  discard <| pg.addConnection (ivl, "") (app3, "")
  discard <| pg.addConnection (ivr, "") (app4, "")
  discard <| pg.addConnection (app2, "") (ctx1.outputNode, "")
  discard <| pg.addConnection (app4, "") (ctx2.outputNode, "")
  discard <| pg.addConnection (app1, "") (app2, "0")
  discard <| pg.addConnection (app3, "") (app4, "0")
  discard <| pg.addConnection (ctx1.inputNode, "h") (app1, "0")
  discard <| pg.addConnection (ctx2.inputNode, "h") (app3, "0")
  -- discard <| pg.addConnection (app3, "") (app4, "0")
  pg.process
  let mvar ← ctx.mvar.get
  mvar.withContext do
    logInfo m!"{mvar}"
    logInfo m!"{← (← ctx.fvars.get).mapM (·.getUserName)}"
    inspectNode pg ca1
    inspectNode pg ctx.inputNode
    inspectNode pg ctx1.inputNode
    inspectNode pg ctx2.inputNode
    inspectNode pg app1
    inspectNode pg app3
    inspectNode pg app4
    logInfo m!"{← pg.isDone}"

elab "demo7" : tactic => demo7

open ProofDAG in
def demo8 : MetaM Unit := do
  let goal ← mkGoalFromDecl ``test6
  let pg ← ProofGraph.mkPG goal none
  let ctx ← pg.baseContext.get

  let ca1 ← pg.newNode ByCasesNode
  discard <| pg.addConnection (ctx.inputNode, "P") (ca1, "")
  discard <| pg.addConnection (ca1, "") (ctx.outputNode, "")
  pg.process
  let json ← (← pg.getNode! ca1).getData
  let .ok cdata := @fromJson? CasesDataInternal _ json | return
  let [(_, ctxid1), (_, ctxid2)] := cdata.contexts | return
  let some ctx1 ← pg.getContext? ctxid1 | return
  let some ctx2 ← pg.getContext? ctxid2 | return
  let ivl ← mkNodeWithData pg InvokeNode "{\"name\": \"Or.inl\"}"
  let ivr ← mkNodeWithData pg InvokeNode "{\"name\": \"Or.inr\"}"
  let app1 ← pg.newNode ApplyNode
  let app2 ← pg.newNode ApplyNode
  pg.setNodeContext app1 ctxid1
  pg.setNodeContext app2 ctxid2
  discard <| pg.addConnection (ivl, "") (app1, "")
  discard <| pg.addConnection (ivr, "") (app2, "")
  discard <| pg.addConnection (app1, "") (ctx1.outputNode, "")
  discard <| pg.addConnection (app2, "") (ctx2.outputNode, "")
  discard <| pg.addConnection (ctx1.inputNode, "h") (app1, "0")
  discard <| pg.addConnection (ctx2.inputNode, "h") (app2, "0")
  pg.process

  let mvar ← ctx.mvar.get
  mvar.withContext do
    logInfo m!"{mvar}"
    logInfo m!"{← (← ctx.fvars.get).mapM (·.getUserName)}"
    inspectNode pg ca1
    inspectNode pg ctx.inputNode
    inspectNode pg app1
    inspectNode pg app2
    logInfo m!"{← pg.isDone}"

elab "demo8" : tactic => demo8

open ProofDAG in
def demo9 : MetaM Unit := do
  let goal ← mkGoalFromDecl ``test1
  let pg ← ProofGraph.mkPG goal none
  let ctx ← pg.baseContext.get

  let ca1 ← (← nodeConstructor "ByContra") pg
  discard <| pg.addConnection (ca1, "") (ctx.outputNode, "")
  pg.process
  let json ← (← pg.getNode! ca1).getData
  let .ok ctxid := json.getObjVal? "subcontext" >>= Json.getStr? | return
  let some subctx ← pg.getContext? ctxid | return
  let ab1 ← pg.newNode AbsurdNode
  pg.setNodeContext ab1 ctxid
  discard <| pg.addConnection (ab1, "") (subctx.outputNode, "")
  discard <| pg.addConnection (subctx.inputNode, "x") (ab1, "1")
  discard <| pg.addConnection (ctx.inputNode, "p") (ab1, "0")
  pg.process

  let mvar ← ctx.mvar.get
  mvar.withContext do
    logInfo m!"{mvar}"
    logInfo m!"{← (← ctx.fvars.get).mapM (·.getUserName)}"
    inspectNode pg subctx.inputNode
    inspectNode pg subctx.outputNode
    inspectNode pg ab1
    inspectNode pg ctx.inputNode
    logInfo m!"{← pg.isDone}"
    logInfo m!"{← pg.mkInfo}"

elab "demo9" : tactic => demo9

open ProofDAG in
def demo10 : MetaM Unit := do
  let goal ← mkGoalFromDecl ``test1
  let pg ← ProofGraph.mkPG goal none
  let ctx ← pg.baseContext.get

  let ca1 ← (← nodeConstructor "Lemma") pg
  pg.process

  let mvar ← ctx.mvar.get
  mvar.withContext do
    logInfo m!"{mvar}"
    logInfo m!"{← (← ctx.fvars.get).mapM (·.getUserName)}"
    inspectNode pg ctx.inputNode
    logInfo m!"{← pg.isDone}"
    logInfo m!"{← pg.mkInfo}"

elab "demo10" : tactic => demo10

open ProofDAG in
def demo11 : MetaM Unit := do
  let goal ← mkGoalFromDecl ``test7
  let pg ← ProofGraph.mkPG goal none
  let ctx ← pg.baseContext.get

  let ca1 ← (← nodeConstructor "SplitApp") pg
  discard <| pg.addConnection (ctx.inputNode, "hpq") (ca1, "")
  pg.process

  let mvar ← ctx.mvar.get
  mvar.withContext do
    logInfo m!"{mvar}"
    inspectNode pg ca1
    logInfo m!"{← pg.isDone}"
    logInfo m!"{← pg.mkInfo}"

elab "demo11" : tactic => demo11

example : True := by
  demo1
  demo2
  demo3
  demo4
  demo5
  demo6
  demo7
  demo8
  demo9
  demo10
  demo11
  trivial

example : ∀ (P : Type → Prop) (Q : Prop), (∀ (x : Type), P x → Q) → (∃ (x : Type), P x) → Q := by grind
example : ∀ {P Q R : Prop} (hab : P ∨ Q), (P ∨ R) ∨ (Q ∨ R) := by grind
