# Fix: GROQ_API_KEY Missing in Railway

## 🚨 Error
```
GroqError: The GROQ_API_KEY environment variable is missing or empty
```

## ✅ Solution: Add Environment Variable in Railway

### Step-by-Step:

1. **Go to Railway Dashboard**
   - [railway.app](https://railway.app)
   - Click on your backend service

2. **Open Variables Tab**
   - Click **"Variables"** tab (or **"Environment"** tab)
   - You should see your existing variables

3. **Add GROQ_API_KEY**
   - Click **"New Variable"** or **"Add"** button
   - **Key**: `GROQ_API_KEY`
   - **Value**: Your Groq API key (get it from [console.groq.com](https://console.groq.com))
   - Click **"Add"** or **"Save"**

4. **Redeploy**
   - Railway will automatically redeploy when you add variables
   - Or manually click **"Redeploy"** button
   - Wait 1-2 minutes

5. **Check Logs**
   - Go to **"Deployments"** tab
   - Click on latest deployment
   - Should see: `🔑 Groq API Key present: true`
   - Server should start successfully

---

## 📋 Required Environment Variables in Railway

Make sure you have ALL these set:

- [x] `MONGODB_URI` - MongoDB connection string
- [x] `JWT_SECRET` - Secret key for JWT tokens
- [ ] `GROQ_API_KEY` - **MISSING - ADD THIS!**
- [x] `PORT` - Port number (optional, defaults to 3000)
- [x] `NODE_ENV` - Set to `production`

---

## 🔑 How to Get Groq API Key

1. **Go to**: [console.groq.com](https://console.groq.com)
2. **Sign up** or **Log in**
3. **Go to API Keys** section
4. **Create API Key** (or copy existing one)
5. **Paste it** in Railway as `GROQ_API_KEY`

---

## ✅ After Adding Variable

The backend should:
- ✅ Start successfully
- ✅ Connect to MongoDB
- ✅ Be ready to handle API requests

**Check logs** - you should see:
```
✅ MongoDB Connected: ...
🚀 TutorPy backend running on port 3000
```

---

## 🚨 If Still Not Working

1. **Verify** the variable name is exactly `GROQ_API_KEY` (case-sensitive)
2. **Check** there are no extra spaces in the value
3. **Redeploy** after adding the variable
4. **Check logs** for any other errors

---

**The fix is simple: Just add `GROQ_API_KEY` environment variable in Railway!**
