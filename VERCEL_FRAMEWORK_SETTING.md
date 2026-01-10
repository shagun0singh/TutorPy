# Vercel Framework Setting - What to Choose

## Question: Should Framework be set to "Next.js"?

## Answer: NO - Leave it as "Other" or Empty

---

## Why?

Your `vercel.json` already specifies:
- `"framework": "nextjs"`
- `"buildCommand"`: Custom command
- `"outputDirectory"`: Custom path
- `"installCommand"`: Custom command

If you set Framework Preset to **"Next.js"** in the dashboard:
- ❌ Vercel might try to auto-detect and override your vercel.json
- ❌ Could cause conflicts between dashboard settings and vercel.json
- ❌ Might ignore your custom build commands

---

## Correct Settings:

### In Vercel Dashboard → Build and Deployment:

- **Root Directory**: EMPTY (blank)
- **Framework Preset**: **"Other"** or leave as auto-detect
- **Build Command**: EMPTY (vercel.json handles it)
- **Install Command**: EMPTY (vercel.json handles it)
- **Output Directory**: EMPTY (vercel.json handles it)

---

## How It Works:

1. **vercel.json** at root has all the configuration
2. Vercel reads `vercel.json` and uses those settings
3. Dashboard settings should be empty to avoid conflicts
4. `vercel.json` tells Vercel:
   - Framework is Next.js
   - How to build (cd frontend-react && npm run build)
   - Where output is (frontend-react/.next)
   - How to install (cd frontend-react && npm install)

---

## Summary:

✅ **Framework Preset**: "Other" or empty  
✅ **All other settings**: Empty  
✅ **vercel.json**: Handles everything  

This is the safest approach when using vercel.json!
