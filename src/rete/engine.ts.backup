import { GetSchemes, NodeEditor, NodeId, Root, Scope } from 'rete'
import { Schemes } from './types'
import { Node } from './types'
import { InputNode, TargetNode, DeductionalNode, AnalyticalNode, StartNode } from './nodes'
import { Connection } from './connection'
import { areConnected, getAncestorAtScope, getConnectionSockets, getSocketConnections } from './utils'
import { TargetSocket } from './sockets'
import { CodeSnippet } from '@/backend'

export type Result<T, E> = {
  message: "success",
  result: T
} |
{
  message: "terminated"
} |
( [E] extends [never] ?
  never :
  {
    message: "error", 
    error: E
  }
)

type GraphConnection = { source: NodeId, target: NodeId };

export abstract class LeanFlow extends Scope<never, [Root<Schemes>]> {
  nodes = new Set<NodeId>()
  editor: NodeEditor<Schemes>
  engine: LeanflowEngine

  constructor(editor: NodeEditor<Schemes>, engine: LeanflowEngine) {
    super("leanflow");
    this.editor = editor;
    this.engine = engine;
  }

  add(node: Node) {
    if (node.id in this.nodes) {
      throw new Error('already processed')
    }

    this.nodes.add(node.id)
  }

  remove(node: Node) {
    this.nodes.delete(node.id)
  }

  code(): Result<CodeSnippet[], Error> {
    return {
      message: "terminated"
    }
  }
}

class Termination {};

// The class for a lean proving block, including local hypotheses(terms) and targets. 
export class ControlFlow extends LeanFlow {
  targetNode!: TargetNode
  generateSequence?: Array<Node>

  constructor(editor: NodeEditor<Schemes>, engine: LeanflowEngine) {
    super(editor, engine);
  }

  add(node: Node) {
    super.add(node);

    if (node instanceof TargetNode) {
      if (this.targetNode !== undefined) throw new Error("Multiple target nodes")
      this.targetNode = node
    }
  }

  _calculateTopology(nodes: Array<Node>, edges: Array<GraphConnection>) {
    const seq: Node[] = [];
    while (nodes.length !== 0) {
      const nextNode = nodes.find(n => edges.every(e => e.target !== n.id));
      if (nextNode === undefined) throw Error("Loop found in topology, terminated");
      seq.push(nextNode);
      edges = edges.filter(e => e.source !== nextNode.id);
      nodes = nodes.filter(n => n !== nextNode);
    }
    return seq;
  }

  calculateTopology() {
    const forwardNodes = [...this.nodes]
      .filter(n => DeductionalNode.some(T => this.editor.getNode(n) instanceof T) && this.engine.startNode.some(v => areConnected(this.editor, v, n)))
      .map(n => this.editor.getNode(n)!);
    const forwardSequence = this._calculateTopology(
      forwardNodes,
      this.editor.getConnections()
        .filter(c => forwardNodes.includes(this.editor.getNode(c.source)!)) // this suffices because connections can only go into deeper scopes.
        .map(c => ({source: c.source, target: getAncestorAtScope(this.editor, c.target, this.editor.getNode(c.source)?.parent) }))
    );
    this.generateSequence = forwardSequence;

    console.log(this.generateSequence);
  }

  parseCode(node: Node): Result<CodeSnippet[], Error> {
    const rawCode = node.code();
    
    try {
      const preCode = rawCode
        .replace(/#input,(\w+)/g, (match, inputId: string) => {
          const inputSocket = node.inputs[inputId];
          if(inputSocket === undefined){
            throw Error("Unknown socket id: " + inputId);
          }
          
          const connections = getSocketConnections(this.editor, inputSocket.socket);
          if(connections.length !== 1){
            throw Termination;
          }

          return this.editor.getNode(connections[0].source)!.getName(connections[0].sourceOutput);
        })
        .replace(/#output,(\w+)/g, (matchMedia, inputId: string) => {
          return node.getName(inputId);
        });

