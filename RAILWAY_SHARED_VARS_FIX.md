# Fix: Shared Variables Not Working

## 🚨 Problem
You added variables to "Shared Variables" but the service still can't access them.

## ✅ Solution: Link Variables to Service

### Option 1: Use Service-Specific Variables (Recommended)

Instead of Shared Variables, add them directly to your service:

1. **Go to Railway Dashboard**
   - Click on your **backend service** (not the project)

2. **Go to Variables Tab**
   - Click "Variables" tab in your service

3. **Add Variables Directly to Service**:
   - Click "Add Variable" or "+"
   - Add each variable:
     - `GROQ_API_KEY` = your key
     - `JWT_SECRET` = your secret
     - `MONGODB_URI` = your MongoDB URI
   - These should be **service-specific**, not shared

4. **Redeploy**

---

### Option 2: Reference Shared Variables

If you want to use Shared Variables:

1. **In your service Variables tab**
2. **Add variable with reference**:
   - Variable name: `GROQ_API_KEY`
   - Value: `${{GROQ_API_KEY}}` (reference the shared variable)
3. **Do the same for other variables**

---

## 🎯 Quick Fix (Easiest)

**Just add the variables directly to your service** (not as shared):

1. Click on your **backend service**
2. Go to **"Variables"** tab
3. Add:
   - `GROQ_API_KEY`
   - `JWT_SECRET`
   - `MONGODB_URI`
4. Redeploy

**Shared Variables are for multiple services. For a single service, use service-specific variables!**

---

## ✅ After Fix

The service should:
- ✅ Start successfully
- ✅ Access all environment variables
- ✅ No more crashes

**Try adding variables directly to your service instead of Shared Variables!**
