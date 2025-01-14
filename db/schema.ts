import {
  boolean,
  timestamp,
  text,
  primaryKey,
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = "postgres://postgres:postgres@localhost:5432/drizzle";
const pool = postgres(connectionString, { max: 1 });

export const bids = pgTable("auction_bids", {
  id: serial("id").primaryKey(),
});

export const items = pgTable("auction_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  startingPrice: integer("starting_price").notNull(),
  currentPrice: integer("current_price"),
  isSold: boolean("is_sold").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  sellerId: integer("seller_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  buyerId: integer("buyer_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  isLive: boolean("is_live").notNull().default(false),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const db = drizzle(pool);
