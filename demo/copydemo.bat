@echo off
rem Publish the built demo into the served docs\demo\ folder, reachable at
rem https://florissteenkamp.github.io/FloBezier/demo/
rem Run this AFTER "npm run build:web" AND AFTER copydocs.bat (which clears docs\).

set "SRC=%~dp0"
set "DST=%~dp0..\docs\demo"

if not exist "%SRC%dist\index.js" (
    echo Demo bundle not found at "%SRC%dist\index.js". Run "npm run build:web" first.
    exit /b 1
)

if exist "%DST%" rmdir /s /q "%DST%"
mkdir "%DST%"

xcopy /q /y "%SRC%index.html" "%DST%\"
xcopy /q /y "%SRC%style.css" "%DST%\"
xcopy /q /s /e /i /y "%SRC%dist" "%DST%\dist"
