import { ClassicPreset as Classic, ClassicPreset, type GetSchemes, NodeEditor } from 'rete';
import { ProofSocket, PropSocket, Socket, TargetSocket } from '../sockets';
import { Node } from './node';
import { sortByIndex } from '../utils';
import { Schemes } from '../types';
import { CasesData, IntroData, NodeInfo, ProofGraphInfo } from '../servertypes';
import { ParentNode } from './basic';
import { InputControl } from '../controls';

export class ForallIntroNode extends ParentNode {
    isPseudo: boolean = false;

    constructor() {
        super("Intro", '∀引入');

        this.addControl("", new InputControl("number", {
            initial: 0,
            change: (value) => {
                if (this.eventOnNodeDataChange !== undefined) this.eventOnNodeDataChange({ depth: value })
            }
        }));
    }

    onReceiveData(data: IntroData, pgInfo : ProofGraphInfo) {
        if (data.subcontext != null) {
            this.setContext(pgInfo, data.subcontext);
        }
    }
}

export class ExistsElimNode extends ParentNode {
    isPseudo: boolean = false;

    constructor() {
        super("Cases", '∃消去');
    }

    onReceiveData(data: CasesData, pgInfo : ProofGraphInfo) {
        if (data.contexts.length === 1) {
            const ctx = data.contexts[0];
            if (ctx[0] === "Exists.intro") {
                this.setContext(pgInfo, ctx[1]);
            }
        }
    }
}