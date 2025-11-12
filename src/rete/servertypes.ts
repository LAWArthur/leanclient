import { Input } from "rete/_types/presets/classic";
import { OutputNode } from "./nodes/basic";

export type NodeId = string;

export type SocketId = string;

export type ContextId = string;

export type ExprInfo = string;

export type InputSocketInfo = {
    type : "expr" | "goal"
    sockId : SocketId
    expected : ExprInfo | null
}

export type OutputSocketInfo = {
    type : "expr"
    sockId : SocketId
    exprType : ExprInfo | null
    exprValue : ExprInfo | null
}
| {
    type : "goal"
    sockId : SocketId
}

export type ConnectionSocketInfo = {
    nodeId : NodeId
    sockId : SocketId
}

export type ConnectionInfo = {
    frm : ConnectionSocketInfo
    to : ConnectionSocketInfo
}

export type ContextInfo = {
    contextId : ContextId
    possessor : NodeId | null
    inputNode : NodeId
    outputNode : NodeId
}

export type NodeInfo = {
    nodeId : NodeId
    type : string
    validity : "valid" | "invalid" | "notUsed" | "internalError"
    context : ContextId
    data : any
    inputs : InputSocketInfo[]
    outputs : OutputSocketInfo[]
}

export type ProofGraphInfo = {
    baseCtx : ContextId
    nodes : NodeInfo[]
    connections : ConnectionInfo[]
    contexts : ContextInfo[]
    isDone : boolean
}

export type LemmaData = {
    subcontext: ContextId | null;
}

export type ReduceData = {
    synthesize: boolean[]
}

export type IntroData = {
    depth: number,
    subcontext: ContextId | null
}

export type CasesData = {
    contexts: [string, ContextId][];
}

export type ForallData = {
    bvars : string[],
    subcontext : ContextId | null
}