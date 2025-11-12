import * as rpc from "vscode-jsonrpc/node"
import * as cp from 'child_process';
import path from "path";
import { rootDir } from "./utils";

export type Request = {
    method: string,
    params?: any
}

export class Server {
    conn: rpc.MessageConnection;
    serverProcess: cp.ChildProcess;

    constructor(){
        this.serverProcess = cp.spawn(path.join(rootDir, 'lean_backend/lean_backend.exe'), [], 
            { cwd: path.join(rootDir, 'lean_backend/') });
        this.conn = rpc.createMessageConnection(
            new rpc.StreamMessageReader(this.serverProcess.stdout!, "utf-8"),
            new rpc.StreamMessageWriter(this.serverProcess.stdin!, "utf-8"),
            console
        );
        this.serverProcess.on("close", (code) => console.error("Backend exited with code ", code));
        this.conn.listen();
    }

    async request(req: Request) : Promise<any> {
        const resp = await this.conn.sendRequest(req.method, req.params);
        return resp;
    }
}