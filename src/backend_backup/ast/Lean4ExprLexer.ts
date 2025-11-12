// Generated from Lean4Expr.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class Lean4ExprLexer extends Lexer {
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
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
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
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
		"T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16", 
		"T__17", "T__18", "T__19", "T__20", "T__21", "T__22", "T__23", "T__24", 
		"T__25", "T__26", "T__27", "T__28", "LITERAL", "INTEGER", "FLOAT", "ID", 
		"FORALL", "EXISTS", "LAMBDA", "WS", "NEWLINE",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, Lean4ExprLexer._ATN, Lean4ExprLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "Lean4Expr.g4"; }

	public get literalNames(): (string | null)[] { return Lean4ExprLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return Lean4ExprLexer.symbolicNames; }
	public get ruleNames(): string[] { return Lean4ExprLexer.ruleNames; }

	public get serializedATN(): number[] { return Lean4ExprLexer._serializedATN; }

	public get channelNames(): string[] { return Lean4ExprLexer.channelNames; }

	public get modeNames(): string[] { return Lean4ExprLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,38,195,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,
	2,24,7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,
	31,7,31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,1,0,
	1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,6,1,6,1,7,1,7,1,8,1,8,1,9,
	1,9,1,10,1,10,1,11,1,11,1,12,1,12,1,13,1,13,1,14,1,14,1,15,1,15,1,16,1,
	16,1,17,1,17,1,18,1,18,1,19,1,19,1,20,1,20,1,21,1,21,1,21,1,22,1,22,1,23,
	1,23,1,24,1,24,1,25,1,25,1,26,1,26,1,27,1,27,1,28,1,28,1,29,1,29,3,29,139,
	8,29,1,30,4,30,142,8,30,11,30,12,30,143,1,31,4,31,147,8,31,11,31,12,31,
	148,1,31,1,31,5,31,153,8,31,10,31,12,31,156,9,31,1,31,1,31,3,31,160,8,31,
	1,31,4,31,163,8,31,11,31,12,31,164,3,31,167,8,31,1,32,1,32,5,32,171,8,32,
	10,32,12,32,174,9,32,1,33,1,33,1,34,1,34,1,35,1,35,1,36,4,36,183,8,36,11,
	36,12,36,184,1,36,1,36,1,37,3,37,190,8,37,1,37,1,37,3,37,194,8,37,0,0,38,
	1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,13,27,14,29,
	15,31,16,33,17,35,18,37,19,39,20,41,21,43,22,45,23,47,24,49,25,51,26,53,
	27,55,28,57,29,59,30,61,31,63,32,65,33,67,34,69,35,71,36,73,37,75,38,1,
	0,6,1,0,48,57,2,0,69,69,101,101,2,0,43,43,45,45,4,0,65,90,95,95,97,122,
	880,1279,9,0,39,39,46,46,48,57,65,90,95,95,97,122,880,1279,8224,8224,8320,
	8329,2,0,9,9,32,32,205,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,
	0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,
	0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,
	0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,0,41,1,
	0,0,0,0,43,1,0,0,0,0,45,1,0,0,0,0,47,1,0,0,0,0,49,1,0,0,0,0,51,1,0,0,0,
	0,53,1,0,0,0,0,55,1,0,0,0,0,57,1,0,0,0,0,59,1,0,0,0,0,61,1,0,0,0,0,63,1,
	0,0,0,0,65,1,0,0,0,0,67,1,0,0,0,0,69,1,0,0,0,0,71,1,0,0,0,0,73,1,0,0,0,
	0,75,1,0,0,0,1,77,1,0,0,0,3,79,1,0,0,0,5,81,1,0,0,0,7,83,1,0,0,0,9,85,1,
	0,0,0,11,87,1,0,0,0,13,89,1,0,0,0,15,91,1,0,0,0,17,93,1,0,0,0,19,95,1,0,
	0,0,21,97,1,0,0,0,23,99,1,0,0,0,25,101,1,0,0,0,27,103,1,0,0,0,29,105,1,
	0,0,0,31,107,1,0,0,0,33,109,1,0,0,0,35,111,1,0,0,0,37,113,1,0,0,0,39,115,
	1,0,0,0,41,117,1,0,0,0,43,119,1,0,0,0,45,122,1,0,0,0,47,124,1,0,0,0,49,
	126,1,0,0,0,51,128,1,0,0,0,53,130,1,0,0,0,55,132,1,0,0,0,57,134,1,0,0,0,
	59,138,1,0,0,0,61,141,1,0,0,0,63,146,1,0,0,0,65,168,1,0,0,0,67,175,1,0,
	0,0,69,177,1,0,0,0,71,179,1,0,0,0,73,182,1,0,0,0,75,193,1,0,0,0,77,78,5,
	58,0,0,78,2,1,0,0,0,79,80,5,9500,0,0,80,4,1,0,0,0,81,82,5,44,0,0,82,6,1,
	0,0,0,83,84,5,46,0,0,84,8,1,0,0,0,85,86,5,8728,0,0,86,10,1,0,0,0,87,88,
	5,94,0,0,88,12,1,0,0,0,89,90,5,45,0,0,90,14,1,0,0,0,91,92,5,42,0,0,92,16,
	1,0,0,0,93,94,5,47,0,0,94,18,1,0,0,0,95,96,5,43,0,0,96,20,1,0,0,0,97,98,
	5,61,0,0,98,22,1,0,0,0,99,100,5,8800,0,0,100,24,1,0,0,0,101,102,5,62,0,
	0,102,26,1,0,0,0,103,104,5,60,0,0,104,28,1,0,0,0,105,106,5,8805,0,0,106,
	30,1,0,0,0,107,108,5,8804,0,0,108,32,1,0,0,0,109,110,5,172,0,0,110,34,1,
	0,0,0,111,112,5,8743,0,0,112,36,1,0,0,0,113,114,5,215,0,0,114,38,1,0,0,
	0,115,116,5,8744,0,0,116,40,1,0,0,0,117,118,5,8594,0,0,118,42,1,0,0,0,119,
	120,5,45,0,0,120,121,5,62,0,0,121,44,1,0,0,0,122,123,5,8596,0,0,123,46,
	1,0,0,0,124,125,5,40,0,0,125,48,1,0,0,0,126,127,5,41,0,0,127,50,1,0,0,0,
	128,129,5,123,0,0,129,52,1,0,0,0,130,131,5,125,0,0,131,54,1,0,0,0,132,133,
	5,91,0,0,133,56,1,0,0,0,134,135,5,93,0,0,135,58,1,0,0,0,136,139,3,61,30,
	0,137,139,3,63,31,0,138,136,1,0,0,0,138,137,1,0,0,0,139,60,1,0,0,0,140,
	142,7,0,0,0,141,140,1,0,0,0,142,143,1,0,0,0,143,141,1,0,0,0,143,144,1,0,
	0,0,144,62,1,0,0,0,145,147,7,0,0,0,146,145,1,0,0,0,147,148,1,0,0,0,148,
	146,1,0,0,0,148,149,1,0,0,0,149,150,1,0,0,0,150,154,5,46,0,0,151,153,7,
	0,0,0,152,151,1,0,0,0,153,156,1,0,0,0,154,152,1,0,0,0,154,155,1,0,0,0,155,
	166,1,0,0,0,156,154,1,0,0,0,157,159,7,1,0,0,158,160,7,2,0,0,159,158,1,0,
	0,0,159,160,1,0,0,0,160,162,1,0,0,0,161,163,7,0,0,0,162,161,1,0,0,0,163,
	164,1,0,0,0,164,162,1,0,0,0,164,165,1,0,0,0,165,167,1,0,0,0,166,157,1,0,
	0,0,166,167,1,0,0,0,167,64,1,0,0,0,168,172,7,3,0,0,169,171,7,4,0,0,170,
	169,1,0,0,0,171,174,1,0,0,0,172,170,1,0,0,0,172,173,1,0,0,0,173,66,1,0,
	0,0,174,172,1,0,0,0,175,176,5,8704,0,0,176,68,1,0,0,0,177,178,5,8707,0,
	0,178,70,1,0,0,0,179,180,5,955,0,0,180,72,1,0,0,0,181,183,7,5,0,0,182,181,
	1,0,0,0,183,184,1,0,0,0,184,182,1,0,0,0,184,185,1,0,0,0,185,186,1,0,0,0,
	186,187,6,36,0,0,187,74,1,0,0,0,188,190,5,13,0,0,189,188,1,0,0,0,189,190,
	1,0,0,0,190,191,1,0,0,0,191,194,5,10,0,0,192,194,5,13,0,0,193,189,1,0,0,
	0,193,192,1,0,0,0,194,76,1,0,0,0,12,0,138,143,148,154,159,164,166,172,184,
	189,193,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!Lean4ExprLexer.__ATN) {
			Lean4ExprLexer.__ATN = new ATNDeserializer().deserialize(Lean4ExprLexer._serializedATN);
		}

		return Lean4ExprLexer.__ATN;
	}


	static DecisionsToDFA = Lean4ExprLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}