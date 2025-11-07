const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize database
const db = new Database(path.join(__dirname, 'database.sqlite'));

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT,
    company_name TEXT NOT NULL,
    company_description TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    facebook_url TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS hero_section (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    heading TEXT NOT NULL,
    subheading TEXT NOT NULL,
    primary_button_text TEXT NOT NULL,
    secondary_button_text TEXT NOT NULL,
    badge1 TEXT,
    badge2 TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    show_in_footer BOOLEAN NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS pricing_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    monthly_price REAL NOT NULL,
    yearly_price REAL NOT NULL,
    period TEXT NOT NULL DEFAULT 'month',
    description TEXT NOT NULL,
    button_text TEXT NOT NULL,
    is_popular BOOLEAN NOT NULL DEFAULT 0,
    is_coming_soon BOOLEAN NOT NULL DEFAULT 0,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS pricing_features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER NOT NULL,
    feature_text TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (plan_id) REFERENCES pricing_plans(id) ON DELETE CASCADE
  );
`);

// ========== API ENDPOINTS ==========

// Site Settings
app.get('/api/site-settings', (req, res) => {
  try {
    const settings = db.prepare('SELECT * FROM site_settings WHERE id = 1').get();
    res.json(settings || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/site-settings', (req, res) => {
  try {
    const {
      title, description, phone, email, address,
      company_name, company_description,
      linkedin_url, twitter_url, facebook_url
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO site_settings (
        id, title, description, phone, email, address,
        company_name, company_description,
        linkedin_url, twitter_url, facebook_url,
        updated_at
      ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        title = excluded.title,
        description = excluded.description,
        phone = excluded.phone,
        email = excluded.email,
        address = excluded.address,
        company_name = excluded.company_name,
        company_description = excluded.company_description,
        linkedin_url = excluded.linkedin_url,
        twitter_url = excluded.twitter_url,
        facebook_url = excluded.facebook_url,
        updated_at = CURRENT_TIMESTAMP
    `);

    stmt.run(
      title, description, phone, email, address,
      company_name, company_description,
      linkedin_url, twitter_url, facebook_url
    );

    res.json({ success: true, message: 'Site settings updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hero Section
app.get('/api/hero-section', (req, res) => {
  try {
    const hero = db.prepare('SELECT * FROM hero_section WHERE id = 1').get();
    res.json(hero || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/hero-section', (req, res) => {
  try {
    const {
      heading, subheading, primary_button_text,
      secondary_button_text, badge1, badge2
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO hero_section (
        id, heading, subheading, primary_button_text,
        secondary_button_text, badge1, badge2, updated_at
      ) VALUES (1, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        heading = excluded.heading,
        subheading = excluded.subheading,
        primary_button_text = excluded.primary_button_text,
        secondary_button_text = excluded.secondary_button_text,
        badge1 = excluded.badge1,
        badge2 = excluded.badge2,
        updated_at = CURRENT_TIMESTAMP
    `);

    stmt.run(heading, subheading, primary_button_text, secondary_button_text, badge1, badge2);

    res.json({ success: true, message: 'Hero section updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Services
app.get('/api/services', (req, res) => {
  try {
    const services = db.prepare('SELECT * FROM services ORDER BY display_order ASC').all();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/services/footer', (req, res) => {
  try {
    const services = db.prepare(
      'SELECT * FROM services WHERE show_in_footer = 1 ORDER BY display_order ASC'
    ).all();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/services', (req, res) => {
  try {
    const { name, description, icon, display_order, show_in_footer } = req.body;

    const stmt = db.prepare(`
      INSERT INTO services (name, description, icon, display_order, show_in_footer)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, description, icon || null, display_order || 0, show_in_footer ? 1 : 0);

    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/services/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, display_order, show_in_footer } = req.body;

    const stmt = db.prepare(`
      UPDATE services
      SET name = ?, description = ?, icon = ?, display_order = ?,
          show_in_footer = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(name, description, icon || null, display_order || 0, show_in_footer ? 1 : 0, id);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/services/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM services WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pricing Plans
app.get('/api/pricing-plans', (req, res) => {
  try {
    const plans = db.prepare('SELECT * FROM pricing_plans ORDER BY display_order ASC').all();

    // Get features for each plan
    const plansWithFeatures = plans.map(plan => {
      const features = db.prepare(
        'SELECT feature_text FROM pricing_features WHERE plan_id = ? ORDER BY display_order ASC'
      ).all(plan.id);

      return {
        ...plan,
        features: features.map(f => f.feature_text)
      };
    });

    res.json(plansWithFeatures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/pricing-plans', (req, res) => {
  try {
    const {
      name, monthly_price, yearly_price, period, description,
      button_text, is_popular, is_coming_soon, display_order, features
    } = req.body;

    // Insert plan
    const stmt = db.prepare(`
      INSERT INTO pricing_plans (
        name, monthly_price, yearly_price, period, description,
        button_text, is_popular, is_coming_soon, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name, monthly_price, yearly_price, period || 'month', description,
      button_text, is_popular ? 1 : 0, is_coming_soon ? 1 : 0, display_order || 0
    );

    const planId = result.lastInsertRowid;

    // Insert features
    if (features && Array.isArray(features)) {
      const featureStmt = db.prepare(
        'INSERT INTO pricing_features (plan_id, feature_text, display_order) VALUES (?, ?, ?)'
      );

      features.forEach((feature, index) => {
        featureStmt.run(planId, feature, index);
      });
    }

    res.json({ success: true, id: planId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/pricing-plans/:id', (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, monthly_price, yearly_price, period, description,
      button_text, is_popular, is_coming_soon, display_order, features
    } = req.body;

    // Update plan
    const stmt = db.prepare(`
      UPDATE pricing_plans
      SET name = ?, monthly_price = ?, yearly_price = ?, period = ?,
          description = ?, button_text = ?, is_popular = ?,
          is_coming_soon = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      name, monthly_price, yearly_price, period || 'month', description,
      button_text, is_popular ? 1 : 0, is_coming_soon ? 1 : 0, display_order || 0, id
    );

    // Update features - delete old ones and insert new ones
    if (features && Array.isArray(features)) {
      db.prepare('DELETE FROM pricing_features WHERE plan_id = ?').run(id);

      const featureStmt = db.prepare(
        'INSERT INTO pricing_features (plan_id, feature_text, display_order) VALUES (?, ?, ?)'
      );

      features.forEach((feature, index) => {
        featureStmt.run(id, feature, index);
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/pricing-plans/:id', (req, res) => {
  try {
    const { id } = req.params;
    // Features are automatically deleted due to CASCADE
    db.prepare('DELETE FROM pricing_plans WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`💾 Database: ${path.join(__dirname, 'database.sqlite')}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});
