import { ClassicPreset as Classic, ClassicPreset, type GetSchemes, NodeEditor } from 'rete';
import { ProofSocket, PropSocket, TargetSocket } from '../sockets';
import { Node } from './node';
import { sortByIndex } from '../utils';
import { Schemes } from '../types';

export class ReductionNode extends Node {

  constructor() {
    super('Reduction');

    this.width = 180;
    this.height = 160;

    this.addInput('func', new Classic.Input(new ProofSocket(), 'Prop'));
    this.addInput('input1', new Classic.Input(new ProofSocket(true), 'α1'));
    this.addOutput('Result', new Classic.Output(new ProofSocket(), "Result"));
  }

  onConnectionChange(socket: Classic.Socket): boolean {
    const sortedInput = sortByIndex(Object.entries(this.inputs) as any);
    let index = sortedInput.findLastIndex((inp) => inp[1].socket.isConnected);
    index = index < 0 ? 0 : index;
    if(index + 1 < sortedInput.length){
      (sortedInput[index + 1][1].socket as ProofSocket).isOptional = true;
      sortedInput.slice(index + 2, ).forEach(([ key, input ]) => this.removeInput(key));
    }
    else {
      this.addInput(`input${index + 1}`, new Classic.Input(new ProofSocket(true), `α${index + 1}`));
    }
    sortedInput.slice(1, index + 1).forEach(([key, input]) => (input.socket as ProofSocket).isOptional = false);

    this.height = 88 + 36 * Object.values(this.inputs).length;

    return true;
  }

  code(): string {
    const sortedInput = sortByIndex(Object.entries(this.inputs) as any);
    return `have #output,Result := #input,func` + sortedInput.slice(1, -1).map(i => " #input," + i[0]).join("");
  }
}

export class ApplyNode extends Node {

  constructor() {
    super('Apply');

    this.width = 180;
    this.height = 195;

    this.addInput('func', new Classic.Input(new ProofSocket(), 'Prop'));
    this.addInput('input1', new Classic.Input(new TargetSocket(), 'α1'));
    this.addInput('input2', new Classic.Input(new TargetSocket(), 'α2'));
    this.addOutput('Result', new Classic.Output(new TargetSocket(), "Result"));
  }

  code(): string {
    return "apply #input,func";
  }
}

export class TargetNode extends Node {
    canChangeParent: boolean = false;
    constructor() {
        super('Target');

        this.width = 180;
        this.height = 195;

        this.addInput(`target`, new Classic.Input(new TargetSocket(), "├"));
    }
}

export class InputNode extends Node {
    canChangeParent: boolean = false;

    constructor() {
        super('Input');

        this.width = 180;
        this.height = 195;

        this.addOutput(`Test`, new Classic.Output(new ProofSocket(), "Test"));
    }
}

export class ParentNode extends Node {
    canChangeParent: boolean = true;
    hasSubflow: boolean = true;

    constructor(name: string) {
        super(name);

        this.width = 240;
        this.height = 120;
    }
}

export class LemmaNode extends ParentNode {
    constructor() {
        super("Lemma");
        this.addInput("Prop", new Classic.Input(new PropSocket(), "Prop"));
        this.addOutput("Proof", new Classic.Output(new ProofSocket(), "Proof"));
    }

    async onCreated(editor: NodeEditor<Schemes>) {
        const input = new InputNode();
        input.fixedSize = {top : 0, bottom : 0, left : 0, width : 100 };
        input.parent = this.id;
        const target = new TargetNode();
        target.fixedSize = { top : 0, bottom : 0, right : 0, width : 100 };
        target.parent = this.id;
        await Promise.all([editor.addNode(input), editor.addNode(target)]);
    }

    code(): string {
      return `have #output,Proof : TEST := {
#sub
}`
    }
}