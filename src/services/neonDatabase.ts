import { neon } from '@neondatabase/serverless'

// Database connection - uses environment variable
// In development: uses the provided URL below
// In production (Netlify): uses VITE_DATABASE_URL env variable
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL || 'postgresql://neondb_owner:npg_fGV8vlEOTIx5@ep-divine-wildflower-ab0cefkn-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const sql = neon(DATABASE_URL)

// Initialize database tables (only runs once, ignores if already exists)
export const initDatabase = async () => {
  try {
    // Create meldingen table (IF NOT EXISTS prevents errors if table already exists)
    await sql`
      CREATE TABLE IF NOT EXISTS meldingen (
        id SERIAL PRIMARY KEY,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        postal_code TEXT NOT NULL,
        property_type TEXT NOT NULL,
        vacancy_duration TEXT NOT NULL,
        description TEXT,
        reporter_name TEXT,
        reporter_email TEXT,
        reporter_phone TEXT,
        report_type TEXT NOT NULL,
        status TEXT DEFAULT 'Nieuw',
        urgent BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `
    
    // Create berichten table (IF NOT EXISTS prevents errors if table already exists)
    await sql`
      CREATE TABLE IF NOT EXISTS berichten (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `
    
    console.log('Database tables ready')
    return true
  } catch (error: any) {
    // Ignore "already exists" errors - tables are already created
    if (error?.message?.includes('already exists')) {
      console.log('Database tables already exist - ready to use')
      return true
    }
    console.error('Error initializing database:', error)
    throw error
  }
}

// Meldingen operations
export const getMeldingen = async () => {
  try {
    const result = await sql`SELECT * FROM meldingen ORDER BY created_at DESC`
    return result
  } catch (error) {
    console.error('Error fetching meldingen:', error)
    throw error
  }
}

export const addMelding = async (melding: any) => {
  try {
    const result = await sql`
      INSERT INTO meldingen (
        address, city, postal_code, property_type, vacancy_duration,
        description, reporter_name, reporter_email, reporter_phone,
        report_type, status, urgent, created_at
      ) VALUES (
        ${melding.address}, ${melding.city}, ${melding.postalCode}, 
        ${melding.propertyType}, ${melding.vacancyDuration},
        ${melding.description || ''}, ${melding.reporterName || ''}, 
        ${melding.reporterEmail || ''}, ${melding.reporterPhone || ''},
        ${melding.reportType}, ${melding.status || 'Nieuw'}, 
        ${melding.urgent || false}, NOW()
      )
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error('Error adding melding:', error)
    throw error
  }
}

export const updateMeldingStatus = async (id: number, status: string) => {
  try {
    await sql`UPDATE meldingen SET status = ${status} WHERE id = ${id}`
    return true
  } catch (error) {
    console.error('Error updating status:', error)
    throw error
  }
}

export const toggleMeldingUrgent = async (id: number, urgent: boolean) => {
  try {
    await sql`UPDATE meldingen SET urgent = ${urgent} WHERE id = ${id}`
    return true
  } catch (error) {
    console.error('Error toggling urgent:', error)
    throw error
  }
}

export const deleteMelding = async (id: number) => {
  try {
    await sql`DELETE FROM meldingen WHERE id = ${id}`
    return true
  } catch (error) {
    console.error('Error deleting melding:', error)
    throw error
  }
}

// Berichten operations
export const getBerichten = async () => {
  try {
    const result = await sql`SELECT * FROM berichten ORDER BY created_at DESC`
    return result
  } catch (error) {
    console.error('Error fetching berichten:', error)
    throw error
  }
}

export const addBericht = async (bericht: any) => {
  try {
    const result = await sql`
      INSERT INTO berichten (name, email, subject, message, created_at)
      VALUES (${bericht.name}, ${bericht.email}, ${bericht.subject}, ${bericht.message}, NOW())
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error('Error adding bericht:', error)
    throw error
  }
}
