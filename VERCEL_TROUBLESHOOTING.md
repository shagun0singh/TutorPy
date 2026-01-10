# Vercel Deployment Troubleshooting

## Current Issue: https://tutorpy.vercel.app/ not working

## Possible Causes:

1. **Root Directory Not Set Correctly**
   - In Vercel Dashboard → Settings → General
   - Root Directory should be: `/` (root) or leave empty
   - NOT `frontend-react` or `backend`

2. **Build Command Missing**
   - Vercel needs to know how to build both frontend and backend
   - Check: Settings → General → Build Command

3. **Environment Variables Missing**
   - Check: Settings → Environment Variables
   - Required: MONGODB_URI, JWT_SECRET, GROQ_API_KEY

4. **Framework Detection Issue**
   - Vercel might not detect Next.js correctly
   - Try: Settings → General → Framework Preset → Next.js

## Quick Fix Steps:

### Option 1: Set Root Directory to `frontend-react` (Recommended)

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **General**
4. Set **Root Directory** to: `frontend-react`
5. Set **Framework Preset** to: `Next.js`
6. **Redeploy**

Then update `vercel.json` to handle API routes differently.

### Option 2: Keep Root as `/` but Fix Build

1. Go to Vercel Dashboard
2. **Settings** → **General**
3. Set **Build Command**: 
   ```
   cd frontend-react && npm install && npm run build
   ```
4. Set **Install Command**:
   ```
   cd frontend-react && npm install && cd ../backend && npm install
   ```
5. Set **Output Directory**: `frontend-react/.next`
6. **Redeploy**

### Option 3: Check Deployment Logs

1. Go to Vercel Dashboard
2. Click on **Deployments** tab
3. Click on the latest deployment
4. Check **Build Logs** for errors
5. Look for:
   - Build errors
   - Missing dependencies
   - Environment variable issues

## Common Errors:

### Error: "Cannot find module"
- **Fix**: Check Install Command includes both directories

### Error: "Build failed"
- **Fix**: Check Build Command is correct
- **Fix**: Verify package.json files exist

### Error: "404 Not Found"
- **Fix**: Check Root Directory setting
- **Fix**: Verify routes in vercel.json

### Error: "API routes not working"
- **Fix**: Check backend/server.js exports app
- **Fix**: Verify API routes in vercel.json

## Recommended Configuration:

### In Vercel Dashboard:

**Settings → General:**
- Root Directory: `/` (root)
- Framework Preset: `Other`
- Build Command: (leave empty, use vercel.json)
- Output Directory: (leave empty)
- Install Command: `cd frontend-react && npm install && cd ../backend && npm install`

**Settings → Environment Variables:**
- `MONGODB_URI` = (your MongoDB connection string)
- `JWT_SECRET` = (your JWT secret)
- `GROQ_API_KEY` = (your Groq API key)
- `NODE_ENV` = `production`

## Test After Fix:

1. Visit: https://tutorpy.vercel.app/
2. Should see frontend
3. Test API: https://tutorpy.vercel.app/api/health
4. Should return: `{"status":"ok","mongodb":"connected"}`

## Still Not Working?

1. Check deployment logs in Vercel
2. Share the error message
3. Verify all environment variables are set
4. Check Root Directory is correct
