import { ApplyNode, InputNode, LemmaNode, ReductionNode, TargetNode } from './basic'

export { Node } from './node'

export { NumberNode, AddNode } from "./example"

export { ReductionNode, LemmaNode, ApplyNode, InputNode, TargetNode } from "./basic"

export const DeductionalNode = [InputNode, ReductionNode,  LemmaNode];

export const AnalyticalNode = [TargetNode, ApplyNode];

export const StartNode = [InputNode]; // What can be determined as the beginning of proof