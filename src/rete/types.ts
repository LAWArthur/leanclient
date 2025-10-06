import { Connection } from "./connection";
import { Node } from "./nodes";
import { GetSchemes } from "rete";

export { Node };



export type Schemes = GetSchemes<Node, Connection<Node, Node>>;

export type FixedSize = { left?: number, top?: number, right?: number, bottom?: number, width?: number, height?: number };