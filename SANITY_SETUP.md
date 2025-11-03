# Sanity CMS Setup Guide

## Step 1: Get Your Sanity Project ID

1. Go to https://sanity.io/manage
2. Click on your project (or create a new one if you haven't)
3. Copy your **Project ID** from the project settings
4. Note: Your dataset should be `production` (this is default)

## Step 2: Create Environment Variables File

Create a file named `.env.local` in the root of your project with:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-03
```

Replace `your_project_id_here` with your actual Project ID from Step 1.

## Step 3: Initialize Your Sanity Dataset

Run this command to create the initial content in Sanity:

```bash
npm run sanity:init
```

This will populate your Sanity Studio with the current website content.

## Step 4: Access Sanity Studio

1. Start your development server: `npm run dev`
2. Go to http://localhost:3000/studio
3. Login with your Sanity account
4. Start editing your content!

## Step 5: Deploy Sanity Studio

Once you deploy your Next.js site, the Sanity Studio will be available at:
`https://yourdomain.com/studio`

## Content Structure

### Site Settings (Singleton)
- Site Title
- Site Description
- Phone Number
- Email Address
- Physical Address
- Company Name & Description
- Social Media Links

### Hero Section (Singleton)
- Main Heading
- Subheading
- Button Texts
- Badge Texts

### Services (Multiple)
- Service Name
- Description
- Icon
- Display Order
- Show in Footer (toggle)

### Pricing Plans (Multiple)
- Plan Name
- Monthly/Yearly Prices
- Features List
- Button Text
- Popular/Coming Soon flags
- Display Order

## Tips

- **Singleton documents** (Site Settings, Hero Section) can only have one instance
- **Multiple documents** (Services, Pricing Plans) can have as many as you need
- Use the **order** field to control display sequence
- Changes are instant - no need to redeploy your site!

## Troubleshooting

**Problem:** Can't see Sanity Studio
- Solution: Make sure `.env.local` file exists with your Project ID
- Solution: Restart your dev server after creating `.env.local`

**Problem:** "Invalid credentials"
- Solution: Go to https://sanity.io/manage and verify your Project ID

**Problem:** Content not showing on website
- Solution: Make sure you've published your documents in Sanity Studio
- Solution: Check that you've initialized the data (Step 3)

## Need Help?

Contact support or check the Sanity documentation at https://www.sanity.io/docs
