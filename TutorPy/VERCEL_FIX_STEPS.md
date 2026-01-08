# Vercel Deployment Fix - Step by Step

## The Problem
Vercel build completes but "no files were prepared" - meaning nothing was actually built.

## The Solution

You need to configure Vercel Dashboard settings. The `vercel.json` alone isn't enough.

---

## STEP 1: Go to Vercel Dashboard

1. Open: https://vercel.com/dashboard
2. Click on your **tutorpy** project

---

## STEP 2: Update Project Settings

1. Click **"Settings"** (top menu)
2. Click **"General"** (left sidebar)

### Update These Settings:

**Root Directory:**
- Click **"Edit"** next to Root Directory
- **Type**: `/` (just a forward slash, or leave empty)
- Click **"Save"**

**Framework Preset:**
- Click **"Edit"** next to Framework Preset  
- Select: **"Other"**
- Click **"Save"**

**Build Command:**
- Click **"Edit"** next to Build Command
- **Type**: `cd frontend-react && npm run build`
- Click **"Save"**

**Install Command:**
- Click **"Edit"** next to Install Command
- **Type**: `cd frontend-react && npm install && cd ../backend && npm install`
- Click **"Save"**

**Output Directory:**
- Click **"Edit"** next to Output Directory
- **Type**: `frontend-react/.next`
- Click **"Save"**

---

## STEP 3: Verify Environment Variables

1. Still in **Settings**
2. Click **"Environment Variables"** (left sidebar)
3. Verify these exist (add if missing):

   - **MONGODB_URI** = `mongodb+srv://tutorpy_user:...@tutorpy-cluster...`
   - **JWT_SECRET** = `my_super_secret_jwt_key_12345_change_in_production`
   - **GROQ_API_KEY** = `your-groq-api-key-here`
   - **NODE_ENV** = `production` (optional)

4. Make sure each variable has all environments selected:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

---

## STEP 4: Redeploy

1. Go to **"Deployments"** tab (top menu)
2. Find the latest deployment
3. Click **"..."** (three dots) on the right
4. Click **"Redeploy"**
5. Wait 3-5 minutes

---

## STEP 5: Check Build Logs

After redeploy, check the logs:

1. Click on the new deployment
2. Click **"Build Logs"** tab
3. You should see:
   - ✅ Installing dependencies...
   - ✅ Building frontend...
   - ✅ Building backend...
   - ✅ Deployment completed

If you see errors, copy them and share.

---

## STEP 6: Test

1. Visit: https://tutorpy.vercel.app/
2. Should see your frontend
3. Test API: https://tutorpy.vercel.app/api/health
4. Should return: `{"status":"ok","mongodb":"connected"}`

---

## If Still Not Working

**Option A: Set Root to frontend-react**

1. Settings → General → Root Directory
2. Change to: `frontend-react`
3. Framework Preset: `Next.js`
4. Remove Build/Install commands (let Next.js handle it)
5. Redeploy

**Option B: Check Build Logs**

Share the error from build logs and I'll help fix it.

---

## Quick Checklist

- [ ] Root Directory = `/` (root)
- [ ] Framework Preset = `Other`
- [ ] Build Command = `cd frontend-react && npm run build`
- [ ] Install Command = `cd frontend-react && npm install && cd ../backend && npm install`
- [ ] Output Directory = `frontend-react/.next`
- [ ] Environment Variables added
- [ ] Redeployed
- [ ] Checked build logs
