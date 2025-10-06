import { ClassicPreset as Classic, ClassicPreset, type GetSchemes, NodeEditor } from 'rete';
import { ProofSocket, PropSocket, TargetSocket } from '../sockets';
import { Node } from './node';
import { sortByIndex } from '../utils';


export class NumberNode extends Node {

  constructor(initial: number, change?: (value: number) => void) {
    super('Number');

    this.addOutput('value', new Classic.Output(new ProofSocket(), 'Number'));
    this.addControl(
      'value',
      new Classic.InputControl('number', { initial, change })
    );
  }

  onConnectionChange(socket : Classic.Socket) {
    return false;
  }
}

export class AddNode extends Node {

  constructor() {
    super('Add');

    this.addInput('a', new Classic.Input(new TargetSocket(), 'A'));
    this.addInput('b', new Classic.Input(new ProofSocket(true), 'B'));
    this.addOutput('value', new Classic.Output(new TargetSocket(), 'Number'));
    this.addControl(
      'result',
      new Classic.InputControl('number', { initial: 0, readonly: true })
    );
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
      this.addInput(`input${index + 1}`, new Classic.Input(new ProofSocket(true)));
    }
    sortedInput.slice(1, index + 1).forEach(([key, input]) => (input.socket as ProofSocket).isOptional = false);
    return true;
  }
}