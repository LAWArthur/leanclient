// Generated from e:/Projects/Rete/leanclient/src/backend/ast/Lean4Expr.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Lean4ExprParser extends antlr.Parser {
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
    public static readonly LITERAL = 15;
    public static readonly INTEGER = 16;
    public static readonly FLOAT = 17;
    public static readonly ID = 18;
    public static readonly ARROW = 19;
    public static readonly FORALL = 20;
    public static readonly EXISTS = 21;
    public static readonly LAMBDA = 22;
    public static readonly WS = 23;
    public static readonly NEWLINE = 24;
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
    public static readonly RULE_appType = 11;
    public static readonly RULE_atomType = 12;
    public static readonly RULE_implicitBinderExpr = 13;
    public static readonly RULE_instanceBinderExpr = 14;
    public static readonly RULE_tupleType = 15;
    public static readonly RULE_field = 16;
    public static readonly RULE_binders = 17;
    public static readonly RULE_binder = 18;
    public static readonly RULE_explicitBinder = 19;
    public static readonly RULE_implicitBinder = 20;
    public static readonly RULE_instanceBinder = 21;
    public static readonly RULE_identifiers = 22;

    public static readonly literalNames = [
        null, "':'", "'\\u9239\\uFFFD'", "','", "'.'", "'*'", "'/'", "'+'", 
        "'-'", "'('", "')'", "'{'", "'}'", "'['", "']'", null, null, null, 
        null, null, "'\\u2200'", "'\\u2203'", "'\\u03BB'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, "LITERAL", "INTEGER", "FLOAT", "ID", "ARROW", 
        "FORALL", "EXISTS", "LAMBDA", "WS", "NEWLINE"
    ];
    public static readonly ruleNames = [
        "start", "goal", "tag", "vars", "var", "expr", "target", "forallExpr", 
        "funcExpr", "existsExpr", "opType", "appType", "atomType", "implicitBinderExpr", 
        "instanceBinderExpr", "tupleType", "field", "binders", "binder", 
        "explicitBinder", "implicitBinder", "instanceBinder", "identifiers",
    ];

    public get grammarFileName(): string { return "Lean4Expr.g4"; }
    public get literalNames(): (string | null)[] { return Lean4ExprParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Lean4ExprParser.symbolicNames; }
    public get ruleNames(): string[] { return Lean4ExprParser.ruleNames; }
    public get serializedATN(): number[] { return Lean4ExprParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Lean4ExprParser._ATN, Lean4ExprParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public start(): StartContext {
        let localContext = new StartContext(this.context, this.state);
        this.enterRule(localContext, 0, Lean4ExprParser.RULE_start);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 47;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 46;
                this.goal();
                }
                }
                this.state = 49;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 15 || _la === 18);
            this.state = 51;
            this.match(Lean4ExprParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public goal(): GoalContext {
        let localContext = new GoalContext(this.context, this.state);
        this.enterRule(localContext, 2, Lean4ExprParser.RULE_goal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 54;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                {
                this.state = 53;
                this.tag();
                }
                break;
            }
            this.state = 56;
            this.vars();
            this.state = 57;
            this.target();
            this.state = 59;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 24) {
                {
                this.state = 58;
                this.match(Lean4ExprParser.NEWLINE);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tag(): TagContext {
        let localContext = new TagContext(this.context, this.state);
        this.enterRule(localContext, 4, Lean4ExprParser.RULE_tag);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 62;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 61;
                _la = this.tokenStream.LA(1);
                if(!(_la === 15 || _la === 18)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                }
                this.state = 64;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 15 || _la === 18);
            this.state = 66;
            this.match(Lean4ExprParser.T__0);
            this.state = 67;
            this.match(Lean4ExprParser.NEWLINE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public vars(): VarsContext {
        let localContext = new VarsContext(this.context, this.state);
        this.enterRule(localContext, 6, Lean4ExprParser.RULE_vars);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 72;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 69;
                this.var_();
                this.state = 70;
                this.match(Lean4ExprParser.NEWLINE);
                }
                }
                this.state = 74;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 18);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public var_(): VarContext {
        let localContext = new VarContext(this.context, this.state);
        this.enterRule(localContext, 8, Lean4ExprParser.RULE_var);
        try {
            this.enterOuterAlt(localContext, 1);
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr(): ExprContext {
        let localContext = new ExprContext(this.context, this.state);
        this.enterRule(localContext, 10, Lean4ExprParser.RULE_expr);
        try {
            this.state = 84;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 80;
                this.forallExpr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 81;
                this.existsExpr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 82;
                this.funcExpr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 83;
                this.opType(0);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public target(): TargetContext {
        let localContext = new TargetContext(this.context, this.state);
        this.enterRule(localContext, 12, Lean4ExprParser.RULE_target);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 86;
            this.match(Lean4ExprParser.T__1);
            this.state = 87;
            this.expr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public forallExpr(): ForallExprContext {
        let localContext = new ForallExprContext(this.context, this.state);
        this.enterRule(localContext, 14, Lean4ExprParser.RULE_forallExpr);
        let _la: number;
        try {
            localContext = new ForallContext(localContext);
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 89;
            this.match(Lean4ExprParser.FORALL);
            this.state = 90;
            this.binders();
            this.state = 91;
            _la = this.tokenStream.LA(1);
            if(!(_la === 3 || _la === 4)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 92;
            this.expr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public funcExpr(): FuncExprContext {
        let localContext = new FuncExprContext(this.context, this.state);
        this.enterRule(localContext, 16, Lean4ExprParser.RULE_funcExpr);
        try {
            localContext = new FunctionParamContext(localContext);
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 94;
            this.binders();
            this.state = 95;
            this.match(Lean4ExprParser.T__0);
            this.state = 96;
            this.expr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public existsExpr(): ExistsExprContext {
        let localContext = new ExistsExprContext(this.context, this.state);
        this.enterRule(localContext, 18, Lean4ExprParser.RULE_existsExpr);
        let _la: number;
        try {
            localContext = new ExistsContext(localContext);
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 98;
            this.match(Lean4ExprParser.EXISTS);
            this.state = 99;
            this.binders();
            this.state = 100;
            _la = this.tokenStream.LA(1);
            if(!(_la === 3 || _la === 4)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 101;
            this.expr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public opType(): OpTypeContext;
    public opType(_p: number): OpTypeContext;
    public opType(_p?: number): OpTypeContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new OpTypeContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 20;
        this.enterRecursionRule(localContext, 20, Lean4ExprParser.RULE_opType, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 107;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Lean4ExprParser.T__8:
            case Lean4ExprParser.T__10:
            case Lean4ExprParser.T__12:
            case Lean4ExprParser.LITERAL:
            case Lean4ExprParser.ID:
                {
                this.state = 104;
                this.appType(0);
                }
                break;
            case Lean4ExprParser.FORALL:
                {
                this.state = 105;
                this.forallExpr();
                }
                break;
            case Lean4ExprParser.EXISTS:
                {
                this.state = 106;
                this.existsExpr();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 120;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 118;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
                    case 1:
                        {
                        localContext = new OpTypeContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Lean4ExprParser.RULE_opType);
                        this.state = 109;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 110;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 5 || _la === 6)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 111;
                        this.opType(6);
                        }
                        break;
                    case 2:
                        {
                        localContext = new OpTypeContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Lean4ExprParser.RULE_opType);
                        this.state = 112;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 113;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 7 || _la === 8)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 114;
                        this.opType(5);
                        }
                        break;
                    case 3:
                        {
                        localContext = new OpTypeContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, Lean4ExprParser.RULE_opType);
                        this.state = 115;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 116;
                        this.match(Lean4ExprParser.ARROW);
                        this.state = 117;
                        this.opType(3);
                        }
                        break;
                    }
                    }
                }
                this.state = 122;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public appType(): AppTypeContext;
    public appType(_p: number): AppTypeContext;
    public appType(_p?: number): AppTypeContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new AppTypeContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 22;
        this.enterRecursionRule(localContext, 22, Lean4ExprParser.RULE_appType, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            localContext = new AtomTypeOnlyContext(localContext);
            this.context = localContext;
            previousContext = localContext;

            this.state = 124;
            this.atomType();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 130;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new TypeApplicationContext(new AppTypeContext(parentContext, parentState));
                    this.pushNewRecursionContext(localContext, _startState, Lean4ExprParser.RULE_appType);
                    this.state = 126;
                    if (!(this.precpred(this.context, 2))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 127;
                    this.atomType();
                    }
                    }
                }
                this.state = 132;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public atomType(): AtomTypeContext {
        let localContext = new AtomTypeContext(this.context, this.state);
        this.enterRule(localContext, 24, Lean4ExprParser.RULE_atomType);
        try {
            this.state = 142;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                localContext = new IdentifierContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 133;
                this.match(Lean4ExprParser.ID);
                }
                break;
            case 2:
                localContext = new LiteralContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 134;
                this.match(Lean4ExprParser.LITERAL);
                }
                break;
            case 3:
                localContext = new ParenExprContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 135;
                this.match(Lean4ExprParser.T__8);
                this.state = 136;
                this.expr();
                this.state = 137;
                this.match(Lean4ExprParser.T__9);
                }
                break;
            case 4:
                localContext = new TupleContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 139;
                this.tupleType();
                }
                break;
            case 5:
                localContext = new ImplicitBinderTypeContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 140;
                this.implicitBinderExpr();
                }
                break;
            case 6:
                localContext = new InstanceBinderTypeContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 141;
                this.instanceBinderExpr();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public implicitBinderExpr(): ImplicitBinderExprContext {
        let localContext = new ImplicitBinderExprContext(this.context, this.state);
        this.enterRule(localContext, 26, Lean4ExprParser.RULE_implicitBinderExpr);
        try {
            this.state = 149;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                localContext = new ImplicitBinderArrowContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 144;
                this.implicitBinder();
                this.state = 145;
                this.match(Lean4ExprParser.ARROW);
                this.state = 146;
                this.expr();
                }
                break;
            case 2:
                localContext = new ImplicitBinderOnlyContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 148;
                this.implicitBinder();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public instanceBinderExpr(): InstanceBinderExprContext {
        let localContext = new InstanceBinderExprContext(this.context, this.state);
        this.enterRule(localContext, 28, Lean4ExprParser.RULE_instanceBinderExpr);
        try {
            this.state = 156;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
            case 1:
                localContext = new InstanceBinderArrowContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 151;
                this.instanceBinder();
                this.state = 152;
                this.match(Lean4ExprParser.ARROW);
                this.state = 153;
                this.expr();
                }
                break;
            case 2:
                localContext = new InstanceBinderOnlyContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 155;
                this.instanceBinder();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tupleType(): TupleTypeContext {
        let localContext = new TupleTypeContext(this.context, this.state);
        this.enterRule(localContext, 30, Lean4ExprParser.RULE_tupleType);
        let _la: number;
        try {
            localContext = new ActualTupleContext(localContext);
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 158;
            this.match(Lean4ExprParser.T__8);
            this.state = 159;
            this.expr();
            this.state = 162;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 160;
                this.match(Lean4ExprParser.T__2);
                this.state = 161;
                this.expr();
                }
                }
                this.state = 164;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 3);
            this.state = 166;
            this.match(Lean4ExprParser.T__9);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public field(): FieldContext {
        let localContext = new FieldContext(this.context, this.state);
        this.enterRule(localContext, 32, Lean4ExprParser.RULE_field);
        try {
            localContext = new FieldDeclContext(localContext);
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 168;
            this.match(Lean4ExprParser.ID);
            this.state = 169;
            this.match(Lean4ExprParser.T__0);
            this.state = 170;
            this.expr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public binders(): BindersContext {
        let localContext = new BindersContext(this.context, this.state);
        this.enterRule(localContext, 34, Lean4ExprParser.RULE_binders);
        let _la: number;
        try {
            localContext = new BinderListContext(localContext);
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 173;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 172;
                this.binder();
                }
                }
                this.state = 175;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 272896) !== 0));
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public binder(): BinderContext {
        let localContext = new BinderContext(this.context, this.state);
        this.enterRule(localContext, 36, Lean4ExprParser.RULE_binder);
        try {
            this.state = 181;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Lean4ExprParser.ID:
                localContext = new SimpleBinderContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 177;
                this.identifiers();
                }
                break;
            case Lean4ExprParser.T__8:
                localContext = new ExplicitBinderItemContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 178;
                this.explicitBinder();
                }
                break;
            case Lean4ExprParser.T__10:
                localContext = new ImplicitBinderItemContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 179;
                this.implicitBinder();
                }
                break;
            case Lean4ExprParser.T__12:
                localContext = new InstanceBinderItemContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 180;
                this.instanceBinder();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public explicitBinder(): ExplicitBinderContext {
        let localContext = new ExplicitBinderContext(this.context, this.state);
        this.enterRule(localContext, 38, Lean4ExprParser.RULE_explicitBinder);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 183;
            this.match(Lean4ExprParser.T__8);
            this.state = 184;
            this.identifiers();
            this.state = 185;
            this.match(Lean4ExprParser.T__0);
            this.state = 186;
            this.expr();
            this.state = 187;
            this.match(Lean4ExprParser.T__9);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public implicitBinder(): ImplicitBinderContext {
        let localContext = new ImplicitBinderContext(this.context, this.state);
        this.enterRule(localContext, 40, Lean4ExprParser.RULE_implicitBinder);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 189;
            this.match(Lean4ExprParser.T__10);
            this.state = 190;
            this.identifiers();
            this.state = 193;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 191;
                this.match(Lean4ExprParser.T__0);
                this.state = 192;
                this.expr();
                }
            }

            this.state = 195;
            this.match(Lean4ExprParser.T__11);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public instanceBinder(): InstanceBinderContext {
        let localContext = new InstanceBinderContext(this.context, this.state);
        this.enterRule(localContext, 42, Lean4ExprParser.RULE_instanceBinder);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 197;
            this.match(Lean4ExprParser.T__12);
            this.state = 201;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                {
                this.state = 198;
                this.identifiers();
                this.state = 199;
                this.match(Lean4ExprParser.T__0);
                }
                break;
            }
            this.state = 203;
            this.expr();
            this.state = 204;
            this.match(Lean4ExprParser.T__13);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public identifiers(): IdentifiersContext {
        let localContext = new IdentifiersContext(this.context, this.state);
        this.enterRule(localContext, 44, Lean4ExprParser.RULE_identifiers);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 207;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 206;
                    this.match(Lean4ExprParser.ID);
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 209;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 18, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 10:
            return this.opType_sempred(localContext as OpTypeContext, predIndex);
        case 11:
            return this.appType_sempred(localContext as AppTypeContext, predIndex);
        }
        return true;
    }
    private opType_sempred(localContext: OpTypeContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 5);
        case 1:
            return this.precpred(this.context, 4);
        case 2:
            return this.precpred(this.context, 3);
        }
        return true;
    }
    private appType_sempred(localContext: AppTypeContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 3:
            return this.precpred(this.context, 2);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,24,212,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,1,0,4,0,48,8,0,11,0,12,0,49,1,0,1,0,1,1,
        3,1,55,8,1,1,1,1,1,1,1,3,1,60,8,1,1,2,4,2,63,8,2,11,2,12,2,64,1,
        2,1,2,1,2,1,3,1,3,1,3,4,3,73,8,3,11,3,12,3,74,1,4,1,4,1,4,1,4,1,
        5,1,5,1,5,1,5,3,5,85,8,5,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,8,1,8,
        1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,3,10,108,8,10,1,
        10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,5,10,119,8,10,10,10,12,
        10,122,9,10,1,11,1,11,1,11,1,11,1,11,5,11,129,8,11,10,11,12,11,132,
        9,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,3,12,143,8,12,
        1,13,1,13,1,13,1,13,1,13,3,13,150,8,13,1,14,1,14,1,14,1,14,1,14,
        3,14,157,8,14,1,15,1,15,1,15,1,15,4,15,163,8,15,11,15,12,15,164,
        1,15,1,15,1,16,1,16,1,16,1,16,1,17,4,17,174,8,17,11,17,12,17,175,
        1,18,1,18,1,18,1,18,3,18,182,8,18,1,19,1,19,1,19,1,19,1,19,1,19,
        1,20,1,20,1,20,1,20,3,20,194,8,20,1,20,1,20,1,21,1,21,1,21,1,21,
        3,21,202,8,21,1,21,1,21,1,21,1,22,4,22,208,8,22,11,22,12,22,209,
        1,22,0,2,20,22,23,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,
        34,36,38,40,42,44,0,4,2,0,15,15,18,18,1,0,3,4,1,0,5,6,1,0,7,8,217,
        0,47,1,0,0,0,2,54,1,0,0,0,4,62,1,0,0,0,6,72,1,0,0,0,8,76,1,0,0,0,
        10,84,1,0,0,0,12,86,1,0,0,0,14,89,1,0,0,0,16,94,1,0,0,0,18,98,1,
        0,0,0,20,107,1,0,0,0,22,123,1,0,0,0,24,142,1,0,0,0,26,149,1,0,0,
        0,28,156,1,0,0,0,30,158,1,0,0,0,32,168,1,0,0,0,34,173,1,0,0,0,36,
        181,1,0,0,0,38,183,1,0,0,0,40,189,1,0,0,0,42,197,1,0,0,0,44,207,
        1,0,0,0,46,48,3,2,1,0,47,46,1,0,0,0,48,49,1,0,0,0,49,47,1,0,0,0,
        49,50,1,0,0,0,50,51,1,0,0,0,51,52,5,0,0,1,52,1,1,0,0,0,53,55,3,4,
        2,0,54,53,1,0,0,0,54,55,1,0,0,0,55,56,1,0,0,0,56,57,3,6,3,0,57,59,
        3,12,6,0,58,60,5,24,0,0,59,58,1,0,0,0,59,60,1,0,0,0,60,3,1,0,0,0,
        61,63,7,0,0,0,62,61,1,0,0,0,63,64,1,0,0,0,64,62,1,0,0,0,64,65,1,
        0,0,0,65,66,1,0,0,0,66,67,5,1,0,0,67,68,5,24,0,0,68,5,1,0,0,0,69,
        70,3,8,4,0,70,71,5,24,0,0,71,73,1,0,0,0,72,69,1,0,0,0,73,74,1,0,
        0,0,74,72,1,0,0,0,74,75,1,0,0,0,75,7,1,0,0,0,76,77,3,44,22,0,77,
        78,5,1,0,0,78,79,3,10,5,0,79,9,1,0,0,0,80,85,3,14,7,0,81,85,3,18,
        9,0,82,85,3,16,8,0,83,85,3,20,10,0,84,80,1,0,0,0,84,81,1,0,0,0,84,
        82,1,0,0,0,84,83,1,0,0,0,85,11,1,0,0,0,86,87,5,2,0,0,87,88,3,10,
        5,0,88,13,1,0,0,0,89,90,5,20,0,0,90,91,3,34,17,0,91,92,7,1,0,0,92,
        93,3,10,5,0,93,15,1,0,0,0,94,95,3,34,17,0,95,96,5,1,0,0,96,97,3,
        10,5,0,97,17,1,0,0,0,98,99,5,21,0,0,99,100,3,34,17,0,100,101,7,1,
        0,0,101,102,3,10,5,0,102,19,1,0,0,0,103,104,6,10,-1,0,104,108,3,
        22,11,0,105,108,3,14,7,0,106,108,3,18,9,0,107,103,1,0,0,0,107,105,
        1,0,0,0,107,106,1,0,0,0,108,120,1,0,0,0,109,110,10,5,0,0,110,111,
        7,2,0,0,111,119,3,20,10,6,112,113,10,4,0,0,113,114,7,3,0,0,114,119,
        3,20,10,5,115,116,10,3,0,0,116,117,5,19,0,0,117,119,3,20,10,3,118,
        109,1,0,0,0,118,112,1,0,0,0,118,115,1,0,0,0,119,122,1,0,0,0,120,
        118,1,0,0,0,120,121,1,0,0,0,121,21,1,0,0,0,122,120,1,0,0,0,123,124,
        6,11,-1,0,124,125,3,24,12,0,125,130,1,0,0,0,126,127,10,2,0,0,127,
        129,3,24,12,0,128,126,1,0,0,0,129,132,1,0,0,0,130,128,1,0,0,0,130,
        131,1,0,0,0,131,23,1,0,0,0,132,130,1,0,0,0,133,143,5,18,0,0,134,
        143,5,15,0,0,135,136,5,9,0,0,136,137,3,10,5,0,137,138,5,10,0,0,138,
        143,1,0,0,0,139,143,3,30,15,0,140,143,3,26,13,0,141,143,3,28,14,
        0,142,133,1,0,0,0,142,134,1,0,0,0,142,135,1,0,0,0,142,139,1,0,0,
        0,142,140,1,0,0,0,142,141,1,0,0,0,143,25,1,0,0,0,144,145,3,40,20,
        0,145,146,5,19,0,0,146,147,3,10,5,0,147,150,1,0,0,0,148,150,3,40,
        20,0,149,144,1,0,0,0,149,148,1,0,0,0,150,27,1,0,0,0,151,152,3,42,
        21,0,152,153,5,19,0,0,153,154,3,10,5,0,154,157,1,0,0,0,155,157,3,
        42,21,0,156,151,1,0,0,0,156,155,1,0,0,0,157,29,1,0,0,0,158,159,5,
        9,0,0,159,162,3,10,5,0,160,161,5,3,0,0,161,163,3,10,5,0,162,160,
        1,0,0,0,163,164,1,0,0,0,164,162,1,0,0,0,164,165,1,0,0,0,165,166,
        1,0,0,0,166,167,5,10,0,0,167,31,1,0,0,0,168,169,5,18,0,0,169,170,
        5,1,0,0,170,171,3,10,5,0,171,33,1,0,0,0,172,174,3,36,18,0,173,172,
        1,0,0,0,174,175,1,0,0,0,175,173,1,0,0,0,175,176,1,0,0,0,176,35,1,
        0,0,0,177,182,3,44,22,0,178,182,3,38,19,0,179,182,3,40,20,0,180,
        182,3,42,21,0,181,177,1,0,0,0,181,178,1,0,0,0,181,179,1,0,0,0,181,
        180,1,0,0,0,182,37,1,0,0,0,183,184,5,9,0,0,184,185,3,44,22,0,185,
        186,5,1,0,0,186,187,3,10,5,0,187,188,5,10,0,0,188,39,1,0,0,0,189,
        190,5,11,0,0,190,193,3,44,22,0,191,192,5,1,0,0,192,194,3,10,5,0,
        193,191,1,0,0,0,193,194,1,0,0,0,194,195,1,0,0,0,195,196,5,12,0,0,
        196,41,1,0,0,0,197,201,5,13,0,0,198,199,3,44,22,0,199,200,5,1,0,
        0,200,202,1,0,0,0,201,198,1,0,0,0,201,202,1,0,0,0,202,203,1,0,0,
        0,203,204,3,10,5,0,204,205,5,14,0,0,205,43,1,0,0,0,206,208,5,18,
        0,0,207,206,1,0,0,0,208,209,1,0,0,0,209,207,1,0,0,0,209,210,1,0,
        0,0,210,45,1,0,0,0,19,49,54,59,64,74,84,107,118,120,130,142,149,
        156,164,175,181,193,201,209
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Lean4ExprParser.__ATN) {
            Lean4ExprParser.__ATN = new antlr.ATNDeserializer().deserialize(Lean4ExprParser._serializedATN);
        }

        return Lean4ExprParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Lean4ExprParser.literalNames, Lean4ExprParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Lean4ExprParser.vocabulary;
    }

    private static readonly decisionsToDFA = Lean4ExprParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class StartContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(Lean4ExprParser.EOF, 0)!;
    }
    public goal(): GoalContext[];
    public goal(i: number): GoalContext | null;
    public goal(i?: number): GoalContext[] | GoalContext | null {
        if (i === undefined) {
            return this.getRuleContexts(GoalContext);
        }

        return this.getRuleContext(i, GoalContext);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_start;
    }
}


