import { drizzle } from 'drizzle-orm/node-postgres';

let cachedDb: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!cachedDb) {
    const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/aura?sslmode=disable';
    cachedDb = drizzle(connectionString);
  }
  return cachedDb;
}

// Lazy-loaded proxy for API routes
export const db = new Proxy({} as any, {
  get(target, prop) {
    const dbInstance = getDb();
    return (dbInstance as any)[prop];
  }
});
