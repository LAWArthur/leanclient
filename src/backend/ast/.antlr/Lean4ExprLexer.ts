// Generated from e:/Projects/Rete/leanclient/src/backend/ast/Lean4Expr.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class Lean4ExprLexer extends antlr.Lexer {
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

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

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

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", 
        "T__8", "T__9", "T__10", "T__11", "T__12", "T__13", "LITERAL", "INTEGER", 
        "FLOAT", "ID", "ARROW", "FORALL", "EXISTS", "LAMBDA", "WS", "NEWLINE",
    ];


    public constructor(input: antlr.CharStream) {
        super(input);
        this.interpreter = new antlr.LexerATNSimulator(this, Lean4ExprLexer._ATN, Lean4ExprLexer.decisionsToDFA, new antlr.PredictionContextCache());
    }

    public get grammarFileName(): string { return "Lean4Expr.g4"; }

    public get literalNames(): (string | null)[] { return Lean4ExprLexer.literalNames; }
    public get symbolicNames(): (string | null)[] { return Lean4ExprLexer.symbolicNames; }
    public get ruleNames(): string[] { return Lean4ExprLexer.ruleNames; }

    public get serializedATN(): number[] { return Lean4ExprLexer._serializedATN; }

    public get channelNames(): string[] { return Lean4ExprLexer.channelNames; }

    public get modeNames(): string[] { return Lean4ExprLexer.modeNames; }

    public static readonly _serializedATN: number[] = [
        4,0,24,143,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,
        2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,
        13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,
        19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,1,0,1,0,1,1,1,1,1,1,1,
        2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,6,1,6,1,7,1,7,1,8,1,8,1,9,1,9,1,
        10,1,10,1,11,1,11,1,12,1,12,1,13,1,13,1,14,1,14,3,14,81,8,14,1,15,
        4,15,84,8,15,11,15,12,15,85,1,16,4,16,89,8,16,11,16,12,16,90,1,16,
        1,16,5,16,95,8,16,10,16,12,16,98,9,16,1,16,1,16,3,16,102,8,16,1,
        16,4,16,105,8,16,11,16,12,16,106,3,16,109,8,16,1,17,1,17,5,17,113,
        8,17,10,17,12,17,116,9,17,1,18,1,18,1,18,1,18,3,18,122,8,18,1,19,
        1,19,1,20,1,20,1,21,1,21,1,22,4,22,131,8,22,11,22,12,22,132,1,22,
        1,22,1,23,3,23,138,8,23,1,23,1,23,3,23,142,8,23,0,0,24,1,1,3,2,5,
        3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,13,27,14,29,15,
        31,16,33,17,35,18,37,19,39,20,41,21,43,22,45,23,47,24,1,0,6,1,0,
        48,57,2,0,69,69,101,101,2,0,43,43,45,45,4,0,65,90,95,95,97,122,880,
        1279,9,0,39,39,46,46,48,57,65,90,95,95,97,122,880,1279,8224,8224,
        8320,8329,2,0,9,9,32,32,154,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,
        0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,
        17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,
        27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,0,0,0,
        37,1,0,0,0,0,39,1,0,0,0,0,41,1,0,0,0,0,43,1,0,0,0,0,45,1,0,0,0,0,
        47,1,0,0,0,1,49,1,0,0,0,3,51,1,0,0,0,5,54,1,0,0,0,7,56,1,0,0,0,9,
        58,1,0,0,0,11,60,1,0,0,0,13,62,1,0,0,0,15,64,1,0,0,0,17,66,1,0,0,
        0,19,68,1,0,0,0,21,70,1,0,0,0,23,72,1,0,0,0,25,74,1,0,0,0,27,76,
        1,0,0,0,29,80,1,0,0,0,31,83,1,0,0,0,33,88,1,0,0,0,35,110,1,0,0,0,
        37,121,1,0,0,0,39,123,1,0,0,0,41,125,1,0,0,0,43,127,1,0,0,0,45,130,
        1,0,0,0,47,141,1,0,0,0,49,50,5,58,0,0,50,2,1,0,0,0,51,52,5,37433,
        0,0,52,53,5,65533,0,0,53,4,1,0,0,0,54,55,5,44,0,0,55,6,1,0,0,0,56,
        57,5,46,0,0,57,8,1,0,0,0,58,59,5,42,0,0,59,10,1,0,0,0,60,61,5,47,
        0,0,61,12,1,0,0,0,62,63,5,43,0,0,63,14,1,0,0,0,64,65,5,45,0,0,65,
        16,1,0,0,0,66,67,5,40,0,0,67,18,1,0,0,0,68,69,5,41,0,0,69,20,1,0,
        0,0,70,71,5,123,0,0,71,22,1,0,0,0,72,73,5,125,0,0,73,24,1,0,0,0,
        74,75,5,91,0,0,75,26,1,0,0,0,76,77,5,93,0,0,77,28,1,0,0,0,78,81,
        3,31,15,0,79,81,3,33,16,0,80,78,1,0,0,0,80,79,1,0,0,0,81,30,1,0,
        0,0,82,84,7,0,0,0,83,82,1,0,0,0,84,85,1,0,0,0,85,83,1,0,0,0,85,86,
        1,0,0,0,86,32,1,0,0,0,87,89,7,0,0,0,88,87,1,0,0,0,89,90,1,0,0,0,
        90,88,1,0,0,0,90,91,1,0,0,0,91,92,1,0,0,0,92,96,5,46,0,0,93,95,7,
        0,0,0,94,93,1,0,0,0,95,98,1,0,0,0,96,94,1,0,0,0,96,97,1,0,0,0,97,
        108,1,0,0,0,98,96,1,0,0,0,99,101,7,1,0,0,100,102,7,2,0,0,101,100,
        1,0,0,0,101,102,1,0,0,0,102,104,1,0,0,0,103,105,7,0,0,0,104,103,
        1,0,0,0,105,106,1,0,0,0,106,104,1,0,0,0,106,107,1,0,0,0,107,109,
        1,0,0,0,108,99,1,0,0,0,108,109,1,0,0,0,109,34,1,0,0,0,110,114,7,
        3,0,0,111,113,7,4,0,0,112,111,1,0,0,0,113,116,1,0,0,0,114,112,1,
        0,0,0,114,115,1,0,0,0,115,36,1,0,0,0,116,114,1,0,0,0,117,118,5,37419,
        0,0,118,122,5,65533,0,0,119,120,5,45,0,0,120,122,5,62,0,0,121,117,
        1,0,0,0,121,119,1,0,0,0,122,38,1,0,0,0,123,124,5,8704,0,0,124,40,
        1,0,0,0,125,126,5,8707,0,0,126,42,1,0,0,0,127,128,5,955,0,0,128,
        44,1,0,0,0,129,131,7,5,0,0,130,129,1,0,0,0,131,132,1,0,0,0,132,130,
        1,0,0,0,132,133,1,0,0,0,133,134,1,0,0,0,134,135,6,22,0,0,135,46,
        1,0,0,0,136,138,5,13,0,0,137,136,1,0,0,0,137,138,1,0,0,0,138,139,
        1,0,0,0,139,142,5,10,0,0,140,142,5,13,0,0,141,137,1,0,0,0,141,140,
        1,0,0,0,142,48,1,0,0,0,13,0,80,85,90,96,101,106,108,114,121,132,
        137,141,1,6,0,0
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Lean4ExprLexer.__ATN) {
            Lean4ExprLexer.__ATN = new antlr.ATNDeserializer().deserialize(Lean4ExprLexer._serializedATN);
        }

        return Lean4ExprLexer.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Lean4ExprLexer.literalNames, Lean4ExprLexer.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Lean4ExprLexer.vocabulary;
    }

    private static readonly decisionsToDFA = Lean4ExprLexer._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}