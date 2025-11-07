# 🚀 Vercel Deployment Guide

Your website now uses a **JSON-based content management system** that works perfectly with Vercel!

## 🎯 How It Works

Instead of an external database, your content is stored in:
- **File:** `data/content.json`
- **Admin Panel:** Access at `your-site.vercel.app/admin` (coming soon)
- **API Routes:** Next.js API routes at `/api/content/*`

## ✨ What You Get

✅ **No external database needed**
✅ **Content stored in your repo**
✅ **Edit via JSON file or API**
✅ **Deploys automatically with Vercel**
✅ **Works in serverless functions**
✅ **Fast and reliable**

## 📝 Editing Your Content

### Option 1: Edit JSON File Directly (Easiest)

1. Open `data/content.json` in your code editor
2. Make your changes
3. Commit and push to GitHub
4. Vercel auto-deploys your changes

**Example** - Change the site title:
```json
{
  "siteSettings": {
    "title": "Your New Title Here",
    ...
  }
}
```

### Option 2: Use API Endpoints

You can also update content programmatically using the API:

```bash
# Get all content
curl https://your-site.vercel.app/api/content

# Update site settings
curl -X PUT https://your-site.vercel.app/api/content/site-settings \
  -H "Content-Type: application/json" \
  -d '{"title": "New Title", ...}'
```

## 🎨 Content Structure

### Site Settings
Location: `data/content.json` → `siteSettings`

```json
{
  "siteSettings": {
    "title": "Your Site Title",
    "description": "SEO description",
    "phone": "+1 (555) 123-4567",
    "email": "hello@yoursite.com",
    "address": "Your Address",
    "companyName": "Your Company",
    "companyDescription": "About your company",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/yourcompany",
      "twitter": "https://twitter.com/yourcompany",
      "facebook": "https://facebook.com/yourcompany"
    }
  }
}
```

### Hero Section
Location: `data/content.json` → `heroSection`

```json
{
  "heroSection": {
    "heading": "Your Main Headline",
    "subheading": "Supporting text that explains your value proposition",
    "primaryButtonText": "Get Started",
    "secondaryButtonText": "Learn More",
    "badge1": "Feature badge 1",
    "badge2": "Feature badge 2"
  }
}
```

### Services
Location: `data/content.json` → `services`

```json
{
  "services": [
    {
      "id": 1,
      "name": "Service Name",
      "description": "Service description",
      "icon": "bot",  // Options: bot, workflow, cog, brain, code
      "displayOrder": 1,
      "showInFooter": true
    }
  ]
}
```

### Pricing Plans
Location: `data/content.json` → `pricingPlans`

```json
{
  "pricingPlans": [
    {
      "id": 1,
      "name": "Plan Name",
      "monthlyPrice": 49,
      "yearlyPrice": 470,
      "period": "month",
      "description": "Plan description",
      "buttonText": "Start Free Trial",
      "isPopular": false,
      "isComingSoon": false,
      "displayOrder": 1,
      "features": [
        "Feature 1",
        "Feature 2",
        "Feature 3"
      ]
    }
  ]
}
```

## 🔌 API Routes

All available at `your-site.vercel.app/api/content/*`:

### Site Settings
- `GET /api/content/site-settings` - Get settings
- `PUT /api/content/site-settings` - Update settings

### Hero Section
- `GET /api/content/hero-section` - Get hero content
- `PUT /api/content/hero-section` - Update hero

### Services
- `GET /api/content/services` - Get all services
- `GET /api/content/services?footer=true` - Get footer services
- `POST /api/content/services` - Create new service
- `PUT /api/content/services/[id]` - Update service
- `DELETE /api/content/services/[id]` - Delete service

### Pricing Plans
- `GET /api/content/pricing-plans` - Get all plans
- `POST /api/content/pricing-plans` - Create new plan
- `PUT /api/content/pricing-plans/[id]` - Update plan
- `DELETE /api/content/pricing-plans/[id]` - Delete plan

