# Fix: localhost Connection Refused

## 🚨 Problem
`ERR_CONNECTION_REFUSED` means the server isn't running.

## ✅ Solution: Start Both Servers

---

## 📋 Step 1: Start Backend Server

### Open Terminal 1:

```bash
cd /Users/pali/TutorPy/backend

# Install dependencies (if not done)
npm install

# Start server
npm start
```

**You should see:**
```
🚀 TutorPy backend running on http://localhost:3001
✅ MongoDB Connected: ...
```

**Keep this terminal open!**

---

## 📋 Step 2: Start Frontend Server

### Open Terminal 2 (NEW terminal window):

```bash
cd /Users/pali/TutorPy/frontend-react

# Install dependencies (if not done)
npm install

# Create .env.local if missing
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Start frontend
npm run dev
```

**You should see:**
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  ✓ Ready in X seconds
```

**Keep this terminal open!**

---

## ✅ Step 3: Open Browser

1. **Wait for both servers to start** (10-30 seconds)
2. **Open browser**: `http://localhost:3000`
3. **Should work now!** ✅

---

## 🔍 Troubleshooting

### Issue: Port 3000 or 3001 already in use

**Check what's using the port:**
```bash
lsof -ti:3000
lsof -ti:3001
```

**Kill the process:**
```bash
kill -9 $(lsof -ti:3000)
kill -9 $(lsof -ti:3001)
```

**Or change ports:**
- Backend: Change `PORT=3001` to `PORT=3002` in `backend/.env`
- Frontend: Change `.env.local` to `NEXT_PUBLIC_API_URL=http://localhost:3002`

---

### Issue: Backend not starting

**Check:**
1. Is MongoDB URI correct in `backend/.env`?
2. Is GROQ_API_KEY set in `backend/.env`?
3. Run `npm install` in backend folder
4. Check error messages in terminal

---

### Issue: Frontend not starting

**Check:**
1. Run `npm install` in frontend-react folder
2. Check if `.env.local` exists
3. Check error messages in terminal

---

### Issue: "Cannot connect to backend"

**Check:**
1. Is backend running? (Terminal 1 should show server started)
2. Is `NEXT_PUBLIC_API_URL=http://localhost:3001` in `frontend-react/.env.local`?
3. Test backend directly: `curl http://localhost:3001/health`

---

## 🎯 Quick Checklist

- [ ] Backend server running (Terminal 1)
- [ ] Frontend server running (Terminal 2)
- [ ] Both terminals show "Ready" or "running"
- [ ] Open `http://localhost:3000` in browser

---

## ✅ Expected Output

### Terminal 1 (Backend):
```
✅ MongoDB Connected: ...
🚀 TutorPy backend running on http://localhost:3001
```

### Terminal 2 (Frontend):
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  ✓ Ready in 2.5s
```

**Then open `http://localhost:3000` in your browser!**
