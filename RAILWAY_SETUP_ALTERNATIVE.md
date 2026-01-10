# Railway Setup - Alternative Methods

## 🚨 Can't Find Root Directory Setting?

Railway's UI has changed. Here are alternative ways to fix this:

---

## ✅ Method 1: Create Service from Backend Directory

### Step-by-Step:

1. **Delete current Railway project** (if exists)
   - Or create a new one

2. **Create New Service**:
   - Click "New Project"
   - Select "Empty Project"
   - Click "Add Service" → "GitHub Repo"
   - Select your `TutorPy` repository

3. **Configure Service**:
   - **Service Name**: `tutorpy-backend`
   - **Root Directory**: Type `backend` here
   - Railway will detect Node.js automatically

4. **Add Environment Variables**:
   - Click "Variables" tab
   - Add:
     ```
     MONGODB_URI=your-mongodb-uri
     JWT_SECRET=your-jwt-secret
     GROQ_API_KEY=your-groq-key
     PORT=3000
     NODE_ENV=production
     ```

5. **Deploy**

---

## ✅ Method 2: Use railway.toml (I just created this)

I've created `railway.toml` at the root that tells Railway to:
- Build from root
- Start command: `cd backend && node server.js`

**Steps:**
1. Make sure `railway.toml` is committed (I'll push it)
2. In Railway, when creating service:
   - Don't set root directory
   - Railway will use the `railway.toml` file
   - The start command will `cd` into backend

---

## ✅ Method 3: Use Railway CLI

1. **Install Railway CLI**:
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**:
   ```bash
   railway login
   ```

3. **Link Project**:
   ```bash
   cd /Users/pali/TutorPy
   railway link
   ```

4. **Set Root Directory**:
   ```bash
   railway variables set RAILWAY_ROOT_DIRECTORY=backend
   ```

5. **Deploy**:
   ```bash
   railway up
   ```

---

## ✅ Method 4: Create Separate Backend Repo (Easiest)

If Railway keeps having issues, create a separate repo:

1. **Create new GitHub repo**: `TutorPy-Backend`
2. **Copy backend folder**:
   ```bash
   cp -r backend/* TutorPy-Backend/
   ```
3. **Push to new repo**
4. **Deploy from new repo** in Railway
5. **No root directory needed!**

---

## 🎯 Recommended: Method 1 or Method 2

**Try Method 1 first** (create new service with root directory during setup).

**If that doesn't work, Method 2** (railway.toml) should work automatically.

---

## 📋 Where to Find Settings in Railway

The UI might be different. Look for:
- **Service Settings** (click on your service)
- **Configuration** tab
- **Settings** → **General**
- **Deploy** → **Settings**

Or try:
- Click on your **service name** (not project)
- Look for **"Settings"** or **"Configure"**
- Find **"Root Directory"** or **"Working Directory"**

---

## 🔧 Quick Test

After setting up, check Railway logs. You should see:
```
✓ Detected Node.js
✓ Installing dependencies from backend/package.json
✓ Starting: node server.js
```

If you see errors about missing files, the root directory isn't set correctly.

---

**Which method do you want to try? I recommend Method 1 (create new service) or Method 2 (railway.toml).**
