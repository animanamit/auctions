import cors from "cors";
import express from "express";

// Create an Express app
const app = express();

// Enable CORS
app.use(cors({ origin: "http://localhost:5174" })); // Allow requests from the frontend

// Add the tRPC middleware to the Express app

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
