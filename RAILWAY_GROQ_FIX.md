# Fix: GROQ_API_KEY Error on Railway

## 🚨 Problem
Railway is crashing because `GROQ_API_KEY` is missing, even though the code should handle it gracefully.

## ✅ Solution: Two Steps

### Step 1: Add Environment Variable in Railway

1. **Go to Railway Dashboard**
   - Open your backend service

2. **Go to Environment/Variables Tab**
   - Click "Environment" or "Variables"

3. **Add GROQ_API_KEY**
   - Click "Add" or "New"
   - **Key**: `GROQ_API_KEY`
   - **Value**: Your Groq API key from [console.groq.com](https://console.groq.com)
   - Click "Save"

4. **Redeploy**
   - Railway should auto-redeploy
   - Or click "Redeploy" manually

---

### Step 2: Make Sure Latest Code is Deployed

The code should already be fixed, but let's verify:

1. **Check GitHub** - Make sure latest code is pushed
2. **In Railway** - Check if it's using latest commit
3. **Redeploy** if needed

---

## 🔍 Why This Happens

The error shows the server is trying to initialize Groq at startup. This means either:
1. Railway hasn't pulled the latest code (with lazy loading fix)
2. The environment variable isn't set

---

## ✅ Quick Fix Checklist

- [ ] Add `GROQ_API_KEY` in Railway environment variables
- [ ] Verify latest code is on GitHub
- [ ] Redeploy on Railway
- [ ] Check logs - should see server starting successfully

---

## 🎯 After Fix

You should see in logs:
```
✅ MongoDB Connected: ...
🚀 TutorPy backend running on port 3000
```

**No more Groq errors!**

---

**The main fix: Add `GROQ_API_KEY` environment variable in Railway!**