export class GoalContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public vars(): VarsContext {
        return this.getRuleContext(0, VarsContext)!;
    }
    public target(): TargetContext {
        return this.getRuleContext(0, TargetContext)!;
    }
    public tag(): TagContext | null {
        return this.getRuleContext(0, TagContext);
    }
    public NEWLINE(): antlr.TerminalNode | null {
        return this.getToken(Lean4ExprParser.NEWLINE, 0);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_goal;
    }
}


export class TagContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NEWLINE(): antlr.TerminalNode {
        return this.getToken(Lean4ExprParser.NEWLINE, 0)!;
    }
    public ID(): antlr.TerminalNode[];
    public ID(i: number): antlr.TerminalNode | null;
    public ID(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Lean4ExprParser.ID);
    	} else {
    		return this.getToken(Lean4ExprParser.ID, i);
    	}
    }
    public LITERAL(): antlr.TerminalNode[];
    public LITERAL(i: number): antlr.TerminalNode | null;
    public LITERAL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Lean4ExprParser.LITERAL);
    	} else {
    		return this.getToken(Lean4ExprParser.LITERAL, i);
    	}
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_tag;
    }
}


export class VarsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public var_(): VarContext[];
    public var_(i: number): VarContext | null;
    public var_(i?: number): VarContext[] | VarContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VarContext);
        }

        return this.getRuleContext(i, VarContext);
    }
    public NEWLINE(): antlr.TerminalNode[];
    public NEWLINE(i: number): antlr.TerminalNode | null;
    public NEWLINE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Lean4ExprParser.NEWLINE);
    	} else {
    		return this.getToken(Lean4ExprParser.NEWLINE, i);
    	}
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_vars;
    }
}


