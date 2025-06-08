@echo off
echo Starting IPTV Web Player Local Server...
echo.
echo Opening browser to http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

REM Try to use Python 3 first
python -m http.server 8000 2>nul
if errorlevel 1 (
    REM If Python 3 fails, try Python 2
    python -m SimpleHTTPServer 8000 2>nul
    if errorlevel 1 (
        echo Error: Python is not installed or not in PATH
        echo.
        echo Please install Python from https://python.org
        echo Or run this manually in the project directory:
        echo   python -m http.server 8000
        echo.
        echo Alternatively, you can:
        echo 1. Install Node.js and run: npx serve
        echo 2. Use any other local web server
        echo 3. Open index.html directly in your browser
        pause
        exit /b 1
    )
)
