@echo off
set "target=C:\Users\majed\Desktop\tesr react\TroxoWebsite (3)\TroxoWebsite"
set "output=%target%\project-structure.txt"

echo 🔍 Generating project structure...
cd /d "%target%"
tree /F /A > "%output%"
echo ✅ Structure saved to: %output%
pause
