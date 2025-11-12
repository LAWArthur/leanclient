import { ClassicPreset as Classic, ClassicPreset, type GetSchemes, NodeEditor } from 'rete';
import { ProofSocket, PropSocket, Socket, TargetSocket } from '../sockets';
import { Node } from './node';
import { sortByIndex } from '../utils';
import { Schemes } from '../types';
import { IntroData, NodeInfo, ProofGraphInfo } from '../servertypes';
import { ParentNode } from './basic';

export class ContraNode extends ParentNode {
    isPseudo: boolean = false;

    constructor() {
        super("ByContra", '反证法');
    }

    onReceiveData(data: IntroData, pgInfo : ProofGraphInfo) {
        if (data.subcontext != null) {
            this.setContext(pgInfo, data.subcontext);
        }
    }
}

export class AbsurdNode extends Node {
    constructor() {
        super("Absurd", '矛盾');
        this.width = 180;
        this.height = 195;
    }
}