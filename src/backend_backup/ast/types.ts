import Lean4ExprVisitor from "./Lean4ExprVisitor"
import { Lean4ExprVisitorProvider } from "./provider"

export abstract class LeanType {
    abstract toString(): string; 
    precedence: number = 200;
    assoc?: "left" | "right" | "none";
    static readonly __type: string = "LeanType";
}

export class UnknownType extends LeanType {
    static readonly __type = "UnknownType";
    toString(): string {
        return "<<unknown>>";
    }
}

export class ForallType extends LeanType {
    static readonly __type = "ForallType";
    binders: Binder[];
    expr: LeanType;

    constructor(binders: Binder[], expr: LeanType) {
        super();
        this.binders = binders;
        this.expr = expr;
    }

    toString(): string {
        return `\u2200 ${this.binders.map(stringifyBinder).join(" ")}, ${this.expr.toString()}`;
    }
}

export class ExistsType extends LeanType {
    static readonly __type = "ExistsType";
    binders: Binder[];
    expr: LeanType;

    constructor(binders: Binder[], expr: LeanType) {
        super();
        this.binders = binders;
        this.expr = expr;
    }

    toString(): string {
        return `\u2203 ${this.binders.map(stringifyBinder).join(" ")}, ${this.expr.toString()}`;
    }
}

export class FuncType extends LeanType {
    static readonly __type = "FuncType";
    binders: Binder[];
    expr: LeanType;

    constructor(binders: Binder[], expr: LeanType) {
        super();
        this.binders = binders;
        this.expr = expr;
    }

    toString(): string {
        return `${this.binders.map(stringifyBinder).join(" ")}: ${this.expr.toString()}`;
    }
}

export class UnaryType extends LeanType {
    static readonly __type = "UnaryType";
    operator: string;
    operand: LeanType;
    constructor(operator: string, operand: LeanType){
        super();
        this.operator = operator;
        this.operand = operand;
    }

    toString(): string {
        if (this.operand instanceof UnaryType || this.operand instanceof ForallType || this.operand instanceof ExistsType) { // 一律不加括号
            return this.operand.toString();
        }
        if(this.operand.precedence < this.precedence) {
            return `(${this.operand.toString()})`;
        }
        return this.operand.toString();
    }
}

export class BinaryType extends LeanType {
    static readonly __type = "BinaryType";
    operator: string | undefined;
    leftOperand: LeanType;
    rightOperand: LeanType;
    constructor(operator: string | undefined, leftOperand: LeanType, rightOperand: LeanType) {
        super();
        this.operator = operator;
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
    }

    toString(): string {
        let left: string, right: string;
        if (this.rightOperand instanceof UnaryType || this.rightOperand instanceof ForallType || this.rightOperand instanceof ExistsType) { // 一律不加括号
            right = this.rightOperand.toString();
        }
        else if (this.rightOperand.precedence < this.precedence) { // 下面优先级低
            right = `(${this.rightOperand.toString()})`;
        }
        else if (this.rightOperand.precedence === this.precedence && (this.assoc === "left" || this.assoc === "none")) {
            right = `(${this.rightOperand.toString()})`;
        }
        else {
            right = this.rightOperand.toString();
        }

        if(this.leftOperand instanceof ForallType || this.leftOperand instanceof ExistsType) { // 一律加括号
            left = `(${this.leftOperand.toString()})`;
        }
        else if (this.leftOperand.precedence < this.precedence) {
            left = `(${this.leftOperand.toString()})`;
        }
        else if (this.leftOperand.precedence === this.precedence && (this.assoc === "right" || this.assoc === "none")){
            left = `(${this.leftOperand.toString()})`;
        }
        else {
            left = this.leftOperand.toString();
        }

        return `${left} ${this.operator === undefined ? "" : this.operator} ${right}`;
    }
}

export type AtomValue = {
        type: "ID"
        value: string
    } |
    {
        type: "LITERAL"
        value: number
    };

export class AtomType extends LeanType {
    static readonly __type = "AtomType";
    value : AtomValue;

    constructor(value: AtomValue) {
        super();
        this.value = value;
    }

    toString(): string {
        return this.value.value.toString();
    }
}

export class TupleType extends LeanType {
    static readonly __type = "TupleType";
    types: LeanType[];
    constructor(types: LeanType[]){
        super();
        this.types = [...types];
    }

    toString(): string {
        return `(${this.types.map(v => v.toString()).join(', ')})`;
    }
}

export type Var<N extends string | null = string | null, T extends LeanType | null = LeanType | null> = {
    name: N
    type: T
}

export type Binder = {
    type: "explicit"
    var: Var<string, LeanType | null>
} |
{
    type: "implicit"
    var: Var<string,  LeanType | null>
} |
{
    type: "instance"
    var: Var<string | null, LeanType>
}

export type Goal = {
    tag: string | undefined
    vars: Var<string, LeanType>[]
    target: LeanType
}

export function stringifyBinder(binder: Binder) {
    switch(binder.type){
        case "explicit":
            if(binder.var.type === null) {
                return `${binder.var.name}`;
            }
            else {
                return `( ${binder.var.name} : ${binder.var.type.toString()} )`;
            }
        case "implicit":
            if(binder.var.type === null) {
                return `{ ${binder.var.name} }`;
            }
            else {
                return `{ ${binder.var.name} : ${binder.var.type.toString()} }`;
            }
        case "instance":
            if(binder.var.name === null) {
                return `[ ${binder.var.type.toString()} ]`;
            }
            else {
                return `[ ${binder.var.name} : ${binder.var.type.toString()} ]`;
            }
    }
}

export class Serializer {
    private static readonly TYPE_KEY = "__type";

    private static knownClasses: [string, Function][] = [];

    static registerClass(ctor: Function){
        if(this.TYPE_KEY in ctor){
            this.knownClasses.push([ctor[this.TYPE_KEY] as string, ctor]);
        }
    }

    static serialize(data: any): string {
        return JSON.stringify(data, (key, value) => {
            if (value && typeof value === 'object' && value.constructor !== undefined) {
                const [type, ctor] = this.knownClasses.find(([t, c]) => value.constructor === c) ?? [undefined, undefined];
                if (type !== undefined) {
                    return {
                        [this.TYPE_KEY]: type,
                        ...value
                    }
                }
            }
            return value;
        });
    }

    static deserialize(json: string): any {
        return JSON.parse(json, (key, value) => {
            if(value && typeof value === 'object' && this.TYPE_KEY in value){
                const typename: string = value[this.TYPE_KEY];
                const [type, ctor] = this.knownClasses.find(([t, c]) => typename === t) ?? [undefined, undefined];

                if(ctor !== undefined){
                    const instance = Object.create(ctor.prototype);
                    const { [this.TYPE_KEY]: _, ...data } = value;
                    Object.assign(instance, data);
                    return instance;
                }
            }

            return value;
        });
    }
}

Serializer.registerClass(LeanType);
Serializer.registerClass(FuncType);
Serializer.registerClass(ForallType);
Serializer.registerClass(ExistsType);
Serializer.registerClass(AtomType);
Serializer.registerClass(UnaryType);
Serializer.registerClass(BinaryType);
Serializer.registerClass(TupleType);
Serializer.registerClass(UnknownType);