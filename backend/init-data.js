const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'database.sqlite'));

console.log('🗄️  Initializing database with default data...\n');

// Create tables if they don't exist
console.log('📋 Creating database tables...');
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
console.log('✅ Tables created successfully!\n');

try {
  // Insert Site Settings
  console.log('📝 Inserting site settings...');
  db.prepare(`
    INSERT OR REPLACE INTO site_settings (
      id, title, description, phone, email, address,
      company_name, company_description,
      linkedin_url, twitter_url, facebook_url
    ) VALUES (
      1,
      'Promptli Ai | Never Miss a Lead, Never Miss a Buyer',
      'Transform your business communications with AI-powered automation. Get instant responses, 24/7 availability, and seamless integration.',
      '+1 (555) 123-4567',
      'hello@promptli.ai',
      '123 AI Street, Tech City, TC 12345',
      'Promptli Ai',
      'Leading provider of AI-powered business communication solutions',
      'https://linkedin.com/company/promptliai',
      'https://twitter.com/promptliai',
      'https://facebook.com/promptliai'
    )
  `).run();

  // Insert Hero Section
  console.log('🦸 Inserting hero section...');
  db.prepare(`
    INSERT OR REPLACE INTO hero_section (
      id, heading, subheading, primary_button_text,
      secondary_button_text, badge1, badge2
    ) VALUES (
      1,
      'Never Miss a Lead, Never Miss a Buyer',
      'Transform your business communications with AI-powered automation that responds instantly, 24/7. Capture every opportunity while you focus on growing your business.',
      'Get Started Free',
      'Book a Demo',
      'No credit card required',
      '14-day free trial'
    )
  `).run();

  // Insert Services
  console.log('⚙️  Inserting services...');
  const services = [
    {
      name: '24/7 AI Chatbot',
      description: 'Never miss a customer inquiry with our intelligent chatbot that responds instantly, any time of day or night.',
      icon: 'bot',
      order: 1,
      footer: 1
    },
    {
      name: 'Custom Workflows',
      description: 'Design automated workflows tailored to your business needs. From lead capture to customer support.',
      icon: 'workflow',
      order: 2,
      footer: 1
    },
    {
      name: 'Smart Integration',
      description: 'Seamlessly connect with your existing tools and platforms. CRM, email, calendar, and more.',
      icon: 'cog',
      order: 3,
      footer: 1
    },
    {
      name: 'AI Training',
      description: 'Train your AI assistant on your business knowledge, products, and services for accurate responses.',
      icon: 'brain',
      order: 4,
      footer: 0
    }
  ];

  const serviceStmt = db.prepare(`
    INSERT INTO services (name, description, icon, display_order, show_in_footer)
    VALUES (?, ?, ?, ?, ?)
  `);

  services.forEach(service => {
    serviceStmt.run(service.name, service.description, service.icon, service.order, service.footer);
  });

  // Insert Pricing Plans
  console.log('💰 Inserting pricing plans...');
  const plans = [
    {
      name: 'Starter',
      monthly_price: 49,
      yearly_price: 470,
      period: 'month',
      description: 'Perfect for small businesses just getting started with AI automation',
      button_text: 'Start Free Trial',
      is_popular: 0,
      is_coming_soon: 0,
      order: 1,
      features: [
        '1,000 conversations/month',
        'Basic AI training',
        'Email support',
        '2 integrations',
        'Analytics dashboard'
      ]
    },
    {
      name: 'Professional',
      monthly_price: 149,
      yearly_price: 1430,
      period: 'month',
      description: 'For growing businesses that need advanced automation and priority support',
      button_text: 'Start Free Trial',
      is_popular: 1,
      is_coming_soon: 0,
      order: 2,
      features: [
        '10,000 conversations/month',
        'Advanced AI training',
        'Priority support',
        'Unlimited integrations',
        'Advanced analytics',
        'Custom workflows',
        'API access'
      ]
    },
    {
      name: 'Enterprise',
      monthly_price: 499,
      yearly_price: 4790,
      period: 'month',
      description: 'For large organizations with custom requirements and dedicated support',
      button_text: 'Contact Sales',
      is_popular: 0,
      is_coming_soon: 0,
      order: 3,
      features: [
        'Unlimited conversations',
        'Custom AI models',
        'Dedicated account manager',
        'White-label solution',
        'Custom integrations',
        'SLA guarantee',
        '24/7 phone support',
        'On-premise deployment'
      ]
    }
  ];

  const planStmt = db.prepare(`
    INSERT INTO pricing_plans (
      name, monthly_price, yearly_price, period, description,
      button_text, is_popular, is_coming_soon, display_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const featureStmt = db.prepare(`
    INSERT INTO pricing_features (plan_id, feature_text, display_order)
    VALUES (?, ?, ?)
  `);

  plans.forEach(plan => {
    const result = planStmt.run(
      plan.name,
      plan.monthly_price,
      plan.yearly_price,
      plan.period,
      plan.description,
      plan.button_text,
      plan.is_popular,
      plan.is_coming_soon,
      plan.order
    );

    const planId = result.lastInsertRowid;

    plan.features.forEach((feature, index) => {
      featureStmt.run(planId, feature, index);
    });
  });

  console.log('\n✅ Database initialized successfully!');
  console.log(`📁 Database location: ${path.join(__dirname, 'database.sqlite')}\n`);

} catch (error) {
  console.error('❌ Error initializing database:', error.message);
  process.exit(1);
} finally {
  db.close();
}
