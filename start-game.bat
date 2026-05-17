@echo off
setlocal

cd /d "%~dp0"

set "GAME_URL=http://localhost:3000"

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $response = Invoke-WebRequest -Uri '%GAME_URL%' -UseBasicParsing -TimeoutSec 1; if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) { exit 0 } } catch { exit 1 }"
if not errorlevel 1 (
  start "" "%GAME_URL%"
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

start "ValleyEmbers Server" /min cmd /k ""%NODE_EXE%" server.js"
timeout /t 1 /nobreak >nul
start "" "%GAME_URL%"

endlocal
