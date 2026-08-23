@echo off
echo ========================================================
echo Pushing CampusFind to https://github.com/UserXSaif/campusfind
echo ========================================================
cd /d "%~dp0"

echo [1/5] Initializing git repository...
git init

echo [2/5] Setting main branch...
git branch -M main

echo [3/5] Staging all files...
git add .

echo [4/5] Creating commit...
git commit -m "feat: complete CampusFind university lost & found platform"

echo [5/5] Connecting to remote and pushing...
git remote remove origin 2>nul
git remote add origin https://github.com/UserXSaif/campusfind.git
git push -u origin main

echo.
echo ========================================================
echo Done! Check your repository at:
echo https://github.com/UserXSaif/campusfind
echo ========================================================
pause
