import { ContextMenuPlugin, Presets as ContextMenuPresets } from "rete-context-menu-plugin";
import { ReductionNode, LemmaNode, ApplyNode } from "./nodes";

export const contextMenu = new ContextMenuPlugin({
    items: ContextMenuPresets.classic.setup(
        [
            ["Basic", 
                [
                    ["Reduction", () => new ReductionNode],
                    ["Lemma", () => new LemmaNode],
                    ["Apply", () => new ApplyNode]
                ]
            ]
        ]
    )
});