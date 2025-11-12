$leanpath = lean --print-prefix

Write-Output "Lean library path: $leanpath"

Write-Output "Setting up folders..."

mkdir -Path "dist" -Force
mkdir -Path "dist/lean_backend" -Force
mkdir -Path "dist/lean_backend/lib" -Force
mkdir -Path "dist/lean_backend/lib/lean" -Force
mkdir -Path "dist/lean_backend/lib/user" -Force

Write-Output "Installing modules..."

npm install

Write-Output "Building frontend..."

npm run build

Write-Output "Building backend..."

npm run build --workspace backend
npm run pkg --workspace backend

Write-Output "Building Lean backend..."
cd .\lean_backend
lake build lean_backend
lake build TestLib
cd ..

Write-Output "Copying files to make final distribution..."

cp -Path ".\backend\build\leanclient.exe" -Destination ".\dist\leanclient.exe"
cp -Path "$leanpath\bin\libInit_shared.dll" -Destination ".\dist\lean_backend\libInit_shared.dll"
cp -Path "$leanpath\bin\libleanshared.dll" -Destination ".\dist\lean_backend\libleanshared.dll"
cp -Path "$leanpath\bin\libleanshared_1.dll" -Destination ".\dist\lean_backend\libleanshared_1.dll"
cp -Path ".\lean_backend\.lake\build\bin\lean_backend.exe" -Destination ".\dist\lean_backend\lean_backend.exe"
cp -Path "$leanpath\lib\lean\Init.ilean" -Destination ".\dist\lean_backend\lib\lean\Init.ilean"
cp -Path "$leanpath\lib\lean\Init.olean" -Destination ".\dist\lean_backend\lib\lean\Init.olean"
cp -Path "$leanpath\lib\lean\Init.olean.private" -Destination ".\dist\lean_backend\lib\lean\Init.olean.private"
cp -Path "$leanpath\lib\lean\Init.olean.server" -Destination ".\dist\lean_backend\lib\lean\Init.olean.server"
cp -Recurse -Path "$leanpath\lib\lean\Init" -Destination ".\dist\lean_backend\lib\lean\Init"
cp -Path ".\lean_backend\.lake\build\lib\lean\TestLib.ilean" -Destination ".\dist\lean_backend\lib\user\TestLib.ilean"
cp -Path ".\lean_backend\.lake\build\lib\lean\TestLib.olean" -Destination ".\dist\lean_backend\lib\user\TestLib.olean"

Write-Output "DONE"