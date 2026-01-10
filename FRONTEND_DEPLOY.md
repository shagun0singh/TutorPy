# 🚀 Deploy Frontend to Vercel - Step by Step

## ✅ Backend on Railway - DONE!

Now let's deploy the frontend and connect everything.

---

## 📋 Step 1: Get Your Backend URL

1. **Go to Railway Dashboard**
   - [railway.app](https://railway.app)
   - Click on your backend service

2. **Find Your URL**
   - Look for **"Settings"** tab
   - Or check the **"Deployments"** tab
   - Find the **"Public URL"** or **"Domain"**
   - Copy it! (e.g., `https://tutorpy-backend.railway.app`)

3. **Test Backend** (optional):
   ```bash
   curl https://your-backend.railway.app/health
   ```
   Should return: `{"status":"ok"}`

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1: Go to Vercel

1. Visit: [vercel.com/new](https://vercel.com/new)
2. **Sign in** with GitHub (if not already)

### 2.2: Import Repository

1. Click **"Import Git Repository"**
2. Select **"GitHub"**
3. Find and select: **`TutorPy`** (your repository)
4. Click **"Import"**

### 2.3: Configure Project

**Project Settings:**
- **Project Name**: `tutorpy` (or your choice)
- **Root Directory**: `frontend-react` ⚠️ **IMPORTANT!**
  - Click "Edit" next to Root Directory
  - Type: `frontend-react`
  - Click "Continue"
- **Framework Preset**: Next.js (should auto-detect)
- **Build Command**: (leave empty - auto-detected)
- **Output Directory**: (leave empty - auto-detected)
- **Install Command**: (leave empty - auto-detected)

### 2.4: Add Environment Variable ⚠️ CRITICAL!

**BEFORE clicking "Deploy"**, add the environment variable:

1. Click **"Environment Variables"** section
2. Click **"Add"** or **"New"**
3. Add:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend.railway.app` (paste your Railway backend URL here!)
   - **Environments**: Select all ✅
     - ✅ Production
     - ✅ Preview
     - ✅ Development
4. Click **"Add"** or **"Save"**

### 2.5: Deploy!

1. Click **"Deploy"** button
2. Wait 2-3 minutes for build
3. Your frontend will be live! 🎉

---

## ✅ Step 3: Test Everything

### Test Frontend:
1. Visit your Vercel URL (e.g., `https://tutorpy.vercel.app`)
2. You should see your landing page

### Test Signup:
1. Click **"Sign Up"** or go to `/signup`
2. Create an account
3. Should redirect to chat page

### Test Login:
1. Go to `/signin`
2. Login with your account
3. Should redirect to chat page

### Test Chat:
1. Type a question in the chat
2. Should get AI response
3. Code editor should appear after first response

---

## 🔧 Step 4: Update Backend CORS (if needed)

If you get CORS errors when testing:

1. **Go to Railway** → Your backend service
2. **Add Environment Variable**:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://your-frontend.vercel.app` (your Vercel URL)
3. **Redeploy** backend

The backend code already supports this!

---

## 📝 Quick Checklist

- [x] Backend deployed to Railway ✅
- [ ] Got backend URL from Railway
- [ ] Frontend deployed to Vercel
- [ ] `NEXT_PUBLIC_API_URL` set in Vercel
- [ ] Tested signup
- [ ] Tested login
- [ ] Tested chat

---

## 🚨 Common Issues

### Issue: Frontend shows "Network error"
**Fix**: Check `NEXT_PUBLIC_API_URL` is set correctly in Vercel

### Issue: CORS error
**Fix**: Add `FRONTEND_URL` to Railway backend env vars

### Issue: 404 on API calls
**Fix**: Verify backend URL has no trailing slash

### Issue: "Cannot connect to backend"
**Fix**: 
1. Test backend directly: `curl https://your-backend.railway.app/health`
2. If backend works, check `NEXT_PUBLIC_API_URL` in Vercel

---

## 🎯 Summary

1. ✅ Get backend URL from Railway
2. ✅ Deploy frontend to Vercel
3. ✅ Set `NEXT_PUBLIC_API_URL` in Vercel
4. ✅ Test everything

**You're almost done! Just deploy the frontend now!** 🚀
