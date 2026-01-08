# Fix: Install Command Failed

## Error:
```
Command "cd frontend-react && npm install && cd ../backend && npm install" exited with 1
```

## Solution Options:

### Option 1: Use Install Script (Recommended)

1. Go to **Settings → Build and Deployment**
2. Find **Install Command**
3. Click **"Edit"**
4. **Type**: `bash install.sh`
5. Click **"Save"**
6. **Redeploy**

### Option 2: Simpler Install Command

1. Go to **Settings → Build and Deployment**
2. Find **Install Command**
3. Click **"Edit"**
4. **Type**: `npm install --prefix frontend-react && npm install --prefix backend`
5. Click **"Save"**
6. **Redeploy**

### Option 3: Only Install Frontend (Let Vercel Handle Backend)

1. Go to **Settings → Build and Deployment**
2. Find **Install Command**
3. Click **"Edit"**
4. **Type**: `cd frontend-react && npm install`
5. Click **"Save"**
6. The backend dependencies will be installed automatically by Vercel when building the serverless function
7. **Redeploy**

---

## Recommended: Option 3 (Simplest)

Since Vercel's `builds` section in `vercel.json` will handle the backend separately, you only need to install frontend dependencies in the Install Command.

**Install Command**: `cd frontend-react && npm install`

This is simpler and less likely to fail.

---

## After Fixing:

1. **Save** the Install Command
2. **Redeploy**:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

---

## If Still Failing:

Check the build logs for the specific error. Common issues:
- Missing package.json files
- Network issues during npm install
- Node version mismatch
- Memory limits

Share the specific error from build logs if it still fails.
