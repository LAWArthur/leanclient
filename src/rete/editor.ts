import { ClassicPreset as Classic, ClassicPreset, type GetSchemes, NodeEditor, Root } from 'rete';

import { type Area2D, AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import {
  ClassicFlow,
  ConnectionPlugin,
  Presets as ConnectionPresets,
  getSourceTarget,
} from 'rete-connection-plugin';

import {
  VuePlugin,
  type VueArea2D,
  Presets as VuePresets,
} from 'rete-vue-plugin';

import {
  AutoArrangePlugin,
  Presets as ArrangePresets,
} from 'rete-auto-arrange-plugin';

import {
  ContextMenuPlugin,
  type ContextMenuExtra,
  Presets as ContextMenuPresets,
} from 'rete-context-menu-plugin';
import { Schemes } from './types';
import { AddNode, NumberNode, Node } from './nodes';
import { Connection } from './connection';
import { areConnected, areScopeCompatible, getConnectionSockets, getSizeAndTranslation, getSocketConnections } from './utils';
import * as Render from './render';
import { ProofSocket, PropSocket, TargetSocket } from './sockets';
import CustomNode from '@/customization/CustomNode.vue';
import { contextMenu } from './contextmenu';
import { InputNode, ParentNode, TargetNode } from './nodes/basic';
import { ScopesPlugin, Presets as ScopesPresets } from 'rete-scopes-plugin';
import { LeanflowEngine } from './engine';



type AreaExtra = Area2D<Schemes> | VueArea2D<Schemes> | ContextMenuExtra;


export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();

  const vueRender = new VuePlugin<Schemes, AreaExtra>();

  editor.use(area);

  area.use(vueRender);

  area.use(connection);
  area.use(contextMenu);

  area.addPipe(
    context => {
      if(context.type === "nodetranslate"){
        const node = editor.getNode(context.data.id);
        const fixedSize = node?.fixedSize;
        if(node && fixedSize) {
          const parent = node.parent && editor.getNode(node.parent);
          const view = parent && area.nodeViews.get(parent.id);
          if(parent && view){
            const { size, translation } = getSizeAndTranslation(view, fixedSize);
            node.width = size.width;
            node.height = size.height;
            return {
              ...context,
              data : {
                ...context.data,
                position : translation
              }
            }
          }
        }
      }
      else if (context.type === "nodetranslated" || context.type === "noderesized") {
        const parent = editor.getNode(context.data.id);
        const view = parent && area.nodeViews.get(parent.id);
        if(!parent || !view) return;
        const children = editor.getNodes().filter(n => n.fixedSize && n.parent === parent?.id);
        children.forEach( node => {
          area.translate(node.id, { x: 0, y: 0 }); // This is to trigger the trap above; call on siblings
        } );
      }
      return context;
    }
  )

  connection.addPreset(
    () => new ClassicFlow({
      canMakeConnection(from, to) {
        const [source, target] = getSourceTarget(from, to) || [null, null];
        if (!source || !target || from == to) {
          connection.drop();
          return false;
        }
        if(areConnected(editor, target.nodeId, source.nodeId)) {
          connection.drop();
          return false;
        }
        const pseudoConnection = new Connection(
            editor.getNode(source.nodeId) as Node,
            source.key as never,
            editor.getNode(target.nodeId) as Node,
            target.key as never
          )
        if(!areScopeCompatible(editor, pseudoConnection)) {
          connection.drop();
          return false;
        }
        const sockets = getConnectionSockets(editor, pseudoConnection);

        if(sockets.source instanceof TargetSocket && getSocketConnections(editor, sockets.source).length >= 1) {
          connection.drop();
          return false;
        }

        if (!sockets.source.isCompatibleWith(sockets.target)) {
          connection.drop();
          return false;
        }

        return true;
      }
    })
  );

  editor.addPipe((context) => {
    if (["connectioncreated", "connectionremoved"].includes(context.type)) {
      const conn = (context as any).data as Connection<Node, Node>;
      const sockets = getConnectionSockets(editor, conn);
      if (sockets.target) {
        sockets.target.isConnected = !!getSocketConnections(editor, sockets.target)?.length;
        editor.getNode(conn.target)?.onConnectionChange(sockets.target)
        area.update("node", conn.target);
        scopes.update(editor.getNode(conn.target)?.parent!);
      }
      if(sockets.source) {
        sockets.source.isConnected = !!getSocketConnections(editor, sockets.source)?.length;
        editor.getNode(conn.source)?.onConnectionChange(sockets.source);
        area.update("node", conn.source);
        scopes.update(editor.getNode(conn.source)?.parent!);
      }
    }
    return context;
  });
  
  const engine = new LeanflowEngine();
  editor.use(engine);

  vueRender.addPreset(
    VuePresets.classic.setup({
      customize : {
        socket(data) {
          if (data.payload instanceof ProofSocket) {
            return Render.Sockets.ProofSocket;
          }
          else if (data.payload instanceof TargetSocket){
            return Render.Sockets.TargetSocket;
          }
          else if (data.payload instanceof PropSocket){
            return Render.Sockets.PropSocket;
          }
        },
        // node(data) {
        //   return CustomNode;
        // },
        connection(data) {
          return Render.Connections.DefaultConnection;
        },
      }
    })
  );
  vueRender.addPreset(VuePresets.contextMenu.setup());

  AreaExtensions.simpleNodesOrder(area);

  editor.addPipe(async (context) => {
    if(context.type === "nodecreated") {
      const node = context.data;
      node.onDataChange = (name, oldVal, newVal) => {
        if(name === "parent") {
          engine.lock();
          engine.reassignParent(node, oldVal, newVal);
          editor.getConnections().filter(c => c.source === node.id || c.target === node.id)
            .filter(c => !areScopeCompatible(editor, c))
            .forEach(c => editor.removeConnection(c.id));
          
            engine.unlock();
        }
        if(name === "width" || name === "height"){ // call resize
          area.resize(context.data.id, context.data.width, context.data.height);
        }
        else { // re-render node
          area.update("node", context.data.id);
        }
      }

      engine.lock()
      await node.onCreated(editor);
      engine.unlock()
    }
    return context;
  });

  const scopes = new ScopesPlugin<Schemes>({
    filter(candidates, children) {
      return {
        parents: candidates.filter(c => editor.getNode(c) instanceof ParentNode),
        children: children.filter(c => editor.getNode(c)?.canChangeParent)
      }
    },
    exclude(id) {
      return !!editor.getNode(id)?.fixedSize;
    },
    padding(id) {
      return {
        left: 120,
        top: 40,
        right: 120,
        bottom: 20
      }
    },
  });
  scopes.addPreset(ScopesPresets.classic.setup());
  area.use(scopes);

  const selector = AreaExtensions.selector()
  const accumulating = AreaExtensions.accumulateOnCtrl()

  AreaExtensions.selectableNodes(area, selector, { accumulating });

  const input = new InputNode();
  const target = new TargetNode();
  await editor.addNode(input);
  await editor.addNode(target);

  const arrange = new AutoArrangePlugin<Schemes>();

  arrange.addPreset(ArrangePresets.classic.setup());

  area.use(arrange);

  await arrange.layout();

  return {
    destroy: () => area.destroy(),
  };
}
