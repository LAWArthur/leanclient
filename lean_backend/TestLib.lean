theorem test1 {P : Prop} (p : P) : P := by assumption
theorem test2 : True := by trivial
theorem test3 {P Q : Prop} (np : ¬P) (hpq : P ∨ Q) : Q := Or.resolve_left hpq np
def test4 {P Q : Prop} : Prop := ∀ (x : Nat), P ∧ Q ∨ (x = 1)
theorem test5 {P Q R : Prop} (hab : P ∨ Q) : (P ∨ R) ∨ (Q ∨ R) := by grind
theorem test6 {P : Prop} : P ∨ ¬ P:= by grind
theorem test7 {P Q : Prop} (hpq : P ∧ Q) : P := by grind
theorem test8 {P Q : Prop} (hp : P) (hq : Q) :  P ∧ Q := by grind
theorem test9 {P Q : Prop} (hpq : ∃ (p : P), Q) : P ∧ Q := by grind


abbrev nondependent_arrow (A : Sort u) (B : Sort v) : Sort (imax u v) := A → B

@[app_unexpander nondependent_arrow] def unexpandNondependentArrow : Lean.PrettyPrinter.Unexpander
| `($_ $a $b) => `($a → $b)
| _ => throw ()
