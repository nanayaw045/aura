import type { Config } from 'drizzle-kit';

const config: Config = {
  dialect: 'postgresql',
  schema: ['./drizzle/schema.ts'],
  out: './drizzle'
};

export default config;
