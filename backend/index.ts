import Fastify from "fastify";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { AddressInfo } from "net";

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Create Fastify server
const server = Fastify({
  logger: true,
});

// Add a simple route for testing
server.get("/", async (request, reply) => {
  return { message: "Auctions API is running!" };
});

// Add a health check endpoint
server.get("/health", async (request, reply) => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

// Define a function to handle socket connections
const setupSocketIO = (httpServer: any) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join auction room
    socket.on("join-auction", (auctionId) => {
      socket.join(`auction:${auctionId}`);
      console.log(`Client ${socket.id} joined auction:${auctionId}`);
    });

    // Leave auction room
    socket.on("leave-auction", (auctionId) => {
      socket.leave(`auction:${auctionId}`);
      console.log(`Client ${socket.id} left auction:${auctionId}`);
    });

    // Broadcast a test message when requested
    socket.on("test-broadcast", (auctionId, message) => {
      console.log(`Broadcasting to auction:${auctionId}:`, message);
      io.to(`auction:${auctionId}`).emit("auction-update", {
        type: "test",
        message,
        timestamp: new Date().toISOString()
      });
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

// Start the server
const start = async () => {
  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });
    const port = (server.server.address() as AddressInfo).port;
    console.log(`Server listening at ${port}`);

    // Setup Socket.io after server is started
    const io = setupSocketIO(server.server);

    // Make io available for later when we add routes
    // We'll use a better approach when implementing routes
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Start the server
start();