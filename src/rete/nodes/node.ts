import { ClassicPreset as Classic, ClassicPreset, type GetSchemes, NodeEditor, NodeId } from 'rete';
import { ProofSocket, PropSocket, Socket, TargetSocket } from '../sockets';
import { FixedSize, Schemes } from '../types';
import { NodeInfo, ProofGraphInfo } from '../servertypes';
import { getSocketConnections } from '../utils';

export function data<T extends Node, U>(value: ClassAccessorDecoratorTarget<T, U>, context: ClassAccessorDecoratorContext) {
  const { get, set } = value;
  const { name } = context;
  return {
    get: get,
    set(this: T, newVal: U) {
      const oldVal = get.call(this);
      set.call(this, newVal);
      if(this.eventOnPropertyChange !== undefined){
        this.eventOnPropertyChange(name as string, oldVal, newVal);
      }
    }
  }
}

export abstract class Node extends Classic.Node {
  static #globalNodeUid: number = 0;

  // data
  private _width: number = 180;
  private _height: number = 195;
  get width() {
    if (this.getActualView) {
      return Math.max(this.getActualView().width, this._width);
    }
    return this._width;
  }
  set width(value : number) {
    const oldVal = this._width;
    this._width = value;
    if(this.eventOnPropertyChange !== undefined){
      this.eventOnPropertyChange("width", oldVal, value);
    }
  }
  get height() {
    if (this.getActualView) {
      return Math.max(this.getActualView().height, this._height);
    }
    return this._height;
  }
  set height(value : number) {
    const oldVal = this._height;
    this._height = value;
    if(this.eventOnPropertyChange !== undefined){
      this.eventOnPropertyChange("height", oldVal, value);
    }
  }
  @data accessor parent: string | undefined;
  @data accessor validity: "valid" | "invalid" | "notUsed" | "internalError";

  // abilities
  canChangeParent: boolean = true;
  canDelete: boolean = true;
  fixedSize?: FixedSize;
  isPseudo: boolean = false;
  doNotAdd: boolean = false;

  nodeId?: NodeId;

  editor!: NodeEditor<Schemes>

  eventOnPropertyChange?: (prop: string, oldVal: any, newVal: any) => never | void;

  eventOnNodeDataChange?: (data: any) => void;

  getActualView?: () => {width: number, height: number}

  // for lean client
  lines: { start: number, end: number } = { start: -1, end: -1 };

  constructor(public type : string, name: string) {
    super(name);
    this.validity = "notUsed";
  }


  async onCreated(editor: NodeEditor<Schemes>) {}

  protected onReceiveData(data: any, pgInfo : ProofGraphInfo) {}

  onReceiveInfo(pgInfo : ProofGraphInfo) {
    const myInfo = pgInfo.nodes.find(n => n.nodeId === this.nodeId);
    if (myInfo === undefined) return;
    this.updateInputSockets(myInfo);
    this.updateOutputSockets(myInfo);
    this.validity = myInfo.validity;
    this.onReceiveData(myInfo.data, pgInfo);
  }

  updateInputSockets(info: NodeInfo) {
    info.inputs.forEach((input, index) => {
      if(!this.hasInput(input.sockId)){
        if (input.type == "expr"){
          this.addInput(input.sockId, new Classic.Input(new ProofSocket));
        }
        else {
          this.addInput(input.sockId, new Classic.Input(new TargetSocket));
        }
      }
      const inputCom = this.inputs[input.sockId]!;
      inputCom.index = index;
      (inputCom.socket as Socket).isBad = false;
      if(input.type == "expr") {
        inputCom.label = input.sockId + ": " + (input.expected ?? "任意");
      }
      else {
        inputCom.label = "" + input.expected;
      }
    });
    Object.entries(this.inputs).forEach(input => {
      if(!info.inputs.find(i => i.sockId === input[0])){
        if(getSocketConnections(this.editor, input[1]!.socket).length === 0){
          this.removeInput(input[0]);
        }
        else {
          (input[1]!.socket as Socket).isBad = true;
          input[1]!.index = 10000;
        }
      }
    });
  }

  updateOutputSockets(info: NodeInfo) {
    info.outputs.forEach((output, index) => {
      if(!this.hasOutput(output.sockId)){
        if (output.type == "expr"){
          this.addOutput(output.sockId, new Classic.Output(new ProofSocket));
        }
        else {
          this.addOutput(output.sockId, new Classic.Output(new TargetSocket));
        }
      }
      const outputCom = this.outputs[output.sockId]!;
      outputCom.index = index;
      if(output.type == "expr") {
        if(output.exprValue === null){
          if(output.exprType === null){
            outputCom.label = "任意";
          }
          else {
            outputCom.label = output.exprType;
          }
        }
        else {
          outputCom.label = output.exprValue + ": " + output.exprType;
        }
      }
      else {
        outputCom.label = "目标";
      }
      (outputCom.socket as Socket).isBad = false;
    });
    Object.entries(this.outputs).forEach(output => {
      if(!info.outputs.find(i => i.sockId === output[0])){
        if(getSocketConnections(this.editor, output[1]!.socket).length === 0){
          this.removeOutput(output[0]);
        }
        else {
          (output[1]!.socket as Socket).isBad = true;
          output[1]!.index = 10000;
        }
      }
    });
  }
}