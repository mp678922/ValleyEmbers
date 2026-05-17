@echo off
setlocal

cd /d "%~dp0"

set "EDITOR_URL=http://localhost:3100"

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $response = Invoke-WebRequest -Uri '%EDITOR_URL%' -UseBasicParsing -TimeoutSec 1; if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) { exit 0 } } catch { exit 1 }"
if not errorlevel 1 (
  start "" "%EDITOR_URL%"
  endlocal
  exit /b 0
)

set "NODE_EXE=node"
where node >nul 2>nul
if errorlevel 1 (
  if exist "%LOCALAPPDATA%\OpenAI\Codex\bin\node.exe" (
    set "NODE_EXE=%LOCALAPPDATA%\OpenAI\Codex\bin\node.exe"
  ) else (
    echo Node.js was not found.
    echo Install Node.js or run this project from an environment that provides node.exe.
    pause
    exit /b 1
  )
)

start "ValleyEmbers Editor" /min cmd /k ""%NODE_EXE%" editor\server\index.mjs"
timeout /t 1 /nobreak >nul
start "" "%EDITOR_URL%"

endlocal
