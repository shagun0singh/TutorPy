# Linking GitHub to Vercel for Auto-Deployments

## Step-by-Step Guide

### 1. Connect GitHub Account to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click on your **Profile** (top right) → **Settings**
3. Go to **Git** section
4. Click **Connect** next to GitHub
5. Authorize Vercel to access your GitHub repositories
6. Select the repositories you want to give access to (or select "All repositories")

---

### 2. Import Your Repository

#### For Backend (Express API):

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select **GitHub** as your Git provider
4. Find and select **shagun0singh/TutorPy**
5. Click **Import**

6. **Configure Project Settings:**
   - **Project Name**: `tutorpy-backend` (or your preferred name)
   - **Framework Preset**: **Other**
   - **Root Directory**: `backend` ⚠️ **IMPORTANT**
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: `npm install`

7. **Add Environment Variables:**
   Click **Environment Variables** and add:
   - `MONGODB_URI` = `your-mongodb-connection-string`
   - `JWT_SECRET` = `your-jwt-secret`
   - `GROQ_API_KEY` = `your-groq-api-key`
   - `PORT` = `3001` (optional, Vercel handles this)
   - `NODE_ENV` = `production`

8. Click **Deploy**

---

#### For Frontend (Next.js):

1. Go to [vercel.com/new](https://vercel.com/new) again
2. Click **Import Git Repository**
3. Select **GitHub** → **shagun0singh/TutorPy**
4. Click **Import**

5. **Configure Project Settings:**
   - **Project Name**: `tutorpy-frontend` (or your preferred name)
   - **Framework Preset**: **Next.js** (Vercel will auto-detect)
   - **Root Directory**: `frontend-react` ⚠️ **IMPORTANT**
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install`

6. **Add Environment Variables** (if needed):
   - `NEXT_PUBLIC_API_URL` = `https://tutorpy-backend.vercel.app` (your backend URL)

7. Click **Deploy**

---

### 3. Enable Automatic Deployments

After importing, Vercel automatically:
- ✅ Watches your GitHub repository
- ✅ Deploys on every push to `main` branch
- ✅ Creates preview deployments for pull requests
- ✅ Shows deployment status in GitHub

**To verify it's working:**
1. Make a small change in your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test auto-deployment"
   git push origin main
   ```
3. Go to your Vercel dashboard
4. You should see a new deployment starting automatically!

---

### 4. Configure Deployment Settings

#### For Backend Project:

1. Go to your backend project in Vercel dashboard
2. Click **Settings** → **Git**
3. Ensure:
   - **Production Branch**: `main`
   - **Auto-deploy**: ✅ Enabled
   - **Ignore Build Step**: (leave empty)

#### For Frontend Project:

1. Go to your frontend project in Vercel dashboard
2. Click **Settings** → **Git**
3. Ensure:
   - **Production Branch**: `main`
   - **Auto-deploy**: ✅ Enabled
   - **Ignore Build Step**: (leave empty)

---

### 5. Update Frontend to Use Backend URL

After backend is deployed, update your frontend to use the production backend URL.

Edit `frontend-react/app/chat/page.tsx` and other API calls to use:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tutorpy-backend.vercel.app';
```

Or set it in `next.config.js`:
```javascript
env: {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://tutorpy-backend.vercel.app'
}
```

---

## Troubleshooting

### Changes Not Detected on Vercel:

1. **Check Root Directory:**
   - Backend: Should be `backend`
   - Frontend: Should be `frontend-react`
   - Go to **Settings** → **General** → **Root Directory**

2. **Check Git Connection:**
   - Go to **Settings** → **Git**
   - Ensure repository is connected
   - Click **Disconnect** and reconnect if needed

3. **Check Branch:**
   - Ensure you're pushing to `main` branch
   - Check **Settings** → **Git** → **Production Branch**

4. **Manual Redeploy:**
   - Go to **Deployments** tab
   - Click **⋯** (three dots) on latest deployment
   - Click **Redeploy**

5. **Check Build Logs:**
   - Click on a deployment
   - Check **Build Logs** for errors
   - Fix any build errors

---

## Quick Commands

```bash
# Check current remote
git remote -v

# Push changes (triggers auto-deploy)
git add .
git commit -m "Your commit message"
git push origin main

# Check deployment status
# Visit: vercel.com/dashboard
```

---

## Benefits of GitHub Integration

✅ **Automatic Deployments**: Every push to `main` triggers a new deployment
✅ **Preview Deployments**: Every PR gets its own preview URL
✅ **Deployment Status**: See deployment status directly in GitHub
✅ **Rollback**: Easily rollback to previous deployments
✅ **Environment Variables**: Manage secrets securely in Vercel dashboard

---

## Next Steps

1. ✅ Connect GitHub to Vercel
2. ✅ Import both projects (backend + frontend)
3. ✅ Configure root directories correctly
4. ✅ Add environment variables
5. ✅ Test auto-deployment by pushing a change
6. ✅ Update frontend API URLs to use production backend

Your deployments will now automatically update whenever you push to GitHub! 🚀
