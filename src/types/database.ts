import { pgTable, serial, text, timestamp, integer, varchar, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 320 }).notNull(),
  password_hash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: varchar('role', { length: 50 }).notNull().default('user'),
  company_name: text('company_name').notNull(),
  industry: text('industry').notNull(),
  country: text('country').notNull(),
  city: text('city').notNull(),
  revenue_range: text('revenue_range').notNull(),
  goals: jsonb('goals').$type<string[]>().notNull(),
  plan: varchar('plan', { length: 80 }).notNull().default('Starter'),
  health_score: integer('health_score').notNull().default(0),
  created_at: timestamp('created_at').defaultNow().notNull()
});

export const deep_dives = pgTable('deep_dives', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  query: text('query').notNull(),
  analysis: jsonb('analysis').$type<Record<string, unknown>>().notNull(),
  created_at: timestamp('created_at').defaultNow().notNull()
});

export const chat_sessions = pgTable('chat_sessions', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  title: text('title').notNull(),
  messages: jsonb('messages').$type<Array<Record<string, unknown>>>().notNull(),
  created_at: timestamp('created_at').defaultNow().notNull()
});

export const action_plans = pgTable('action_plans', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  tasks: jsonb('tasks').$type<Array<Record<string, unknown>>>().notNull(),
  created_at: timestamp('created_at').defaultNow().notNull()
});

export const market_news = pgTable('market_news', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  source: text('source').notNull(),
  url: text('url').notNull(),
  category: text('category').notNull(),
  published_at: timestamp('published_at').defaultNow().notNull()
});

export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  plan: varchar('plan', { length: 80 }).notNull(),
  status: varchar('status', { length: 80 }).notNull(),
  stripe_customer_id: text('stripe_customer_id').notNull(),
  stripe_subscription_id: text('stripe_subscription_id').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull()
});
