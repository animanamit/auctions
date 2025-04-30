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

  // Map to keep track of users in each auction room
  const auctionRooms: Record<string, Set<string>> = {};

  // Helper function to update and broadcast room count
  const updateRoomCount = (auctionId: string) => {
    const roomName = `auction:${auctionId}`;
    const room = io.sockets.adapter.rooms.get(roomName);
    const userCount = room ? room.size : 0;
    
    // Emit the updated count to all users in the room
    io.to(roomName).emit("room-count-update", {
      auctionId,
      count: userCount,
      timestamp: new Date().toISOString()
    });
    
    console.log(`User count in auction:${auctionId}: ${userCount}`);
    return userCount;
  };

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join auction room
    socket.on("join-auction", (auctionId) => {
      const roomName = `auction:${auctionId}`;
      socket.join(roomName);
      console.log(`Client ${socket.id} joined auction:${auctionId}`);
      
      // Initialize the auction room if it doesn't exist
      if (!auctionRooms[auctionId]) {
        auctionRooms[auctionId] = new Set();
      }
      
      // Add the user to the room
      auctionRooms[auctionId].add(socket.id);
      
      // Update and broadcast the room count
      updateRoomCount(auctionId);
    });

    // Leave auction room
    socket.on("leave-auction", (auctionId) => {
      const roomName = `auction:${auctionId}`;
      socket.leave(roomName);
      console.log(`Client ${socket.id} left auction:${auctionId}`);
      
      // Remove the user from the room
      if (auctionRooms[auctionId]) {
        auctionRooms[auctionId].delete(socket.id);
        
        // Clean up empty rooms
        if (auctionRooms[auctionId].size === 0) {
          delete auctionRooms[auctionId];
        }
      }
      
      // Update and broadcast the room count
      updateRoomCount(auctionId);
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
      
      // Remove user from all auction rooms they were in
      Object.keys(auctionRooms).forEach(auctionId => {
        if (auctionRooms[auctionId].has(socket.id)) {
          auctionRooms[auctionId].delete(socket.id);
          
          // Clean up empty rooms
          if (auctionRooms[auctionId].size === 0) {
            delete auctionRooms[auctionId];
          }
          
          // Update and broadcast the room count
          updateRoomCount(auctionId);
        }
      });
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