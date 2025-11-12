import { ClassicPreset as Classic, ClassicPreset, type GetSchemes, NodeEditor } from 'rete';
import { ProofSocket, PropSocket, Socket, TargetSocket } from '../sockets';
import { Node } from './node';
import { sortByIndex } from '../utils';
import { Schemes } from '../types';
import { CasesData, IntroData, NodeInfo, ProofGraphInfo } from '../servertypes';
import { ParentNode } from './basic';

export class CaseContextNode extends ParentNode {
    isPseudo: boolean = true;
    canChangeParent: boolean = false;
    constructor(caseName: string) {
        super("", caseName);
    }

    checkEmpty() : boolean {
        return this.editor.getNodes().find(n => n.parent === this.id) === undefined;
    }
}

export class CasesNode extends Node {
    isPseudo: boolean = false;
    subcontexts: [string, CaseContextNode][];

    constructor() {
        super("Cases", '分类讨论');
        this.width = 200;
        this.height = 180;
        this.subcontexts = [];
    }

    async newContext(name: string) {
        const ctx = new CaseContextNode(name);
        ctx.parent = this.id;
        await this.editor.addNode(ctx);
        this.subcontexts.push([name, ctx]);
        return ctx;
    }

    async getContext(name: string) {
        const res = this.subcontexts.find(s => s[0] === name);
        if(res !== undefined) return res[1];
        else return this.newContext(name);
    }

    onReceiveData(data: CasesData, pgInfo : ProofGraphInfo) {
        Promise.all(data.contexts.map(([name, ctxid]) => {
            this.getContext(name).then(ctx => {
                ctx.setContext(pgInfo, ctxid);
                ctx.validity = "valid";
            });
        })).then(() =>
        [...this.subcontexts].forEach(([name, ctx]) => {
            if(data.contexts.find(c => c[0] === name) === undefined){
                if(ctx.checkEmpty()){
                    this.editor.removeNode(ctx.id);
                    this.subcontexts.filter(s => s[0] !== name);
                }else{
                    ctx.validity = "notUsed";
                }
            }
        }));
    }
}

export class ByCasesNode extends Node {
    isPseudo: boolean = false;
    subcontexts: [string, CaseContextNode][];

    constructor() {
        super("ByCases", '真假二值');
        this.width = 200;
        this.height = 180;
        this.subcontexts = [];
    }

    async newContext(name: string) {
        const ctx = new CaseContextNode(name);
        ctx.parent = this.id;
        await this.editor.addNode(ctx);
        this.subcontexts.push([name, ctx]);
        return ctx;
    }

    async getContext(name: string) {
        const res = this.subcontexts.find(s => s[0] === name);
        if(res !== undefined) return res[1];
        else return this.newContext(name);
    }

    onReceiveData(data: CasesData, pgInfo : ProofGraphInfo) {
        Promise.all(data.contexts.map(([name, ctxid]) => {
            this.getContext(name).then(ctx => {
                ctx.setContext(pgInfo, ctxid);
                ctx.validity = "valid";
            });
        })).then(() =>
        [...this.subcontexts].forEach(([name, ctx]) => {
            if(data.contexts.find(c => c[0] === name) === undefined){
                if(ctx.checkEmpty()){
                    this.editor.removeNode(ctx.id);
                    this.subcontexts.filter(s => s[0] !== name);
                }else{
                    ctx.validity = "notUsed";
                }
            }
        }));
    }
}