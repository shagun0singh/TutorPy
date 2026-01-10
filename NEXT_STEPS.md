# ✅ Backend Deployed! Next Steps

## 🎉 Backend on Railway - DONE!

Now let's deploy the frontend and connect everything.

---

## 📋 Step 1: Get Your Backend URL

1. **Go to Railway Dashboard**
2. **Click on your backend service**
3. **Copy the URL** (should look like: `https://tutorpy-backend.railway.app` or similar)
4. **Save it** - you'll need it for the frontend!

---

## 🚀 Step 2: Deploy Frontend to Vercel

### 2.1: Go to Vercel

1. Visit: [vercel.com/new](https://vercel.com/new)
2. **Sign in** with GitHub (if not already)

### 2.2: Import Repository

1. Click **"Import Git Repository"**
2. Select **"GitHub"**
3. Find and select: **`TutorPy`**
4. Click **"Import"**

### 2.3: Configure Project

**Project Settings:**
- **Project Name**: `tutorpy` (or your choice)
- **Root Directory**: `frontend-react` ⚠️ **IMPORTANT!**
- **Framework Preset**: Next.js (should auto-detect)
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: (leave empty)

### 2.4: Add Environment Variable

**Before clicking "Deploy"**, click **"Environment Variables"**:

1. Click **"Add"**
2. **Key**: `NEXT_PUBLIC_API_URL`
3. **Value**: `https://your-backend.railway.app` (paste your Railway URL here!)
4. **Environments**: Select all (Production, Preview, Development)
5. Click **"Add"**

### 2.5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Your frontend will be live!

---

## ✅ Step 3: Test Everything

### Test Backend:
```bash
curl https://your-backend.railway.app/health
```

Should return: `{"status":"ok"}`

### Test Frontend:
1. Visit your Vercel URL (e.g., `https://tutorpy.vercel.app`)
2. Try **signing up** (create account)
3. Try **logging in**
4. Try **chat functionality**

---

## 🔧 Step 4: Update Backend CORS (if needed)

If you get CORS errors, update backend CORS:

1. **Go to Railway** → Your backend service
2. **Add Environment Variable**:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://your-frontend.vercel.app`
3. **Redeploy backend**

The backend code already supports this via `process.env.FRONTEND_URL`.

---

## 📝 Environment Variables Checklist

### ✅ Backend (Railway) - Should already be set:
- [x] `MONGODB_URI`
- [x] `JWT_SECRET`
- [x] `GROQ_API_KEY`
- [x] `PORT` (optional)
- [x] `NODE_ENV=production`

### ⏳ Frontend (Vercel) - Need to set:
- [ ] `NEXT_PUBLIC_API_URL` = `https://your-backend.railway.app`

---

## 🎯 Quick Checklist

- [x] Backend deployed to Railway
- [ ] Got backend URL from Railway
- [ ] Frontend deployed to Vercel
- [ ] `NEXT_PUBLIC_API_URL` set in Vercel
- [ ] Tested signup
- [ ] Tested login
- [ ] Tested chat

---

## 🚨 Common Issues

### Issue: CORS Error
**Fix**: Add `FRONTEND_URL` to Railway backend env vars

### Issue: Frontend can't connect
**Fix**: Check `NEXT_PUBLIC_API_URL` is set correctly in Vercel

### Issue: 404 on API calls
**Fix**: Verify backend URL is correct (no trailing slash)

---

## 🎉 You're Almost Done!

**Next**: Deploy frontend to Vercel with the backend URL!

**Need help?** Let me know if you encounter any issues!
