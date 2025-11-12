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
import { Node } from './nodes';
import { Connection } from './connection';
import { areConnected, areScopeCompatible, getConnectionSockets, getCurrentContext, getSizeAndTranslation, getSocketConnections } from './utils';
import * as Render from './render';
import { ProofSocket, PropSocket, TargetSocket } from './sockets';
import CustomNode from '@/customization/CustomNode.vue';
import { contextMenu } from './contextmenu';
import { InputNode, ParentNode, OutputNode } from './nodes/basic';
import { ScopesPlugin, Presets as ScopesPresets } from 'rete-scopes-plugin';
import { CommunicationPlugin } from './communication';
import { ContextId, ProofGraphInfo } from './servertypes';
import { node } from 'rete-area-3d-plugin/_types/extensions/forms';
import { Ref, render } from 'vue';
import { InputControl } from './controls';



type AreaExtra = Area2D<Schemes> | VueArea2D<Schemes> | ContextMenuExtra;


export async function createEditor(container: HTMLElement, isDoneRef : Ref<boolean>, initialize?: {decl : string, depth : number | null}) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const vueRender = new VuePlugin<Schemes, AreaExtra>();
  const communication = new CommunicationPlugin();

  editor.use(area);
  editor.use(communication);

  area.use(vueRender);

  area.use(connection);
  
  area.use(contextMenu);

  area.addPipe(
    context => {
      if(context.type === "nodetranslate"){
        if(context.data.previous.x === context.data.position.x && context.data.previous.y === context.data.position.y) return;
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
        children.forEach( c => {
          area.translate(c.id, { x: 0, y: 0 });
        } )
      }
      else if (context.type === "noderesize") {
        return; // Disable resizing by area plugin. We write one of our own. 
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
      communication.beginTransaction();
      const conn = (context as any).data as Connection<Node, Node>;
      const sockets = getConnectionSockets(editor, conn);
      if (sockets.target) {
        sockets.target.isConnected = !!getSocketConnections(editor, sockets.target)?.length;

      }
      if(sockets.source) {
        sockets.source.isConnected = !!getSocketConnections(editor, sockets.source)?.length;
      }
      if(context.type == "connectioncreated") {
        communication.addConnection({
          frm: { nodeId: editor.getNode(conn.source)!.nodeId!, sockId: conn.sourceOutput },
          to: { nodeId: editor.getNode(conn.target)!.nodeId!, sockId: conn.targetInput }
        });
      }
      if(context.type == "connectionremoved") {
        communication.removeConnection({
          frm: { nodeId: editor.getNode(conn.source)!.nodeId!, sockId: conn.sourceOutput },
          to: { nodeId: editor.getNode(conn.target)!.nodeId!, sockId: conn.targetInput }
        });
      }
      communication.endTransaction();
    }
    return context;
  });

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
        node(data) {
          return CustomNode;
        },
        connection(data) {
          return Render.Connections.DefaultConnection;
        },
        control(data) {
          if (data.payload instanceof InputControl){
            if(data.payload.type === 'checkbox') {
              return Render.Controls.Toggle;
            }
            return Render.Controls.Control;
          }
            
        }
      }
    })
  );
  vueRender.addPreset(VuePresets.contextMenu.setup({
    delay: 50
  }));

  AreaExtensions.simpleNodesOrder(area);

  editor.addPipe(async (context) => {
    if(context.type === "nodecreated") {
      const node = context.data;
      node.editor = editor;
      node.eventOnNodeDataChange = data => {
        communication.beginTransaction();
        communication.setNodeData(node.nodeId!, data);
        communication.endTransaction();
      }
      node.eventOnPropertyChange = (name, oldVal, newVal) => {
        if(name === "parent") {
          communication.beginTransaction();
          if(!(node.doNotAdd || node.isPseudo) && node.nodeId && rootCtx) {
            communication.setNodeContext(node.nodeId, getCurrentContext(editor, node.id, rootCtx));
          }
          editor.getConnections().filter(c => c.source === node.id || c.target === node.id)
            .filter(c => !areScopeCompatible(editor, c))
            .forEach(c => editor.removeConnection(c.id));
          communication.endTransaction();
        }
        if(name === "width" || name === "height"){ // call resize
          area.update("node", node.id);
          const view = node && area.nodeViews.get(node.id);
          if(!node || !view) return;
          const children = editor.getNodes().filter(n => n.fixedSize && n.parent === node.id);
          children.forEach( c => {
            area.translate(c.id, { x: 0, y: 0 });
          } );
        }
        else { // re-render node
          area.update("node", node.id);
        }
      }
      communication.beginTransaction();
      if(!(node.doNotAdd || node.isPseudo)) {
        const result = await communication.addNode(node.type);
        node.nodeId = result.nodeId;
      }
      await node.onCreated(editor);
      communication.endTransaction();
    }
    return context;
  });

  editor.addPipe(async context => {
    if(context.type === "noderemoved") {
      const node = context.data;
      communication.beginTransaction();
      const parent = node.parent;
      for(const n of editor.getNodes()) {
        if(n.parent === node.id){
          if(n.doNotAdd || n.isPseudo) setTimeout(() => editor.removeNode(n.id), 1); // Explicitly pending this to next microloop
          n.parent = parent;
        }
      }
      for(const c of editor.getConnections()) {
        if(c.source === node.id || c.target === node.id){
          await editor.removeConnection(c.id);
        }
      } 
      communication.removeNode(node.nodeId!);
      communication.endTransaction();
    }
    return context;
  })

  communication.addPipe(context => {
    if(context.type == "inforeceived") {
      editor.getNodes().forEach(n => {
        if(!n.isPseudo){
          n.onReceiveInfo(context.data);
        }
      });
      editor.getNodes().forEach(n => {
        area.update("node", n.id);
        if(n.parent) scopes.update(n.parent);
      })
      if(context.data.isDone) console.log("DONE!!!");
      isDoneRef.value = context.data.isDone;
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
        left: 220,
        top: 40,
        right: 220,
        bottom: 20
      }
    },
    size(id, size) {
      const ch = editor.getNodes().filter(n => n.fixedSize !== undefined && n.parent === id);
      return ch.reduce((size, c) => {
        if(!c.getActualView) return size;
        const view = c.getActualView();
        return {
          width: Math.max(size.width, view.width),
          height: Math.max(size.height, view.height)
        }
      }, size);
    }
  });
  scopes.addPreset(ScopesPresets.classic.setup());
  area.use(scopes);

  const selector = AreaExtensions.selector()
  const accumulating = AreaExtensions.accumulateOnCtrl()

  AreaExtensions.selectableNodes(area, selector, { accumulating });

  const input = new InputNode();
  const target = new OutputNode();
  await editor.addNode(input);
  await editor.addNode(target);

  const pgInfo : ProofGraphInfo = await 
    ((initialize && initialize.decl) ? communication.initializeByInput(initialize.decl, initialize.depth) : communication.initialize("test9", null));
  const rootCtx = pgInfo.baseCtx;
  const ctxInfo = pgInfo.contexts.find(ctx => ctx.contextId === rootCtx)!;
  input.nodeId = ctxInfo.inputNode;
  target.nodeId = ctxInfo.outputNode;
  input.onReceiveInfo(pgInfo);
  target.onReceiveInfo(pgInfo);
  editor.getNodes().forEach(n => {
    area.update("node", n.id);
    if(n.parent) scopes.update(n.parent);
  });

  const arrange = new AutoArrangePlugin<Schemes>();

  arrange.addPreset(ArrangePresets.classic.setup());

  area.use(arrange);

  await arrange.layout();

  return {
    destroy: () => {
      area.destroy()
    }
  };
}
