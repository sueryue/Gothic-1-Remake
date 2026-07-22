@echo off
cd /d "C:\Users\Administrator\Gothic-1-Remake"

echo Configuring git identity...
git config user.email "sueryue@gmail.com"
git config user.name "sueryue"

echo.
echo Checking status...
git status --short

echo.
echo Committing...
git commit -m "Add FAQ, System Reqs, Quests, NPCs, Achievements, Save Mgmt + fix Steam images"

echo.
echo Pushing to GitHub...
git push origin master

echo.
echo ============================================
echo   DONE! Check: https://sueryue.github.io/Gothic-1-Remake/
echo   Press Ctrl+F5 to force refresh browser.
echo ============================================
pause
