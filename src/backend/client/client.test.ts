import { LeanClient } from "./client"

test(
    "Client", 
    async () => {
        const uri = "untitled:file0";
        const content = `
import Init
theorem my_lemma :∀ (P Q : Prop), P ∨ Q := by {
  intro P
  by_cases P
  intro Q
  by_cases Q

}
example (P Q: Prop) : P → Q → P := by {
have pp : P → P := by {intro p; exact p}

}
        `
        const leanClient = new LeanClient();
        await leanClient.initialize();
        leanClient.openFile(uri);
        leanClient.changeFile(uri, content);
        const goals = await leanClient.fetchGoals(uri, { line: 5, character: 0 });
        console.log(goals);
        await leanClient.shutdown();
        expect(goals[0]).toBeDefined();
    },
    20000
)