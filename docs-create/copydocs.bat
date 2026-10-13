@echo off
rem Publish the built Docusaurus site into the served docs\ folder.
rem Run this AFTER "npm run build" (from the docs-create folder or anywhere).

set "SRC=%~dp0build"
set "DST=%~dp0..\docs"

if not exist "%SRC%" (
    echo Build output not found at "%SRC%". Run "npm run build" first.
    exit /b 1
)

rem Clear the destination so removed pages don't linger, then copy the fresh build.
if exist "%DST%" rmdir /s /q "%DST%"
xcopy /q /s /e /i /y "%SRC%" "%DST%"