export class VarContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifiers(): IdentifiersContext {
        return this.getRuleContext(0, IdentifiersContext)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_var;
    }
}


export class ExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public forallExpr(): ForallExprContext | null {
        return this.getRuleContext(0, ForallExprContext);
    }
    public existsExpr(): ExistsExprContext | null {
        return this.getRuleContext(0, ExistsExprContext);
    }
    public funcExpr(): FuncExprContext | null {
        return this.getRuleContext(0, FuncExprContext);
    }
    public opType(): OpTypeContext | null {
        return this.getRuleContext(0, OpTypeContext);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_expr;
    }
}


export class TargetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_target;
    }
}


export class ForallExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_forallExpr;
    }
    public override copyFrom(ctx: ForallExprContext): void {
        super.copyFrom(ctx);
    }
}
export class ForallContext extends ForallExprContext {
    public constructor(ctx: ForallExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public FORALL(): antlr.TerminalNode {
        return this.getToken(Lean4ExprParser.FORALL, 0)!;
    }
    public binders(): BindersContext {
        return this.getRuleContext(0, BindersContext)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
}


export class FuncExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_funcExpr;
    }
    public override copyFrom(ctx: FuncExprContext): void {
        super.copyFrom(ctx);
    }
}
export class FunctionParamContext extends FuncExprContext {
    public constructor(ctx: FuncExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public binders(): BindersContext {
        return this.getRuleContext(0, BindersContext)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
}


export class ExistsExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_existsExpr;
    }
    public override copyFrom(ctx: ExistsExprContext): void {
        super.copyFrom(ctx);
    }
}
export class ExistsContext extends ExistsExprContext {
    public constructor(ctx: ExistsExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public EXISTS(): antlr.TerminalNode {
        return this.getToken(Lean4ExprParser.EXISTS, 0)!;
    }
    public binders(): BindersContext {
        return this.getRuleContext(0, BindersContext)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
}


export class OpTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public appType(): AppTypeContext | null {
        return this.getRuleContext(0, AppTypeContext);
    }
    public forallExpr(): ForallExprContext | null {
        return this.getRuleContext(0, ForallExprContext);
    }
    public existsExpr(): ExistsExprContext | null {
        return this.getRuleContext(0, ExistsExprContext);
    }
    public opType(): OpTypeContext[];
    public opType(i: number): OpTypeContext | null;
    public opType(i?: number): OpTypeContext[] | OpTypeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OpTypeContext);
        }

        return this.getRuleContext(i, OpTypeContext);
    }
    public ARROW(): antlr.TerminalNode | null {
        return this.getToken(Lean4ExprParser.ARROW, 0);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_opType;
    }
}


