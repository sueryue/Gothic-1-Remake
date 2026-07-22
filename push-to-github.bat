@echo off
echo ============================================
echo   Gothic 1 Remake - Push to GitHub
echo   (Push + force refresh)
echo ============================================
echo.

cd /d "%~dp0"

echo [1/3] Pulling latest from remote...
git pull origin main

echo.
echo [2/3] Adding all changes (including image URL fixes)...
git add -A

echo.
echo [3/3] Committing and pushing...
git commit -m "Fix Steam CDN image URLs - add hash directories and timestamps + new pages"
git push origin main

echo.
echo ============================================
echo   PUSH COMPLETE
echo ============================================
echo.
echo IMPORTANT: After push, wait 1-2 minutes for GitHub Pages to build.
echo Then open https://sueryue.github.io/Gothic-1-Remake/
echo Press Ctrl+F5 (or Ctrl+Shift+R) to force refresh and clear cache.
echo.
pause
