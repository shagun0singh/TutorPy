# Deploy Frontend + Backend as ONE Vercel Project

## ✅ Solution: Single Unified Deployment

Instead of two separate projects, we'll deploy both frontend and backend together as **ONE Vercel project**.

---

## 🚀 Step-by-Step: Single Deployment

### STEP 1: Connect GitHub (if not done)

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Click "GitHub"
4. If prompted, authorize and select "TutorPy"
5. **STOP HERE** - Don't import yet!

---

### STEP 2: Configure Single Project

1. **Import Repository:**
   - Select "TutorPy" repository
   - Click "Import"

2. **Configure Project:**
   - **Project Name**: `tutorpy` (or `tutorpy-app`)
   - **Framework Preset**: **Other** (we'll handle both manually)
   - **Root Directory**: `/` (root - leave empty or type `/`)
   - **Build Command**: (leave empty - Vercel will use vercel.json)
   - **Output Directory**: (leave empty)
   - **Install Command**: `cd frontend-react && npm install && cd ../backend && npm install`

3. **Add Environment Variables:**
   
   Add ALL these variables:
   
   **Backend Variables:**
   - `MONGODB_URI` = `your-mongodb-connection-string`
   - `JWT_SECRET` = `your-jwt-secret`
   - `GROQ_API_KEY` = `your-groq-api-key`
   - `PORT` = `3001` (optional)
   
   **Frontend Variables:**
   - `NEXT_PUBLIC_API_URL` = `/api` (use relative path since same domain)
   
   **Select all environments** (Production, Preview, Development) for each

4. **Deploy:**
   - Click "Deploy"
   - Wait 3-5 minutes for build

---

### STEP 3: How It Works

The unified `vercel.json` at the root handles:

- **API Routes** (`/api/*`) → Routes to `backend/server.js` (Express)
- **All Other Routes** (`/*`) → Routes to `frontend-react` (Next.js)

This means:
- ✅ Frontend: `https://tutorpy.vercel.app/`
- ✅ Backend API: `https://tutorpy.vercel.app/api/chat`
- ✅ Auth API: `https://tutorpy.vercel.app/api/auth/login`

**Everything on ONE domain!**

---

### STEP 4: Update Frontend to Use Same Domain

Since backend is now on the same domain, update frontend API calls:

**File: `frontend-react/app/chat/page.tsx`**

Change API calls from:
```typescript
const response = await fetch('http://localhost:3001/api/chat', {
```

To:
```typescript
const response = await fetch('/api/chat', {
```

**File: `frontend-react/app/signin/page.tsx`**

Change from:
```typescript
const response = await fetch('http://localhost:3001/api/auth/login', {
```

To:
```typescript
const response = await fetch('/api/auth/login', {
```

**File: `frontend-react/app/signup/page.tsx`**

Change from:
```typescript
const response = await fetch('http://localhost:3001/api/auth/signup', {
```

To:
```typescript
const response = await fetch('/api/auth/signup', {
```

**File: `frontend-react/next.config.js`**

Update to use relative paths:
```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: '/api/:path*', // Same domain, no rewrite needed
    },
  ];
},
```

Or remove rewrites entirely since API is on same domain.

---

## 📝 Configuration Files

### Root `vercel.json` (Already Created ✅)

This file tells Vercel:
- Build backend as Node.js serverless function
- Build frontend as Next.js app
- Route `/api/*` to backend
- Route everything else to frontend

### Environment Variables

Set in Vercel Dashboard → Settings → Environment Variables:
- `MONGODB_URI`
- `JWT_SECRET`
- `GROQ_API_KEY`
- `NEXT_PUBLIC_API_URL` = `/api` (relative path)

---

## 🔄 After Deployment

1. **Get Your URL:**
   - Vercel will give you: `https://tutorpy.vercel.app`
   - Frontend: `https://tutorpy.vercel.app/`
   - Backend API: `https://tutorpy.vercel.app/api/chat`

2. **Test:**
   - Visit: `https://tutorpy.vercel.app`
   - Should see your frontend
   - Try chat - should work with same-domain API

3. **Auto-Deployment:**
   - Every push to `main` branch
   - Automatically deploys both frontend and backend
   - **ONE deployment, not two!**

---

## ✅ Benefits of Single Deployment

- ✅ **One URL** for everything
- ✅ **One deployment** (faster, simpler)
- ✅ **No CORS issues** (same domain)
- ✅ **Easier to manage** (one project in Vercel)
- ✅ **Auto-deploys together** (frontend + backend in sync)

---

## 🐛 Troubleshooting

### Issue: Build Fails

**Solution:**
- Check Root Directory is `/` (root)
- Verify `vercel.json` is at root
- Check build logs in Vercel dashboard

### Issue: API Routes Not Working

**Solution:**
- Verify `vercel.json` has correct routes
- Check backend routes start with `/api/`
- Verify environment variables are set

### Issue: Frontend Can't Find Backend

**Solution:**
- Update frontend API calls to use `/api/...` (relative paths)
- Remove `NEXT_PUBLIC_API_URL` or set to `/api`
- Check `next.config.js` rewrites

---

## 📋 Quick Checklist

- [ ] `vercel.json` created at root (✅ done)
- [ ] Connect GitHub to Vercel
- [ ] Import TutorPy repository
- [ ] Set Root Directory to `/` (root)
- [ ] Add all environment variables
- [ ] Deploy
- [ ] Update frontend API calls to use `/api/...`
- [ ] Test deployment
- [ ] Verify auto-deployment works

---

## 🎯 Summary

**Before:** Two separate projects
- Frontend: `tutorpy-frontend.vercel.app`
- Backend: `tutorpy-backend.vercel.app`

**After:** One unified project
- Everything: `tutorpy.vercel.app`
- Frontend: `tutorpy.vercel.app/`
- Backend: `tutorpy.vercel.app/api/...`

**Much simpler!** 🚀
