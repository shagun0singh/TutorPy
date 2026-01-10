# 🚀 Deployment Steps: Frontend (Vercel) + Backend (Railway/Render)

## 📋 Quick Overview

- **Frontend**: Next.js → Vercel
- **Backend**: Express → Railway (recommended) or Render

---

## 🎯 Option 1: Railway (Recommended - Easier & Faster)

### STEP 1: Deploy Backend to Railway

1. **Sign up**: [railway.app](https://railway.app) → Sign up with GitHub

2. **Create Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `TutorPy` repository

3. **Configure**:
   - **Root Directory**: `backend`
   - Railway auto-detects Node.js ✅

4. **Add Environment Variables**:
   - Click "Variables" tab
   - Add these:
     ```
     MONGODB_URI=your-mongodb-connection-string
     JWT_SECRET=your-secret-key-here
     GROQ_API_KEY=your-groq-api-key
     PORT=3000
     NODE_ENV=production
     ```

5. **Deploy**:
   - Railway auto-deploys
   - Wait 2-3 minutes
   - **Copy your backend URL** (e.g., `https://tutorpy-backend.railway.app`)

---

### STEP 2: Deploy Frontend to Vercel

1. **Go to Vercel**: [vercel.com/new](https://vercel.com/new)

2. **Import Repository**:
   - Click "Import Git Repository"
   - Select `TutorPy` from GitHub

3. **Configure Project**:
   - **Project Name**: `tutorpy` (or your choice)
   - **Root Directory**: `frontend-react`
   - **Framework**: Next.js (auto-detected)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

4. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend.railway.app
     ```
   - Replace with your actual Railway backend URL!

5. **Deploy**:
   - Click "Deploy"
   - Wait for build (2-3 minutes)

---

### STEP 3: Update Backend CORS (if needed)

Your backend already has CORS configured, but if you get CORS errors:

1. Go to Railway → Your backend project
2. Add environment variable:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. Redeploy backend

---

## 🎨 Option 2: Render (Alternative)

### STEP 1: Deploy Backend to Render

1. **Sign up**: [render.com](https://render.com) → Sign up with GitHub

2. **Create Web Service**:
   - Click "New" → "Web Service"
   - Connect GitHub → Select `TutorPy` repo

3. **Configure**:
   - **Name**: `tutorpy-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Root Directory**: `backend`

4. **Add Environment Variables**:
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key-here
   GROQ_API_KEY=your-groq-api-key
   PORT=3000
   NODE_ENV=production
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait 3-5 minutes
   - **Copy your backend URL** (e.g., `https://tutorpy-backend.onrender.com`)

---

### STEP 2: Deploy Frontend to Vercel

Same as Railway option above, but use your Render backend URL:

```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## ✅ Testing After Deployment

### Test Backend:
```bash
curl https://your-backend.railway.app/health
# or
curl https://your-backend.onrender.com/health
```

Should return: `{"status":"ok"}`

### Test Frontend:
1. Visit your Vercel URL
2. Try signing up
3. Try logging in
4. Try chat functionality

---

## 🔧 Local Development Setup

### Backend (Terminal 1):
```bash
cd backend
npm install
npm start
# Runs on http://localhost:3001
```

### Frontend (Terminal 2):
```bash
cd frontend-react
npm install
# Create .env.local file:
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
npm run dev
# Runs on http://localhost:3000
```

---

## 📝 Environment Variables Summary

### Backend (Railway/Render):
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `GROQ_API_KEY` - Groq API key
- `PORT` - Port number (optional, defaults to 3000)
- `NODE_ENV` - Set to `production`
- `FRONTEND_URL` - Your Vercel frontend URL (optional, for CORS)

### Frontend (Vercel):
- `NEXT_PUBLIC_API_URL` - Your backend URL (Railway or Render)

---

## 🚨 Common Issues & Fixes

### Issue 1: CORS Error
**Fix**: Make sure `FRONTEND_URL` is set in backend, or backend CORS allows `*.vercel.app`

### Issue 2: Backend not responding
**Fix**: Check Railway/Render logs, verify environment variables are set

### Issue 3: Frontend can't connect
**Fix**: Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel

### Issue 4: 404 on backend routes
**Fix**: Make sure backend is deployed and URL is correct

---

## 🎯 Quick Checklist

- [ ] Backend deployed to Railway/Render
- [ ] Backend URL copied
- [ ] Environment variables set in backend
- [ ] Frontend deployed to Vercel
- [ ] `NEXT_PUBLIC_API_URL` set in Vercel
- [ ] Tested signup/login
- [ ] Tested chat functionality

---

## 💡 Pro Tips

1. **Railway is faster** for free tier (less cold starts)
2. **Use Railway** if you want easier setup
3. **Use Render** if you need more control
4. **Always test locally first** before deploying
5. **Keep environment variables secure** - never commit them

---

**Ready to deploy? Start with Railway backend, then Vercel frontend!**
