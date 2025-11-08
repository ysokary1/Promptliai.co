# Custom Admin CMS Setup Guide

This project now includes a custom admin backend for managing your website content, replacing Sanity CMS.

## Features

- ✅ Custom admin dashboard with authentication
- ✅ Edit hero section, services, pricing, and site settings
- ✅ Vercel Postgres database for content storage
- ✅ Secure authentication with NextAuth.js
- ✅ No external CMS dependencies

## Setup Instructions

### 1. Vercel Postgres Setup

1. Go to your Vercel project dashboard
2. Navigate to the **Storage** tab
3. Click **Create Database** and select **Postgres**
4. Follow the prompts to create your database
5. Vercel will automatically add all required Postgres environment variables

### 2. Environment Variables

In your Vercel project settings, add these environment variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Admin Credentials (for initial setup)
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-secure-password
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Deploy to Vercel

1. Push your code to your repository
2. Vercel will automatically deploy
3. The Postgres environment variables are already set from Step 1

### 4. Initialize the Database

After deployment, visit:
```
https://your-domain.vercel.app/api/init
```

Send a POST request to initialize the database (you can use Postman, curl, or just open it in browser and it will show an error - that's expected for GET requests).

Using curl:
```bash
curl -X POST https://your-domain.vercel.app/api/init
```

This will:
- Create database tables
- Create the admin user
- Initialize default content

### 5. Access the Admin Dashboard

1. Go to: `https://your-domain.vercel.app/admin/login`
2. Login with your ADMIN_EMAIL and ADMIN_PASSWORD
3. Click "Initialize Database" if prompted
4. Start editing your content!

## Admin Dashboard Features

### Available Sections

1. **Hero Section** - Edit main homepage hero content
2. **Services** - Manage service offerings
3. **Pricing** - Update pricing plans
4. **Site Settings** - Edit contact info, company details

### Content Editor

- Real-time editing
- Auto-save functionality
- Preview before publishing (coming soon)
- Font customization (coming soon)
- Color scheme editor (coming soon)

## Security

- All admin routes are protected with authentication
- Passwords are hashed with bcrypt
- JWT-based session management
- Environment variables for sensitive data

## Troubleshooting

### Database Connection Issues

If you see database errors:
1. Check that Postgres is created in Vercel Storage tab
2. Verify all POSTGRES_* environment variables are set
3. Re-deploy after adding environment variables

### Can't Login

1. Make sure you initialized the database via `/api/init`
2. Check ADMIN_EMAIL and ADMIN_PASSWORD are set correctly
3. Verify NEXTAUTH_SECRET is set

### Changes Not Showing

1. Make sure you clicked "Save Changes" in the admin
2. Clear your browser cache
3. Check for any errors in the browser console

## Development (Local)

For local development:

1. Create a `.env.local` file:
```env
POSTGRES_URL="your-local-postgres-url"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

2. Run the development server:
```bash
npm run dev
```

3. Initialize database:
```bash
curl -X POST http://localhost:3000/api/init
```

4. Access admin at: http://localhost:3000/admin

## Next Steps

Future enhancements planned:
- Visual page builder with drag-and-drop
- Font and color customization
- Image upload and management
- Multiple admin users
- Page versioning and rollback
- Analytics dashboard

## Support

If you encounter any issues, please check:
1. Vercel deployment logs
2. Browser console for errors
3. Database connection status

Happy editing! 🎉
