-- This file contains important logic theorems not yet implemented by Init.

theorem or_self_and {P Q : Prop} : P ∨ P ∧ Q ↔ P := by grind

theorem and_self_or {P Q : Prop} : P ∧ (P ∨ Q) ↔ P := by grind
