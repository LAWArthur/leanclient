import { ClassicPreset as Classic, ClassicPreset, type GetSchemes, NodeEditor } from 'rete';
import { ProofSocket, PropSocket, Socket, TargetSocket } from '../sockets';
import { Node } from './node';
import { sortByIndex } from '../utils';
import { Schemes } from '../types';
import { IntroData, NodeInfo, ProofGraphInfo } from '../servertypes';
import { InputControl } from '../controls';

export class RewriteNode extends Node {
    isPseudo: boolean = false;

    constructor() {
        super("Rewrite", '重写');
        this.addControl("symm", new InputControl("checkbox", {
            change : (value) => {
                    if(this.eventOnNodeDataChange) this.eventOnNodeDataChange({ symm: value });
                },
            label: "反向"
        }))
    }
}

export class RewriteGoalNode extends Node {
    constructor() {
        super("RewriteGoal", "重写结论");
        this.addControl("symm", new InputControl("checkbox", {
            change : (value) => {
                    if(this.eventOnNodeDataChange) this.eventOnNodeDataChange({ symm: value });
            },
            label: "反向"
        }))
    }
}