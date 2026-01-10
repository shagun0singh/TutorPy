# Run Locally - Step by Step

## 🚀 Quick Start

### Backend: `http://localhost:3001`
### Frontend: `http://localhost:3000`

---

## 📋 Step 1: Setup Backend

### 1.1: Install Dependencies

```bash
cd /Users/pali/TutorPy/backend
npm install
```

### 1.2: Create `.env` File

Create `backend/.env` file with:

```env
MONGODB_URI=mongodb+srv://tutorpy_user:bNNJGLveeQoL0ufZ@tutorpy-cluster.8raoqzc.mongodb.net/?appName=TutorPy-cluster
JWT_SECRET=my_super_secret_jwt_key_12345_change_in_production
GROQ_API_KEY=your-groq-api-key-here
PORT=3001
NODE_ENV=development
```

**Replace `your-groq-api-key-here` with your actual Groq API key!**

### 1.3: Start Backend

```bash
cd /Users/pali/TutorPy/backend
npm start
```

**Backend runs on:** `http://localhost:3001` ✅

---

## 📋 Step 2: Setup Frontend

### 2.1: Install Dependencies

```bash
cd /Users/pali/TutorPy/frontend-react
npm install
```

### 2.2: Create `.env.local` File

Create `frontend-react/.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2.3: Start Frontend

```bash
cd /Users/pali/TutorPy/frontend-react
npm run dev
```

**Frontend runs on:** `http://localhost:3000` ✅

---

## ✅ Test Locally

1. **Open browser**: `http://localhost:3000`
2. **Test signup/login**
3. **Test chat functionality**

---

## 🎯 Quick Commands

### Terminal 1 (Backend):
```bash
cd /Users/pali/TutorPy/backend
npm install
npm start
# Runs on http://localhost:3001
```

### Terminal 2 (Frontend):
```bash
cd /Users/pali/TutorPy/frontend-react
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## 📝 Environment Variables Summary

### Backend (`backend/.env`):
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `GROQ_API_KEY` - Your Groq API key
- `PORT=3001` - Backend port

### Frontend (`frontend-react/.env.local`):
- `NEXT_PUBLIC_API_URL=http://localhost:3001` - Backend URL

---

## 🚨 Common Issues

### Issue: Port 3001 already in use
**Fix**: Change `PORT=3001` to `PORT=3002` in `backend/.env`

### Issue: Frontend can't connect to backend
**Fix**: Check `NEXT_PUBLIC_API_URL=http://localhost:3001` in `frontend-react/.env.local`

### Issue: MongoDB connection error
**Fix**: Verify `MONGODB_URI` is correct in `backend/.env`

---

## 🎉 You're Ready!

- **Backend**: `http://localhost:3001`
- **Frontend**: `http://localhost:3000`

**Open `http://localhost:3000` in your browser!**
