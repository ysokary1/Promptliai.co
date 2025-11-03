# Deployment & Sanity CMS Guide

## Overview

Your website is now integrated with Sanity CMS! This means you can edit all your content (text, prices, services, contact info) without touching code.

**Important**: The website works perfectly right now with hardcoded fallback data. Once you deploy and add content to Sanity Studio, it will automatically pull from the CMS.

---

## Quick Start

### 1. Deploy Your Site

Deploy to Vercel, Netlify, or any Next.js hosting platform:

**For Vercel:**
```bash
npm install -g vercel
vercel
```

During deployment, add these environment variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = `yw61au22`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `NEXT_PUBLIC_SANITY_API_VERSION` = `2024-11-03`

**For Other Platforms:**
Make sure to add the same environment variables in your hosting dashboard.

### 2. Access Sanity Studio

Once deployed, go to:
👉 **https://yourdomain.com/studio**

Login with your Sanity account (the one you used to create project `yw61au22`)

### 3. Add Your Content

The Studio is organized into these sections:

#### **Site Settings** (Click to edit)
- Site Title (appears in browser tab)
- Site Description (for SEO)
- Phone Number
- Email Address
- Physical Address
- Company Name
- Company Description
- Social Media Links

#### **Hero Section** (Click to edit)
- Main Heading
- Subheading
- Primary Button Text
- Secondary Button Text
- Badge 1 Text
- Badge 2 Text

#### **Services** (Click "Services" → "Create")
For each service:
- Name
- Description
- Icon (choose from dropdown: bot, cog, brain, etc.)
- Display Order (1, 2, 3...)
- Show in Footer (toggle on/off)

Create at least 3 services to match your current site.

#### **Pricing Plans** (Click "Pricing Plans" → "Create")
For each plan:
- Plan Name
- Monthly Price (just the number, e.g., 997)
- Yearly Price (just the number, e.g., 797)
- Billing Period ("month")
- Description
- Features (click "+ Add item" for each feature)
- Button Text
- Mark as Popular (toggle)
- Coming Soon (toggle)
- Display Order (1, 2, 3)

Create at least 3 pricing plans.

---

## Important Notes

### Data Fallbacks

Your website has **intelligent fallbacks**:
- If Sanity has no content → Uses hardcoded data (what you have now)
- If Sanity has content → Uses CMS data automatically
- **No downtime** if Sanity is unavailable

### Publishing Content

1. Make your changes in the Studio
2. Click the **"Publish"** button (green button at bottom)
3. Changes appear on your website in **~3 seconds**!

### Local Development

To run locally and access Studio:

```bash
# Create .env.local file with:
NEXT_PUBLIC_SANITY_PROJECT_ID=yw61au22
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-03

# Start dev server
npm run dev

# Access Studio at:
http://localhost:3000/studio
```

---

## Content Management Workflow

### Changing Phone Number
1. Go to `yourdomain.com/studio`
2. Click "Site Settings"
3. Update "Phone Number" field
4. Click "Publish"
5. ✅ Updated everywhere on the site instantly!

### Adding a New Service
1. Go to `yourdomain.com/studio`
2. Click "Services" in sidebar
3. Click "+ Create" button
4. Fill in:
   - Name: "My New Service"
   - Description: "What this service does..."
   - Icon: Choose from dropdown
   - Order: 4 (will appear 4th)
   - Show in Footer: ✓ (check if you want it in footer)
5. Click "Publish"

### Changing Prices
1. Go to `yourdomain.com/studio`
2. Click "Pricing Plans" in sidebar
3. Click on the plan you want to edit
4. Update "Monthly Price" or "Yearly Price"
5. Click "Publish"
6. ✅ Pricing updates immediately!

### Updating Hero Section
1. Go to `yourdomain.com/studio`
2. Click "Hero Section"
3. Edit any text (heading, subheading, buttons, badges)
4. Click "Publish"

---

## Sanity Project Details

- **Project ID**: `yw61au22`
- **Dataset**: `production`
- **Studio URL** (after deployment): `https://yourdomain.com/studio`
- **Manage Project**: https://sanity.io/manage/project/yw61au22

---

## Troubleshooting

### Problem: Can't see Studio after deployment
**Solution**: Make sure environment variables are set in your hosting platform

### Problem: Content not updating on website
**Solution**:
1. Make sure you clicked "Publish" in Studio (not just "Save")
2. Check that the document actually has content
3. Wait ~10 seconds for CDN cache to clear

### Problem: Studio shows "Invalid credentials"
**Solution**:
1. Go to https://sanity.io/manage/project/yw61au22
2. Check that you're logged in to the correct Sanity account
3. Verify your project ID in the URL

### Problem: Want to add a new field
**Solution**: You'll need to:
1. Update the schema in `sanity/schemas/` folder
2. Update the component to use the new field
3. Redeploy

---

## Advanced: Customizing Schemas

All content types are defined in `/sanity/schemas/`:

- `siteSettings.ts` - Site-wide settings
- `heroSection.ts` - Hero section content
- `service.ts` - Service items
- `pricingPlan.ts` - Pricing plan items

To add a new field:
1. Edit the relevant schema file
2. Add a new `defineField()`
3. Update your component to use the field
4. Push to git and redeploy

---

## Next Steps

### After Deployment:

1. ✅ Visit `yourdomain.com/studio`
2. ✅ Add your content in Sanity Studio
3. ✅ Publish all documents
4. ✅ Verify content appears on your site
5. ✅ Bookmark the Studio URL for easy access

### Ongoing Maintenance:

- Update prices seasonally
- Add new services as you expand
- Change contact info when needed
- Update hero messaging for campaigns
- All without ever touching code! 🎉

---

## Support

- **Sanity Documentation**: https://www.sanity.io/docs
- **Project Dashboard**: https://sanity.io/manage/project/yw61au22
- **Community**: https://slack.sanity.io/

---

## Summary

✅ **Site works now** with fallback data
✅ **CMS ready** - just deploy and add content
✅ **No downtime** if Sanity is unavailable
✅ **Instant updates** when you publish in Studio
✅ **Easy to use** - no coding required for content updates

Happy content managing! 🚀
