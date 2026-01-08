# Fix: Root Directory "frontend-react" Does Not Exist

## Error:
```
The specified Root Directory "frontend-react" does not exist.
```

## Solution: Leave Root Directory EMPTY

Vercel sometimes has issues finding subdirectories. The best solution is to:

1. **Leave Root Directory EMPTY** (blank)
2. Let `vercel.json` handle everything

---

## Steps:

1. Go to **Settings → Build and Deployment**
2. Find **Root Directory**
3. Click **"Edit"**
4. **DELETE everything** - make it completely **EMPTY/BLANK**
5. Click **"Save"**

6. **Also set these:**
   - **Framework Preset**: `Other` or leave auto-detect
   - **Build Command**: Leave **EMPTY** (vercel.json handles it)
   - **Install Command**: Leave **EMPTY** (vercel.json handles it)
   - **Output Directory**: Leave **EMPTY** (vercel.json handles it)

7. **Save** all settings

8. **Redeploy**:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

---

## Why This Works:

- ✅ Empty Root Directory = Vercel uses repository root
- ✅ `vercel.json` at root tells Vercel what to build
- ✅ Build commands in vercel.json handle the paths correctly
- ✅ No path resolution issues

---

## What vercel.json Does:

The updated `vercel.json` I just pushed:
- Builds Next.js from `frontend-react/` directory
- Builds backend as serverless function
- Routes `/api/*` to backend
- Routes everything else to frontend

---

## After Fixing:

1. **Root Directory**: EMPTY (blank)
2. **All other build settings**: EMPTY
3. **Redeploy**
4. Should work now!

---

## If Still Fails:

Check build logs for the actual error. The issue might be:
- Missing files in git
- Case sensitivity
- Build command failing

Share the build logs if it still doesn't work.
