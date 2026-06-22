import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('Neon DB connection failed: DATABASE_URL is not defined');
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

try {
  await pool.query('SELECT 1');
} catch (error) {
  console.error('Neon DB connection failed', error);
  throw new Error('Neon DB connection failed');
}

export const db = drizzle(pool);
