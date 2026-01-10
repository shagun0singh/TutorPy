# TutorPy - Complete Tech Stack Overview

## 📋 Table of Contents
1. [Frontend Stack](#frontend-stack)
2. [Backend Stack](#backend-stack)
3. [Database & Storage](#database--storage)
4. [External APIs & Services](#external-apis--services)
5. [Development Tools](#development-tools)
6. [Deployment & Infrastructure](#deployment--infrastructure)
7. [Code Editor & Runtime](#code-editor--runtime)

---

## 🎨 Frontend Stack

### **Core Framework**
- **Next.js 14.2.0** (`frontend-react/`)
  - **Where Used**: Main frontend application
  - **Purpose**: React framework with SSR, API routes, file-based routing
  - **Files**: `frontend-react/app/`, `frontend-react/next.config.js`

### **UI Library**
- **React 18.3.1**
  - **Where Used**: All frontend components
  - **Purpose**: Component-based UI library
  - **Files**: All `.tsx` files in `frontend-react/app/` and `frontend-react/components/`

### **Styling**
- **Tailwind CSS 3.4.0**
  - **Where Used**: All components for styling
  - **Purpose**: Utility-first CSS framework
  - **Files**: `frontend-react/tailwind.config.ts`, `frontend-react/app/globals.css`
  
- **PostCSS 8.4.0**
  - **Where Used**: CSS processing
  - **Purpose**: Transforms Tailwind CSS
  - **Files**: `frontend-react/postcss.config.js`

- **Autoprefixer 10.4.0**
  - **Where Used**: CSS processing pipeline
  - **Purpose**: Adds vendor prefixes automatically

- **tailwindcss-animate 1.0.7**
  - **Where Used**: Animation utilities
  - **Purpose**: Pre-built animations for Tailwind

### **UI Components & Utilities**
- **shadcn/ui** (via components)
  - **Where Used**: UI component library structure
  - **Purpose**: Reusable component patterns
  - **Files**: `frontend-react/components/ui/`

- **class-variance-authority 0.7.0**
  - **Where Used**: Component variants
  - **Purpose**: Manages component variants (e.g., button sizes, colors)

- **clsx 2.1.0**
  - **Where Used**: Conditional class names
  - **Purpose**: Utility for constructing className strings

- **tailwind-merge 2.2.0**
  - **Where Used**: Class name merging
  - **Purpose**: Merges Tailwind classes intelligently

### **Icons**
- **lucide-react 0.344.0**
  - **Where Used**: All components needing icons
  - **Purpose**: Icon library (Play, Loader2, etc.)
  - **Files**: `frontend-react/components/PythonCodeEditor.tsx`

### **Animations**
- **framer-motion 11.0.0**
  - **Where Used**: Background animations, UI transitions
  - **Purpose**: Animation library for React
  - **Files**: `frontend-react/components/ui/flickering-grid.tsx`, `frontend-react/components/ui/shooting-stars.tsx`

---

## ⚙️ Backend Stack

### **Runtime & Framework**
- **Node.js**
  - **Where Used**: Backend server
  - **Purpose**: JavaScript runtime
  - **Files**: `backend/server.js` (legacy, now converted to Next.js API routes)

### **Next.js API Routes** (Current Implementation)
- **Next.js API Routes**
  - **Where Used**: Backend API endpoints
  - **Purpose**: Serverless API handlers
  - **Files**: 
    - `frontend-react/app/api/auth/login/route.ts`
    - `frontend-react/app/api/auth/signup/route.ts`
    - `frontend-react/app/api/chat/route.ts`
    - `frontend-react/app/api/health/route.ts`

### **Legacy Backend** (Still in repo, not actively used)
- **Express 4.18.2** (in `backend/`)
  - **Where Used**: Legacy backend server
  - **Purpose**: Web framework (being phased out)
  - **Files**: `backend/server.js`, `backend/routes/`

- **CORS 2.8.5**
  - **Where Used**: Legacy backend
  - **Purpose**: Cross-origin resource sharing

---

## 🗄️ Database & Storage

### **Database**
- **MongoDB Atlas** (Cloud)
  - **Where Used**: User data storage
  - **Purpose**: NoSQL database for user accounts
  - **Connection**: Via `MONGODB_URI` environment variable

### **ODM (Object Document Mapper)**
- **Mongoose 8.0.0**
  - **Where Used**: Database operations
  - **Purpose**: MongoDB object modeling
  - **Files**: 
    - `frontend-react/lib/db.ts` (connection)
    - `frontend-react/lib/models/User.ts` (User model)

---

## 🔐 Authentication & Security

### **Password Hashing**
- **bcryptjs 2.4.3**
  - **Where Used**: User password hashing
  - **Purpose**: Secure password storage
  - **Files**: `frontend-react/lib/models/User.ts`

### **JWT (JSON Web Tokens)**
- **jsonwebtoken 9.0.2**
  - **Where Used**: Authentication tokens
  - **Purpose**: User session management
  - **Files**: `frontend-react/lib/auth.ts`

---

## 🤖 AI & External APIs

### **AI Service**
- **Groq SDK 0.3.3**
  - **Where Used**: AI chat functionality
  - **Purpose**: LLM API for tutoring responses
  - **Model**: `llama-3.3-70b-versatile`
  - **Files**: `frontend-react/app/api/chat/route.ts`

### **Legacy AI SDKs** (in backend, not used)
- **@google/generative-ai 0.24.1** (in `backend/package.json`)
  - **Status**: Previously used, now replaced by Groq

---

## 💻 Code Editor & Runtime

### **Code Editor**
- **Monaco Editor** (via `@monaco-editor/react 4.6.0`)
  - **Where Used**: Python code editor component
  - **Purpose**: VS Code-like editor in browser
  - **Files**: `frontend-react/components/PythonCodeEditor.tsx`
  - **Note**: Loaded dynamically (client-side only)

### **Python Runtime**
- **Pyodide** (loaded from CDN)
  - **Where Used**: Python code execution in browser
  - **Purpose**: Run Python code client-side
  - **Files**: `frontend-react/components/PythonCodeEditor.tsx`
  - **Note**: Not installed via npm, loaded from CDN at runtime

---

## 🛠️ Development Tools

### **Language**
- **TypeScript 5.4.0**
  - **Where Used**: All frontend code
  - **Purpose**: Type-safe JavaScript
  - **Files**: All `.ts` and `.tsx` files
  - **Config**: `frontend-react/tsconfig.json`

### **Linting**
- **ESLint 8.57.0**
  - **Where Used**: Code quality checks
  - **Purpose**: JavaScript/TypeScript linting
  - **Config**: `eslint-config-next 14.2.0`

### **Type Definitions**
- **@types/node 20.11.0** - Node.js types
- **@types/react 18.2.0** - React types
- **@types/react-dom 18.2.0** - React DOM types
- **@types/bcryptjs 2.4.6** - bcryptjs types
- **@types/jsonwebtoken 9.0.5** - JWT types

### **Development Server**
- **nodemon 3.0.1** (in `backend/`)
  - **Where Used**: Legacy backend development
  - **Purpose**: Auto-restart on file changes

---

## 🚀 Deployment & Infrastructure

### **Hosting Platform**
- **Vercel**
  - **Where Used**: Production deployment
  - **Purpose**: Serverless hosting for Next.js
  - **Config**: `vercel.json` at root

### **Version Control**
- **Git**
  - **Where Used**: Source control
  - **Repository**: GitHub (`shagun0singh/TutorPy`)

### **Environment Variables**
Required environment variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `GROQ_API_KEY` - Groq API key for AI
- `NODE_ENV` - Environment (development/production)

---

## 📁 Project Structure

```
TutorPy/
├── frontend-react/          # Main Next.js application
│   ├── app/                 # Next.js app directory
│   │   ├── api/             # API routes (backend)
│   │   ├── chat/            # Chat page
│   │   ├── signin/          # Sign in page
│   │   └── signup/          # Sign up page
│   ├── components/          # React components
│   │   ├── PythonCodeEditor.tsx
│   │   └── ui/              # UI components
│   ├── lib/                 # Utilities
│   │   ├── db.ts            # MongoDB connection
│   │   ├── auth.ts          # Auth utilities
│   │   └── models/          # Mongoose models
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Legacy Express backend (not used)
│   ├── server.js
│   └── package.json
│
└── vercel.json              # Vercel deployment config
```

---

## 🔄 Data Flow

1. **User Request** → Next.js Frontend (`app/`)
2. **API Call** → Next.js API Route (`app/api/`)
3. **Authentication** → JWT verification (`lib/auth.ts`)
4. **Database** → Mongoose → MongoDB Atlas
5. **AI Request** → Groq API → Response
6. **Code Execution** → Pyodide (client-side) → Python runtime

---

## 📊 Technology Summary by Category

| Category | Technology | Version | Status |
|----------|-----------|---------|--------|
| **Frontend Framework** | Next.js | 14.2.0 | ✅ Active |
| **UI Library** | React | 18.3.1 | ✅ Active |
| **Styling** | Tailwind CSS | 3.4.0 | ✅ Active |
| **Language** | TypeScript | 5.4.0 | ✅ Active |
| **Database** | MongoDB | Atlas | ✅ Active |
| **ODM** | Mongoose | 8.0.0 | ✅ Active |
| **Auth** | JWT | 9.0.2 | ✅ Active |
| **AI** | Groq SDK | 0.3.3 | ✅ Active |
| **Code Editor** | Monaco Editor | 4.6.0 | ✅ Active |
| **Python Runtime** | Pyodide | CDN | ✅ Active |
| **Deployment** | Vercel | - | ✅ Active |
| **Legacy Backend** | Express | 4.18.2 | ⚠️ Not Used |

---

## 🎯 Key Features by Technology

- **User Authentication**: JWT + bcryptjs + Mongoose
- **AI Chat**: Groq API (llama-3.3-70b-versatile)
- **Code Editor**: Monaco Editor (VS Code-like)
- **Code Execution**: Pyodide (Python in browser)
- **Styling**: Tailwind CSS + Framer Motion
- **Routing**: Next.js App Router
- **API**: Next.js API Routes (serverless)

---

*Last Updated: Based on current codebase structure*
