# Missing Step: Install Command in Dashboard

## The Problem:
Build completes but "no files were prepared" - this means dependencies aren't being installed, so nothing can build.

## The Missing Step:

You need to add an **Install Command** in Vercel Dashboard!

---

## STEP 1: Add Install Command in Dashboard

1. Go to **Vercel Dashboard** → Your project
2. Click **"Settings"** → **"Build and Deployment"**
3. Find **"Install Command"**
4. Click **"Edit"**
5. **Type**: `cd frontend-react && npm install && cd ../backend && npm install`
6. Click **"Save"**

**This is CRITICAL!** Without this, Vercel doesn't install dependencies, so nothing can build.

---

## STEP 2: Verify All Settings

Make sure these are set correctly:

- **Root Directory**: EMPTY (blank)
- **Framework Preset**: `Other` or empty
- **Build Command**: EMPTY (vercel.json handles it)
- **Install Command**: `cd frontend-react && npm install && cd ../backend && npm install` ⚠️ **SET THIS**
- **Output Directory**: EMPTY (vercel.json handles it)

---

## STEP 3: Redeploy

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 3-5 minutes

---

## What You Should See in Build Logs:

After adding Install Command and redeploying:

```
Installing dependencies...
> cd frontend-react && npm install && cd ../backend && npm install
Installing frontend dependencies...
Installing backend dependencies...
Building Next.js...
Building backend...
Deploying outputs...
Deployment completed
```

**NOT** "no files were prepared"

---

## Why This Was Missing:

The `vercel.json` has build commands, but Vercel also needs the **Install Command** in the dashboard to actually run `npm install` before building.

---

## After Adding Install Command:

1. ✅ Dependencies will be installed
2. ✅ Next.js will build
3. ✅ Backend will build
4. ✅ Files will be prepared
5. ✅ Deployment will work

**This is the missing step!** Add the Install Command in the dashboard and redeploy.
