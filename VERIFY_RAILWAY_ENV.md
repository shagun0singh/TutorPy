# Verify GROQ_API_KEY in Railway

## 🎯 Goal
Server should use Groq API only (no demo mode). The key must be set correctly in Railway.

---

## ✅ Step 1: Verify Environment Variable in Railway

1. **Go to Railway Dashboard**
   - Click your backend service

2. **Go to Variables Tab**
   - Click "Variables" or "Environment"

3. **Check GROQ_API_KEY**:
   - Should see `GROQ_API_KEY` in the list
   - Value should be masked (showing `*******`)
   - **If missing, add it:**
     - Key: `GROQ_API_KEY`
     - Value: Your Groq API key from [console.groq.com](https://console.groq.com)

4. **Verify other variables**:
   - `MONGODB_URI` ✅
   - `JWT_SECRET` ✅
   - `GROQ_API_KEY` ✅

---

## ✅ Step 2: Push Latest Code to GitHub

The code is fixed locally but needs to be on GitHub for Railway to use it:

```bash
cd /Users/pali/TutorPy
git add backend/server.js
git commit -m "require groq api key - no demo mode"
git push origin master
```

---

## ✅ Step 3: Force Railway Redeploy

**Option A: Auto-deploy (if GitHub linked)**
- Railway should auto-deploy after you push
- Wait 2-3 minutes

**Option B: Manual Redeploy**
1. Railway Dashboard → Your service
2. "Deployments" tab
3. Click "Redeploy" or "Deploy Latest"
4. Select latest commit
5. Deploy

---

## ✅ Step 4: Check Logs

**After redeploy, check logs:**

**Good (server starts):**
```
✅ MongoDB Connected: ...
🚀 TutorPy backend running on port 3000
```

**Bad (still old code):**
```
🔑 Groq API Key present: false
GroqError: The GROQ_API_KEY environment variable is missing
```

**Bad (key not accessible):**
```
Error: GROQ_API_KEY environment variable is required
```

---

## 🔍 Troubleshooting

### Issue: Server still crashes with old error
**Fix**: Railway is still running old code. Force redeploy with latest commit.

### Issue: "GROQ_API_KEY environment variable is required"
**Fix**: 
1. Check variable is set in Railway
2. Check variable name is exactly `GROQ_API_KEY` (case-sensitive)
3. Check no extra spaces
4. Redeploy after adding

### Issue: Variable shows in Railway but server can't see it
**Fix**:
1. Make sure it's in **service variables**, not just shared
2. Redeploy after adding
3. Check variable is for correct environment (production)

---

## ✅ Success Criteria

- ✅ Server starts successfully
- ✅ No Groq errors at startup
- ✅ Chat endpoint uses Groq API (not demo mode)
- ✅ Real AI responses work

**The key is: Code on GitHub + Variable in Railway + Redeploy!**
