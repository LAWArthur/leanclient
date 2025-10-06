import { AtomType, BinaryType, ForallType, Goal, LeanType, Serializer, UnknownType } from "./types"

test(
    "Serialization test",
    () => {
        const testGoal = { 
            tag: undefined, 
            vars:  [
                {
                    name: "test1",
                    type: new BinaryType("op", new AtomType({ type: "ID", value: "what" }), new UnknownType())
                }
            ],
            target: new ForallType([{type: "explicit", var: { name: "test2", type: new AtomType({type: "ID", value: "wow"}) }}], new UnknownType())
        }
        const serialized = Serializer.serialize(testGoal);
        const deserialized: Goal = Serializer.deserialize(serialized);
        console.log(serialized);
        expect(deserialized.target.toString()).toBe(testGoal.target.toString());
        expect(deserialized.vars.length).toBe(testGoal.vars.length);
        expect(deserialized.vars[0].type.toString()).toBe(testGoal.vars[0].type.toString());
    }
)