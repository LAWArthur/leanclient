import { ClassicPreset as Classic, ClassicPreset, type GetSchemes, NodeEditor } from 'rete';
import { ProofSocket, PropSocket, Socket, TargetSocket } from '../sockets';
import { Node } from './node';
import { sortByIndex } from '../utils';
import { Schemes } from '../types';
import { IntroData, NodeInfo, ProofGraphInfo } from '../servertypes';

export class ConstructorNode extends Node {
    isPseudo: boolean = false;

    constructor() {
        super("Constructor", '构造');
    }
}

export class SplitAppNode extends Node {
    constructor() {
        super("SplitApp", "分解");
    }
}