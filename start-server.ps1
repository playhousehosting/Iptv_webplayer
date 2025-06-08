# IPTV Web Player - Local Development Server
# This script starts a local web server for development and testing

Write-Host "🎬 IPTV Web Player - Local Server" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$port = 8000
$url = "http://localhost:$port"

# Function to test if a port is available
function Test-Port {
    param([int]$Port)
    try {
        $tcpClient = New-Object System.Net.Sockets.TcpClient
        $tcpClient.Connect("localhost", $Port)
        $tcpClient.Close()
        return $false
    }
    catch {
        return $true
    }
}

# Find an available port
while (-not (Test-Port $port)) {
    $port++
    if ($port -gt 8010) {
        Write-Host "❌ Could not find an available port between 8000-8010" -ForegroundColor Red
        exit 1
    }
}

$url = "http://localhost:$port"

Write-Host "🚀 Starting server on $url" -ForegroundColor Green
Write-Host "📁 Serving files from: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""
Write-Host "🌐 The IPTV Web Player will be available at:" -ForegroundColor White
Write-Host "   $url" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 Usage:" -ForegroundColor White
Write-Host "   • Open the URL above in your browser" -ForegroundColor Gray
Write-Host "   • Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host "   • The app works best with HTTPS streams" -ForegroundColor Gray
Write-Host ""

# Try different server options
$serverStarted = $false

# Option 1: Python 3
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "🐍 Using Python HTTP server..." -ForegroundColor Green
    try {
        # Open browser after a short delay
        Start-Job -ScriptBlock {
            Start-Sleep 2
            Start-Process $using:url
        } | Out-Null
        
        python -m http.server $port
        $serverStarted = $true
    }
    catch {
        Write-Host "❌ Python server failed" -ForegroundColor Red
    }
}

# Option 2: Node.js (if available)
if (-not $serverStarted -and (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "🟢 Trying Node.js server..." -ForegroundColor Green
    try {
        # Check if npx is available
        if (Get-Command npx -ErrorAction SilentlyContinue) {
            Start-Job -ScriptBlock {
                Start-Sleep 2
                Start-Process $using:url
            } | Out-Null
            
            npx serve -p $port
            $serverStarted = $true
        }
    }
    catch {
        Write-Host "❌ Node.js server failed" -ForegroundColor Red
    }
}

# Option 3: PowerShell built-in (basic)
if (-not $serverStarted) {
    Write-Host "⚡ Using PowerShell basic server..." -ForegroundColor Yellow
    Write-Host "   Note: This is a basic server. For full functionality, install Python or Node.js" -ForegroundColor Gray
    Write-Host ""
    
    try {
        # Open browser
        Start-Process $url
        
        # Basic HTTP listener (limited functionality)
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add("$url/")
        $listener.Start()
        
        Write-Host "✅ Server running at $url" -ForegroundColor Green
        Write-Host "📝 Note: Basic server - some features may not work properly" -ForegroundColor Yellow
        Write-Host "🔄 Press Ctrl+C to stop" -ForegroundColor Gray
        
        while ($listener.IsListening) {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response
            
            $localPath = $request.Url.LocalPath
            if ($localPath -eq "/") { $localPath = "/index.html" }
            
            $filePath = Join-Path (Get-Location) $localPath.TrimStart('/')
            
            if (Test-Path $filePath) {
                $content = Get-Content $filePath -Raw -Encoding UTF8
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            } else {
                $response.StatusCode = 404
                $errorContent = "File not found: $localPath"
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($errorContent)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
            
            $response.Close()
        }
    }
    catch {
        Write-Host "❌ Failed to start any server" -ForegroundColor Red
        Write-Host ""
        Write-Host "💡 Alternative options:" -ForegroundColor Yellow
        Write-Host "   1. Install Python: https://python.org" -ForegroundColor Gray
        Write-Host "   2. Install Node.js: https://nodejs.org" -ForegroundColor Gray
        Write-Host "   3. Open index.html directly in your browser" -ForegroundColor Gray
        Write-Host "   4. Deploy to Vercel for online access" -ForegroundColor Gray
        Read-Host "Press Enter to exit"
    }
}
