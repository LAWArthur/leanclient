import express from "express"
import { Server } from "./server";
import path from "path";
import { rootDir } from "./utils";

const PORT = process.env.PORT || 8081;

const app = express();

const server = new Server();

app.use(express.json());

app.use(express.static(path.join(rootDir, 'public')))

app.post("/api", async (req, res) => {
    if(req.body == undefined) res.sendStatus(200);
    else {
        const resp = await server.request(req.body);
        res.send(resp);
    }
});

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(rootDir, 'public', 'index.html'))
  }
})

const appServer = app.listen(PORT, function () {
    const host = (appServer.address()! as any).address;
    const port = (appServer.address()! as any).port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})