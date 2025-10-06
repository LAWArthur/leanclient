import * as rpc from 'vscode-jsonrpc/node';
import * as cp from 'child_process';
import * as lsp from 'vscode-languageserver-protocol';
import * as types from './types'
import { EventEmitter } from 'node:events';

type FileData = {
    version: number;
    diagnostics?: lsp.PublishDiagnosticsParams;
    ready: boolean;
}

class Signal {
  private _signal: EventEmitter = new EventEmitter();

  constructor() {
  }

  async wait(): Promise<void> {
    return new Promise((resolve, reject) => {

      const onSignal = () => {
        this._signal.off('signal', onSignal);
        resolve();
      };

      this._signal.on('signal', onSignal);
    });
  }

  signal(): void {
    this._signal.emit('signal');
  }
}

export class LeanClient {
    _client!: rpc.MessageConnection;
    _serverProcess!: cp.ChildProcess;
    version: string = "leanprover/lean4:v4.20.0";
    fileMap: Map<string, FileData>;
    fileProgressSignal: Signal = new Signal();

    constructor() {
        this.fileMap = new Map();
    }

    async initialize() {
        this._serverProcess = cp.spawn('elan', ["run", this.version, "lean", "--server"]);
        this._client = rpc.createMessageConnection(
            new rpc.StreamMessageReader(this._serverProcess.stdout!, "utf-8"),
            new rpc.StreamMessageWriter(this._serverProcess.stdin!, "utf-8")
        );

        this._client.onNotification(
            new rpc.NotificationType<lsp.PublishDiagnosticsParams>("textDocument/publishDiagnostics"),
            d => {
                this.fileMap.get(d.uri)!.diagnostics = d;
                console.log(d);
            }
        );

        this._client.onNotification(
            new rpc.NotificationType<types.LeanFileProgressParams>("$/lean/fileProgress"),
            info => {
                if(info.processing.length === 0 && this.fileMap.get(info.textDocument.uri)?.version === info.textDocument.version) {
                    this.fileMap.get(info.textDocument.uri)!.ready = true;
                    this.fileProgressSignal.signal();
                }
            }
        )

        this._client.onNotification((method: string, params: any[] | object | undefined) => {
            console.log(method, params);
        });

        this._client.listen();

        const result = await this._client.sendRequest(
            new rpc.RequestType<lsp.InitializeParams, lsp.InitializeResult, lsp.InitializeError>("initialize"), 
            {
                processId: null,
                rootUri: null,
                capabilities: {
                    textDocument: {
                        synchronization: {
                            dynamicRegistration: false
                        },
                        diagnostic: {
                            dynamicRegistration: false
                        }
                    }
                }
            }
        );

        this._client.sendNotification(
            new rpc.NotificationType<lsp.InitializedParams>("initialized"),
            {}
        );
    }

    openFile(uri: string) {
        this._client.sendNotification(
            new rpc.NotificationType<lsp.DidOpenTextDocumentParams>("textDocument/didOpen"), 
            {
                textDocument: {
                    uri: uri,
                    languageId: "Lean",
                    version: 1,
                    text: ""
                }
            } 
        );
        this.fileMap.set(uri, { version: 1, ready: false });
    }

    changeFile(uri: string, content: string) {
        const data = this.fileMap.get(uri);
        if(data === undefined) return;
        data.version += 1;
        data.ready = false;
        this._client.sendNotification(
            new rpc.NotificationType<lsp.DidChangeTextDocumentParams>("textDocument/didChange"),
            {
                textDocument: {
                    uri: uri, 
                    version: data.version
                }, 
                contentChanges: [
                    {
                        text: content
                    }
                ]
            }
        );
    }

    async waitForFileReady(uri: string) {
        let { ready } = this.fileMap.get(uri) ?? {};
        while (!ready) {
            await this.fileProgressSignal.wait();
            ({ ready } = this.fileMap.get(uri) ?? {});
        }
    }

    async fetchDiagnostics(uri: string) {
        await this.waitForFileReady(uri);
        const { diagnostics } = this.fileMap.get(uri)!;
        return diagnostics;
    }

    async shutdown() {
        await this._client.sendRequest("shutdown");
        this._client.sendNotification("exit");
    }

    async fetchGoals(uri: string, position: lsp.Position) {
        const result = await this._client.sendRequest(
            new rpc.RequestType<types.PlainGoalParams, types.PlainGoal, lsp.ResponseError>("$/lean/plainGoal"), 
            {
                textDocument: {
                    uri: uri
                },
                position: position
            }
        );
        return result.goals;
    }
}