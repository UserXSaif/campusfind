@echo off
echo ========================================================
echo Deploying CampusFind to Vercel
echo ========================================================
cd /d "%~dp0"

echo Running npx vercel...
npx vercel --prod

echo.
pause
