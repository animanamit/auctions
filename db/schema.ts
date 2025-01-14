import {
  boolean,
  timestamp,
  text,
  primaryKey,
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";

import type { AdapterAccountType } from "next-auth/adapters";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = "postgres://postgres:postgres@localhost:5432/drizzle";
const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(pool);

export const bids = pgTable("auction_bids", {
  id: serial("id").primaryKey(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