export class AppTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_appType;
    }
    public override copyFrom(ctx: AppTypeContext): void {
        super.copyFrom(ctx);
    }
}
export class AtomTypeOnlyContext extends AppTypeContext {
    public constructor(ctx: AppTypeContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public atomType(): AtomTypeContext {
        return this.getRuleContext(0, AtomTypeContext)!;
    }
}
export class TypeApplicationContext extends AppTypeContext {
    public constructor(ctx: AppTypeContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public appType(): AppTypeContext {
        return this.getRuleContext(0, AppTypeContext)!;
    }
    public atomType(): AtomTypeContext {
        return this.getRuleContext(0, AtomTypeContext)!;
    }
}


export class AtomTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_atomType;
    }
    public override copyFrom(ctx: AtomTypeContext): void {
        super.copyFrom(ctx);
    }
}
export class ImplicitBinderTypeContext extends AtomTypeContext {
    public constructor(ctx: AtomTypeContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public implicitBinderExpr(): ImplicitBinderExprContext {
        return this.getRuleContext(0, ImplicitBinderExprContext)!;
    }
}
export class IdentifierContext extends AtomTypeContext {
    public constructor(ctx: AtomTypeContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(Lean4ExprParser.ID, 0)!;
    }
}
export class LiteralContext extends AtomTypeContext {
    public constructor(ctx: AtomTypeContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LITERAL(): antlr.TerminalNode {
        return this.getToken(Lean4ExprParser.LITERAL, 0)!;
    }
}
export class ParenExprContext extends AtomTypeContext {
    public constructor(ctx: AtomTypeContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
}
export class TupleContext extends AtomTypeContext {
    public constructor(ctx: AtomTypeContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public tupleType(): TupleTypeContext {
        return this.getRuleContext(0, TupleTypeContext)!;
    }
}
export class InstanceBinderTypeContext extends AtomTypeContext {
    public constructor(ctx: AtomTypeContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public instanceBinderExpr(): InstanceBinderExprContext {
        return this.getRuleContext(0, InstanceBinderExprContext)!;
    }
}


export class ImplicitBinderExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_implicitBinderExpr;
    }
    public override copyFrom(ctx: ImplicitBinderExprContext): void {
        super.copyFrom(ctx);
    }
}
export class ImplicitBinderArrowContext extends ImplicitBinderExprContext {
    public constructor(ctx: ImplicitBinderExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public implicitBinder(): ImplicitBinderContext {
        return this.getRuleContext(0, ImplicitBinderContext)!;
    }
    public ARROW(): antlr.TerminalNode {
        return this.getToken(Lean4ExprParser.ARROW, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
}
export class ImplicitBinderOnlyContext extends ImplicitBinderExprContext {
    public constructor(ctx: ImplicitBinderExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public implicitBinder(): ImplicitBinderContext {
        return this.getRuleContext(0, ImplicitBinderContext)!;
    }
}


export class InstanceBinderExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_instanceBinderExpr;
    }
    public override copyFrom(ctx: InstanceBinderExprContext): void {
        super.copyFrom(ctx);
    }
}
export class InstanceBinderArrowContext extends InstanceBinderExprContext {
    public constructor(ctx: InstanceBinderExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public instanceBinder(): InstanceBinderContext {
        return this.getRuleContext(0, InstanceBinderContext)!;
    }
    public ARROW(): antlr.TerminalNode {
        return this.getToken(Lean4ExprParser.ARROW, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
}
export class InstanceBinderOnlyContext extends InstanceBinderExprContext {
    public constructor(ctx: InstanceBinderExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public instanceBinder(): InstanceBinderContext {
        return this.getRuleContext(0, InstanceBinderContext)!;
    }
}


export class TupleTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_tupleType;
    }
    public override copyFrom(ctx: TupleTypeContext): void {
        super.copyFrom(ctx);
    }
}
export class ActualTupleContext extends TupleTypeContext {
    public constructor(ctx: TupleTypeContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
}


export class FieldContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_field;
    }
    public override copyFrom(ctx: FieldContext): void {
        super.copyFrom(ctx);
    }
}
export class FieldDeclContext extends FieldContext {
    public constructor(ctx: FieldContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(Lean4ExprParser.ID, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
}


export class BindersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_binders;
    }
    public override copyFrom(ctx: BindersContext): void {
        super.copyFrom(ctx);
    }
}
export class BinderListContext extends BindersContext {
    public constructor(ctx: BindersContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public binder(): BinderContext[];
    public binder(i: number): BinderContext | null;
    public binder(i?: number): BinderContext[] | BinderContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BinderContext);
        }

        return this.getRuleContext(i, BinderContext);
    }
}


export class BinderContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_binder;
    }
    public override copyFrom(ctx: BinderContext): void {
        super.copyFrom(ctx);
    }
}
export class ImplicitBinderItemContext extends BinderContext {
    public constructor(ctx: BinderContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public implicitBinder(): ImplicitBinderContext {
        return this.getRuleContext(0, ImplicitBinderContext)!;
    }
}
export class InstanceBinderItemContext extends BinderContext {
    public constructor(ctx: BinderContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public instanceBinder(): InstanceBinderContext {
        return this.getRuleContext(0, InstanceBinderContext)!;
    }
}
export class SimpleBinderContext extends BinderContext {
    public constructor(ctx: BinderContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public identifiers(): IdentifiersContext {
        return this.getRuleContext(0, IdentifiersContext)!;
    }
}
export class ExplicitBinderItemContext extends BinderContext {
    public constructor(ctx: BinderContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public explicitBinder(): ExplicitBinderContext {
        return this.getRuleContext(0, ExplicitBinderContext)!;
    }
}


export class ExplicitBinderContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifiers(): IdentifiersContext {
        return this.getRuleContext(0, IdentifiersContext)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_explicitBinder;
    }
}


export class ImplicitBinderContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifiers(): IdentifiersContext {
        return this.getRuleContext(0, IdentifiersContext)!;
    }
    public expr(): ExprContext | null {
        return this.getRuleContext(0, ExprContext);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_implicitBinder;
    }
}


export class InstanceBinderContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public identifiers(): IdentifiersContext | null {
        return this.getRuleContext(0, IdentifiersContext);
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_instanceBinder;
    }
}


export class IdentifiersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode[];
    public ID(i: number): antlr.TerminalNode | null;
    public ID(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Lean4ExprParser.ID);
    	} else {
    		return this.getToken(Lean4ExprParser.ID, i);
    	}
    }
    public override get ruleIndex(): number {
        return Lean4ExprParser.RULE_identifiers;
    }
}
