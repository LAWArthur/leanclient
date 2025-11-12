import { ApplyNode, InputNode, LemmaNode, ReductionNode, OutputNode } from './basic'

export { Node } from './node'

export { ReductionNode, LemmaNode, ApplyNode, InputNode, OutputNode as TargetNode, InvokeNode } from "./basic"

export { ForallIntroNode, ExistsElimNode } from "./quantifiers"

export { CasesNode, ByCasesNode } from "./cases"

export { ContraNode, AbsurdNode } from "./contra"
export { ConstructorNode, SplitAppNode } from "./constructor"
export { ForallConstructNode, ExistsConstructNode, AppConstNode, SortNode } from "./construct"
export { RewriteNode, RewriteGoalNode } from "./rewrite"

export const DeductionalNode = [InputNode, ReductionNode,  LemmaNode];

export const AnalyticalNode = [OutputNode, ApplyNode];

export const StartNode = [InputNode]; // What can be determined as the beginning of proof