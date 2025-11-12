# leanclient

A visualized theorem prover based on Lean 4

![demo1](assets/images/demo1.png)

## Requirements

Supported platform: Windows

## Installation

### Prebuilt binaries

[Download here](https://github.com/LAWArthur/leanclient/releases/latest)

### Build from source

- [Git](https://git-scm.com/install/)
- [Node.js](https://nodejs.org/en/download) >= v22.18.0
- [Lean 4 Toolchain](https://github.com/leanprover/elan)
- [Powershell](https://aka.ms/powershell-release?tag=stable)

Open Powershell under the installation folder and run: 

```bash
git clone https://github.com/LAWArthur/leanclient.git
cd leanclient
./build.ps1
```

It may take a few minutes to compile and build. The built binaries are in `dist/`.

If you run into any issues, try to build and assemble manually according to the script. 

## Usage

Double click on `leanclient.exe` in the distribution directory to start the server. Then visit `https://localhost:8081` and you may start theorem proving. 

The server port can be set manually through environment variable `PORT`.

## Tutorials

[快速入门](https://github.com/LAWArthur/leanclient/wiki/Getting-Started)

[Lean 依值类型论](https://github.com/LAWArthur/leanclient/wiki/Tutorials)

## Related Links

[Lean Theorem Prover](https://lean-lang.org/)
