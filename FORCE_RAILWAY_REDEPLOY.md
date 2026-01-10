# Force Railway to Use Latest Code

## 🚨 Problem
Railway is still running OLD code (shows `🔑 Groq API Key present: false` which is from old code).

## ✅ Solution: Force Redeploy

### Step 1: Verify Code is Pushed to GitHub

1. **Go to GitHub**: [github.com/shagun0singh/TutorPy](https://github.com/shagun0singh/TutorPy)
2. **Check** `backend/server.js` line 12-20
3. **Should see**: `function getGroqClient()` (not `const groq = new Groq`)

If code is NOT on GitHub, push it:
```bash
cd /Users/pali/TutorPy
git add backend/server.js
git commit -m "fix: remove module-level groq init"
git push origin master
```

---

### Step 2: Force Railway Redeploy

**Option A: Trigger via GitHub (Recommended)**

1. **Make a small change** to trigger deploy:
   ```bash
   cd /Users/pali/TutorPy
   echo "# Force redeploy" >> backend/README.md
   git add backend/README.md
   git commit -m "trigger railway redeploy"
   git push origin master
   ```

2. **Railway should auto-deploy** within 1-2 minutes

**Option B: Manual Redeploy in Railway**

1. **Go to Railway Dashboard**
2. **Click your backend service**
3. **Go to "Deployments" tab**
4. **Click "Redeploy"** or **"Deploy Latest"**
5. **Select the latest commit** from GitHub
6. **Click "Deploy"**

**Option C: Delete and Recreate Service**

If redeploy doesn't work:
1. **Delete the service** in Railway
2. **Create new service** from GitHub
3. **Set Root Directory**: `backend`
4. **Add environment variables** again
5. **Deploy**

---

### Step 3: Verify Environment Variables

Even after code fix, you still need the key:

1. **In Railway** → Your service → **Variables**
2. **Verify**:
   - `GROQ_API_KEY` is set ✅
   - `JWT_SECRET` is set ✅
   - `MONGODB_URI` is set ✅

---

### Step 4: Check Logs After Deploy

**Good logs** (new code):
```
✅ MongoDB Connected: ...
🚀 TutorPy backend running on port 3000
```

**Bad logs** (old code):
```
🔑 Groq API Key present: false
GroqError: The GROQ_API_KEY environment variable is missing
```

---

## 🎯 Quick Fix

**The fastest way:**

1. **Push latest code to GitHub** (if not already)
2. **In Railway** → Your service → **Deployments**
3. **Click "Redeploy"** → Select latest commit
4. **Wait 2-3 minutes**
5. **Check logs** - should see server starting successfully

---

## ✅ After Fix

The server should:
- ✅ Start without crashing
- ✅ Show MongoDB connected
- ✅ Be ready to handle requests

**The key is forcing Railway to use the latest code from GitHub!**
