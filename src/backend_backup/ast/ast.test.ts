import { parseGoals } from "./ast";

test("parseGoals",
    () => {
        const input = 
        `
        case or.inr:
        p q† α₁ : Nat
        a b c : b → B
        ├ ∀ {A B: Type}(h i: p),  B (C x)
        n : Float
        ├ ¬ propconv P
        ├ propconv ¬ P
        `

        const output = parseGoals(input);
        console.log(output[0].target.toString());
        expect(true).toBe(true);
    }
);