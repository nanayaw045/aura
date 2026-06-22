# Aura Deployment Guide

This guide covers deploying Aura to production on Netlify with Neon Postgres.

## Prerequisites

- Neon Postgres database (free tier available at https://neon.tech)
- GitHub account with repo access
- Netlify account (free tier sufficient)

## Step 1: Database Setup (Neon)

1. Go to https://console.neon.tech/
2. Create a new project (or use existing)
3. Create a database for Aura
4. Copy the connection string (include sslmode=require)
5. Save it securely (you'll need it for Netlify)

Example format:
```
postgresql://user:password@db.neon.tech/dbname?sslmode=require
```

## Step 2: Push Database Schema

Before deploying, ensure your database has the correct schema:

```bash
# Set your Neon database URL locally
export DATABASE_URL="your-neon-connection-string"

# Push the schema to Neon
npm run db:push

# Verify tables were created
# (tables: users, deep_dives, chat_sessions, action_plans, market_news, subscriptions)
```

## Step 3: Deploy to Netlify

### Option A: Git-based Deployment (Recommended)

1. Push your code to GitHub:
   ```bash
   git push origin main
   ```

2. Go to https://app.netlify.com/
3. Click "New site from Git"
4. Connect your GitHub repo
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next/standalone`
   - **Node version**: 18.x (or higher)

6. Set environment variable:
   - Click "Show advanced" → "New variable"
   - **Key**: `DATABASE_URL`
   - **Value**: Your Neon connection string

7. Click "Deploy"

### Option B: Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=.next/standalone
```

## Step 4: Verify Deployment

1. Visit your Netlify domain
2. Test signup: Create a new account
3. Test login: Log in with created account
4. Test dashboard: Navigate to /dashboard
5. Test deep-dive: Run an analysis
6. Test chat: Send a message to advisor

## Environment Variables

### Required (Production)
- `DATABASE_URL` - Neon Postgres connection string

### Optional
- `JWT_SECRET` - JWT signing key (defaults to hashed DATABASE_URL)

## Monitoring

### Netlify Analytics
- Check function execution time
- Monitor error rates
- Track edge requests

### Database Monitoring (Neon)
- Check query logs
- Monitor connection count
- Track storage usage

## Troubleshooting

### Build Fails
- Ensure `npm run build` works locally
- Check Node version compatibility
- Verify all dependencies are in `package.json`

### Database Connection Errors
- Verify `DATABASE_URL` is set in Netlify environment
- Check Neon database is running
- Ensure connection string includes `sslmode=require`

### API Routes 500 Errors
- Check Netlify function logs
- Verify database schema matches `src/types/database.ts`
- Ensure JWT_SECRET is consistent

### Users Can't Login
- Check password hashing in signup
- Verify jwt token generation
- Check cookie settings (HttpOnly, SameSite=Lax)

## Scaling Considerations

### Database
- Neon auto-scales connections
- Monitor query performance in Neon console
- Consider Neon Pro for higher concurrency

### API Routes
- Netlify serverless functions scale automatically
- Each function has 10-second execution limit (increase via Pro)
- Database connection pooling handled by Drizzle

### Static Assets
- All static pages prerendered
- Served from CDN automatically
- ~87KB First Load JS (highly optimized)

## Security Checklist

- ✅ HTTPS enforced by Netlify
- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ JWT tokens expire in 7 days
- ✅ HttpOnly cookies prevent XSS
- ✅ Database credentials in Netlify secrets
- ✅ No sensitive data in source code
- ✅ CORS configured for API routes

## Rollback

To rollback to a previous version:

1. Go to Netlify dashboard
2. Click "Deploys"
3. Find the previous successful deploy
4. Click "Restore" or redeploy from that commit

## Continuous Deployment

Every push to main branch automatically:
1. Triggers Netlify build
2. Runs `npm run build`
3. Deploys to production if successful
4. Updates live site

## Custom Domain

1. In Netlify Settings → Domain management
2. Add your custom domain
3. Update DNS records as directed
4. SSL certificate auto-generated

## Support

For issues with:
- **Netlify**: https://docs.netlify.com/
- **Neon**: https://neon.tech/docs/
- **Next.js**: https://nextjs.org/docs/
