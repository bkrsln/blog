# Cloudflare Pages Deployment Fix

## Issue
The deployment failed with error: "Must specify a project name"

## Root Cause
The manual deploy command `npx wrangler pages deploy out` is missing the project name parameter.

## Solution

### Option 1: Use Automatic GitHub Deployment (Recommended)
1. Go to your Cloudflare Pages dashboard
2. Update the build settings:
   - **Build command**: `bun run build`
   - **Build output directory**: `out`
   - **Deploy command**: Leave empty (remove the wrangler command)

3. Push changes to GitHub - deployment will happen automatically

### Option 2: Fix Manual Deployment
Update the deploy command to include project name:
```bash
npx wrangler pages deploy out --project-name=blog
```

## Current Status
- ✅ Build completed successfully (44/44 pages)
- ✅ Static export working correctly
- ✅ All dependencies installed
- ❌ Manual deployment failed due to missing project name

## Next Steps
1. Remove the deploy command from Cloudflare Pages build settings
2. Let GitHub integration handle automatic deployment
3. Commit and push changes to trigger automatic deployment

## Build Settings for Cloudflare Pages Dashboard
- **Framework preset**: Next.js (Static HTML Export)
- **Build command**: `bun run build`
- **Build output directory**: `out`
- **Deploy command**: (leave empty)
- **Node.js version**: 18 or higher