# Single Vercel Deployment Setup

## Goal: Deploy Frontend + Backend as ONE Vercel Project

---

## STEP 1: Push Code to GitHub

Make sure all code is pushed:

```bash
cd /Users/pali/TutorPy
git add .
git commit -m "Prepare for single Vercel deployment"
git push origin main
```

---

## STEP 2: Deploy to Vercel as ONE Project

### 1. Import Repository

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Click **"GitHub"**
4. Find and select: **shagun0singh/TutorPy**
5. Click **"Import"**

### 2. Configure Project

**Project Name**: `tutorpy` (or your choice)

**Settings:**
- **Framework Preset**: `Other` (or leave auto-detect)
- **Root Directory**: **EMPTY** (leave blank) ⚠️ **CRITICAL**
- **Build Command**: **EMPTY** (vercel.json handles it)
- **Install Command**: **EMPTY** (vercel.json handles it)
- **Output Directory**: **EMPTY** (vercel.json handles it)

**Why empty?** The `vercel.json` at root will handle everything.

### 3. Add Environment Variables

Click **"Environment Variables"** and add:

- **MONGODB_URI** = `your-mongodb-connection-string`
- **JWT_SECRET** = `my_super_secret_jwt_key_12345_change_in_production`
- **GROQ_API_KEY** = `your-groq-api-key`
- **NODE_ENV** = `production` (optional)

**Select all environments** (Production, Preview, Development) for each.

### 4. Deploy

Click **"Deploy"** and wait 3-5 minutes.

---

## STEP 3: How It Works

The `vercel.json` configuration:

1. **Builds Next.js** from `frontend-react/package.json`
2. **Builds Backend** as serverless function from `backend/server.js`
3. **Routes** `/api/*` → Backend
4. **Routes** `/*` → Frontend

**Result:**
- ✅ Frontend: `https://tutorpy.vercel.app/`
- ✅ Backend API: `https://tutorpy.vercel.app/api/chat`
- ✅ Auth API: `https://tutorpy.vercel.app/api/auth/login`

**Everything on ONE domain!**

---

## STEP 4: Verify Deployment

1. Visit: https://tutorpy.vercel.app/
2. Should see your landing page
3. Test API: https://tutorpy.vercel.app/api/health
4. Should return: `{"status":"ok","mongodb":"connected"}`

---

## Troubleshooting

### If Build Fails:

1. Check **Build Logs** in Vercel dashboard
2. Look for errors in:
   - Installing dependencies
   - Building Next.js
   - Building backend
3. Share errors and I'll help fix

### If 404 Error:

1. Check that Root Directory is **EMPTY**
2. Verify `vercel.json` is at repository root
3. Check build logs for routing issues

### If API Routes Don't Work:

1. Verify backend/server.js exports the app correctly
2. Check environment variables are set
3. Test backend directly: `/api/health`

---

## Important Notes:

✅ **Root Directory MUST be empty** - this is critical!
✅ **All build settings empty** - let vercel.json handle it
✅ **Environment variables set** - required for backend
✅ **vercel.json at root** - this controls everything

---

## After Deployment:

- ✅ Auto-deployments on every push to `main`
- ✅ Frontend and backend deploy together
- ✅ Everything on one URL
- ✅ No CORS issues (same domain)

---

## Quick Checklist:

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Root Directory = EMPTY
- [ ] All build settings = EMPTY
- [ ] Environment variables added
- [ ] Deployed
- [ ] Tested frontend URL
- [ ] Tested API endpoints
