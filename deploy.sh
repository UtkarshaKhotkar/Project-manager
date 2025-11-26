#!/bin/bash

echo "🚀 Deploying Full Stack Application to Vercel"
echo "=============================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📦 Step 1: Deploying Backend..."
echo "--------------------------------"
cd backend
vercel --prod
BACKEND_URL=$(vercel --prod 2>&1 | grep -o 'https://[^ ]*')
echo "✅ Backend deployed to: $BACKEND_URL"
cd ..

echo ""
echo "📦 Step 2: Updating Frontend API URL..."
echo "----------------------------------------"
echo "VITE_API_URL=${BACKEND_URL}/api" > frontend/.env.production
echo "✅ Frontend configured to use: ${BACKEND_URL}/api"

echo ""
echo "📦 Step 3: Deploying Frontend..."
echo "---------------------------------"
cd frontend
vercel --prod
FRONTEND_URL=$(vercel --prod 2>&1 | grep -o 'https://[^ ]*')
echo "✅ Frontend deployed to: $FRONTEND_URL"
cd ..

echo ""
echo "🎉 Deployment Complete!"
echo "======================="
echo "Frontend: $FRONTEND_URL"
echo "Backend:  $BACKEND_URL"
echo ""
echo "📝 Next Steps:"
echo "1. Test your application at $FRONTEND_URL"
echo "2. Configure custom domain (optional)"
echo "3. Set up database for data persistence (optional)"
echo ""
