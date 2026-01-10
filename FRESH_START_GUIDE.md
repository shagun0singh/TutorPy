# Fresh Start: New GitHub Repo + New Vercel Project

## Step-by-Step Guide

---

## PART 1: Create New GitHub Repository

### Step 1: Create Repository on GitHub

1. Go to: https://github.com/new
2. **Repository name**: `tutorpy-app` (or any name you like)
3. **Description**: "AI-powered Python learning tutor"
4. **Visibility**: Public or Private (your choice)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### Step 2: Push Current Code to New Repo

```bash
# In your TutorPy directory
cd /Users/pali/TutorPy

# Add new remote (replace YOUR_USERNAME and REPO_NAME)
git remote add new-origin https://github.com/YOUR_USERNAME/tutorpy-app.git

# Push to new repo
git push new-origin main
```

**OR** if you want to start completely fresh:

```bash
# Create a fresh git repo
cd /Users/pali/TutorPy
rm -rf .git
git init
git add .
git commit -m "Initial commit - TutorPy app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tutorpy-app.git
git push -u origin main
```

---

## PART 2: Deploy Frontend to Vercel (Recommended First)

### Step 1: Import to Vercel

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Click **"GitHub"**
4. Find and select your **new repository** (tutorpy-app)
5. Click **"Import"**

### Step 2: Configure Frontend Project

**Project Name**: `tutorpy-frontend`

**Settings:**
- **Framework Preset**: `Next.js` (auto-detected)
- **Root Directory**: `frontend-react` ⚠️ **IMPORTANT**
- **Build Command**: (leave empty - auto-detected)
- **Output Directory**: (leave empty - auto-detected)
- **Install Command**: (leave empty - auto-detected)

**Environment Variables:**
- `NEXT_PUBLIC_API_URL` = (we'll set this after backend deploys)

Click **"Deploy"**

### Step 3: Get Frontend URL

After deployment, copy the URL:
- Example: `https://tutorpy-frontend.vercel.app`

---

## PART 3: Deploy Backend to Vercel

### Step 1: Import Same Repository Again

1. Go to: https://vercel.com/new (again)
2. Click **"Import Git Repository"**
3. Select the **same repository** (tutorpy-app)
4. Click **"Import"**

### Step 2: Configure Backend Project

**Project Name**: `tutorpy-backend`

**Settings:**
- **Framework Preset**: `Other`
- **Root Directory**: `backend` ⚠️ **IMPORTANT**
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: (leave empty)

**Environment Variables:**
- `MONGODB_URI` = `your-mongodb-connection-string`
- `JWT_SECRET` = `my_super_secret_jwt_key_12345_change_in_production`
- `GROQ_API_KEY` = `your-groq-api-key`
- `NODE_ENV` = `production`

Click **"Deploy"**

### Step 3: Get Backend URL

After deployment, copy the URL:
- Example: `https://tutorpy-backend.vercel.app`

---

## PART 4: Connect Frontend to Backend

### Step 1: Update Frontend Environment Variable

1. Go to **tutorpy-frontend** project in Vercel
2. **Settings** → **Environment Variables**
3. Add/Update:
   - `NEXT_PUBLIC_API_URL` = `https://tutorpy-backend.vercel.app`
4. **Redeploy** frontend

### Step 2: Update Frontend Code (if needed)

Make sure frontend uses the environment variable:

**File: `frontend-react/app/chat/page.tsx`**
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
```

---

## PART 5: Test Everything

1. **Frontend**: https://tutorpy-frontend.vercel.app/
2. **Backend API**: https://tutorpy-backend.vercel.app/api/health
3. **Test signup/login**
4. **Test chat**

---

## Benefits of Separate Projects:

✅ **Simpler configuration** - each project has one purpose
✅ **Easier to debug** - clear separation
✅ **Independent scaling** - scale frontend/backend separately
✅ **No routing conflicts** - Vercel handles each correctly
✅ **Easier to manage** - clear project boundaries

---

## Quick Commands:

```bash
# Create new GitHub repo (do this on GitHub website first)
# Then push code:

cd /Users/pali/TutorPy
git remote add new-origin https://github.com/YOUR_USERNAME/tutorpy-app.git
git push new-origin main
```

---

## After Setup:

- ✅ Frontend: `https://tutorpy-frontend.vercel.app`
- ✅ Backend: `https://tutorpy-backend.vercel.app`
- ✅ Auto-deployments on every push
- ✅ Everything working separately

This approach is much cleaner and more reliable!
