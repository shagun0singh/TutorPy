# Fix: Root Directory Error

## Error:
```
The specified Root Directory "'/'" does not exist. Please update your Project Settings.
```

## Solution:

The Root Directory should be **EMPTY** (blank), not `'/'` or `/`.

---

## How to Fix:

1. Go to **Settings → Build and Deployment**
2. Find **Root Directory**
3. Click **"Edit"**
4. **DELETE** everything in the field (make it completely empty/blank)
5. Click **"Save"**

**OR**

1. If you see a dropdown or option to "Clear" or "Reset", click that
2. Make sure the field is completely empty

---

## What Root Directory Should Be:

- ✅ **Empty/Blank** = Uses repository root (correct for your setup)
- ❌ `/` = Treated as literal path (wrong)
- ❌ `'/'` = Treated as literal path (wrong)
- ❌ `frontend-react` = Only builds frontend (wrong for unified deploy)

---

## After Fixing:

1. **Save** the Root Directory (leave it empty)
2. **Redeploy**:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

---

## Alternative: If Empty Doesn't Work

If leaving it empty doesn't work, try:

1. **Root Directory**: Leave empty OR set to `.` (dot)
2. **Framework Preset**: `Other`
3. **Build Command**: `cd frontend-react && npm run build`
4. **Install Command**: `cd frontend-react && npm install && cd ../backend && npm install`
5. **Output Directory**: `frontend-react/.next`

The `vercel.json` file at the root will handle the routing.
