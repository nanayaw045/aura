import { pgTable, serial, text, timestamp, integer, varchar, jsonb, boolean, numeric } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 320 }).notNull(),
  password_hash: text('password_hash').notNull(),
  full_name: text('full_name').notNull(),
  company: text('company').notNull(),
  role: varchar('role', { length: 50 }).notNull().default('user'),
  two_factor_secret: text('two_factor_secret'),
  industry: text('industry').notNull().default('Corporate'),
  country: text('country').notNull().default('Unknown'),
  city: text('city').notNull().default('Unknown'),
  revenue_range: text('revenue_range').notNull().default('Undisclosed'),
  goals: jsonb('goals').$type<string[]>().notNull().default([]),
  plan: varchar('plan', { length: 80 }).notNull().default('Standard'),
  health_score: integer('health_score').notNull().default(0),
  created_at: timestamp('created_at').defaultNow().notNull(),
  last_login: timestamp('last_login').defaultNow().notNull()
});

export const pricing_plans = pgTable('pricing_plans', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  price_monthly: numeric('price_monthly').notNull(),
  features_json: jsonb('features_json').$type<string[]>().notNull(),
  competitor_weakness: text('competitor_weakness').notNull(),
  min_deposit: integer('min_deposit').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull()
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  type: varchar('type', { length: 80 }).notNull(),
  amount: numeric('amount').notNull(),
  status: varchar('status', { length: 80 }).notNull(),
  currency: varchar('currency', { length: 10 }).notNull().default('USD'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  description: text('description').notNull()
});

export const analytics_data = pgTable('analytics_data', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  metric_name: varchar('metric_name', { length: 100 }).notNull(),
  metric_value: numeric('metric_value').notNull(),
  date: timestamp('date').defaultNow().notNull(),
  source: text('source').notNull()
});

export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  file_url: text('file_url').notNull(),
  file_name: text('file_name').notNull(),
  uploaded_at: timestamp('uploaded_at').defaultNow().notNull()
});

export const audit_logs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  action: text('action').notNull(),
  ip_address: varchar('ip_address', { length: 45 }).notNull(),
  user_agent: text('user_agent').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull()
});

export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  message: text('message').notNull(),
  read: boolean('read').notNull().default(false),
  created_at: timestamp('created_at').defaultNow().notNull()
});

export const trials = pgTable('trials', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 320 }).notNull(),
  started_at: timestamp('started_at').defaultNow().notNull(),
  expires_at: timestamp('expires_at').notNull(),
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
