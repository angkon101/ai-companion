@echo off
title AI Coding Companion Desktop
cd /d "%~dp0"

echo Starting AI Companion...
start /b cmd /c "npm run dev"

echo Waiting for server...
timeout /t 2 /nobreak >nul

echo Launching standalone desktop window...
start msedge --app=http://localhost:3333 --window-size=380,640

exit
