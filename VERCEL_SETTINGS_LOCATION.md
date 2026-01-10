# Where to Find Vercel Build Settings

## The settings you need are in "Build and Deployment" section!

Since you're in **General**, you need to go to a different section:

---

## STEP 1: Find Build Settings

1. In Vercel Dashboard, you're currently in **Settings → General**
2. Look at the **left sidebar** in Settings
3. Click on **"Build and Deployment"** (it's right below General)

---

## STEP 2: Update Build Settings

In **Build and Deployment**, you'll find:

### Root Directory
- Click **"Edit"** next to Root Directory
- **Type**: `/` (just a forward slash, or leave empty)
- Click **"Save"**

### Framework Preset
- Click **"Edit"** next to Framework Preset  
- Select: **"Other"**
- Click **"Save"**

### Build Command
- Click **"Edit"** next to Build Command
- **Type**: `cd frontend-react && npm run build`
- Click **"Save"**

### Install Command
- Click **"Edit"** next to Install Command
- **Type**: `cd frontend-react && npm install && cd ../backend && npm install`
- Click **"Save"**

### Output Directory
- Click **"Edit"** next to Output Directory
- **Type**: `frontend-react/.next`
- Click **"Save"**

---

## STEP 3: Environment Variables

1. Still in **Settings** (left sidebar)
2. Click **"Environment Variables"**
3. Verify these exist (add if missing):
   - **MONGODB_URI** = `your-mongodb-connection-string`
   - **JWT_SECRET** = `my_super_secret_jwt_key_12345_change_in_production`
   - **GROQ_API_KEY** = `your-groq-api-key-here`
   - **NODE_ENV** = `production` (optional)

---

## Quick Navigation:

**Settings → Build and Deployment** (for build settings)
**Settings → Environment Variables** (for env vars)

---

## If You Still Don't See These Options:

Some Vercel projects might have these settings locked or in a different location. Try:

1. **Check if project is connected to Git:**
   - Settings → Git
   - Make sure GitHub is connected

2. **Try redeploying with vercel.json:**
   - The `vercel.json` file should handle most settings
   - Just make sure Environment Variables are set
   - Then redeploy

3. **Alternative: Use Vercel CLI:**
   - Install: `npm i -g vercel`
   - Run: `vercel --prod`
   - This will use vercel.json automatically

---

## What to Do Right Now:

1. **Go to**: Settings → **Build and Deployment**
2. **Update** the settings listed above
3. **Go to**: Settings → **Environment Variables**
4. **Verify** all variables are set
5. **Redeploy** from Deployments tab
