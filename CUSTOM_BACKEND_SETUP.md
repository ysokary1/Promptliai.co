# Custom Backend Setup Guide

Your website now uses a **fully custom, local backend** that you have complete control over! No more external dependencies, no more constant deployments.

## 🎯 What You Have

- ✅ **Express.js API Server** - Fast, lightweight REST API
- ✅ **SQLite Database** - Single file database that's easy to backup
- ✅ **Admin Panel** - Web interface to manage all content
- ✅ **Complete Control** - Edit content through admin panel OR directly in the database
- ✅ **Fallback System** - Website works even if backend is down

## 📁 Project Structure

```
/backend
  ├── server.js           # Express server with all API endpoints
  ├── init-data.js        # Script to initialize database with default data
  ├── database.sqlite     # Your database (created automatically)
  ├── package.json        # Backend dependencies
  └── public/
      └── admin.html      # Admin panel interface
```

## 🚀 Quick Start

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Initialize Database with Default Data

```bash
npm run init
```

This creates `database.sqlite` and populates it with your current content.

### 3. Start the Backend Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The backend will run on **http://localhost:3001**

### 4. Access the Admin Panel

Open your browser to: **http://localhost:3001/admin**

Here you can:
- Edit site settings (title, description, contact info)
- Customize hero section
- Manage services
- Update pricing plans

### 5. Start Your Next.js Frontend

In a separate terminal, from the main project directory:

```bash
npm run dev
```

Your website will run on **http://localhost:3000**

## 🎨 Admin Panel Features

### Site Settings
- Site title and description (SEO)
- Company information
- Contact details (phone, email, address)
- Social media links

### Hero Section
- Main heading and subheading
- Button text
- Promotional badges

### Services
- Add/edit/delete services
- Set display order
- Choose icons
- Control footer visibility

### Pricing Plans
- Create unlimited pricing tiers
- Set monthly/yearly prices
- Add/remove features dynamically
- Mark plans as "Popular" or "Coming Soon"
- Control display order

## 💾 Database

Your data is stored in `backend/database.sqlite` - a single file that you can:

- **Backup easily**: Just copy the file
- **Version control**: Add to git (or not, your choice)
- **Edit directly**: Use any SQLite browser tool
- **Migrate**: Copy to another machine

### Database Schema

**site_settings** (singleton)
- title, description, phone, email, address
- company_name, company_description
- linkedin_url, twitter_url, facebook_url

**hero_section** (singleton)
- heading, subheading
- primary_button_text, secondary_button_text
- badge1, badge2

**services** (multiple)
- name, description, icon
- display_order, show_in_footer

**pricing_plans** (multiple)
- name, monthly_price, yearly_price, period
- description, button_text
- is_popular, is_coming_soon, display_order

**pricing_features** (multiple, linked to plans)
- plan_id, feature_text, display_order

## 🔌 API Endpoints

All endpoints are at `http://localhost:3001/api`

### Site Settings
- `GET /site-settings` - Get settings
- `PUT /site-settings` - Update settings

### Hero Section
- `GET /hero-section` - Get hero content
- `PUT /hero-section` - Update hero

### Services
- `GET /services` - Get all services
- `GET /services/footer` - Get footer services
- `POST /services` - Create service
- `PUT /services/:id` - Update service
- `DELETE /services/:id` - Delete service

### Pricing Plans
- `GET /pricing-plans` - Get all plans
- `POST /pricing-plans` - Create plan
- `PUT /pricing-plans/:id` - Update plan
- `DELETE /pricing-plans/:id` - Delete plan

## 🛠️ Advanced Usage

### Direct Database Editing

You can edit the database directly using:

**Command Line:**
```bash
cd backend
sqlite3 database.sqlite
```

**GUI Tools:**
- [DB Browser for SQLite](https://sqlitebrowser.org/) (Free, cross-platform)
- [TablePlus](https://tableplus.com/) (Mac, Windows, Linux)
- [DBeaver](https://dbeaver.io/) (Free, cross-platform)

### Changing the API Port

Edit `backend/server.js` or set environment variable:

```bash
BACKEND_PORT=4000 npm start
```

Update frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Resetting Data

To start fresh:

```bash
cd backend
rm database.sqlite
npm run init
```

## 🔒 Production Deployment

### Backend Deployment Options

1. **Same server as frontend** - Run backend alongside Next.js
2. **Separate server** - Deploy backend to any Node.js host
3. **Serverless** - Convert to serverless functions (needs adaptation)

### Environment Variables

**Frontend** (.env.local):
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

**Backend** (environment):
```
BACKEND_PORT=3001
```

### Security Recommendations

For production:

1. **Add authentication** to admin panel
2. **Enable HTTPS** on backend
3. **Add rate limiting** to API endpoints
4. **Backup database regularly**
5. **Use environment variables** for sensitive config

### Sample Production Setup

**On your server:**

```bash
# Install PM2 for process management
npm install -g pm2

# Start backend with PM2
cd backend
pm2 start server.js --name promptli-backend

# Backend runs on port 3001
# Use nginx/Apache to proxy requests
```

## 📋 npm Scripts

### Main Project
- `npm run dev` - Start Next.js dev server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run backend` - Start backend (production)
- `npm run backend:dev` - Start backend (development)
- `npm run backend:init` - Initialize database

### Backend (from /backend directory)
- `npm start` - Start backend server
- `npm run dev` - Start with auto-reload (nodemon)
- `npm run init` - Initialize database with default data

## 🆘 Troubleshooting

### "Cannot connect to backend"

**Check:**
1. Is the backend running? (`npm run backend`)
2. Is it on the right port? (default: 3001)
3. Is `NEXT_PUBLIC_API_URL` set correctly in `.env.local`?

**Fallback behavior:**
Even if the backend is down, your website will still work using fallback data!

### "Database is locked"

- Only one process can write to SQLite at a time
- Close any database browser tools
- Restart the backend server

### "Table already exists"

- Database is already initialized
- To reset: `rm backend/database.sqlite && npm run backend:init`

### Admin panel shows "Error loading data"

- Ensure backend is running
- Check browser console for CORS errors
- Verify API_URL in admin.html matches your backend URL

## 🎉 You're All Set!

You now have:
- ✅ Full control over your content
- ✅ No external dependencies
- ✅ Easy to edit and customize
- ✅ Simple to backup and deploy
- ✅ Complete ownership

## 📚 Next Steps

1. **Customize the admin panel** - Edit `backend/public/admin.html`
2. **Add new content types** - Extend database schema in `server.js`
3. **Add authentication** - Protect admin panel (if deploying publicly)
4. **Set up backups** - Automate database backups
5. **Deploy to production** - Host on your preferred platform

---

**Need help?** Check the code comments in:
- `backend/server.js` - API endpoints
- `backend/init-data.js` - Default data
- `lib/data.ts` - Frontend data layer
- `lib/api.client.ts` - API client
