import path from "path"

export const rootDir = (process as any).pkg ? path.dirname(process.execPath) : __dirname;