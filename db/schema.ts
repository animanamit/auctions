import { pgTable, serial } from "drizzle-orm/pg-core";

export const bids = pgTable("auction_bids", {
  id: serial("id").primaryKey(),
});
