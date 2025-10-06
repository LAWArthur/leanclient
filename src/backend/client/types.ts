import * as lsp from 'vscode-languageserver-protocol'

enum LeanFileProgressKind {
    processing = 1,
    fatalError = 2
}

export type LeanFileProgressProcessingInfo = {
    range: lsp.Range;
    kind: LeanFileProgressKind;
}

export type LeanFileProgressParams = {
    textDocument: lsp.VersionedTextDocumentIdentifier;
    processing: LeanFileProgressProcessingInfo[];
}

export type PlainGoalParams = lsp.TextDocumentPositionParams;

export type PlainGoal = {
    rendered: string;
    goals: string[];
}