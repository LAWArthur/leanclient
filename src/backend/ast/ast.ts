import { CharStream, CommonTokenStream } from "antlr4";
import Lean4ExprLexer  from "./Lean4ExprLexer"
import Lean4ExprParser from "./Lean4ExprParser"
import Lean4ExprVisitor from "./Lean4ExprVisitor";
import { Lean4ExprVisitorProvider } from "./provider";
import { BindersVisitor, GoalVisitor, LeanTypeVisitor, RootVisitor, TagVisitor, VarsVisitor } from "./visitors";
import { Binder, LeanType, Var } from "./types";

function makeService() {
    const leanTypeService = new LeanTypeVisitor();
    const bindersService = new BindersVisitor();
    const varsService = new VarsVisitor();
    const tagService = new TagVisitor();
    const goalService = new GoalVisitor();
    const rootService = new RootVisitor();

    const provider = Lean4ExprVisitorProvider.buildProvider()
                    .provideService("LeanType", leanTypeService)
                    .provideService("Vars", varsService)
                    .provideService("Binders", bindersService)
                    .provideService("Tag", tagService)
                    .provideService("Goal", goalService)
                    .provideService("Root", rootService);
    
    provider.inject(leanTypeService);
    provider.inject(bindersService);
    provider.inject(varsService);
    provider.inject(tagService);
    provider.inject(goalService);
    provider.inject(rootService);

    return provider;
}

export function parseGoals(rawGoal: string) {
    const input = new CharStream(rawGoal, true);
    const lexer = new Lean4ExprLexer(input);
    const tokens = new CommonTokenStream(lexer);
    const parser = new Lean4ExprParser(tokens);
    const tree = parser.start();
    const provider = makeService();
    return provider.visit("Root", tree);
}

export function parseGoal(rawGoal: string) {
    const input = new CharStream(rawGoal, true);
    const lexer = new Lean4ExprLexer(input);
    const tokens = new CommonTokenStream(lexer);
    const parser = new Lean4ExprParser(tokens);
    const tree = parser.goal();
    const provider = makeService();
    return provider.visit("Goal", tree);
}

export function parseType(rawType: string) {
    const input = new CharStream(rawType, true);
    const lexer = new Lean4ExprLexer(input);
    const tokens = new CommonTokenStream(lexer);
    const parser = new Lean4ExprParser(tokens);
    const tree = parser.expr();
    const provider = makeService();
    return provider.visit("LeanType", tree);
}