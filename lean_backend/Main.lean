import LeanBackend
import Lean
import Lean.PrettyPrinter.Delaborator
import Init
import Lean.PrettyPrinter
open Lean Meta ProofDAG

def setupSearchPath : IO Unit := do
-- -- Core + Std from the installed sysroot
--   Lean.initSearchPath (← Lean.findSysroot)
-- -- Also add your project’s compiled olean directory if you need your own modules
  let buildLib := (← IO.currentDir) / "lib"
  if (← buildLib.pathExists) then
    Lean.searchPathRef.set [buildLib / "lean", buildLib / "user"]

unsafe def main : IO Unit := do
  enableInitializersExecution
  setupSearchPath
  let opts : Options := {}
  let opts := pp.notation.set opts true
  let opts := pp.unicode.fun.set opts true
  let opts := pp.explicit.set opts false
  let opts := pp.funBinderTypes.set opts true
  let opts := pp.piBinderTypes.set opts true
  let opts := pp.mvars.set opts false
  let env ← importModules #[{module := `Init}, {module := `TestLib}] {} 0 #[] false true

  _ ← MetaM.toIO (do
      Meta.addInstance ``Classical.propDecidable .local 10
      Rpc.loop (← IO.getStdin) (← IO.getStdout) Rpc.handleRequest
    ) { fileName := "<meta>", fileMap := {source := "", positions := #[]}, options := opts } { env }
