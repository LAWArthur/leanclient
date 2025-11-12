import { TerminalNode } from "antlr4";
import { BindersContext, ExistsExprContext, ExplicitBinderContext, ExplicitBinderItemContext, ExprContext, 
    ForallExprContext, FuncExprContext, GoalContext, IdentifierContext, ImplicitBinderContext, ImplicitBinderItemContext, InstanceBinderContext, 
    InstanceBinderItemContext, LiteralContext, OpTypeContext, ParenExprContext, SimpleBinderItemContext, StartContext, TagContext, TargetContext, TupleContext, VarContext, VarsContext } from "./Lean4ExprParser";
import Lean4ExprVisitor from "./Lean4ExprVisitor";
import { Lean4ExprVisitorProvider } from "./provider";
import { Var, Binder, LeanType, Goal, UnknownType, ForallType, ExistsType, FuncType, UnaryType, BinaryType, AtomType, TupleType } from "./types";

export type RequireServices<T extends { [ K in string ] : any }> = {
    [K in keyof T] : Lean4ExprVisitor<T[K]>;
}

export class VarsVisitor extends Lean4ExprVisitor<Var[]> {
    provider!: Lean4ExprVisitorProvider<{ LeanType: LeanType, Vars: Var[] }>;

    visitVar = (ctx: VarContext) => {
        const type = this.provider.visit("LeanType", ctx.expr());
        return ctx.identifiers().ID_list().map(id => ({ name: id.getText(), type: type }));
    }

    visitVars = (ctx: VarsContext) => {
        return ctx.var__list().map(v => this.visit(v)!).flat();
    }

    visitSimpleBinderItem = (ctx: SimpleBinderItemContext) => {
        const type = null;
        return ctx.identifiers().ID_list().map(id => ({ name: id.getText(), type: type }));
    }

    visitExplicitBinderItem = (ctx: ExplicitBinderItemContext) => {
        return this.visit(ctx.explicitBinder())!;
    }

    visitImplicitBinderItem = (ctx: ImplicitBinderItemContext) => {
        return this.visit(ctx.implicitBinder())!;
    }

    visitInstanceBinderItem = (ctx: InstanceBinderItemContext) => {
        return this.visit(ctx.instanceBinder())!;
    }

    visitExplicitBinder = (ctx: ExplicitBinderContext) => {
        const type = this.provider.visit("LeanType", ctx.expr());
        return ctx.identifiers().ID_list().map(id => ({ name: id.getText(), type: type }));
    }

    visitImplicitBinder = (ctx: ImplicitBinderContext) => {
        const expr = ctx.expr();
        const type = (expr && this.provider.visit("LeanType", expr)) ?? null;
        return ctx.identifiers().ID_list().map(id => ({ name: id.getText(), type: type }));
    }

    visitInstanceBinder = (ctx: InstanceBinderContext) => {
        const type = this.provider.visit("LeanType", ctx.expr());
        return ctx.identifiers()?.ID_list()?.map(id => ({ name: id.getText(), type: type })) ?? [{ name: null, type: type }];
    }
}

export class BindersVisitor extends Lean4ExprVisitor<Binder[]> {
    provider!: Lean4ExprVisitorProvider<{ LeanType: LeanType, Vars: Var[], Binders: Binder[] }>;

    visitSimpleBinderItem = (ctx: SimpleBinderItemContext) => {
        const vars = this.provider.visit("Vars", ctx);
        return vars.map(v => ({ type: "explicit", var: v as Var<string, null> } as Binder));
    }

    visitExplicitBinderItem = (ctx: ExplicitBinderItemContext) => {
        const vars = this.provider.visit("Vars", ctx);
        return vars.map(v => ({ type: "explicit", var: v as Var<string, LeanType> } as Binder));
    }

    visitImplicitBinderItem = (ctx: ImplicitBinderItemContext) => {
        const vars = this.provider.visit("Vars", ctx)!;
        return vars.map(v => ({ type: "implicit", var: v as Var<string, LeanType | null> } as Binder));
    }

