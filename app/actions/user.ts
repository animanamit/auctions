"use server";

import { database } from "@/db/database";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createOrUpdateUser(
  clerkId: string,
  name: string,
  email: string
) {
  const existingUser = await database
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId));

  if (existingUser.length === 0) {
    await database.insert(users).values({
      clerkId,
      name,
      email,
    });
    console.log("User created:", clerkId);
  } else {
    await database
      .update(users)
      .set({ name, email })
      .where(eq(users.clerkId, clerkId));
    console.log("User updated:", clerkId);
  }
}
