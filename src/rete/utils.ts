import { ClassicPreset, NodeEditor, NodeId } from "rete";
import { FixedSize, Schemes, Node } from "./types";

import { ProofSocket, TargetSocket, PropSocket, Socket } from "./sockets";
import { NodeView } from "rete-area-plugin";
import { Connection } from "./connection";

type Input = ClassicPreset.Input<Socket>;
type Output = ClassicPreset.Output<Socket>;

export function getConnectionSockets(
  editor: NodeEditor<Schemes>,
  connection: Schemes["Connection"]
) {
  const source = editor.getNode(connection.source);
  const target = editor.getNode(connection.target);

  const output =
    source && source.outputs[connection.sourceOutput];
  const input =
    target && target.inputs[connection.targetInput];

  return {
    source: output?.socket as Socket,
    target: input?.socket as Socket
  };
}

export function getSocketConnections(
  editor: NodeEditor<Schemes>,
  socket: ClassicPreset.Socket
) {
  return editor.getConnections().filter((c) => {
    const sockets = getConnectionSockets(editor, c);
    return sockets.source == socket || sockets.target == socket;
  });
}

export function sortByIndex(entries : Array<[string, Input]>) {
  entries.sort((a, b) => {
    const ai = a[1] && a[1].index || 0
    const bi = b[1] && b[1].index || 0

    return ai - bi
  })
  return entries
}

export function areConnected(editor: NodeEditor<Schemes>, source: string, target: string, cache = new Set<string>()) {
  const list = editor.getConnections().filter(c => c.source === source && !c.isLoop).map(c => editor.getNode(c.target))
  const current = editor.getNode(source)
  if (!current) throw new Error(`Node ${source} not found`)
  const currentParent = current.parent

  if (source === target) return true
  if (cache.has(source)) return false
  cache.add(source)

  for (const node of list) {
    if (!node) throw new ReferenceError();// This shall never happen.
    if (node.id === target) return true
    if (areConnected(editor, node.id, target, cache)) return true
  }
  if (currentParent && areConnected(editor, currentParent, target, cache)) return true
  return false
}

export function areScopeCompatible(editor: NodeEditor<Schemes>, conn: Connection<Node, Node>){
  const sourceNode = editor.getNode(conn.source);
  let targetNode = editor.getNode(conn.target);
  if(!sourceNode || !targetNode) return false;
  const { source: sourceSocket, target: targetSocket } = getConnectionSockets(editor, conn);
  if(sourceSocket instanceof TargetSocket && targetSocket instanceof TargetSocket) {
    return sourceNode.parent === targetNode.parent;
  }
  
  do {
    if(targetNode.parent === sourceNode.parent) return true;
    targetNode = (targetNode.parent && editor.getNode(targetNode.parent)) || undefined;
  }while(targetNode);
  return false;
}

export class Cache<Key, T> {
  cache = new Map<Key, T>()

  constructor(private onDelete?: (item?: T) => void) {}

  get(key: Key) {
    return this.cache.get(key)
  }

  add(key: Key, data: T) {
    if (this.cache.has(key)) throw new Error('cache already exists')

    this.cache.set(key, data)
  }

  patch(key: Key, data: T) {
    this.cache.set(key, data)
  }

  delete(key: Key) {
    const item = this.cache.get(key)

    this.cache.delete(key)
    if (this.onDelete) {
      this.onDelete(item)
    }
  }

  clear() {
    Array.from(this.cache.keys()).forEach(item => {
      this.delete(item)
    })
  }
}

export function getSizeAndTranslation(area: NodeView, fixedSize: FixedSize){
  if([fixedSize.left, fixedSize.right, fixedSize.width].filter(c => c === undefined).length !== 1 ||
    [fixedSize.top, fixedSize.bottom, fixedSize.height].filter(c => c === undefined).length !== 1) throw new Error("Invalid fixedSize");

  const size = {
    width: fixedSize.width ?? (area.element.clientWidth - (fixedSize.left as number) - (fixedSize.right as number)),
    height: fixedSize.height ?? (area.element.clientHeight - (fixedSize.top as number) - (fixedSize.bottom as number))
  };
  
  const translation = {
    x: fixedSize.left !== undefined ? (area.position.x + fixedSize.left) : (area.position.x + area.element.clientWidth - size.width - (fixedSize.right as number)),
    y: fixedSize.top !== undefined ? (area.position.y + fixedSize.top) : (area.position.y + area.element.clientHeight - size.height - (fixedSize.bottom as number))
  };

  return { size: size, translation: translation };
}

export function getAncestorAtScope(editor: NodeEditor<Schemes>, nodeId: NodeId, scope: NodeId | undefined) {
  let node = editor.getNode(nodeId);
  while(node?.parent) {
    if(node.parent === scope) return node.id;
    node = editor.getNode(node.parent);
  }
  return node!.id;
}