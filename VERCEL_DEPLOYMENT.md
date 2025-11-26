# 🚀 Vercel Deployment Guide

## Overview

Your full stack application will be deployed as **two separate Vercel projects**:
1. **Frontend** - React/Vite application
2. **Backend** - Node.js/Express API

---

## 📋 Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com
2. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket
3. **Vercel CLI** (optional): `npm install -g vercel`

---

## 🎯 Deployment Strategy

### Option 1: Deploy via Vercel Dashboard (Recommended)
### Option 2: Deploy via Vercel CLI

---

## 🔧 Option 1: Deploy via Vercel Dashboard

### Step 1: Deploy Backend API

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. Click **"Add New Project"**
3. **Import your Git repository**
4. **Configure the project**:
   - **Project Name**: `your-app-backend` (or any name)
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty (not needed for Node.js)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Environment Variables** (if needed):
   - Click "Environment Variables"
   - Add any variables from `backend/.env.example`
   - Example:
     - `NODE_ENV` = `production`
     - `PORT` = `5000` (optional, Vercel handles this)

6. Click **"Deploy"**
7. Wait for deployment to complete
8. **Copy the deployment URL** (e.g., `https://your-app-backend.vercel.app`)

### Step 2: Deploy Frontend

1. **Go back to Vercel Dashboard**
2. Click **"Add New Project"** again
3. **Import the same Git repository**
4. **Configure the project**:
   - **Project Name**: `your-app-frontend` (or any name)
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables**:
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-app-backend.vercel.app/api`
   - (Use the backend URL from Step 1)

6. Click **"Deploy"**
7. Wait for deployment to complete
8. **Your app is live!** 🎉

---

## 🔧 Option 2: Deploy via Vercel CLI

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Deploy Backend

```bash
# Navigate to backend directory
cd backend

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? your-app-backend
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

**Copy the production URL** (e.g., `https://your-app-backend.vercel.app`)

### Deploy Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Set environment variable
# Create .env.production file with:
# VITE_API_URL=https://your-app-backend.vercel.app/api

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? your-app-frontend
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

---

## 🔄 Update Backend URL in Frontend

After deploying the backend, you need to update the frontend to use the backend URL:

### Method 1: Via Vercel Dashboard
1. Go to your frontend project in Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Add or update: `VITE_API_URL` = `https://your-app-backend.vercel.app/api`
4. Click **"Redeploy"** to apply changes

### Method 2: Update .env.production file
1. Edit `frontend/.env.production`
2. Update: `VITE_API_URL=https://your-app-backend.vercel.app/api`
3. Commit and push changes
4. Vercel will auto-deploy

---

## 📝 Important Configuration Files

### Backend Files
- ✅ `backend/vercel.json` - Vercel configuration
- ✅ `backend/server.js` - Updated for serverless
- ✅ `backend/package.json` - Dependencies

### Frontend Files
- ✅ `frontend/vercel.json` - Vercel configuration
- ✅ `frontend/.env.production` - Production API URL
- ✅ `frontend/.env.development` - Development API URL
- ✅ `frontend/package.json` - Build scripts
- ✅ `frontend/vite.config.js` - Vite configuration

---

## 🔒 CORS Configuration

The backend is already configured with CORS to accept requests from any origin:

```javascript
app.use(cors());
```

For production, you may want to restrict this to your frontend domain:

```javascript
app.use(cors({
  origin: 'https://your-app-frontend.vercel.app',
  credentials: true
}));
```

Update this in `backend/server.js` if needed.

---

## 🧪 Testing Your Deployment

### Test Backend API
```bash
# Test health endpoint
curl https://your-app-backend.vercel.app/api

# Test users endpoint
curl https://your-app-backend.vercel.app/api/users

# Test projects endpoint
curl https://your-app-backend.vercel.app/api/projects

# Test tasks endpoint
curl https://your-app-backend.vercel.app/api/tasks
```

### Test Frontend
1. Open your frontend URL in browser
2. Navigate to different pages
3. Try CRUD operations (Create, Read, Update, Delete)
4. Check browser console for any errors

---

## 🔄 Automatic Deployments

Once connected to Git, Vercel will automatically deploy:
- **Every push to main branch** → Production deployment
- **Every pull request** → Preview deployment

