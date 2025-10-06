import { ParseTree } from "antlr4";
import Lean4ExprVisitor from "./Lean4ExprVisitor";

export class Lean4ExprVisitorProvider<TContext> {
    serviceList: {
        [K in keyof TContext]: Lean4ExprVisitor<TContext[K]>
    };

    static buildProvider() {
        return new Lean4ExprVisitorProvider<{ never: never }>({} as any); // 保护，防止ts产生一些奇怪的类型推断行为
    }

    private constructor(services: { [K in keyof TContext]: Lean4ExprVisitor<TContext[K]> }) {
        this.serviceList = services;
    }

    provideService<Token extends string, T>(token: Token, service: Lean4ExprVisitor<T>) 
        : Lean4ExprVisitorProvider<{ [K in Token]: T } & TContext>
    {
        const newServiceList = {
            ...this.serviceList,
            [token] : service
        };
        const newProvider = new Lean4ExprVisitorProvider<{ [K in Token]: T } & TContext >(newServiceList as any);
        return newProvider;
    }

    getService<Token extends keyof TContext>(token: Token) : Lean4ExprVisitor<TContext[Token]>
    {
        return this.serviceList[token];
    }

    visit<Token extends keyof TContext>(token: Token, tree: ParseTree): TContext[Token] {
        const ret = this.getService(token)?.visit(tree);
        if(ret === null || ret === undefined) {
            throw Error(`Visit not implemented for tree ${tree.getText()}`);
        }
        return ret;
    }

    inject<Tokens extends keyof TContext>(injectable: Injectable<TContext, Tokens>){
        injectable.provider = this as any;
    }
}

export interface Injectable<TContext, Tokens extends keyof TContext> {
    provider: Lean4ExprVisitorProvider<{
        [K in Tokens]: TContext[K];
    }>
}

export function tokens<Tokens extends string[]>(...theTokens: Tokens): Tokens {
    return theTokens;
}