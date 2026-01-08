# Complete Step-by-Step Guide: Linking GitHub to Vercel

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- ✅ GitHub account (you have: shagun0singh)
- ✅ Vercel account (sign up at vercel.com if you don't have one)
- ✅ TutorPy repository pushed to GitHub (already done ✅)
- ✅ Environment variables ready (MongoDB URI, JWT Secret, Groq API Key)

---

## 🔗 STEP 1: Connect GitHub Account to Vercel

### Detailed Steps:

1. **Go to Vercel Website**
   - Open your browser
   - Navigate to: https://vercel.com
   - Click **"Log In"** (top right) if not already logged in
   - Sign in with your email or GitHub account

2. **Access Settings**
   - Once logged in, click on your **Profile Picture/Avatar** (top right corner)
   - A dropdown menu will appear
   - Click on **"Settings"**

3. **Navigate to Git Integration**
   - In the Settings page, look at the left sidebar
   - Click on **"Git"** (usually has a Git icon)
   - You'll see a list of Git providers: GitHub, GitLab, Bitbucket

4. **Connect GitHub**
   - Find **"GitHub"** in the list
   - You'll see a button that says **"Connect"** or **"Add"** next to it
   - Click on **"Connect"**

5. **Authorize Vercel**
   - You'll be redirected to GitHub's authorization page
   - GitHub will ask: "Vercel wants to access your GitHub account"
   - You'll see two options:
     - **Option A**: "Only select repositories" (recommended for privacy)
     - **Option B**: "All repositories" (gives full access)
   - **Choose**: "Only select repositories" → Click **"Next"**
   - Select **"TutorPy"** repository → Click **"Approve"** or **"Install"**
   - You'll be redirected back to Vercel

6. **Verify Connection**
   - Back in Vercel Settings → Git
   - You should now see **"GitHub"** with a green checkmark ✅
   - It should show: "Connected" or "Active"

**✅ Step 1 Complete!** GitHub is now connected to Vercel.

---

## 🚀 STEP 2: Deploy Backend Project

### Detailed Steps:

1. **Start New Project**
   - In Vercel dashboard, click the **"Add New..."** button (top right)
   - Select **"Project"** from the dropdown
   - OR go directly to: https://vercel.com/new

2. **Import Git Repository**
   - You'll see a page titled "Import Git Repository"
   - You should see your Git providers (GitHub, GitLab, Bitbucket)
   - Click on **"GitHub"** (or the GitHub icon)
   - If prompted, authorize Vercel to access GitHub (if not done in Step 1)

3. **Select Repository**
   - You'll see a list of your GitHub repositories
   - Search for **"TutorPy"** or scroll to find it
   - Click on **"TutorPy"** repository
   - Click **"Import"** button

4. **Configure Project Settings**

   You'll see a configuration page with several fields:

   **a) Project Name:**
   - Default: `tutorpy` or `TutorPy`
   - **Change to**: `tutorpy-backend` (or `tutorpy-api`)
   - This helps distinguish backend from frontend

   **b) Framework Preset:**
   - Vercel might auto-detect "Other"
   - **Select**: "Other" (if not already selected)
   - This is correct for Express.js backend

   **c) Root Directory:**
   - **⚠️ THIS IS CRITICAL ⚠️**
   - Click **"Edit"** next to Root Directory
   - **Type**: `backend`
   - This tells Vercel where your backend code is located
   - **DO NOT** leave it as `/` (root)

   **d) Build Command:**
   - **Leave empty** (Express.js doesn't need a build step)
   - OR if you have a build script: `npm run build`

   **e) Output Directory:**
   - **Leave empty** (not needed for Express.js)

   **f) Install Command:**
   - Default: `npm install`
   - **Keep as**: `npm install` (this is correct)

5. **Add Environment Variables**

   **Before clicking "Deploy", add your environment variables:**

   - Scroll down to **"Environment Variables"** section
   - Click **"Add"** or **"Add Environment Variable"**

   **Add these variables one by one:**

   **Variable 1: MONGODB_URI**
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB Atlas connection string
     - Example: `mongodb+srv://tutorpy_user:password@tutorpy-cluster.8raoqzc.mongodb.net/tutorpy?retryWrites=true&w=majority`
   - **Environment**: Select all three: Production, Preview, Development
   - Click **"Save"**

   **Variable 2: JWT_SECRET**
   - **Name**: `JWT_SECRET`
   - **Value**: A random secret string (can be anything, like: `my-super-secret-jwt-key-12345`)
   - **Environment**: Select all three
   - Click **"Save"**

   **Variable 3: GROQ_API_KEY**
   - **Name**: `GROQ_API_KEY`
   - **Value**: Your Groq API key (from groq.com)
   - **Environment**: Select all three
   - Click **"Save"**

   **Variable 4: PORT (Optional)**
   - **Name**: `PORT`
   - **Value**: `3001` (or leave empty, Vercel handles this)
   - **Environment**: Select all three
   - Click **"Save"**

   **Variable 5: NODE_ENV (Optional)**
   - **Name**: `NODE_ENV`
   - **Value**: `production`
   - **Environment**: Production only
   - Click **"Save"**

