# Vercel Setup Quick Checklist

## ✅ Step-by-Step Checklist

### STEP 1: Connect GitHub to Vercel
- [ ] Go to https://vercel.com and log in
- [ ] Click Profile → Settings
- [ ] Click "Git" in sidebar
- [ ] Click "Connect" next to GitHub
- [ ] Authorize Vercel on GitHub
- [ ] Select "TutorPy" repository
- [ ] Verify connection shows ✅

### STEP 2: Deploy Backend
- [ ] Go to https://vercel.com/new
- [ ] Click "Import Git Repository"
- [ ] Select GitHub → TutorPy
- [ ] Click "Import"
- [ ] **Project Name**: `tutorpy-backend`
- [ ] **Framework**: Other
- [ ] **Root Directory**: `backend` ⚠️ CRITICAL
- [ ] **Build Command**: (leave empty)
- [ ] **Output Directory**: (leave empty)
- [ ] Add Environment Variables:
  - [ ] `MONGODB_URI` = (your MongoDB connection string)
  - [ ] `JWT_SECRET` = (your JWT secret)
  - [ ] `GROQ_API_KEY` = (your Groq API key)
- [ ] Click "Deploy"
- [ ] Wait for deployment (1-3 minutes)
- [ ] **COPY BACKEND URL** (e.g., `https://tutorpy-backend.vercel.app`)

### STEP 3: Deploy Frontend
- [ ] Go to https://vercel.com/new (again)
- [ ] Click "Import Git Repository"
- [ ] Select GitHub → TutorPy (same repo)
- [ ] Click "Import"
- [ ] **Project Name**: `tutorpy-frontend`
- [ ] **Framework**: Next.js (auto-detected)
- [ ] **Root Directory**: `frontend-react` ⚠️ CRITICAL
- [ ] **Build Command**: `npm run build` (auto-filled)
- [ ] **Output Directory**: `.next` (auto-filled)
- [ ] Add Environment Variable:
  - [ ] `NEXT_PUBLIC_API_URL` = (your backend URL from Step 2)
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-5 minutes)
- [ ] **COPY FRONTEND URL** (e.g., `https://tutorpy-frontend.vercel.app`)

### STEP 4: Test Auto-Deployment
- [ ] Make a small change in your code
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Test auto-deployment"`
- [ ] Run: `git push origin main`
- [ ] Go to Vercel dashboard
- [ ] Verify new deployment started automatically
- [ ] Wait for deployment to complete
- [ ] Check live URL to see changes

### STEP 5: Verify Settings
- [ ] Backend project → Settings → General
  - [ ] Root Directory = `backend`
- [ ] Backend project → Settings → Environment Variables
  - [ ] All variables present
- [ ] Frontend project → Settings → General
  - [ ] Root Directory = `frontend-react`
- [ ] Frontend project → Settings → Environment Variables
  - [ ] NEXT_PUBLIC_API_URL = backend URL
- [ ] Both projects → Settings → Git
  - [ ] Repository = `shagun0singh/TutorPy`
  - [ ] Production Branch = `main`
  - [ ] Auto-deploy = Enabled

---

## 🎯 Critical Points to Remember

1. **Root Directory MUST be set correctly:**
   - Backend: `backend` (NOT `/`)
   - Frontend: `frontend-react` (NOT `/`)

2. **Environment Variables:**
   - Backend needs: MONGODB_URI, JWT_SECRET, GROQ_API_KEY
   - Frontend needs: NEXT_PUBLIC_API_URL (must start with `NEXT_PUBLIC_`)

3. **After adding environment variables:**
   - Always **Redeploy** the project

4. **Auto-deployment works when:**
   - GitHub is connected
   - Root directory is correct
   - You push to `main` branch

---

## 🔗 Your URLs

After deployment, save these:

- **Backend URL**: `https://tutorpy-backend.vercel.app`
- **Frontend URL**: `https://tutorpy-frontend.vercel.app`
- **Vercel Dashboard**: `https://vercel.com/dashboard`
- **GitHub Repo**: `https://github.com/shagun0singh/TutorPy`

---

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| Changes not detected | Check Root Directory in Settings → General |
| Build failed | Check Build Logs, verify environment variables |
| Frontend can't connect | Verify NEXT_PUBLIC_API_URL = backend URL |
| Auto-deploy not working | Check Settings → Git → Auto-deploy is enabled |

---

**For detailed instructions, see: `VERCEL_SETUP_DETAILED.md`**
