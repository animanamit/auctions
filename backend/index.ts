import { publicProcedure, router } from "./trpc";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

const appRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
});

// Export only the type of a router!
export type AppRouter = typeof appRouter;

// Create an Express app
const app = express();

// Enable CORS
app.use(cors({ origin: "http://localhost:5174" })); // Allow requests from the frontend

// Add the tRPC middleware to the Express app
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