6. **Deploy**
   - Scroll to the bottom of the page
   - Click the big **"Deploy"** button
   - Vercel will start building and deploying your backend

7. **Wait for Deployment**
   - You'll see a deployment log showing:
     - "Installing dependencies..."
     - "Building..."
     - "Deploying..."
   - This usually takes 1-3 minutes
   - **DO NOT close the page**

8. **Get Your Backend URL**
   - Once deployment is complete, you'll see:
     - ✅ "Ready" or "Deployment successful"
   - You'll see a URL like: `https://tutorpy-backend.vercel.app`
   - **COPY THIS URL** - you'll need it for the frontend!
   - Click on the URL to test it
   - You should see JSON response (your API info)

**✅ Step 2 Complete!** Backend is deployed.

---

## 🎨 STEP 3: Deploy Frontend Project

### Detailed Steps:

1. **Start Another New Project**
   - Go back to Vercel dashboard
   - Click **"Add New..."** → **"Project"**
   - OR go to: https://vercel.com/new

2. **Import Same Repository**
   - Click on **"GitHub"**
   - Find and select **"TutorPy"** repository again
   - Click **"Import"**

3. **Configure Project Settings**

   **a) Project Name:**
   - **Change to**: `tutorpy-frontend` (or `tutorpy-app`)
   - This distinguishes it from the backend

   **b) Framework Preset:**
   - Vercel should auto-detect **"Next.js"** ✅
   - If not, select **"Next.js"** from the dropdown
   - This is correct for your React/Next.js frontend

   **c) Root Directory:**
   - **⚠️ THIS IS CRITICAL ⚠️**
   - Click **"Edit"** next to Root Directory
   - **Type**: `frontend-react`
   - This tells Vercel where your Next.js app is located
   - **DO NOT** leave it as `/` (root)

   **d) Build Command:**
   - Should auto-fill: `npm run build`
   - **Keep this** (it's correct for Next.js)

   **e) Output Directory:**
   - Should auto-fill: `.next`
   - **Keep this** (it's correct for Next.js)

   **f) Install Command:**
   - Default: `npm install`
   - **Keep this**

4. **Add Environment Variables**

   **Variable 1: NEXT_PUBLIC_API_URL**
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your backend URL from Step 2
     - Example: `https://tutorpy-backend.vercel.app`
   - **Important**: Must start with `NEXT_PUBLIC_` for Next.js to expose it to the browser
   - **Environment**: Select all three
   - Click **"Save"**

   **Optional Variables:**
   - If you have other API keys or configs, add them here
   - Make sure they start with `NEXT_PUBLIC_` if they need to be accessible in the browser

5. **Deploy**
   - Scroll down and click **"Deploy"**
   - Wait for deployment (usually 2-5 minutes for Next.js)
   - You'll see build logs in real-time

6. **Get Your Frontend URL**
   - Once complete, you'll see:
     - ✅ "Ready"
   - URL like: `https://tutorpy-frontend.vercel.app`
   - **Click on it** to see your live app!

**✅ Step 3 Complete!** Frontend is deployed.

---

## 🧪 STEP 4: Test Auto-Deployment

### Detailed Steps:

1. **Make a Small Change**
   - Open your local project in your code editor
   - Make a small, visible change:
     - Example: Update a text in `frontend-react/app/page.tsx`
     - Or add a comment in `backend/server.js`

2. **Commit the Change**
   ```bash
   # Navigate to your project
   cd /Users/pali/TutorPy
   
   # Check what changed
   git status
   
   # Add the changes
   git add .
   
   # Commit with a message
   git commit -m "Test auto-deployment"
   
   # Push to GitHub
   git push origin main
   ```