      const snippets = preCode.split("#sub").map(s => (<CodeSnippet>{ nodeId: node.id, code: s, type: "code" }));
      if(snippets.length === 1) {
        return {
          message: "success",
          result: snippets
        };
      }
      else if(snippets.length === 2){
        const subflow = this.engine.leanFlows.get(node.id);
        if(subflow === undefined) {
          throw Error("Not a subflow. ")
        }
        const subres = subflow.code();
        if(subres.message === "terminated" || subres.message === "error") {
          return subres;
        }
        else {
          snippets.splice(1, 0, ...subres.result);
          return {
            message: "success",
            result: snippets
          };
        }
      }
      else {
        throw Error("Multiple #sub tags found");
      }
    }
    catch (e) {
      if (e === Termination){
        return {
          message: "terminated"
        }
      }
      return {
        message: "error",
        error: e as Error
      }
    }
  }

  getCodeBackwards(node: Node): Result<CodeSnippet[], Error> {
    if(!this.targetNode) {
      return {
        message: "terminated"
      };
    }
    if(!AnalyticalNode.some(t => node instanceof t)) {
      return {
        message: "error",
        error: Error("Node not analytical. ")
      };
    }
    let result = this.parseCode(node);
    if(result.message === "terminated" || result.message === "error") return result;
    const inputGoals = Object.entries(node.inputs).map(([k, v]) => v?.socket).filter(v => v !== undefined && v instanceof TargetSocket);
    for(const socket of inputGoals){
      const connections = getSocketConnections(this.editor, socket);
      if(connections.length > 1) {
        return {
          message: "error",
          error: Error("Goal input has multiple connections. ")
        }
      }
      if(inputGoals.length > 1) result.result.push({nodeId: node.id, code:"{", type: "code"})
      if(connections.length === 0){
        result.result.push({nodeId: node.id, code: "sorry", type: "code"});
      }
      else {
        const { source } = getConnectionSockets(this.editor, connections[0]);
        if(source instanceof TargetSocket) {
          const subresult = this.getCodeBackwards(this.editor.getNode(connections[0].source)!);
          if(subresult.message === "error" || subresult.message === "terminated") return subresult;
          result.result = result.result.concat(subresult.result);
        }
        else{
          const sourceNode = this.editor.getNode(connections[0].source)!;
          if(this.generateSequence!.includes(sourceNode)) {
            result.result.push({ nodeId: node.id, code: "exact " + this.editor.getNode(connections[0].source)!.getName(connections[0].sourceOutput), type: "code" });
          }
          else {
            result.result.push({nodeId: node.id, code: "sorry", type: "code"});
          }
        }
      }
      if(inputGoals.length > 1) result.result.push({nodeId: node.id, code:"}", type: "code"});
    }
    return result;
  }

  code(): Result<CodeSnippet[], Error> {
    this.calculateTopology();
    let result: Result<CodeSnippet[], any> = {message: "success", result: []}
    for(const node of this.generateSequence!){
      const nodeResult = this.parseCode(node);
      if(nodeResult.message === "terminated" || nodeResult.message === "error") {
        return nodeResult;
      }
      else if(nodeResult.message === "success") {
        result.result = result.result.concat(nodeResult.result);
      }
    }
    const backwardResult = this.getCodeBackwards(this.targetNode);

    if(backwardResult.message === "terminated" || backwardResult.message === "error") {
      return backwardResult;
    }
    else result.result = result.result.concat(backwardResult.result);
    return result;
  }
}

/**
 * DataflowEngine is a plugin that integrates Dataflow with NodeEditor making it easy to use.
 * Additionally, it provides a cache for the data of each node in order to avoid recurring calculations.
 * @priority 10
 * @listens nodecreated
 * @listens noderemoved
 * @listens connectioncreated
 * @listens connectionremoved
 */
export class LeanflowEngine extends Scope<never, [Root<Schemes>]> {
  editor!: NodeEditor<Schemes>
  leanFlows = new Map<NodeId | undefined, LeanFlow>()
  locked: number = 0
  #changed: boolean = false
  taskController?: AbortController
  startNode = new Array<NodeId>

  constructor() {
    super('leanflow-engine')

    this.addPipe(context => {
      if (context.type === 'nodecreated') {
        this.add(context.data)
        this.generateCode()
      }
      if (context.type === 'noderemoved') {
        this.remove(context.data)
        this.generateCode()
      }
      if(context.type === 'connectioncreated' || context.type === 'connectionremoved') {
        this.generateCode()
      }
      return context
    })
  }

  setParent(scope: Scope<Root<Schemes>>): void {
    super.setParent(scope)

    this.editor = this.parentScope<NodeEditor<Schemes>>(NodeEditor)

    this.leanFlows.set(undefined, new ControlFlow(this.editor, this));

    this.editor.getNodes().forEach(n => this.add(n));

    this.generateCode();
  }

  add(node: Node) {
    const parent = node.parent;
    const flow = this.leanFlows.get(parent);
    if (flow === undefined) throw new Error("No subflow found for parent node. ");
    flow.add(node);
    if (node.hasSubflow) this.leanFlows.set(node.id, new ControlFlow(this.editor, this));
    if(StartNode.some(t => node instanceof t)){
      this.startNode.push(node.id);
    }
  }

  remove(node: Node) {
    this.leanFlows.forEach(flow => node.id in flow.nodes && flow.remove(node));
    if (node.hasSubflow) this.leanFlows.delete(node.id);
  }

  // force update topology
  generateCode() {
    if (this.locked) {
      this.#changed = true;
      return;
    }
    const abortController = new AbortController();
    if(this.taskController) this.taskController.abort();
    this.taskController = abortController;
    const task = this._generateCodeAsync();
    task.then(
      v => abortController.signal.aborted ? new Promise( () => {} ) : v
    )
    .then(v => console.log(v))
  }

  async _generateCodeAsync(): Promise<Result<CodeSnippet[], never>> {
    const result = this.leanFlows.get(undefined)!.code();
    if(result.message === "error") throw result.error;
    return result;
  }

  lock() {
    if (!this.locked) this.#changed = false
    this.locked += 1
  }

  unlock() {
    this.locked -= 1
    if(!this.locked && this.#changed) this.generateCode()
  }

  reassignParent(node: Node, oldVal: NodeId | undefined, newVal: NodeId | undefined) {
    this.leanFlows.get(oldVal)?.remove(node);
    this.leanFlows.get(newVal)?.add(node);
    this.generateCode();
  }
}