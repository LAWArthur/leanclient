grammar Lean4Expr;

options {language=TypeScript;}

start : goal+ EOF
        ;

// 解析器规则
goal : NEWLINE* tag? vars target NEWLINE*
        ;

tag : (ID | LITERAL)+ ':' NEWLINE
        ;

vars : (var NEWLINE)*
        ;

var : identifiers ':' expr
        ;

expr : 
       funcExpr
     | opType
     ;

target : '├' expr
        ;

// Forall 表达式 - 最高优先级
forallExpr : FORALL binders (',' | '.') expr
           ;

funcExpr : binders ':' expr
           ;

// Exists 表达式 - 最高优先级
existsExpr : EXISTS binders (',' | '.') expr
           ;

// 箭头类型 - 较低优先级
opType returns [precedence: number | undefined, assoc: "left" | "right" | "none" | undefined] :
          atomType
        | implicitBinder
        | instanceBinder
        | opType opType { $precedence = 100; $assoc = "left"; }
        | <assoc=right> opType op='∘' opType { $precedence = 90; $assoc = "right"; }
        | <assoc=right> opType op='^' opType { $precedence = 80; $assoc = "right"; }
        | op='-' opType { $precedence = 75; }
        | opType op=('*'|'/') opType { $precedence = 70; $assoc = "left"; }
        | opType op=('+'|'-') opType { $precedence = 65; $assoc = "left"; }
        | <nonassoc> opType op=('='|'≠'|'>'|'<'|'≥'|'≤') opType { $precedence = 50; $assoc = "none"; }
        | op='¬' opType { $precedence = 40; }
        | opType op=('∧'|'×')  opType { $precedence = 35; $assoc = "left"; }
        | opType op='∨' opType { $precedence = 30; $assoc = "left"; }
        | <assoc=right> opType op=('→' | '->') opType { $precedence = 25; $assoc = "right"; }
        | <nonassoc> opType op='↔' opType { $precedence = 20; $assoc = "none"; }
        | forallExpr { $precedence = 0; }
        | existsExpr { $precedence = 0; }
          ;

atomType : ID                      # Identifier
         | LITERAL                 # Literal
         | '(' expr ')'            # ParenExpr
         | '(' expr (',' expr)+ ')'               # Tuple
         ;

// 绑定器
binders : binder+
        ;

binder : identifiers                  # SimpleBinderItem
       | explicitBinder # ExplicitBinderItem
       | implicitBinder      # ImplicitBinderItem
       | instanceBinder      # InstanceBinderItem
       ;

explicitBinder : '(' identifiers ':' expr ')'
                ;

// 隐式绑定器: {A : Prop} 或 {A}
implicitBinder : '{' identifiers (':' expr)? '}'
               ;

// 实例绑定器: [HAdd A] 或 [h : HAdd A]
instanceBinder : '[' (identifiers ':')? expr ']'
               ;

identifiers : ID+
            ;

LITERAL : INTEGER | FLOAT;

INTEGER : [0-9]+;
FLOAT : [0-9]+ '.' [0-9]* ([eE] [+-]? [0-9]+)?;
ID : [a-zA-Z_\u0370-\u03ff\u0400-\u04ff][a-zA-Z0-9_'.\u2020\u2080-\u2089\u0370-\u03ff\u0400-\u04ff]*;

// 符号
FORALL : '\u2200';
EXISTS : '\u2203';
LAMBDA : '\u03BB';

WS : [ \t]+ -> skip;

NEWLINE : '\r'?'\n'
        | '\r'
        ;