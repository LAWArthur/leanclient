import Lean
open Lean

namespace Rpc

structure RpcRequest where
  jsonrpc : String := "2.0"
  method  : String
  id?     : Option Json := none
  params? : Option Json := none
deriving FromJson, ToJson

/-- JSON-RPC error object. -/
structure RpcError where
  code    : Int
  message : String
  data?   : Option Json := none
deriving ToJson

/-- JSON-RPC response. Exactly one of result?/error? should be set. -/
structure RpcResponse where
  jsonrpc : String := "2.0"
  id      : Json
  result? : Option Json := none
  error?  : Option RpcError := none
deriving ToJson

/-- Send a JSON-RPC message with Content-Length framing. -/
def sendJsonRpc (h : IO.FS.Stream) (j : Json) : IO Unit := do
  let payload := j.compress
  let bytes := payload.toUTF8
  h.putStr s!"Content-Length: {bytes.size}\r\n\r\n"
  h.write bytes
  h.flush

-- From Communication.lean
private def parseHeaderField (s : String) : Option (String × String) := do
    guard $ s ≠ "" ∧ s.takeRight 2 = "\r\n"
    let xs := (s.dropRight 2).splitOn ": "
    match xs with
    | []  => none
    | [_] => none
    | name :: value :: rest =>
      let value := ": ".intercalate (value :: rest)
      some ⟨name, value⟩

-- From Communication.lean
private partial def readHeaderFields (h : IO.FS.Stream) (found : Bool := false) : IO (List (String × String)) := do
    let l ← h.getLine
    if l.isEmpty then
      throw $ IO.userError "Stream was closed"
    if l = "\r\n" then
      if found then
        pure []
      else
        readHeaderFields h
    else
      match parseHeaderField l with
      | some hf =>
        let tail ← readHeaderFields h true
        pure (hf :: tail)
      | none =>
        throw $ IO.userError s!"Invalid header field: {repr l}"

partial def readMethod (h : IO.FS.Stream) : IO (String × String × String) := do
  let l ← h.getLine
  if l.isEmpty then
    throw $ IO.userError "Stream was closed"
  if l = "\r\n" then
    return ← readMethod h
  let xs := (l.dropRight 2).splitOn " "
  match xs with
  | [method, url, proto] => return ⟨method, url, proto⟩
  | _ => throw $ IO.userError "Bad method"

-- From Communication.lean
def readHeader (h : IO.FS.Stream) : IO Nat := do
    -- let _ ← readMethod h
    let fields ← readHeaderFields h
    match fields.lookup "Content-Length" with
    | some length => match length.toNat? with
      | some n => pure n
      | none   => throw $ IO.userError s!"Content-Length header field value '{length}' is not a Nat"
    | none => throw $ IO.userError s!"No Content-Length field in header: {fields}"

/-- Main loop: buffered, robust framing; handles partial/multiple packets. -/
partial def loop
  (hin hout : IO.FS.Stream) (handleRequest : RpcRequest → MetaM (Option RpcResponse)) : MetaM Unit := do
  while true do
    let length ← readHeader hin
    let j ← hin.readJson length
    match fromJson? j with
    | .error e =>
      -- -32600 Invalid Request
      let rsp : RpcResponse := {
        id := Json.null
        error? := some { code := -32600, message := "Invalid Request", data? := some (toJson e) }
      }
      sendJsonRpc hout (toJson rsp)
    | .ok req =>
      try
        if let some rsp ← handleRequest req then
          sendJsonRpc hout (toJson rsp)
      catch e =>
        let rsp : RpcResponse := {
          id := Json.null
          error? := some { code := -1, message := "Unexpected Error", data? := some (toString (← e.toMessageData.format)) }
        }
        sendJsonRpc hout (toJson rsp)

  -- At EOF, you could also attempt a final drain (but without a full frame we ignore).

initialize rpcServices : IO.Ref <| Std.HashMap String (Option Json → MetaM Json) ← IO.mkRef {}

def registerService  (method : String) (α : Type) [FromJson α] (service : Option α → MetaM Json) : IO Unit :=
  let wrapped : Option Json → MetaM Json := fun j =>
    match j with
    | some j =>
      match fromJson? j with
      | .ok params => service $ some params
      | .error e => throwError e
    | none => service none
  rpcServices.modify (·.insert method wrapped)

def handleRequest (req : Rpc.RpcRequest) : MetaM (Option Rpc.RpcResponse) := do
  match req.id? with
  | none =>
    -- notification: no response required
    pure none
  | some id =>
    match (← rpcServices.get).get? req.method with
    | some service =>
      pure <| some { id := id, result? := some (← service req.params?) }
    | _ =>
      pure <| some {
        id := id
        error? := some { code := -32601, message := s!"Method not found {req.method}" }
      }

end Rpc