    visitInstanceBinderItem = (ctx: InstanceBinderItemContext) => {
        const vars = this.provider.visit("Vars", ctx)!;
        return vars.map(v => ({ type: "instance", var: v as Var<string | null, LeanType> } as Binder));
    }

    visitBinders = (ctx: BindersContext) => {
        const binders = ctx.binder_list().map(v => this.visit(v)!);
        return binders.flat(1);
    }
}

export class LeanTypeVisitor extends Lean4ExprVisitor<LeanType> {
    provider!: Lean4ExprVisitorProvider<{ LeanType: LeanType, Vars: Var[], Binders: Binder[] }>;

    visitExpr = (ctx: ExprContext) => {
        return this.visit(ctx.getChild(0)!)!;
    }

    visitForallExpr = (ctx: ForallExprContext) => {
        return new ForallType(this.provider.visit("Binders", ctx.binders()), this.provider.visit("LeanType", ctx.expr()));
    }

    visitExistsExpr = (ctx: ExistsExprContext) => {
        return new ExistsType(this.provider.visit("Binders", ctx.binders()), this.provider.visit("LeanType", ctx.expr()));
    }

    visitFuncExpr = (ctx: FuncExprContext) => {
        return new FuncType(this.provider.visit("Binders", ctx.binders()), this.provider.visit("LeanType", ctx.expr()));
    }

    visitOpType = (ctx: OpTypeContext) => {
        if(ctx.opType_list().length === 0) { // forall, exists or oprands, I don't care
            return this.provider.visit("LeanType", ctx.getChild(0)!);
        }
        else if(ctx.opType_list().length === 1) { // prefixes
            const type = new UnaryType(ctx._op!.text!, this.provider.visit("LeanType", ctx.opType_list()[0]));
            if(ctx.precedence !== undefined) type.precedence = ctx.precedence;
            return type;
        }
        else {
            const type = new BinaryType(ctx._op?.text, this.provider.visit("LeanType", ctx.opType_list()[0]), this.provider.visit("LeanType", ctx.opType_list()[1]));
            if(ctx.precedence !== undefined) type.precedence = ctx.precedence;
            if(ctx.assoc !== undefined) type.assoc = ctx.assoc;
            return type;
        }
    }

    visitIdentifier = (ctx: IdentifierContext) => {
        return new AtomType({ type: "ID", value: ctx.ID().getText() });
    }

    visitLiteral = (ctx: LiteralContext) => {
        return new AtomType({type: "LITERAL", value: parseFloat(ctx.LITERAL().getText()) });
    }

    visitParenExpr = (ctx: ParenExprContext) => {
        return this.provider.visit("LeanType", ctx.expr());
    }

    visitTuple = (ctx: TupleContext) => {
        return new TupleType(ctx.expr_list().map(v => this.provider.visit("LeanType", v)));
    }

    visitTarget = (ctx: TargetContext) => {
        return this.provider.visit("LeanType", ctx.expr());
    }
}

export class TagVisitor extends Lean4ExprVisitor<string> {
    provider!: Lean4ExprVisitorProvider<{}>;
    visitTag = (ctx: TagContext) => {
        return ctx.children!.slice(-2).map(v => v.getText()).join(' ');
    }


}

export class GoalVisitor extends Lean4ExprVisitor<Goal> {
    provider!: Lean4ExprVisitorProvider<{ Vars: Var[], LeanType: LeanType, Tag: string }>
    visitGoal = (ctx: GoalContext) => {
        const tag = ctx.tag() ? this.provider.visit("Tag", ctx.tag()!) : undefined;
        const vars = this.provider.visit("Vars", ctx.vars()) as Var<string, LeanType>[];
        const target = this.provider.visit("LeanType", ctx.target());
        return {
            tag: tag,
            vars: vars,
            target: target
        }
    }
}

export class RootVisitor extends Lean4ExprVisitor<Goal[]> {
    provider!: Lean4ExprVisitorProvider<{ Goal: Goal }>;
    visitStart = (ctx: StartContext) => {
        return ctx.goal_list().map(v => this.provider.visit("Goal", v));
    }
}