import LeanBackend.ProofGraph
import Lean
open Lean Meta

namespace ProofDAG
def getExprInfo (expr : Expr) : MetaM Json := do
  return s!"{← ppExpr expr}"

def InputSocket.getInfo (socket : InputSocket) : MetaM Json :=
  match socket with
  | .expr sock => do
    return .mkObj [
      ("sockId", Socket.id sock),
      ("type", "expr"),
      ("expected", ← match sock.expectedType with | some ex => return (← getExprInfo ex) | none => return .null)
    ]
  | .goal sock => do
    return .mkObj [
      ("sockId", Socket.id sock),
      ("type", "goal"),
      ("expected", ← match sock.goal with | some mvar => return ← getExprInfo (← mvar.getType) | none => return .null)
    ]

def OutputSocket.getInfo (socket : OutputSocket) : MetaM Json :=
  match socket with
  | .expr sock => do
    match sock.data with
    | some data =>
      let ty ← inferType data
      let tyty ← inferType ty
      if ← isDefEq tyty (.sort .zero) then
        return .mkObj [
          ("sockId", Socket.id sock),
          ("type",  "expr"),
          ("exprType", (← getExprInfo ty)),
          ("exprValue", .null)
        ]
      else return .mkObj [
          ("sockId", Socket.id sock),
          ("type",  "expr"),
          ("exprType", (← getExprInfo ty)),
          ("exprValue", (← getExprInfo data))
        ]
      | none =>
        return .mkObj [
          ("sockId", Socket.id sock),
          ("type",  "expr"),
          ("exprType", .null),
          ("exprValue", .null)
        ]
  | .goal sock => do
    return .mkObj [
      ("sockId", Socket.id sock),
      ("type", "goal")
    ]

def Node.mkInfo (node : Node) : MetaM Json := do
  withLCtx (← node.getLCtx) (← getLocalInstances) do
    let s ← node.getState
    return .mkObj [
      ("nodeId", node.nodeId),
      ("type", node.type),
      ("validity", match ← node.getValidity with
                    | .valid => "valid"
                    | .invalid => "invalid"
                    | .pending => "notUsed"
                    | .working => "internalError"),
      ("context", (← node.getContext).contextId),
      ("data", (← node.getData)),
      ("inputs", .arr (← s.inputs.mapM (·.getInfo)).toArray),
      ("outputs", .arr (← s.outputs.mapM (·.getInfo)).toArray)
    ]

def Connection.mkInfo (conn : Connection) : MetaM Json := do
  return .mkObj [
    ("frm", .mkObj [("nodeId", conn.fromSocket.1), ("sockId", conn.fromSocket.2)]),
    ("to", .mkObj [("nodeId", conn.toSocket.1), ("sockId", conn.toSocket.2)])
  ]

def Context.mkInfo (context : Context) : MetaM Json := do
  return .mkObj [
    ("contextId", context.contextId),
    ("possessor", match context.possessor with | some p => p | none => .null),
    ("inputNode", context.inputNode),
    ("outputNode", context.outputNode)
  ]

def ProofGraph.mkInfo (pg : ProofGraph) : MetaM Json := do
  return .mkObj [
    ("baseCtx", (← pg.baseContext.get).contextId),
    ("nodes", .arr (← (← pg.nodes.get).mapM (·.mkInfo)).toArray),
    ("connections", .arr (← (← pg.connections.get).mapM (·.mkInfo)).toArray),
    ("contexts", .arr (← (← pg.contexts.get).mapM (·.mkInfo)).toArray),
    ("isDone", ← pg.isDone)
  ]
end ProofDAG
