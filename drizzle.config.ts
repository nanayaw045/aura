import type { Config } from 'drizzle-kit';

const config: Config = {
  dialect: 'postgresql',
  schema: ['./src/types/database.ts'],
  out: './drizzle'
};

export default config;
