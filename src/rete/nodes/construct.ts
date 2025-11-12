import { ClassicPreset as Classic, ClassicPreset, type GetSchemes, NodeEditor } from 'rete';
import { ProofSocket, PropSocket, Socket, TargetSocket } from '../sockets';
import { Node } from './node';
import { sortByIndex } from '../utils';
import { Schemes } from '../types';
import { ForallData, IntroData, NodeInfo, ProofGraphInfo } from '../servertypes';
import { ParentNode } from './basic';
import { Value } from 'sass';
import { InputControl } from '../controls';

export class ForallConstructNode extends ParentNode {
    isPseudo: boolean = false;

    constructor() {
        super("Forall", '∀构造');
        this.addControl("num", new InputControl("number", {
            initial: 0,
            change: (value) => {
                
                for (let i = 0; i < value; i++) {
                    if(!this.hasControl(i.toString())) {
                        this.addControl(i.toString(), new InputControl("text", {
                            initial: "x" + i,
                            change: (value) => {
                                if (this.eventOnNodeDataChange !== undefined) this.eventOnNodeDataChange(this.getSendData());
                            }
                        }))
                    }
                }
                if (this.eventOnNodeDataChange !== undefined) this.eventOnNodeDataChange(this.getSendData());
            }
        }));
    }

    getSendData() {
        const names = [];
        const num = (this.controls["num"] as InputControl<"number">).value ?? 0;
        for (let i = 0; i < num; i++) {
            names.push((this.controls[i.toString()] as InputControl<"text">).value);
        }
        return { bvars: names }
    }

    onReceiveData(data: ForallData, pgInfo : ProofGraphInfo) {
        if (data.subcontext != null) {
            this.setContext(pgInfo, data.subcontext);
        }
    }
}

export class ExistsConstructNode extends ParentNode {
    isPseudo: boolean = false;

    constructor() {
        super("Exists", '∃构造');
        this.addControl("name", new InputControl("text", {
            initial: "x",
            change: (value) => {
                if (this.eventOnNodeDataChange !== undefined) this.eventOnNodeDataChange(this.getSendData());
            }
        }))
    }

    getSendData() {
        const name = (this.controls["name"] as InputControl<"text">).value
        return { name: name }
    }

    onReceiveData(data: ForallData, pgInfo : ProofGraphInfo) {
        if (data.subcontext != null) {
            this.setContext(pgInfo, data.subcontext);
        }
    }
}

export class AppConstNode extends Node {
    constructor(public name: string, public userName: string) {
        super('AppConst', userName);
        this.width = 240;
        this.height = 120;
    }

    async onCreated(editor: NodeEditor<Schemes>): Promise<void> {
        if(this.eventOnNodeDataChange) this.eventOnNodeDataChange({ name: this.name });
    }
}

export class SortNode extends Node {
    constructor(public level: number, public userName: string) {
        super('Sort', userName);
        this.width = 240;
        this.height = 120;
    }

    async onCreated(editor: NodeEditor<Schemes>): Promise<void> {
        if(this.eventOnNodeDataChange) this.eventOnNodeDataChange({ value: this.level });
    }
}