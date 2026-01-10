# Fix: Vercel 404 Error

## 🚨 Problem
Vercel shows `404: NOT_FOUND` after deployment.

## ✅ Solution: Check Vercel Configuration

---

## 📋 Step 1: Verify Vercel Project Settings

### In Vercel Dashboard:

1. **Go to your project** → **Settings**
2. **Check "Build and Deployment":**
   - **Root Directory**: Should be `frontend-react` ⚠️
   - **Framework Preset**: Should be `Next.js`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: (leave empty)

3. **If Root Directory is wrong:**
   - Click "Edit"
   - Change to: `frontend-react`
   - Save

---

## 📋 Step 2: Check Build Logs

1. **Go to Vercel Dashboard** → Your project
2. **Click "Deployments"** tab
3. **Click on latest deployment**
4. **Check "Build Logs"**

**Look for errors like:**
- ❌ "Cannot find module"
- ❌ "Build failed"
- ❌ "Root Directory not found"

---

## 📋 Step 3: Verify Files Are on GitHub

1. **Go to GitHub**: [github.com/shagun0singh/TutorPy](https://github.com/shagun0singh/TutorPy)
2. **Check `frontend-react/` folder exists**
3. **Check `frontend-react/package.json` exists**
4. **Check `frontend-react/next.config.js` exists**

---

## 📋 Step 4: Common Fixes

### Fix 1: Root Directory Not Set

**In Vercel:**
1. Settings → Build and Deployment
2. Root Directory: `frontend-react`
3. Save
4. Redeploy

### Fix 2: Build Failed

**Check build logs for errors:**
- Missing dependencies? → Add to `package.json`
- TypeScript errors? → Fix errors
- Missing files? → Check all files are committed

### Fix 3: Wrong Branch

**Check Vercel is watching correct branch:**
1. Settings → Git
2. Production Branch: Should be `main`
3. If wrong, change it

### Fix 4: Delete and Recreate Project

**If nothing works:**
1. Delete project in Vercel
2. Create new project
3. Import from GitHub
4. Set Root Directory: `frontend-react`
5. Add `NEXT_PUBLIC_API_URL` environment variable
6. Deploy

---

## 🔍 Quick Diagnostic

### Check if build succeeded:
1. Vercel Dashboard → Deployments
2. Latest deployment status:
   - ✅ "Ready" = Build succeeded
   - ❌ "Error" = Build failed (check logs)

### Check if files are correct:
```bash
# On GitHub, verify these exist:
frontend-react/package.json
frontend-react/next.config.js
frontend-react/app/page.tsx
frontend-react/app/layout.tsx
```

---

## ✅ Expected Vercel Settings

**Root Directory**: `frontend-react`
**Framework**: Next.js
**Build Command**: (empty - auto)
**Output Directory**: (empty - auto)
**Install Command**: (empty - auto)

**Environment Variables:**
- `NEXT_PUBLIC_API_URL` = `https://your-backend.railway.app`

---

## 🎯 Most Common Issue

**Root Directory is NOT set to `frontend-react`**

**Fix:**
1. Vercel Dashboard → Settings
2. Build and Deployment
3. Root Directory: `frontend-react`
4. Save
5. Redeploy

---

**Check your Vercel settings and make sure Root Directory is `frontend-react`!**
