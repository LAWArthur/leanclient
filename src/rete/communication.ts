import { NodeEditor, NodeId, Root, Scope } from "rete";
import { ConnectionInfo, ConnectionSocketInfo, ContextId, ProofGraphInfo } from "./servertypes";
import { Schemes } from "./types";
import axios, { AxiosResponse } from "axios"

export type Transaction = {
    method: string
    params: any
};

export type CommunicationMessages =
  | { type: 'inforeceived', data: ProofGraphInfo }

export class CommunicationPlugin extends Scope<CommunicationMessages, [Root<Schemes>]> {
    transactions: Promise<AxiosResponse<any, any, {}>>[] | null = null;
    lockVal: number = 0;

    constructor() {
        super("communication");
    }

    beginTransaction() {
        this.lockVal++;
        this.transactions = [];
    }

    endTransaction() {
        this.lockVal--;
        if(this.lockVal === 0){
            Promise.all(this.transactions!).then(() => this.getInfo().then(
                data => {
                    this.emit({type: "inforeceived", data: data});
                }
            ))
            this.transactions = null;
        }
    }

    transact(result: Promise<AxiosResponse<any, any, {}>>){
        if(this.transactions !== null) this.transactions.push(result);
        else {
            result.then(this.getInfo).then(data => {
                    this.emit({type: "inforeceived", data: data});
            });
        }
    }

    async getInfo() {
        const result = axios.post("/api", {
            method: "processGraph"
        })
        // this.transactions.push(result);
        return (await result).data;
    }

    async initialize(declName: string, depth: number | null) {
        const result = axios.post("/api", {
            method: "initialize",
            params: {
                declName: declName,
                depth: depth
            }
        });
        return (await result).data;
    }

    async initializeByInput(decl: string, depth: number | null) {
        const result = axios.post("/api", {
            method: "initializeByInput",
            params: {
                decl: decl,
                depth: depth
            }
        });
        return (await result).data;
    }

    async addConnection(conn: ConnectionInfo) {
        const result = axios.post("/api",{
            method: "addConnection",
            params: conn
        });
        this.transact(result);
        return (await result).data;
    }

    async removeConnection(conn: ConnectionInfo) {
        const result = axios.post("/api", {
            method: "removeConnection",
            params: conn
        });
        this.transact(result);
        return (await result).data;
    }

    async addNode(type: string) {
        const result = axios.post("/api", {
            method: "addNode",
            params: {
                type: type
            }
        });
        this.transact(result);
        return (await result).data;
    }

    async removeNode(nodeId: NodeId) {
        const result = axios.post("/api", {
            method: "removeNode",
            params: {
                nodeId: nodeId
            }
        });
        this.transact(result);
        return (await result).data;
    }

    async setNodeContext(nodeId: NodeId, ctxId: ContextId) {
        const result = axios.post("/api", {
            method: "setNodeContext",
            params: {
                nodeId: nodeId,
                contextId: ctxId
            }
        });
        this.transact(result);
        return (await result).data;
    }

    async setNodeData(nodeId: NodeId, data: any) {
        const result = axios.post("/api", {
            method: "setNodeData",
            params: {
                nodeId: nodeId,
                data: data
            }
        });
        this.transact(result);
        return (await result).data;
    }
}