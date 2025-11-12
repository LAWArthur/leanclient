import { ContextMenuPlugin, Presets as ContextMenuPresets } from "rete-context-menu-plugin";
import { ReductionNode, LemmaNode, ApplyNode, InvokeNode, ForallIntroNode, CasesNode, ByCasesNode, ContraNode, AbsurdNode, SplitAppNode, ConstructorNode, ExistsElimNode, ForallConstructNode, AppConstNode, SortNode, RewriteNode, RewriteGoalNode, ExistsConstructNode } from "./nodes";

export const contextMenu = new ContextMenuPlugin({
    items: ContextMenuPresets.classic.setup(
        [
            ["基本推理规则",
                [
                    ["分离/实例化", () => new ReductionNode],
                    ["反向推理", () => new ApplyNode],
                    ["分解", () => new SplitAppNode],
                    ["构造", () => new ConstructorNode],
                    ["引理", () => new LemmaNode],
                    ["分类讨论",
                        [
                            ["分类讨论", () => new CasesNode],
                            ["真假二值", () => new ByCasesNode]
                        ]
                    ],
                    ["反证法",
                        [
                            ["反证法", () => new ContraNode],
                            ["矛盾", () => new AbsurdNode]
                        ]
                    ],
                    ["重写",
                        [
                            ["重写前提", () => new RewriteNode],
                            ["重写结论", () => new RewriteGoalNode]
                        ]
                    ]
                ]
            ],
            ["构造类型",
                [
                    ["合取", () => new AppConstNode("And", "合取")],
                    ["析取", () => new AppConstNode("Or", "析取")],
                    ["非", () => new AppConstNode("Not", "非")],
                    ["蕴含/非依值箭头", () => new AppConstNode("nondependent_arrow", "蕴含/非依值箭头")],
                    ["全称构造", () => new ForallConstructNode],
                    ["存在构造", () => new ExistsConstructNode],
                    ["命题", () => new SortNode(0, "命题")]
                ]
            ],
            ["析取",
                [
                    ["左引入", () => new InvokeNode("Or.inl", "∨左引入")],
                    ["右引入", () => new InvokeNode("Or.inr", "∨右引入")],
                    ["结合律", () => new InvokeNode("or_assoc", "∨结合律")],
                    ["交换律", () => new InvokeNode("or_comm", "∨交换律")],
                    ["左分配律", () => new InvokeNode("or_and_left", "∨左分配律")],
                    ["右分配律", () => new InvokeNode("or_and_right", "∨右分配律")],
                    ["等幂律", () => new InvokeNode("or_self", "∨等幂律")],
                    ["摩根律", () => new InvokeNode("not_or", "∨摩根律")],
                    ["同一律", () => new InvokeNode("or_false", "∨同一律")],
                    ["零律", () => new InvokeNode("or_true", "∨零律")],
                    ["排中律", () => new InvokeNode("Classical.em", "排中律")],
                    ["左归结", () => new InvokeNode("Or.resolve_left", "∨左归结")],
                    ["右归结", () => new InvokeNode("Or.resolve_right", "∨右归结")]
                ]
            ],
            ["合取",
                [
                    ["引入", () => new AppConstNode("And.intro", "∧")],
                    ["结合律", () => new InvokeNode("and_assoc", "∧结合律")],
                    ["交换律", () => new InvokeNode("and_comm", "∧交换律")],
                    ["左分配律", () => new InvokeNode("and_or_left", "∧左分配律")],
                    ["右分配律", () => new InvokeNode("and_or_right", "∧右分配律")],
                    ["等幂律", () => new InvokeNode("and_self", "∧等幂律")],
                    ["摩根律", () => new InvokeNode("Decidable.not_and_iff_not_or_not", "∨摩根律")],
                    ["同一律", () => new InvokeNode("and_true", "∧同一律")],
                    ["零律", () => new InvokeNode("and_false", "∧零律")],
                    ["无矛盾律", () => new InvokeNode("and_not_self", "无矛盾律")]
                ]
            ],
            ["蕴含",
                [
                    ["等值式", () => new InvokeNode("Decidable.imp_iff_not_or", "蕴含等值式")],
                    ["逆否命题", () => new InvokeNode("Decidable.not_imp_not", "逆否命题")]
                ]
            ],
            ["否定",
                [
                    ["双重否定", () => new InvokeNode("Decidable.not_not", "双重否定")]
                ]
            ],
            ["双蕴含",
                [
                    ["引入", () => new InvokeNode("Iff.intro", "↔引入")],
                    ["等值式", () => new InvokeNode("Decidable.iff_iff_and_or_not_and_not", "↔等值式")]
                ]
            ],
            ["量词",
                [
                    ["全称量词引入", () => new ForallIntroNode],
                    ["存在量词消去", () => new ExistsElimNode]
                ]
            ]
        ]
    )
});