
@echo off
echo 🧹 Cleaning cache and build files...

rmdir /s /q node_modules
rmdir /s /q dist
rmdir /s /q .vite

echo 📦 Installing dependencies...
npm install

echo 🚀 Starting Vite dev server...
npm run dev
pause
