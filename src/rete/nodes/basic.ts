import { ClassicPreset as Classic, ClassicPreset, type GetSchemes, NodeEditor } from 'rete';
import { ProofSocket, PropSocket, Socket, TargetSocket } from '../sockets';
import { Node } from './node';
import { sortByIndex } from '../utils';
import { Schemes } from '../types';
import { ContextId, LemmaData, NodeInfo, ProofGraphInfo, ReduceData } from '../servertypes';

export class ReductionNode extends Node {

  constructor() {
    super('Reduce', '分离/实例化');

    this.width = 180;
    this.height = 160;

    this.addInput('func', new Classic.Input(new ProofSocket(), 'Prop'));
    this.addInput('input1', new Classic.Input(new ProofSocket(true), 'α1'));
    this.addOutput('Result', new Classic.Output(new ProofSocket(), "Result"));
  }

  protected onReceiveData(data: ReduceData, pgInfo: ProofGraphInfo): void {
      data.synthesize.forEach((b, idx) => {
        if(this.hasInput(idx.toString())){
            (this.inputs[idx.toString()]?.socket as Socket).isOptional = b;
        }
      })
  }
}

export class ApplyNode extends Node {

  constructor() {
    super('Apply', '逆向推理');

    this.width = 180;
    this.height = 195;

    this.addInput('func', new Classic.Input(new ProofSocket(), 'Prop'));
    this.addInput('input1', new Classic.Input(new TargetSocket(), 'α1'));
    this.addInput('input2', new Classic.Input(new TargetSocket(), 'α2'));
    this.addOutput('Result', new Classic.Output(new TargetSocket(), "Result"));
  }
}

export class OutputNode extends Node {
    canChangeParent: boolean = false;
    doNotAdd: boolean = true;

    constructor() {
        super('Output', '结论');

        this.width = 180;
        this.height = 0;

        this.addInput(`target`, new Classic.Input(new TargetSocket(), "├"));
    }
}

export class InputNode extends Node {
    canChangeParent: boolean = false;
    doNotAdd: boolean = true;

    constructor() {
        super('Input', '前提');

        this.width = 180;
        this.height = 0;

        this.addOutput(`Test`, new Classic.Output(new ProofSocket(), "Test"));
    }
}

export class ParentNode extends Node {
    contextId?: string;
    inputNode!: InputNode
    outputNode!: OutputNode

    constructor(type: string, name: string) {
        super(type, name);

        this.width = 240;
        this.height = 195;
    }

    async onCreated(editor: NodeEditor<Schemes>) {
        const input = new InputNode();
        input.fixedSize = {top : 0, bottom : 0, left : 100, width : 100 };
        input.parent = this.id;
        const target = new OutputNode();
        target.fixedSize = { top : 0, bottom : 0, right : 100, width : 100 };
        target.parent = this.id;
        this.inputNode = input;
        this.outputNode = target;
        await Promise.all([editor.addNode(input), editor.addNode(target)]);
    }

    setContext(pgInfo: ProofGraphInfo, ctxId: ContextId){
        this.contextId = ctxId;
        const ctxInfo = pgInfo.contexts.find(ctx => ctx.contextId === ctxId)!;
        this.inputNode.nodeId = ctxInfo.inputNode;
        this.outputNode.nodeId = ctxInfo.outputNode;
        this.inputNode.onReceiveInfo(pgInfo);
        this.outputNode.onReceiveInfo(pgInfo); // They may fail previously
    }
}

export class LemmaNode extends ParentNode {
    isPseudo: boolean = false;

    constructor() {
        super("Lemma", '引理');
    }

    onReceiveData(data: LemmaData, pgInfo : ProofGraphInfo) {
        if (data.subcontext != null) {
            this.setContext(pgInfo, data.subcontext);
        }
    }
}

export class InvokeNode extends Node {
    constructor(public name: string, public userName: string) {
        super('Invoke', userName);
        this.width = 240;
        this.height = 120;
    }

    async onCreated(editor: NodeEditor<Schemes>): Promise<void> {
        if(this.eventOnNodeDataChange) this.eventOnNodeDataChange({ name: this.name });
    }
}