### All Content
- `GET /api/content` - Get all content
- `PUT /api/content` - Replace all content

## 🚀 Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Add JSON-based content system"
git push
```

### 2. Deploy on Vercel

If not already connected:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects Next.js
4. Click "Deploy"

That's it! Your site is live.

### 3. Automatic Updates

Every time you push to GitHub:
1. Vercel automatically rebuilds
2. Your content updates deploy
3. No manual deployment needed

## 📋 Quick Edits Workflow

**To change content:**

1. Edit `data/content.json` locally
2. Test locally: `npm run dev`
3. Commit: `git commit -am "Update content"`
4. Push: `git push`
5. Vercel auto-deploys (30-60 seconds)

## 🔒 Security Notes

### Important: Read-Only on Vercel

⚠️ **Vercel serverless functions have a READ-ONLY filesystem**. This means:
- API PUT/POST/DELETE endpoints work **locally**
- API PUT/POST/DELETE endpoints **DON'T work** on Vercel
- You MUST edit `data/content.json` and push to GitHub

### Content Editing Options

**On Vercel (Production):**
- Edit `data/content.json` in your repo
- Commit and push to deploy

**Locally (Development):**
- Edit JSON file directly
- Use API endpoints to update content
- See changes instantly

## 🎯 Recommended Workflow

For the best experience on Vercel:

1. **Development:** Use the JSON file or API locally
2. **Content Updates:** Edit `data/content.json`
3. **Deployment:** Push to GitHub
4. **Live Site:** Vercel auto-deploys

## 💡 Tips & Tricks

### Validate JSON Before Committing

```bash
# Check if JSON is valid
node -e "console.log(JSON.parse(require('fs').readFileSync('data/content.json')))"
```

### Backup Your Content

```bash
# Create backup
cp data/content.json data/content.backup.json

# Or version with date
cp data/content.json "data/content.$(date +%Y%m%d).json"
```

### Quick Content Reset

If you want to start fresh:
```bash
git checkout data/content.json
```

## 🔄 Migrations from Old Backend

If you had data in the old SQLite/Express backend:

1. Export data from old system
2. Format as JSON matching the structure above
3. Replace `data/content.json`
4. Commit and push

## ❓ Troubleshooting

### "Content not updating on Vercel"

- Make sure you committed `data/content.json`
- Push to GitHub
- Wait for Vercel deployment to complete
- Clear browser cache

### "API returns 404"

- API routes only work after deployment
- Locally: restart dev server (`npm run dev`)
- On Vercel: check deployment logs

### "Changes not showing"

- Check if you're editing the right branch
- Verify Vercel is deploying from correct branch
- Look at Vercel deployment logs

## 📚 File Structure

```
/
├── data/
│   └── content.json          # All your content
├── app/
│   ├── api/
│   │   └── content/
│   │       ├── route.ts                    # All content endpoint
│   │       ├── site-settings/route.ts      # Site settings
│   │       ├── hero-section/route.ts       # Hero section
│   │       ├── services/
│   │       │   ├── route.ts                # Services list
│   │       │   └── [id]/route.ts           # Individual service
│   │       └── pricing-plans/
│   │           ├── route.ts                # Plans list
│   │           └── [id]/route.ts           # Individual plan
│   ├── page.tsx              # Main page (uses data)
│   └── layout.tsx            # Layout (uses settings)
└── lib/
    └── data.ts               # Data fetching layer
```

## ✅ Summary

Your Vercel-compatible backend:
- ✅ No database setup required
- ✅ Content in version control
- ✅ Easy to edit (JSON file)
- ✅ Automatic deployments
- ✅ Fast and reliable
- ✅ No ongoing costs
- ✅ Fully customizable

---

**You now have complete control over your content with zero external dependencies!** 🎉

Edit `data/content.json`, push to GitHub, and you're done!
