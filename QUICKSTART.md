# 🚀 Quick Start Guide - Custom Backend

Welcome to your **fully custom, self-hosted backend**! No more Sanity.io, no more external dependencies, no more constant deployments.

## ⚡ Get Started in 3 Minutes

### Step 1: Install Backend Dependencies (30 seconds)

```bash
cd backend
npm install
```

### Step 2: Initialize Your Database (10 seconds)

```bash
npm run init
```

This creates your SQLite database with all your content.

### Step 3: Start the Backend (5 seconds)

```bash
npm start
```

Your backend is now running at **http://localhost:3001** 🎉

### Step 4: Open Admin Panel

Open your browser to: **http://localhost:3001/admin**

You can now edit all your website content!

### Step 5: Start Your Website (In a new terminal)

```bash
cd ..
npm run dev
```

Your website runs at **http://localhost:3000** ✨

---

## 🎨 What Can You Do?

### Edit Content in Admin Panel
- **Site Settings**: Title, description, contact info, social links
- **Hero Section**: Headlines, buttons, badges
- **Services**: Add, edit, delete services with icons
- **Pricing**: Create unlimited plans with custom features

### Direct Database Access
Your data is in a single file: `backend/database.sqlite`

You can:
- Copy it to backup
- Edit with SQLite tools
- Version control it
- Move it to any machine

### Use the API
All content is available via REST API:
- `GET /api/site-settings`
- `GET /api/hero-section`
- `GET /api/services`
- `GET /api/pricing-plans`

---

## 📋 Common Commands

### Backend Commands
```bash
cd backend

npm start           # Start the backend
npm run dev         # Start with auto-reload
npm run init        # Reset & initialize database
```

### Frontend Commands
```bash
npm run dev         # Development server
npm run build       # Production build
npm start           # Production server
```

### Combined (from root)
```bash
npm run backend         # Start backend
npm run backend:dev     # Backend with auto-reload
npm run backend:init    # Initialize database
```

---

## 🔧 Configuration

### Change Backend Port

Edit `backend/server.js` line 5:
```javascript
const PORT = process.env.BACKEND_PORT || 3001;
```

Or set environment variable:
```bash
BACKEND_PORT=4000 npm start
```

Then update `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Change API URL

Create/edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## 🛠️ Troubleshooting

### Backend won't start?
- Check if port 3001 is already in use
- Try: `killall node` then `npm start`

### Can't connect to backend from frontend?
- Make sure backend is running (`cd backend && npm start`)
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Restart frontend: `npm run dev`

### Database locked?
- Close any SQLite browser tools
- Restart backend

### Want to start fresh?
```bash
cd backend
rm database.sqlite
npm run init
```

---

## 📖 Full Documentation

For detailed documentation, see: **[CUSTOM_BACKEND_SETUP.md](./CUSTOM_BACKEND_SETUP.md)**

Topics covered:
- Database schema details
- API endpoint reference
- Production deployment
- Security recommendations
- Advanced customization

---

## ✅ What's Different from Sanity?

| Feature | Sanity | Custom Backend |
|---------|--------|----------------|
| **Hosting** | External service | Your machine |
| **Database** | Cloud | Local SQLite file |
| **Cost** | Paid plans | $0 |
| **Control** | Limited | 100% yours |
| **Deploy** | GitHub push needed | Just run locally |
| **Edit** | Studio only | Admin panel + direct DB |
| **Backup** | Via Sanity | Copy 1 file |
| **Offline** | No | Yes (with fallback) |

---

## 🎉 You're Ready!

Your custom backend is fully set up and ready to use. You have:

✅ Complete ownership of your data
✅ No external dependencies
✅ Easy to edit and customize
✅ Simple backup and deployment
✅ Full control over everything

**Enjoy your freedom!** 🚀

---

Need help? Check the full documentation in [CUSTOM_BACKEND_SETUP.md](./CUSTOM_BACKEND_SETUP.md)
