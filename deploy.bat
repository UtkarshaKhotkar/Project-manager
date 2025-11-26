@echo off
echo 🚀 Deploying Full Stack Application to Vercel
echo ==============================================
echo.

REM Check if vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
)

echo 📦 Step 1: Deploying Backend...
echo --------------------------------
cd backend
call vercel --prod
echo ✅ Backend deployed!
cd ..

echo.
echo 📦 Step 2: Deploying Frontend...
echo ---------------------------------
echo ⚠️  IMPORTANT: Update frontend/.env.production with your backend URL
echo    Example: VITE_API_URL=https://your-backend.vercel.app/api
echo.
pause

cd frontend
call vercel --prod
echo ✅ Frontend deployed!
cd ..

echo.
echo 🎉 Deployment Complete!
echo =======================
echo.
echo 📝 Next Steps:
echo 1. Go to Vercel Dashboard to get your URLs
echo 2. Update frontend environment variable VITE_API_URL
echo 3. Redeploy frontend if needed
echo 4. Test your application
echo.
pause
