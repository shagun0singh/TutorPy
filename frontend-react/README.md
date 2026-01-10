# TutorPy Frontend (React/Next.js)

Modern React frontend for TutorPy with shadcn/ui, Tailwind CSS, and TypeScript.

## Project Structure

```
frontend-react/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page (Hero)
│   └── globals.css      # Global styles
├── components/
│   └── ui/              # shadcn/ui components
│       ├── hero-1.tsx   # Hero component
│       └── demo.tsx     # Demo component
├── lib/
│   └── utils.ts         # Utility functions
├── package.json
├── tsconfig.json        # TypeScript config
├── tailwind.config.ts   # Tailwind config
└── next.config.js       # Next.js config
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend-react
npm install
```

This will install:
- ✅ React 18
- ✅ Next.js 14
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ lucide-react (icons)
- ✅ shadcn/ui utilities

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

### 3. Build for Production

```bash
npm run build
npm start
```

## Components Structure

### `/components/ui` Folder

**Why this folder is important:**
- Standard location for shadcn/ui components
- Makes components reusable across the app
- Follows Next.js/React best practices
- Easy to import with `@/components/ui/...`

### Hero Component (`components/ui/hero-1.tsx`)

**Features:**
- Beautiful gradient background
- Interactive search input
- Suggestion pills
- Fully responsive
- TypeScript typed
- Tailwind styled

**Customizations for TutorPy:**
- Changed branding from "HextaAI" to "TutorPy"
- Updated copy for Python learning
- Added Python-specific prompts
- Integrated with backend API
- Added interactive functionality

## Dependencies Installed

### Core Dependencies:
- `react` - React library
- `react-dom` - React DOM
- `next` - Next.js framework
- `lucide-react` - Icon library (Paperclip, Sparkles, etc.)
- `class-variance-authority` - Variant utilities
- `clsx` - Conditional classes
- `tailwind-merge` - Merge Tailwind classes

### Dev Dependencies:
- `typescript` - TypeScript compiler
- `@types/*` - Type definitions
- `tailwindcss` - Utility-first CSS
- `tailwindcss-animate` - Animation plugin
- `postcss` - CSS processor
- `autoprefixer` - CSS vendor prefixing
- `eslint` - Linter

## Configuration Files

### `tsconfig.json`
- TypeScript configuration
- Path alias: `@/*` maps to root
- Strict mode enabled

### `tailwind.config.ts`
- Tailwind CSS configuration
- Custom colors and themes
- shadcn/ui design tokens
- Animation keyframes

### `next.config.js`
- Next.js configuration
- Image domains allowed
- Production optimizations

## Responsive Design

The Hero component is fully responsive:
- **Desktop**: Full layout with sidebar navigation
- **Tablet**: Adapted spacing and font sizes
- **Mobile**: Stacked layout, touch-friendly buttons

## Integration with Backend

The component is ready to integrate with your existing backend at:
```
https://tutorpy-backend.vercel.app
```

Update API calls in future pages (signin, chat, etc.) to use this endpoint.

## Next Steps

1. ✅ Hero landing page - **DONE**
2. ⏳ Create signup page
3. ⏳ Create signin page  
4. ⏳ Create chat page with authentication
5. ⏳ Connect to backend API
6. ⏳ Deploy to Vercel

## Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend-react
vercel

# Production deploy
vercel --prod
```

## Component Analysis

### Hero1 Component

**Props:** None (self-contained)

**State:**
- `inputValue` - Tracks search input

**Dependencies:**
- `lucide-react` - For Paperclip and Sparkles icons
- `next/link` - For navigation (can be added)

**Assets:**
- Logo: Emoji-based (🐍)
- No external images required

**Responsive Behavior:**
- Fluid typography
- Flexible grid layout
- Touch-friendly on mobile

**Best Use:**
- Landing page / Home page
- First impression for users
- Call-to-action for signups

