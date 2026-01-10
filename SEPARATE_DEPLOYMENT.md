# Separate Deployment: Frontend (Vercel) + Backend (Railway/Render)

## 🎯 Architecture

```
Frontend (Next.js) → Vercel
Backend (Express) → Railway or Render
```

---

## 🚀 Option 1: Backend on Railway (Recommended)

### Why Railway?
- ✅ Easy setup
- ✅ Free tier available
- ✅ Auto-deploys from GitHub
- ✅ Great for Node.js/Express

---

### STEP 1: Prepare Backend for Deployment

1. **Update backend/server.js** to export app for serverless:

```javascript
// At the end of backend/server.js
// Export app for Railway/Render
module.exports = app;

// Only start server in local dev
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}
```

2. **Create `backend/railway.json`** (optional):

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

### STEP 2: Deploy Backend to Railway

1. **Sign up**: Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `TutorPy` repository

3. **Configure Project**:
   - **Root Directory**: `backend`
   - Railway will auto-detect Node.js

4. **Add Environment Variables**:
   - Click on your project → "Variables"
   - Add these:
     ```
     MONGODB_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret-key
     GROQ_API_KEY=your-groq-api-key
     PORT=3000
     NODE_ENV=production
     ```

5. **Deploy**:
   - Railway will auto-deploy
   - Wait 2-3 minutes
   - Copy the deployment URL (e.g., `https://tutorpy-backend.railway.app`)

---

### STEP 3: Update Frontend to Use Backend URL

1. **Create `.env.local` in `frontend-react/`**:

```bash
NEXT_PUBLIC_API_URL=https://tutorpy-backend.railway.app
```

2. **Update API calls in frontend**:

Check `frontend-react/app/chat/page.tsx` and update:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
```

3. **Update CORS in backend** (if needed):

In `backend/server.js`:
```javascript
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://your-frontend.vercel.app'
    ],
    credentials: true
}));
```

---

### STEP 4: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**:
   - [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repo

2. **Configure**:
   - **Root Directory**: `frontend-react`
   - **Framework**: Next.js (auto-detect)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

3. **Add Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://tutorpy-backend.railway.app
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build

---

## 🎨 Option 2: Backend on Render

### Why Render?
- ✅ Free tier available
- ✅ Easy setup
- ✅ Auto-deploys from GitHub

---

### STEP 1: Deploy Backend to Render

1. **Sign up**: Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**:
   - Click "New" → "Web Service"
   - Connect your GitHub repo
   - Select `TutorPy` repository

3. **Configure**:
   - **Name**: `tutorpy-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Root Directory**: `backend`

4. **Add Environment Variables**:
   - Click "Environment"
   - Add:
     ```
     MONGODB_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret-key
     GROQ_API_KEY=your-groq-api-key
     PORT=3000
     NODE_ENV=production
     ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait 3-5 minutes
   - Copy URL (e.g., `https://tutorpy-backend.onrender.com`)

---

### STEP 2: Update Frontend (Same as Railway)

1. **Update `.env.local`**:
```bash
NEXT_PUBLIC_API_URL=https://tutorpy-backend.onrender.com
```

2. **Deploy to Vercel** (same steps as above)

---

## 🔧 Quick Setup Script

I'll create a script to help you set this up. But first, let me check your current setup:

---

## 📋 Comparison: Railway vs Render

| Feature | Railway | Render |
|---------|---------|--------|
| **Free Tier** | ✅ Yes | ✅ Yes |
| **Auto-Deploy** | ✅ Yes | ✅ Yes |
| **Setup Time** | ⚡ 2-3 min | ⏱️ 3-5 min |
| **Cold Starts** | ⚡ Fast | ⏱️ Slower (free tier) |
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Best For** | Quick setup | More control |

**Recommendation**: Start with **Railway** (faster, easier)

---

## 🚨 Important Notes

### CORS Configuration

Your backend needs to allow requests from your Vercel frontend:

**In `backend/server.js`**:
```javascript
const cors = require('cors');

app.use(cors({
    origin: [
        'http://localhost:3000', // Local dev
        'https://your-app.vercel.app', // Production
        'https://*.vercel.app' // All Vercel previews
    ],
    credentials: true
}));
```

### Environment Variables

**Backend (Railway/Render)**:
- `MONGODB_URI`
- `JWT_SECRET`
- `GROQ_API_KEY`
- `PORT` (optional, defaults to 3000)
- `NODE_ENV=production`

**Frontend (Vercel)**:
- `NEXT_PUBLIC_API_URL` (your backend URL)

---

## ✅ Testing After Deployment

1. **Test Backend**:
   ```bash
   curl https://your-backend.railway.app/health
   ```

2. **Test Frontend**:
   - Visit your Vercel URL
   - Try signing up/login
   - Try chat functionality

---

## 🔄 Local Development

Keep your local setup working:

**Terminal 1 (Backend)**:
```bash
cd backend
npm install
npm start
# Runs on http://localhost:3001
```

**Terminal 2 (Frontend)**:
```bash
cd frontend-react
npm install
npm run dev
# Runs on http://localhost:3000
```

**Frontend `.env.local`**:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🎯 Next Steps

1. Choose: Railway or Render
2. Deploy backend first
3. Get backend URL
4. Update frontend with backend URL
5. Deploy frontend to Vercel
6. Test everything

**Want me to help you set this up step by step?**
