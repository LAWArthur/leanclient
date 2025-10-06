// Generated from Lean4Expr.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { StartContext } from "./Lean4ExprParser.js";
import { GoalContext } from "./Lean4ExprParser.js";
import { TagContext } from "./Lean4ExprParser.js";
import { VarsContext } from "./Lean4ExprParser.js";
import { VarContext } from "./Lean4ExprParser.js";
import { ExprContext } from "./Lean4ExprParser.js";
import { TargetContext } from "./Lean4ExprParser.js";
import { ForallExprContext } from "./Lean4ExprParser.js";
import { FuncExprContext } from "./Lean4ExprParser.js";
import { ExistsExprContext } from "./Lean4ExprParser.js";
import { OpTypeContext } from "./Lean4ExprParser.js";
import { IdentifierContext } from "./Lean4ExprParser.js";
import { LiteralContext } from "./Lean4ExprParser.js";
import { ParenExprContext } from "./Lean4ExprParser.js";
import { TupleContext } from "./Lean4ExprParser.js";
import { BindersContext } from "./Lean4ExprParser.js";
import { SimpleBinderItemContext } from "./Lean4ExprParser.js";
import { ExplicitBinderItemContext } from "./Lean4ExprParser.js";
import { ImplicitBinderItemContext } from "./Lean4ExprParser.js";
import { InstanceBinderItemContext } from "./Lean4ExprParser.js";
import { ExplicitBinderContext } from "./Lean4ExprParser.js";
import { ImplicitBinderContext } from "./Lean4ExprParser.js";
import { InstanceBinderContext } from "./Lean4ExprParser.js";
import { IdentifiersContext } from "./Lean4ExprParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `Lean4ExprParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class Lean4ExprVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.start`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStart?: (ctx: StartContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.goal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGoal?: (ctx: GoalContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.tag`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTag?: (ctx: TagContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.vars`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVars?: (ctx: VarsContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.var`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVar?: (ctx: VarContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.target`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTarget?: (ctx: TargetContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.forallExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForallExpr?: (ctx: ForallExprContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.funcExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncExpr?: (ctx: FuncExprContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.existsExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExistsExpr?: (ctx: ExistsExprContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.opType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpType?: (ctx: OpTypeContext) => Result;
	/**
	 * Visit a parse tree produced by the `Identifier`
	 * labeled alternative in `Lean4ExprParser.atomType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by the `Literal`
	 * labeled alternative in `Lean4ExprParser.atomType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral?: (ctx: LiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `ParenExpr`
	 * labeled alternative in `Lean4ExprParser.atomType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenExpr?: (ctx: ParenExprContext) => Result;
	/**
	 * Visit a parse tree produced by the `Tuple`
	 * labeled alternative in `Lean4ExprParser.atomType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTuple?: (ctx: TupleContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.binders`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinders?: (ctx: BindersContext) => Result;
	/**
	 * Visit a parse tree produced by the `SimpleBinderItem`
	 * labeled alternative in `Lean4ExprParser.binder`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpleBinderItem?: (ctx: SimpleBinderItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `ExplicitBinderItem`
	 * labeled alternative in `Lean4ExprParser.binder`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExplicitBinderItem?: (ctx: ExplicitBinderItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `ImplicitBinderItem`
	 * labeled alternative in `Lean4ExprParser.binder`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImplicitBinderItem?: (ctx: ImplicitBinderItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `InstanceBinderItem`
	 * labeled alternative in `Lean4ExprParser.binder`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstanceBinderItem?: (ctx: InstanceBinderItemContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.explicitBinder`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExplicitBinder?: (ctx: ExplicitBinderContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.implicitBinder`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImplicitBinder?: (ctx: ImplicitBinderContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.instanceBinder`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstanceBinder?: (ctx: InstanceBinderContext) => Result;
	/**
	 * Visit a parse tree produced by `Lean4ExprParser.identifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifiers?: (ctx: IdentifiersContext) => Result;
}

