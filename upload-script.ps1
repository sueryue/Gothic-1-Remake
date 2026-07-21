# Gothic 1 Remake Wiki - GitHub Upload Script
# Usage: .\upload-to-github.ps1 -Token "your_github_token"

param(
    [Parameter(Mandatory=$true)]
    [string]$Token,
    
    [string]$Owner = "YOUR_USERNAME",
    [string]$Repo = "gothic1-wiki",
    [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

# GitHub API Base URL
$ApiBase = "https://api.github.com/repos/$Owner/$Repo"

# Headers with authentication
$headers = @{
    "Authorization" = "token $Token"
    "Accept" = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
}

# Get current directory
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host "🏰 Gothic 1 Remake Wiki - Uploading to GitHub..." -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Gray

# Files to upload
$FilesToUpload = @(
    "index.html",
    "lockpicking.html",
    "factions-guide.html",
    "README.md",
    "DEPLOYMENT-GUIDE.md",
    "FILE-LIST.md"
)

# Folders to upload
$FoldersToUpload = @("css", "js", "assets")

$totalFiles = 0
$uploadedFiles = 0
$failedFiles = 0

# Function to get file SHA from GitHub
function Get-GitHubFileSHA {
    param([string]$FilePath)
    
    try {
        $url = "$ApiBase/contents/$FilePath?ref=$Branch"
        $response = Invoke-RestMethod -Uri $url -Headers $headers -ErrorAction SilentlyContinue
        return $response.sha
    } catch {
        return $null
    }
}

# Function to upload a single file
function Upload-File {
    param(
        [string]$FilePath,
        [string]$CommitMessage
    )
    
    $relativePath = $FilePath.Replace("$ProjectRoot\", "").Replace("\", "/")
    
    Write-Host "⬆️  Uploading: $relativePath" -ForegroundColor Yellow
    
    # Read file content and encode to base64
    $fileContent = [System.IO.File]::ReadAllBytes($FilePath)
    $encodedContent = [Convert]::ToBase64String($fileContent)
    
    # Check if file exists on GitHub
    $existingSHA = Get-GitHubFileSHA -FilePath $relativePath
    
    # Prepare request body
    $body = @{
        message = $CommitMessage
        content = $encodedContent
    }
    
    if ($existingSHA) {
        $body.sha = $existingSHA
    } else {
        $body.branch = $Branch
    }
    
    $jsonBody = $body | ConvertTo-Json
    
    try {
        $url = "$ApiBase/contents/$relativePath"
        Invoke-RestMethod -Uri $url -Headers $headers -Method Put -Body $jsonBody | Out-Null
        Write-Host "   ✅ Success" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Upload root files
Write-Host "`n📤 Uploading HTML & Markdown files...`n" -ForegroundColor Cyan
foreach ($file in $FilesToUpload) {
    $fullPath = Join-Path $ProjectRoot $file
    if (Test-Path $fullPath) {
        $totalFiles++
        if (Upload-File -FilePath $fullPath -CommitMessage "chore: upload $file") {
            $uploadedFiles++
        } else {
            $failedFiles++
        }
    }
}

# Upload folders recursively
foreach ($folder in $FoldersToUpload) {
    $folderPath = Join-Path $ProjectRoot $folder
    if (Test-Path $folderPath) {
        Write-Host "`n📁 Uploading $($folder)/ folder...`n" -ForegroundColor Cyan
        $files = Get-ChildItem -Path $folderPath -Recurse -File
        foreach ($file in $files) {
            $totalFiles++
            if (Upload-File -FilePath $file.FullName -CommitMessage "chore: upload $($file.Name)") {
                $uploadedFiles++
            } else {
                $failedFiles++
            }
        }
    }
}

# Summary
Write-Host "`n========================================" -ForegroundColor Gray
Write-Host "📊 Upload Summary:" -ForegroundColor Cyan
Write-Host "   Total Files: $totalFiles" -ForegroundColor White
Write-Host "   ✅ Uploaded: $uploadedFiles" -ForegroundColor Green
Write-Host "   ❌ Failed: $failedFiles" -ForegroundColor $(if ($failedFiles -eq 0) { "Green" } else { "Red" })
Write-Host "`n🎉 All files uploaded successfully!" -ForegroundColor Green
Write-Host "   Repository: https://github.com/$Owner/$Repo" -ForegroundColor Cyan