---

## 📊 Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor performance
- Check analytics
- View error logs

### Access Logs
1. Go to your project in Vercel Dashboard
2. Click on a deployment
3. Click "Functions" to see serverless function logs
4. Click "Build Logs" to see build output

---

## ⚠️ Important Notes

### Data Persistence
- **Current setup uses in-memory storage**
- Data will reset on each deployment
- **For production**, connect to a database:
  - MongoDB Atlas (recommended)
  - PostgreSQL (Vercel Postgres)
  - MySQL (PlanetScale)

### Environment Variables
- Never commit `.env` files to Git
- Always use Vercel's environment variables feature
- Different variables for development/production

### Serverless Limitations
- Functions have a 10-second timeout on Hobby plan
- 50-second timeout on Pro plan
- Cold starts may occur (first request slower)

---

## 🗄️ Adding Database (Optional)

### MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas account**: https://www.mongodb.com/cloud/atlas
2. **Create a cluster** (free tier available)
3. **Get connection string**
4. **Add to Vercel environment variables**:
   - `MONGODB_URI` = `mongodb+srv://username:password@cluster.mongodb.net/dbname`

5. **Update backend code** to use MongoDB instead of in-memory storage

### Vercel Postgres

1. **Go to Vercel Dashboard** → Storage
2. **Create Postgres Database**
3. **Copy connection string**
4. **Add to environment variables**
5. **Update backend code** to use PostgreSQL

---

## 🚀 Quick Deploy Commands

### Deploy Everything
```bash
# Deploy backend
cd backend && vercel --prod

# Deploy frontend (update API URL first!)
cd ../frontend && vercel --prod
```

### Redeploy After Changes
```bash
# Just push to Git, Vercel auto-deploys
git add .
git commit -m "Update application"
git push origin main
```

---

## 📱 Custom Domain (Optional)

### Add Custom Domain to Frontend
1. Go to project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your domain (e.g., `myapp.com`)
4. Follow DNS configuration instructions

### Add Custom Domain to Backend
1. Go to backend project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add subdomain (e.g., `api.myapp.com`)
4. Update frontend `VITE_API_URL` to use new domain

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: API returns 404
- Check `backend/vercel.json` configuration
- Verify routes in `backend/server.js`
- Check deployment logs in Vercel

**Problem**: CORS errors
- Update CORS configuration in `backend/server.js`
- Add frontend domain to allowed origins

**Problem**: Function timeout
- Optimize slow endpoints
- Consider upgrading Vercel plan
- Use database instead of in-memory storage

### Frontend Issues

**Problem**: API calls fail
- Check `VITE_API_URL` environment variable
- Verify backend is deployed and running
- Check browser console for errors

**Problem**: Build fails
- Check build logs in Vercel
- Verify all dependencies in `package.json`
- Test build locally: `npm run build`

**Problem**: Routes return 404
- Check `vercel.json` rewrites configuration
- Verify React Router setup

---

## 📚 Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel CLI**: https://vercel.com/docs/cli
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html
- **Express on Vercel**: https://vercel.com/guides/using-express-with-vercel

---

## ✅ Deployment Checklist

### Before Deployment
- [ ] Code pushed to Git repository
- [ ] Backend tests passing
- [ ] Frontend builds successfully
- [ ] Environment variables documented
- [ ] CORS configured correctly

### Backend Deployment
- [ ] Backend deployed to Vercel
- [ ] API endpoints tested
- [ ] Backend URL copied
- [ ] Environment variables set

### Frontend Deployment
- [ ] Frontend deployed to Vercel
- [ ] `VITE_API_URL` set to backend URL
- [ ] All pages load correctly
- [ ] CRUD operations work
- [ ] No console errors

### Post-Deployment
- [ ] Test all features
- [ ] Monitor error logs
- [ ] Set up custom domain (optional)
- [ ] Configure database (optional)
- [ ] Set up monitoring/analytics

---

## 🎉 You're Done!

Your full stack application is now live on Vercel!

**Frontend**: `https://your-app-frontend.vercel.app`
**Backend**: `https://your-app-backend.vercel.app`

Share your app with the world! 🌍
