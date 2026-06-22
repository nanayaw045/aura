# Aura - Premium Business Intelligence Platform

Aura is a world-class premium business intelligence platform built with Next.js 14, Tailwind CSS, Neon Postgres, and Drizzle ORM. Designed for extraordinary user experiences with production-ready authentication, real-time analytics, and strategic business insights.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Neon Postgres database (or local Postgres)
- Single environment variable: `DATABASE_URL`

### Setup

```bash
# Install dependencies
npm install

# Set environment variable (production)
export DATABASE_URL="postgresql://user:password@db.neon.tech/dbname?sslmode=require"

# Push database schema
npm run db:push

# Development
npm run dev

# Production build
npm run build
npm start
```

## 📊 Features

### Authentication
- Secure signup/login with bcryptjs hashing
- JWT session tokens (7-day expiration)
- HttpOnly cookie-based session management
- Protected routes via Next.js middleware

### Dashboard
- **Deep Dive**: AI-powered business analysis with SWOT, KPIs, and recommendations
- **Chat**: Interactive business advisor with contextual responses
- **Settings**: User preferences and account management

### Core Analytics
- Market position scoring (KPIs)
- Financial health metrics
- Operational efficiency analysis
- Risk assessment and recommendations

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3 with custom navy/gold theme
- **Database**: Neon Postgres + Drizzle ORM
- **Auth**: bcryptjs + JWT (no external auth services)
- **Deployment**: Netlify (standalone mode)

### Directory Structure
```
src/
├── app/
│   ├── api/
│   │   ├── auth/       # Login, Signup, Logout
│   │   ├── chat        # Chat advisor endpoint
│   │   ├── deep-dive   # Analysis endpoint
│   │   └── onboarding  # Onboarding flow
│   ├── (auth)/         # Auth pages (Login, Signup)
│   ├── (dashboard)/    # Protected dashboard routes
│   ├── onboarding/     # Onboarding wizard
│   └── page.tsx        # Landing page
├── lib/
│   ├── auth.ts         # JWT token functions
│   ├── db.ts           # Drizzle ORM setup (lazy-loaded)
│   └── session.ts      # Cookie/session utilities
├── types/
│   └── database.ts     # Drizzle schema definitions
└── styles/
    └── globals.css     # Tailwind theme
```

### Database Schema
- **users**: Core user data, profiles, company info
- **deep_dives**: Analysis records with structured results
- **chat_sessions**: Chat history and conversations
- **action_plans**: User action items
- **market_news**: Industry news feed
- **subscriptions**: Stripe billing integration (ready)

## 🔐 Security Features

✅ Password hashing with bcryptjs (10 rounds)  
✅ JWT tokens with 7-day expiration  
✅ HttpOnly cookies (no XSS exposure)  
✅ Middleware-based route protection  
✅ Type-safe database queries (Drizzle ORM)  
✅ No external auth dependencies (full control)  

## 📦 Deployment

### Netlify (Recommended)
The app is configured for Netlify deployment with `output: 'standalone'`.

1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next/standalone`
4. Add environment variable: `DATABASE_URL`
5. Deploy!

### Environment Variables
Only one variable needed:
```
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
```

## 🛠️ API Routes

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - Clear session

### Dashboard
- `POST /api/deep-dive` - Run business analysis (requires auth)
- `POST /api/chat` - Chat with advisor (requires auth)
- `POST /api/onboarding` - Complete onboarding flow

All protected routes require valid `aura_token` cookie.

## 🎨 Design System

**Color Palette**
- Navy Primary: `#001a4d`
- Gold Accent: `#d4af37`
- Glassmorphism effects with backdrop blur
- Premium subtle animations via Framer Motion

**Typography**
- Inter font family (system font fallback)
- Clear hierarchy with semantic sizing
- Accessible contrast ratios

## 🚦 Status

✅ **Production Ready**
- Build: Passing
- Type Safety: Full TypeScript coverage
- Database: Neon Postgres + Drizzle ORM
- Auth: Fully implemented with JWT
- API Routes: 6 endpoints (all functional)
- UI: Premium design system complete
- Deployment: Netlify standalone configured

## 📝 License

Proprietary - Aura Business Intelligence Platform