3. **Watch Vercel Dashboard**
   - Go to your Vercel dashboard: https://vercel.com/dashboard
   - You should see:
     - A new deployment starting automatically
     - Status: "Building..." or "Deploying..."
     - This happens within seconds of pushing to GitHub!

4. **Verify Deployment**
   - Wait 1-3 minutes for deployment to complete
   - Check the deployment status:
     - ✅ Green checkmark = Success
     - ❌ Red X = Failed (check logs)
   - Click on the deployment to see details
   - Visit your live URL to see the changes

**✅ Step 4 Complete!** Auto-deployment is working!

---

## 🔧 STEP 5: Verify Configuration

### Check Backend Project:

1. Go to Vercel dashboard
2. Click on **"tutorpy-backend"** project
3. Go to **"Settings"** → **"General"**
4. Verify:
   - ✅ **Root Directory**: `backend`
   - ✅ **Framework**: Other
5. Go to **"Settings"** → **"Environment Variables"**
6. Verify all variables are there:
   - ✅ MONGODB_URI
   - ✅ JWT_SECRET
   - ✅ GROQ_API_KEY

### Check Frontend Project:

1. Click on **"tutorpy-frontend"** project
2. Go to **"Settings"** → **"General"**
3. Verify:
   - ✅ **Root Directory**: `frontend-react`
   - ✅ **Framework**: Next.js
4. Go to **"Settings"** → **"Environment Variables"**
5. Verify:
   - ✅ NEXT_PUBLIC_API_URL = your backend URL

### Check Git Integration:

1. In either project, go to **"Settings"** → **"Git"**
2. Verify:
   - ✅ **Repository**: `shagun0singh/TutorPy`
   - ✅ **Production Branch**: `main`
   - ✅ **Auto-deploy**: Enabled

---

## 🐛 Troubleshooting Common Issues

### Issue 1: "Changes not detected"

**Solution:**
- Check Root Directory is correct:
  - Backend: `backend`
  - Frontend: `frontend-react`
- Go to Settings → General → Root Directory
- Update if wrong, then redeploy

### Issue 2: "Build failed"

**Solution:**
- Click on the failed deployment
- Check "Build Logs" tab
- Look for error messages
- Common issues:
  - Missing dependencies → Add to package.json
  - Environment variables missing → Add in Settings
  - Wrong Node version → Set in Settings → General → Node.js Version

### Issue 3: "Environment variables not working"

**Solution:**
- Go to Settings → Environment Variables
- Make sure variables are added for all environments (Production, Preview, Development)
- After adding variables, **Redeploy**:
  - Go to Deployments tab
  - Click "..." on latest deployment
  - Click "Redeploy"

### Issue 4: "Frontend can't connect to backend"

**Solution:**
- Check `NEXT_PUBLIC_API_URL` in frontend environment variables
- Make sure it's your backend URL (not localhost)
- Should be: `https://tutorpy-backend.vercel.app`
- Redeploy frontend after updating

### Issue 5: "GitHub not connected"

**Solution:**
- Go to Settings → Git
- Click "Disconnect" then "Connect" again
- Re-authorize GitHub access
- Select TutorPy repository

---

## 📝 Quick Reference Commands

```bash
# Check current git remote
git remote -v

# Should show:
# origin  https://github.com/shagun0singh/TutorPy.git

# Push changes (triggers auto-deploy)
git add .
git commit -m "Your commit message"
git push origin main

# Check deployment status
# Visit: https://vercel.com/dashboard
```

---

## ✅ Final Checklist

- [ ] GitHub connected to Vercel
- [ ] Backend project deployed with correct root directory (`backend`)
- [ ] Backend environment variables added (MONGODB_URI, JWT_SECRET, GROQ_API_KEY)
- [ ] Backend URL copied and saved
- [ ] Frontend project deployed with correct root directory (`frontend-react`)
- [ ] Frontend environment variable added (NEXT_PUBLIC_API_URL = backend URL)
- [ ] Tested auto-deployment by pushing a change
- [ ] Both projects showing in Vercel dashboard
- [ ] Live URLs working correctly

---

## 🎉 Success!

Once all steps are complete:
- ✅ Every push to GitHub automatically deploys
- ✅ Pull requests get preview deployments
- ✅ You can see deployment status in GitHub
- ✅ Easy rollback to previous versions
- ✅ Environment variables managed securely

**Your TutorPy app is now live and auto-deploying! 🚀**

---

## 📞 Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Check Root Directory settings
4. Review this guide again
5. Check Vercel documentation: https://vercel.com/docs
