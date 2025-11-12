import { LeanClient } from "../client/client";
import { Snippet, CodeSnippetWithLine, StateSnippetWithLine } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { Worker } from 'node:worker_threads'
import { Goal, Serializer } from "../ast/types";


export class LeanBridge {
    client: LeanClient;
    uri!: string;
    workersAbort?: AbortController;

    // File information
    

    constructor(){
        this.client = new LeanClient();
    }

    async initialize() {
        await this.client.initialize();
        this.uri = 'untitled:' + uuidv4();
        this.client.openFile(this.uri);
    }

    constructCode(code: Snippet[]) {
        let lineCount = 0;
        const codesWithLine: CodeSnippetWithLine[] = [];
        const statesWithLine: StateSnippetWithLine[] = [];
        for(const s of code) {
            if(s.type === 'code') {
                codesWithLine.push({ ...s, line: lineCount });
                lineCount += s.code.split('\n').length;
            }
            else {
                statesWithLine.push({ ...s, line: lineCount });
            }
        }

        const rawCode = codesWithLine.map(v => v.code).join('\n');

        return { codes: codesWithLine, states: statesWithLine, rawCode: rawCode };
    }

    async updateCode(code: Snippet[]) {
        if(this.workersAbort !== undefined) this.workersAbort.abort();
        this.workersAbort = new AbortController();
        const { codes, states, rawCode } = this.constructCode(code);
        this.client.changeFile(this.uri, rawCode);
        const rawGoals = await Promise.all(states.map(s => this.client.fetchGoals(this.uri, { line: s.line, character: 0 })));
        if(this.workersAbort.signal.aborted) {
            throw new Error("Terminated");
        }
        const structuredGoalsPromises = rawGoals.map(gs => gs.map(g => new Promise<any>((resolve, reject) => {
            const worker = new Worker("./process.ts", { workerData: g });
            worker.on("message", v => {
                resolve(v);
            });
            worker.on("exit", reject);
            this.workersAbort?.signal.addEventListener("abort", () => worker.terminate());
        })));

        const goals = await Promise.all(structuredGoalsPromises.map(ps => Promise.all(ps)));

        return goals.map((gs, i) => ({ nodeId: states[i].nodeId, state: gs }));
    }
}