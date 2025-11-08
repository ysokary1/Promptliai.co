import { sql } from '@vercel/postgres'

export { sql }

// Check if database is initialized
export async function isDatabaseInitialized() {
  try {
    await sql`SELECT 1 FROM site_settings LIMIT 1`
    return true
  } catch (error) {
    return false
  }
}

// Initialize database tables
export async function initDatabase() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create site_settings table
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create pages table
    await sql`
      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        content JSONB NOT NULL,
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug)`
    await sql`CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key)`

    console.log('Database tables created successfully')
    return { success: true }
  } catch (error) {
    console.error('Error initializing database:', error)
    return { success: false, error }
  }
}

// User operations
export async function getUserByEmail(email: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `
    return rows[0]
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function createUser(email: string, passwordHash: string, name?: string) {
  try {
    const { rows } = await sql`
      INSERT INTO users (email, password_hash, name)
      VALUES (${email}, ${passwordHash}, ${name || null})
      RETURNING id, email, name, created_at
    `
    return rows[0]
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

// Site settings operations
export async function getSiteSetting(key: string) {
  try {
    const { rows } = await sql`
      SELECT value FROM site_settings WHERE key = ${key} LIMIT 1
    `
    return rows[0]?.value
  } catch (error) {
    console.error('Error fetching site setting:', error)
    return null
  }
}

export async function updateSiteSetting(key: string, value: any) {
  try {
    const { rows } = await sql`
      INSERT INTO site_settings (key, value, updated_at)
      VALUES (${key}, ${JSON.stringify(value)}, CURRENT_TIMESTAMP)
      ON CONFLICT (key)
      DO UPDATE SET value = ${JSON.stringify(value)}, updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `
    return rows[0]
  } catch (error) {
    console.error('Error updating site setting:', error)
    return null
  }
}

// Page operations
export async function getPage(slug: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM pages WHERE slug = ${slug} AND is_published = true LIMIT 1
    `
    return rows[0]
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export async function getAllPages() {
  try {
    const { rows } = await sql`
      SELECT * FROM pages ORDER BY created_at DESC
    `
    return rows
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

export async function createPage(slug: string, title: string, content: any, isPublished = false) {
  try {
    const { rows } = await sql`
      INSERT INTO pages (slug, title, content, is_published, updated_at)
      VALUES (${slug}, ${title}, ${JSON.stringify(content)}, ${isPublished}, CURRENT_TIMESTAMP)
      RETURNING *
    `
    return rows[0]
  } catch (error) {
    console.error('Error creating page:', error)
    return null
  }
}

export async function updatePage(slug: string, updates: { title?: string; content?: any; isPublished?: boolean }) {
  try {
    const setters = []
    const values: any[] = []

    if (updates.title !== undefined) {
      setters.push('title = $' + (values.length + 1))
      values.push(updates.title)
    }
    if (updates.content !== undefined) {
      setters.push('content = $' + (values.length + 1))
      values.push(JSON.stringify(updates.content))
    }
    if (updates.isPublished !== undefined) {
      setters.push('is_published = $' + (values.length + 1))
      values.push(updates.isPublished)
    }

    setters.push('updated_at = CURRENT_TIMESTAMP')
    values.push(slug)

    const query = `
      UPDATE pages
      SET ${setters.join(', ')}
      WHERE slug = $${values.length}
      RETURNING *
    `

    const { rows } = await sql.query(query, values)
    return rows[0]
  } catch (error) {
    console.error('Error updating page:', error)
    return null
  }
}

export async function deletePage(slug: string) {
  try {
    await sql`DELETE FROM pages WHERE slug = ${slug}`
    return { success: true }
  } catch (error) {
    console.error('Error deleting page:', error)
    return { success: false, error }
  }
}
