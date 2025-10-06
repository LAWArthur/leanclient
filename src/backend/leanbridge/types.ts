import { LeanType } from "../ast/types";

export type CodeSnippet = {
    type: 'code';
    nodeId: string;
    code: string;
    socket?: string;
}

export type StateSnippet = {
    type: 'state';
    nodeId: string;
}

export type StateResult = {
    nodeId: string;
    state: any[];
}

export type TaskParams = {
    target: LeanType;
}

export type Snippet = CodeSnippet | StateSnippet;

export type CodeSnippetWithLine = CodeSnippet & { line: number };

export type StateSnippetWithLine = StateSnippet & { line: number };