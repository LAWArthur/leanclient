import { ClassicPreset as Classic, ClassicPreset, type GetSchemes, NodeEditor } from 'rete';
import { ProofSocket, PropSocket, Socket, TargetSocket } from '../sockets';
import { FixedSize, Schemes } from '../types';

export function data<T extends Node, U>(value: ClassAccessorDecoratorTarget<T, U>, context: ClassAccessorDecoratorContext) {
  const { get, set } = value;
  const { name } = context;
  return {
    get: get,
    set(this: T, newVal: U) {
      const oldVal = get.call(this);
      set.call(this, newVal);
      if(this.onDataChange !== undefined){
        this.onDataChange(name as string, oldVal, newVal);
      }
    }
  }
}

export abstract class Node extends Classic.Node {
  static #globalNodeUid: number = 0;

  // data
  @data accessor width: number = 0;
  @data accessor height: number = 0;
  @data accessor parent: string | undefined;

  // abilities
  canChangeParent: boolean = true;
  canDelete: boolean = true;
  fixedSize?: FixedSize;
  hasSubflow: boolean = false; // If this is true, a subflow is created in engine

  nodeUid: number;

  onDataChange?: (prop: string, oldVal: any, newVal: any) => never | void;

  // for lean client
  lines: { start: number, end: number } = { start: -1, end: -1 };

  constructor(name : string) {
    super(name);
    this.nodeUid = ++Node.#globalNodeUid;
  }

  onConnectionChange(socket : Classic.Socket): boolean { return false; }

  isReady() {
    return Object.entries(this.inputs).every(([key, value]) => value && ((value.socket as Socket).isConnected || (value.socket as Socket).isOptional));
  }

  async onCreated(editor: NodeEditor<Schemes>) {}

  code(): string { return "" }

  getName(socket: string): string {
    if(this.outputs[socket] === undefined) {
      throw Error("Undefined output socket: " + socket);
    }
    return `var_${this.nodeUid}_${socket}`;
  }
}