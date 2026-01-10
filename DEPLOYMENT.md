# Deploying TutorPy to Vercel

## Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- MongoDB Atlas connection string

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy Backend First

```bash
cd backend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? (select your account)
- Link to existing project? **N**
- Project name? **tutorpy-backend**
- Directory? **./backend** (or just press Enter)
- Override settings? **N**

After deployment, Vercel will give you a URL like: `https://tutorpy-backend.vercel.app`

#### 4. Add Environment Variables to Backend

Go to your Vercel dashboard:
1. Select your **tutorpy-backend** project
2. Go to **Settings** → **Environment Variables**
3. Add these variables:
   - `MONGODB_URI` = (your MongoDB Atlas connection string)
   - `JWT_SECRET` = (your JWT secret key)
   - `PORT` = 3000

4. **Redeploy** after adding variables:
```bash
vercel --prod
```

#### 5. Update Frontend API URL

Edit `frontend/app.js` and change the API_URL:
```javascript
const API_URL = 'https://tutorpy-backend.vercel.app/api/chat';
```
Replace `tutorpy-backend.vercel.app` with your actual backend URL from step 3.

#### 6. Deploy Frontend

```bash
cd ..
vercel
```

Follow the prompts:
- Project name? **tutorpy-frontend**
- Directory? **./** (root)
- Override settings? **N**

Then deploy to production:
```bash
vercel --prod
```

---

### Option 2: Deploy via GitHub + Vercel Dashboard

#### 1. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/TutorPy.git
git branch -M main
git push -u origin main
```

#### 2. Deploy Backend on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
4. Add Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT`
5. Click **Deploy**

#### 3. Deploy Frontend on Vercel

1. Import the same repository again
2. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
3. Click **Deploy**

#### 4. Update Frontend API URL

After backend is deployed:
1. Copy the backend URL
2. Update `frontend/app.js` with the backend URL
3. Push changes to GitHub (Vercel will auto-redeploy)

---

## Important Notes

1. **CORS Configuration**: The backend already has CORS enabled for all origins. In production, you might want to restrict this to your frontend domain.

2. **MongoDB Atlas Whitelist**: Make sure to allow access from anywhere (0.0.0.0/0) in MongoDB Atlas Network Access, or add Vercel's IP ranges.

3. **Environment Variables**: Never commit `.env` file to GitHub. It's already in `.gitignore`.

4. **Custom Domain** (Optional): You can add a custom domain in Vercel dashboard under Settings → Domains.

## Testing Deployment

After deployment, test your endpoints:

```bash
# Health check
curl https://your-backend-url.vercel.app/health

# Test signup
curl -X POST https://your-backend-url.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

## Troubleshooting

- **MongoDB Connection Issues**: Check Network Access in MongoDB Atlas
- **Environment Variables Not Working**: Redeploy after adding variables
- **CORS Errors**: Make sure backend URL in frontend is correct
- **Build Errors**: Check Vercel deployment logs in dashboard

