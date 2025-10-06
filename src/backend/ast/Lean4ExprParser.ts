// Generated from Lean4Expr.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import Lean4ExprVisitor from "./Lean4ExprVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class Lean4ExprParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly LITERAL = 30;
	public static readonly INTEGER = 31;
	public static readonly FLOAT = 32;
	public static readonly ID = 33;
	public static readonly FORALL = 34;
	public static readonly EXISTS = 35;
	public static readonly LAMBDA = 36;
	public static readonly WS = 37;
	public static readonly NEWLINE = 38;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_start = 0;
	public static readonly RULE_goal = 1;
	public static readonly RULE_tag = 2;
	public static readonly RULE_vars = 3;
	public static readonly RULE_var = 4;
	public static readonly RULE_expr = 5;
	public static readonly RULE_target = 6;
	public static readonly RULE_forallExpr = 7;
	public static readonly RULE_funcExpr = 8;
	public static readonly RULE_existsExpr = 9;
	public static readonly RULE_opType = 10;
	public static readonly RULE_atomType = 11;
	public static readonly RULE_binders = 12;
	public static readonly RULE_binder = 13;
	public static readonly RULE_explicitBinder = 14;
	public static readonly RULE_implicitBinder = 15;
	public static readonly RULE_instanceBinder = 16;
	public static readonly RULE_identifiers = 17;
	public static readonly literalNames: (string | null)[] = [ null, "':'", 
                                                            "'\\u251C'", 
                                                            "','", "'.'", 
                                                            "'\\u2218'", 
                                                            "'^'", "'-'", 
                                                            "'*'", "'/'", 
                                                            "'+'", "'='", 
                                                            "'\\u2260'", 
                                                            "'>'", "'<'", 
                                                            "'\\u2265'", 
                                                            "'\\u2264'", 
                                                            "'\\u00AC'", 
                                                            "'\\u2227'", 
                                                            "'\\u00D7'", 
                                                            "'\\u2228'", 
                                                            "'\\u2192'", 
                                                            "'->'", "'\\u2194'", 
                                                            "'('", "')'", 
                                                            "'{'", "'}'", 
                                                            "'['", "']'", 
                                                            null, null, 
                                                            null, null, 
                                                            "'\\u2200'", 
                                                            "'\\u2203'", 
                                                            "'\\u03BB'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "LITERAL", 
                                                             "INTEGER", 
                                                             "FLOAT", "ID", 
                                                             "FORALL", "EXISTS", 
                                                             "LAMBDA", "WS", 
                                                             "NEWLINE" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"start", "goal", "tag", "vars", "var", "expr", "target", "forallExpr", 
		"funcExpr", "existsExpr", "opType", "atomType", "binders", "binder", "explicitBinder", 
		"implicitBinder", "instanceBinder", "identifiers",
	];
	public get grammarFileName(): string { return "Lean4Expr.g4"; }
	public get literalNames(): (string | null)[] { return Lean4ExprParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return Lean4ExprParser.symbolicNames; }
	public get ruleNames(): string[] { return Lean4ExprParser.ruleNames; }
	public get serializedATN(): number[] { return Lean4ExprParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, Lean4ExprParser._ATN, Lean4ExprParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public start(): StartContext {
		let localctx: StartContext = new StartContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, Lean4ExprParser.RULE_start);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 37;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 36;
				this.goal();
				}
				}
				this.state = 39;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===2 || _la===30 || _la===33 || _la===38);
			this.state = 41;
			this.match(Lean4ExprParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public goal(): GoalContext {
		let localctx: GoalContext = new GoalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, Lean4ExprParser.RULE_goal);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 46;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===38) {
				{
				{
				this.state = 43;
				this.match(Lean4ExprParser.NEWLINE);
				}
				}
				this.state = 48;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 50;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				{
				this.state = 49;
				this.tag();
				}
				break;
			}
			this.state = 52;
			this.vars();
			this.state = 53;
			this.target();
			this.state = 57;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 54;
					this.match(Lean4ExprParser.NEWLINE);
					}
					}
				}
				this.state = 59;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tag(): TagContext {
		let localctx: TagContext = new TagContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, Lean4ExprParser.RULE_tag);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 61;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 60;
				_la = this._input.LA(1);
				if(!(_la===30 || _la===33)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				}
				this.state = 63;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===30 || _la===33);
			this.state = 65;
			this.match(Lean4ExprParser.T__0);
			this.state = 66;
			this.match(Lean4ExprParser.NEWLINE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public vars(): VarsContext {
		let localctx: VarsContext = new VarsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, Lean4ExprParser.RULE_vars);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 73;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===33) {
				{
				{
				this.state = 68;
				this.var_();
				this.state = 69;
				this.match(Lean4ExprParser.NEWLINE);
				}
				}
				this.state = 75;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public var_(): VarContext {
		let localctx: VarContext = new VarContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, Lean4ExprParser.RULE_var);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 76;
			this.identifiers();
			this.state = 77;
			this.match(Lean4ExprParser.T__0);
			this.state = 78;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expr(): ExprContext {
		let localctx: ExprContext = new ExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, Lean4ExprParser.RULE_expr);
		try {
			this.state = 82;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 80;
				this.funcExpr();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 81;
				this.opType(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public target(): TargetContext {
		let localctx: TargetContext = new TargetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, Lean4ExprParser.RULE_target);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 84;
			this.match(Lean4ExprParser.T__1);
			this.state = 85;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forallExpr(): ForallExprContext {
		let localctx: ForallExprContext = new ForallExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, Lean4ExprParser.RULE_forallExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 87;
			this.match(Lean4ExprParser.FORALL);
			this.state = 88;
			this.binders();
			this.state = 89;
			_la = this._input.LA(1);
			if(!(_la===3 || _la===4)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 90;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public funcExpr(): FuncExprContext {
		let localctx: FuncExprContext = new FuncExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, Lean4ExprParser.RULE_funcExpr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 92;
			this.binders();
			this.state = 93;
			this.match(Lean4ExprParser.T__0);
			this.state = 94;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public existsExpr(): ExistsExprContext {
		let localctx: ExistsExprContext = new ExistsExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, Lean4ExprParser.RULE_existsExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 96;
			this.match(Lean4ExprParser.EXISTS);
			this.state = 97;
			this.binders();
			this.state = 98;
			_la = this._input.LA(1);
			if(!(_la===3 || _la===4)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 99;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public opType(): OpTypeContext;
	public opType(_p: number): OpTypeContext;
	// @RuleVersion(0)
	public opType(_p?: number): OpTypeContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: OpTypeContext = new OpTypeContext(this, this._ctx, _parentState);
		let _prevctx: OpTypeContext = localctx;
		let _startState: number = 20;
		this.enterRecursionRule(localctx, 20, Lean4ExprParser.RULE_opType, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 119;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 24:
			case 30:
			case 33:
				{
				this.state = 102;
				this.atomType();
				}
				break;
			case 26:
				{
				this.state = 103;
				this.implicitBinder();
				}
				break;
			case 28:
				{
				this.state = 104;
				this.instanceBinder();
				}
				break;
			case 7:
				{
				this.state = 105;
				localctx._op = this.match(Lean4ExprParser.T__6);
				this.state = 106;
				this.opType(11);
				 localctx.precedence =  75; 
				}
				break;
			case 17:
				{
				this.state = 109;
				localctx._op = this.match(Lean4ExprParser.T__16);
				this.state = 110;
				this.opType(7);
				 localctx.precedence =  40; 
				}
				break;
			case 34:
				{
				this.state = 113;
				this.forallExpr();
				 localctx.precedence =  0; 
				}
				break;
			case 35:
				{
				this.state = 116;
				this.existsExpr();
				 localctx.precedence =  0; 
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 172;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 9, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 170;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 8, this._ctx) ) {
					case 1:
						{
						localctx = new OpTypeContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, Lean4ExprParser.RULE_opType);
						this.state = 121;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 122;
						this.opType(15);
						 localctx.precedence =  100; localctx.assoc =  "left"; 
						}
						break;
					case 2:
						{
						localctx = new OpTypeContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, Lean4ExprParser.RULE_opType);
						this.state = 125;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 126;
						localctx._op = this.match(Lean4ExprParser.T__4);
						this.state = 127;
						this.opType(13);
						 localctx.precedence =  90; localctx.assoc =  "right"; 
						}
						break;
					case 3:
						{
						localctx = new OpTypeContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, Lean4ExprParser.RULE_opType);
						this.state = 130;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 131;
						localctx._op = this.match(Lean4ExprParser.T__5);
						this.state = 132;
						this.opType(12);
						 localctx.precedence =  80; localctx.assoc =  "right"; 
						}
						break;
					case 4:
						{
						localctx = new OpTypeContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, Lean4ExprParser.RULE_opType);
						this.state = 135;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 136;
						localctx._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(_la===8 || _la===9)) {
						    localctx._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 137;
						this.opType(11);
						 localctx.precedence =  70; localctx.assoc =  "left"; 
						}
						break;
					case 5:
						{
						localctx = new OpTypeContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, Lean4ExprParser.RULE_opType);
						this.state = 140;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 141;
						localctx._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(_la===7 || _la===10)) {
						    localctx._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 142;
						this.opType(10);
						 localctx.precedence =  65; localctx.assoc =  "left"; 
						}
						break;
					case 6:
						{
						localctx = new OpTypeContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, Lean4ExprParser.RULE_opType);
						this.state = 145;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 146;
						localctx._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 129024) !== 0))) {
						    localctx._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 147;
						this.opType(9);
						 localctx.precedence =  50; localctx.assoc =  "none"; 
						}
						break;
					case 7:
						{
						localctx = new OpTypeContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, Lean4ExprParser.RULE_opType);
						this.state = 150;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 151;
						localctx._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(_la===18 || _la===19)) {
						    localctx._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 152;
						this.opType(7);
						 localctx.precedence =  35; localctx.assoc =  "left"; 
						}
						break;
					case 8:
						{
						localctx = new OpTypeContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, Lean4ExprParser.RULE_opType);
						this.state = 155;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 156;
						localctx._op = this.match(Lean4ExprParser.T__19);
						this.state = 157;
						this.opType(6);
						 localctx.precedence =  30; localctx.assoc =  "left"; 
						}
						break;
					case 9:
						{
						localctx = new OpTypeContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, Lean4ExprParser.RULE_opType);
						this.state = 160;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 161;
						localctx._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(_la===21 || _la===22)) {
						    localctx._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 162;
						this.opType(4);
						 localctx.precedence =  25; localctx.assoc =  "right"; 
						}
						break;
					case 10:
						{
						localctx = new OpTypeContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, Lean4ExprParser.RULE_opType);
						this.state = 165;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 166;
						localctx._op = this.match(Lean4ExprParser.T__22);
						this.state = 167;
						this.opType(4);
						 localctx.precedence =  20; localctx.assoc =  "none"; 
						}
						break;
					}
					}
				}
				this.state = 174;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 9, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public atomType(): AtomTypeContext {
		let localctx: AtomTypeContext = new AtomTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, Lean4ExprParser.RULE_atomType);
		let _la: number;
		try {
			this.state = 191;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 11, this._ctx) ) {
			case 1:
				localctx = new IdentifierContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 175;
				this.match(Lean4ExprParser.ID);
				}
				break;
			case 2:
				localctx = new LiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 176;
				this.match(Lean4ExprParser.LITERAL);
				}
				break;
			case 3:
				localctx = new ParenExprContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 177;
				this.match(Lean4ExprParser.T__23);
				this.state = 178;
				this.expr();
				this.state = 179;
				this.match(Lean4ExprParser.T__24);
				}
				break;
			case 4:
				localctx = new TupleContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 181;
				this.match(Lean4ExprParser.T__23);
				this.state = 182;
				this.expr();
				this.state = 185;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 183;
					this.match(Lean4ExprParser.T__2);
					this.state = 184;
					this.expr();
					}
					}
					this.state = 187;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===3);
				this.state = 189;
				this.match(Lean4ExprParser.T__24);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public binders(): BindersContext {
		let localctx: BindersContext = new BindersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, Lean4ExprParser.RULE_binders);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 194;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 193;
				this.binder();
				}
				}
				this.state = 196;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 24)) & ~0x1F) === 0 && ((1 << (_la - 24)) & 533) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public binder(): BinderContext {
		let localctx: BinderContext = new BinderContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, Lean4ExprParser.RULE_binder);
		try {
			this.state = 202;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 33:
				localctx = new SimpleBinderItemContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 198;
				this.identifiers();
				}
				break;
			case 24:
				localctx = new ExplicitBinderItemContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 199;
				this.explicitBinder();
				}
				break;
			case 26:
				localctx = new ImplicitBinderItemContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 200;
				this.implicitBinder();
				}
				break;
			case 28:
				localctx = new InstanceBinderItemContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 201;
				this.instanceBinder();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public explicitBinder(): ExplicitBinderContext {
		let localctx: ExplicitBinderContext = new ExplicitBinderContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, Lean4ExprParser.RULE_explicitBinder);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 204;
			this.match(Lean4ExprParser.T__23);
			this.state = 205;
			this.identifiers();
			this.state = 206;
			this.match(Lean4ExprParser.T__0);
			this.state = 207;
			this.expr();
			this.state = 208;
			this.match(Lean4ExprParser.T__24);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public implicitBinder(): ImplicitBinderContext {
		let localctx: ImplicitBinderContext = new ImplicitBinderContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, Lean4ExprParser.RULE_implicitBinder);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 210;
			this.match(Lean4ExprParser.T__25);
			this.state = 211;
			this.identifiers();
			this.state = 214;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1) {
				{
				this.state = 212;
				this.match(Lean4ExprParser.T__0);
				this.state = 213;
				this.expr();
				}
			}

			this.state = 216;
			this.match(Lean4ExprParser.T__26);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public instanceBinder(): InstanceBinderContext {
		let localctx: InstanceBinderContext = new InstanceBinderContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, Lean4ExprParser.RULE_instanceBinder);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 218;
			this.match(Lean4ExprParser.T__27);
			this.state = 222;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 15, this._ctx) ) {
			case 1:
				{
				this.state = 219;
				this.identifiers();
				this.state = 220;
				this.match(Lean4ExprParser.T__0);
				}
				break;
			}
			this.state = 224;
			this.expr();
			this.state = 225;
			this.match(Lean4ExprParser.T__28);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public identifiers(): IdentifiersContext {
		let localctx: IdentifiersContext = new IdentifiersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, Lean4ExprParser.RULE_identifiers);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 228;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 227;
					this.match(Lean4ExprParser.ID);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 230;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 10:
			return this.opType_sempred(localctx as OpTypeContext, predIndex);
		}
		return true;
	}
	private opType_sempred(localctx: OpTypeContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 14);
		case 1:
			return this.precpred(this._ctx, 13);
		case 2:
			return this.precpred(this._ctx, 12);
		case 3:
			return this.precpred(this._ctx, 10);
		case 4:
			return this.precpred(this._ctx, 9);
		case 5:
			return this.precpred(this._ctx, 8);
		case 6:
			return this.precpred(this._ctx, 6);
		case 7:
			return this.precpred(this._ctx, 5);
		case 8:
			return this.precpred(this._ctx, 4);
		case 9:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,38,233,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,1,0,4,0,38,8,0,11,0,12,0,39,1,0,1,0,1,1,5,1,45,8,1,10,1,12,1,48,9,
	1,1,1,3,1,51,8,1,1,1,1,1,1,1,5,1,56,8,1,10,1,12,1,59,9,1,1,2,4,2,62,8,2,
	11,2,12,2,63,1,2,1,2,1,2,1,3,1,3,1,3,5,3,72,8,3,10,3,12,3,75,9,3,1,4,1,
	4,1,4,1,4,1,5,1,5,3,5,83,8,5,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,
	8,1,8,1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,
	1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,3,10,120,8,10,1,10,1,10,1,
	10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,
	1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,
	10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,
	1,10,1,10,1,10,5,10,171,8,10,10,10,12,10,174,9,10,1,11,1,11,1,11,1,11,1,
	11,1,11,1,11,1,11,1,11,1,11,4,11,186,8,11,11,11,12,11,187,1,11,1,11,3,11,
	192,8,11,1,12,4,12,195,8,12,11,12,12,12,196,1,13,1,13,1,13,1,13,3,13,203,
	8,13,1,14,1,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,3,15,215,8,15,1,
	15,1,15,1,16,1,16,1,16,1,16,3,16,223,8,16,1,16,1,16,1,16,1,17,4,17,229,
	8,17,11,17,12,17,230,1,17,0,1,20,18,0,2,4,6,8,10,12,14,16,18,20,22,24,26,
	28,30,32,34,0,7,2,0,30,30,33,33,1,0,3,4,1,0,8,9,2,0,7,7,10,10,1,0,11,16,
	1,0,18,19,1,0,21,22,248,0,37,1,0,0,0,2,46,1,0,0,0,4,61,1,0,0,0,6,73,1,0,
	0,0,8,76,1,0,0,0,10,82,1,0,0,0,12,84,1,0,0,0,14,87,1,0,0,0,16,92,1,0,0,
	0,18,96,1,0,0,0,20,119,1,0,0,0,22,191,1,0,0,0,24,194,1,0,0,0,26,202,1,0,
	0,0,28,204,1,0,0,0,30,210,1,0,0,0,32,218,1,0,0,0,34,228,1,0,0,0,36,38,3,
	2,1,0,37,36,1,0,0,0,38,39,1,0,0,0,39,37,1,0,0,0,39,40,1,0,0,0,40,41,1,0,
	0,0,41,42,5,0,0,1,42,1,1,0,0,0,43,45,5,38,0,0,44,43,1,0,0,0,45,48,1,0,0,
	0,46,44,1,0,0,0,46,47,1,0,0,0,47,50,1,0,0,0,48,46,1,0,0,0,49,51,3,4,2,0,
	50,49,1,0,0,0,50,51,1,0,0,0,51,52,1,0,0,0,52,53,3,6,3,0,53,57,3,12,6,0,
	54,56,5,38,0,0,55,54,1,0,0,0,56,59,1,0,0,0,57,55,1,0,0,0,57,58,1,0,0,0,
	58,3,1,0,0,0,59,57,1,0,0,0,60,62,7,0,0,0,61,60,1,0,0,0,62,63,1,0,0,0,63,
	61,1,0,0,0,63,64,1,0,0,0,64,65,1,0,0,0,65,66,5,1,0,0,66,67,5,38,0,0,67,
	5,1,0,0,0,68,69,3,8,4,0,69,70,5,38,0,0,70,72,1,0,0,0,71,68,1,0,0,0,72,75,
	1,0,0,0,73,71,1,0,0,0,73,74,1,0,0,0,74,7,1,0,0,0,75,73,1,0,0,0,76,77,3,
	34,17,0,77,78,5,1,0,0,78,79,3,10,5,0,79,9,1,0,0,0,80,83,3,16,8,0,81,83,
	3,20,10,0,82,80,1,0,0,0,82,81,1,0,0,0,83,11,1,0,0,0,84,85,5,2,0,0,85,86,
	3,10,5,0,86,13,1,0,0,0,87,88,5,34,0,0,88,89,3,24,12,0,89,90,7,1,0,0,90,
	91,3,10,5,0,91,15,1,0,0,0,92,93,3,24,12,0,93,94,5,1,0,0,94,95,3,10,5,0,
	95,17,1,0,0,0,96,97,5,35,0,0,97,98,3,24,12,0,98,99,7,1,0,0,99,100,3,10,
	5,0,100,19,1,0,0,0,101,102,6,10,-1,0,102,120,3,22,11,0,103,120,3,30,15,
	0,104,120,3,32,16,0,105,106,5,7,0,0,106,107,3,20,10,11,107,108,6,10,-1,
	0,108,120,1,0,0,0,109,110,5,17,0,0,110,111,3,20,10,7,111,112,6,10,-1,0,
	112,120,1,0,0,0,113,114,3,14,7,0,114,115,6,10,-1,0,115,120,1,0,0,0,116,
	117,3,18,9,0,117,118,6,10,-1,0,118,120,1,0,0,0,119,101,1,0,0,0,119,103,
	1,0,0,0,119,104,1,0,0,0,119,105,1,0,0,0,119,109,1,0,0,0,119,113,1,0,0,0,
	119,116,1,0,0,0,120,172,1,0,0,0,121,122,10,14,0,0,122,123,3,20,10,15,123,
	124,6,10,-1,0,124,171,1,0,0,0,125,126,10,13,0,0,126,127,5,5,0,0,127,128,
	3,20,10,13,128,129,6,10,-1,0,129,171,1,0,0,0,130,131,10,12,0,0,131,132,
	5,6,0,0,132,133,3,20,10,12,133,134,6,10,-1,0,134,171,1,0,0,0,135,136,10,
	10,0,0,136,137,7,2,0,0,137,138,3,20,10,11,138,139,6,10,-1,0,139,171,1,0,
	0,0,140,141,10,9,0,0,141,142,7,3,0,0,142,143,3,20,10,10,143,144,6,10,-1,
	0,144,171,1,0,0,0,145,146,10,8,0,0,146,147,7,4,0,0,147,148,3,20,10,9,148,
	149,6,10,-1,0,149,171,1,0,0,0,150,151,10,6,0,0,151,152,7,5,0,0,152,153,
	3,20,10,7,153,154,6,10,-1,0,154,171,1,0,0,0,155,156,10,5,0,0,156,157,5,
	20,0,0,157,158,3,20,10,6,158,159,6,10,-1,0,159,171,1,0,0,0,160,161,10,4,
	0,0,161,162,7,6,0,0,162,163,3,20,10,4,163,164,6,10,-1,0,164,171,1,0,0,0,
	165,166,10,3,0,0,166,167,5,23,0,0,167,168,3,20,10,4,168,169,6,10,-1,0,169,
	171,1,0,0,0,170,121,1,0,0,0,170,125,1,0,0,0,170,130,1,0,0,0,170,135,1,0,
	0,0,170,140,1,0,0,0,170,145,1,0,0,0,170,150,1,0,0,0,170,155,1,0,0,0,170,
	160,1,0,0,0,170,165,1,0,0,0,171,174,1,0,0,0,172,170,1,0,0,0,172,173,1,0,
	0,0,173,21,1,0,0,0,174,172,1,0,0,0,175,192,5,33,0,0,176,192,5,30,0,0,177,
	178,5,24,0,0,178,179,3,10,5,0,179,180,5,25,0,0,180,192,1,0,0,0,181,182,
	5,24,0,0,182,185,3,10,5,0,183,184,5,3,0,0,184,186,3,10,5,0,185,183,1,0,
	0,0,186,187,1,0,0,0,187,185,1,0,0,0,187,188,1,0,0,0,188,189,1,0,0,0,189,
	190,5,25,0,0,190,192,1,0,0,0,191,175,1,0,0,0,191,176,1,0,0,0,191,177,1,
	0,0,0,191,181,1,0,0,0,192,23,1,0,0,0,193,195,3,26,13,0,194,193,1,0,0,0,
	195,196,1,0,0,0,196,194,1,0,0,0,196,197,1,0,0,0,197,25,1,0,0,0,198,203,
	3,34,17,0,199,203,3,28,14,0,200,203,3,30,15,0,201,203,3,32,16,0,202,198,
	1,0,0,0,202,199,1,0,0,0,202,200,1,0,0,0,202,201,1,0,0,0,203,27,1,0,0,0,
	204,205,5,24,0,0,205,206,3,34,17,0,206,207,5,1,0,0,207,208,3,10,5,0,208,
	209,5,25,0,0,209,29,1,0,0,0,210,211,5,26,0,0,211,214,3,34,17,0,212,213,
	5,1,0,0,213,215,3,10,5,0,214,212,1,0,0,0,214,215,1,0,0,0,215,216,1,0,0,
	0,216,217,5,27,0,0,217,31,1,0,0,0,218,222,5,28,0,0,219,220,3,34,17,0,220,
	221,5,1,0,0,221,223,1,0,0,0,222,219,1,0,0,0,222,223,1,0,0,0,223,224,1,0,
	0,0,224,225,3,10,5,0,225,226,5,29,0,0,226,33,1,0,0,0,227,229,5,33,0,0,228,
	227,1,0,0,0,229,230,1,0,0,0,230,228,1,0,0,0,230,231,1,0,0,0,231,35,1,0,
	0,0,17,39,46,50,57,63,73,82,119,170,172,187,191,196,202,214,222,230];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!Lean4ExprParser.__ATN) {
			Lean4ExprParser.__ATN = new ATNDeserializer().deserialize(Lean4ExprParser._serializedATN);
		}

		return Lean4ExprParser.__ATN;
	}


	static DecisionsToDFA = Lean4ExprParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class StartContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(Lean4ExprParser.EOF, 0);
	}
	public goal_list(): GoalContext[] {
		return this.getTypedRuleContexts(GoalContext) as GoalContext[];
	}
	public goal(i: number): GoalContext {
		return this.getTypedRuleContext(GoalContext, i) as GoalContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_start;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitStart) {
			return visitor.visitStart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GoalContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public vars(): VarsContext {
		return this.getTypedRuleContext(VarsContext, 0) as VarsContext;
	}
	public target(): TargetContext {
		return this.getTypedRuleContext(TargetContext, 0) as TargetContext;
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(Lean4ExprParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(Lean4ExprParser.NEWLINE, i);
	}
	public tag(): TagContext {
		return this.getTypedRuleContext(TagContext, 0) as TagContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_goal;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitGoal) {
			return visitor.visitGoal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TagContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(Lean4ExprParser.NEWLINE, 0);
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(Lean4ExprParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(Lean4ExprParser.ID, i);
	}
	public LITERAL_list(): TerminalNode[] {
	    	return this.getTokens(Lean4ExprParser.LITERAL);
	}
	public LITERAL(i: number): TerminalNode {
		return this.getToken(Lean4ExprParser.LITERAL, i);
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_tag;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitTag) {
			return visitor.visitTag(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarsContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public var__list(): VarContext[] {
		return this.getTypedRuleContexts(VarContext) as VarContext[];
	}
	public var_(i: number): VarContext {
		return this.getTypedRuleContext(VarContext, i) as VarContext;
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(Lean4ExprParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(Lean4ExprParser.NEWLINE, i);
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_vars;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitVars) {
			return visitor.visitVars(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifiers(): IdentifiersContext {
		return this.getTypedRuleContext(IdentifiersContext, 0) as IdentifiersContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_var;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitVar) {
			return visitor.visitVar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public funcExpr(): FuncExprContext {
		return this.getTypedRuleContext(FuncExprContext, 0) as FuncExprContext;
	}
	public opType(): OpTypeContext {
		return this.getTypedRuleContext(OpTypeContext, 0) as OpTypeContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_expr;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitExpr) {
			return visitor.visitExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TargetContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_target;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitTarget) {
			return visitor.visitTarget(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForallExprContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FORALL(): TerminalNode {
		return this.getToken(Lean4ExprParser.FORALL, 0);
	}
	public binders(): BindersContext {
		return this.getTypedRuleContext(BindersContext, 0) as BindersContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_forallExpr;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitForallExpr) {
			return visitor.visitForallExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FuncExprContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public binders(): BindersContext {
		return this.getTypedRuleContext(BindersContext, 0) as BindersContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_funcExpr;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitFuncExpr) {
			return visitor.visitFuncExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExistsExprContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EXISTS(): TerminalNode {
		return this.getToken(Lean4ExprParser.EXISTS, 0);
	}
	public binders(): BindersContext {
		return this.getTypedRuleContext(BindersContext, 0) as BindersContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_existsExpr;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitExistsExpr) {
			return visitor.visitExistsExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OpTypeContext extends ParserRuleContext {
	public precedence: number | undefined;
	public assoc: "left" | "right" | "none" | undefined;
	public _op!: Token;
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public atomType(): AtomTypeContext {
		return this.getTypedRuleContext(AtomTypeContext, 0) as AtomTypeContext;
	}
	public implicitBinder(): ImplicitBinderContext {
		return this.getTypedRuleContext(ImplicitBinderContext, 0) as ImplicitBinderContext;
	}
	public instanceBinder(): InstanceBinderContext {
		return this.getTypedRuleContext(InstanceBinderContext, 0) as InstanceBinderContext;
	}
	public opType_list(): OpTypeContext[] {
		return this.getTypedRuleContexts(OpTypeContext) as OpTypeContext[];
	}
	public opType(i: number): OpTypeContext {
		return this.getTypedRuleContext(OpTypeContext, i) as OpTypeContext;
	}
	public forallExpr(): ForallExprContext {
		return this.getTypedRuleContext(ForallExprContext, 0) as ForallExprContext;
	}
	public existsExpr(): ExistsExprContext {
		return this.getTypedRuleContext(ExistsExprContext, 0) as ExistsExprContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_opType;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitOpType) {
			return visitor.visitOpType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AtomTypeContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_atomType;
	}
	public override copyFrom(ctx: AtomTypeContext): void {
		super.copyFrom(ctx);
	}
}
export class IdentifierContext extends AtomTypeContext {
	constructor(parser: Lean4ExprParser, ctx: AtomTypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ID(): TerminalNode {
		return this.getToken(Lean4ExprParser.ID, 0);
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LiteralContext extends AtomTypeContext {
	constructor(parser: Lean4ExprParser, ctx: AtomTypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LITERAL(): TerminalNode {
		return this.getToken(Lean4ExprParser.LITERAL, 0);
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenExprContext extends AtomTypeContext {
	constructor(parser: Lean4ExprParser, ctx: AtomTypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitParenExpr) {
			return visitor.visitParenExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TupleContext extends AtomTypeContext {
	constructor(parser: Lean4ExprParser, ctx: AtomTypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitTuple) {
			return visitor.visitTuple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BindersContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public binder_list(): BinderContext[] {
		return this.getTypedRuleContexts(BinderContext) as BinderContext[];
	}
	public binder(i: number): BinderContext {
		return this.getTypedRuleContext(BinderContext, i) as BinderContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_binders;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitBinders) {
			return visitor.visitBinders(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BinderContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_binder;
	}
	public override copyFrom(ctx: BinderContext): void {
		super.copyFrom(ctx);
	}
}
export class ImplicitBinderItemContext extends BinderContext {
	constructor(parser: Lean4ExprParser, ctx: BinderContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public implicitBinder(): ImplicitBinderContext {
		return this.getTypedRuleContext(ImplicitBinderContext, 0) as ImplicitBinderContext;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitImplicitBinderItem) {
			return visitor.visitImplicitBinderItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InstanceBinderItemContext extends BinderContext {
	constructor(parser: Lean4ExprParser, ctx: BinderContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public instanceBinder(): InstanceBinderContext {
		return this.getTypedRuleContext(InstanceBinderContext, 0) as InstanceBinderContext;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitInstanceBinderItem) {
			return visitor.visitInstanceBinderItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SimpleBinderItemContext extends BinderContext {
	constructor(parser: Lean4ExprParser, ctx: BinderContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public identifiers(): IdentifiersContext {
		return this.getTypedRuleContext(IdentifiersContext, 0) as IdentifiersContext;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitSimpleBinderItem) {
			return visitor.visitSimpleBinderItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExplicitBinderItemContext extends BinderContext {
	constructor(parser: Lean4ExprParser, ctx: BinderContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public explicitBinder(): ExplicitBinderContext {
		return this.getTypedRuleContext(ExplicitBinderContext, 0) as ExplicitBinderContext;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitExplicitBinderItem) {
			return visitor.visitExplicitBinderItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExplicitBinderContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifiers(): IdentifiersContext {
		return this.getTypedRuleContext(IdentifiersContext, 0) as IdentifiersContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_explicitBinder;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitExplicitBinder) {
			return visitor.visitExplicitBinder(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImplicitBinderContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifiers(): IdentifiersContext {
		return this.getTypedRuleContext(IdentifiersContext, 0) as IdentifiersContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_implicitBinder;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitImplicitBinder) {
			return visitor.visitImplicitBinder(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InstanceBinderContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public identifiers(): IdentifiersContext {
		return this.getTypedRuleContext(IdentifiersContext, 0) as IdentifiersContext;
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_instanceBinder;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitInstanceBinder) {
			return visitor.visitInstanceBinder(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifiersContext extends ParserRuleContext {
	constructor(parser?: Lean4ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(Lean4ExprParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(Lean4ExprParser.ID, i);
	}
    public get ruleIndex(): number {
    	return Lean4ExprParser.RULE_identifiers;
	}
	// @Override
	public accept<Result>(visitor: Lean4ExprVisitor<Result>): Result {
		if (visitor.visitIdentifiers) {
			return visitor.visitIdentifiers(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
