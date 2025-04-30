import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const SocketTest = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [auctionId, setAuctionId] = useState("test-auction-123");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ message: string; timestamp: string }>>(
    []
  );

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    
    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
      setConnected(true);
    });
    
    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setConnected(false);
    });
    
    newSocket.on("auction-update", (data) => {
      console.log("Received auction update:", data);
      if (data.type === "test") {
        setMessages((prev) => [
          ...prev,
          { message: data.message, timestamp: data.timestamp },
        ]);
      }
    });
    
    setSocket(newSocket);
    
    // Clean up the socket connection when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Join auction room
  const handleJoinAuction = () => {
    if (socket && auctionId.trim()) {
      socket.emit("join-auction", auctionId);
      console.log(`Joined auction: ${auctionId}`);
    }
  };

  // Leave auction room
  const handleLeaveAuction = () => {
    if (socket && auctionId.trim()) {
      socket.emit("leave-auction", auctionId);
      console.log(`Left auction: ${auctionId}`);
    }
  };

  // Send a test message
  const handleSendMessage = () => {
    if (socket && auctionId.trim() && message.trim()) {
      socket.emit("test-broadcast", auctionId, message);
      setMessage("");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-bold">WebSocket Test</h2>
      
      <div className="flex items-center space-x-2">
        <div
          className={`w-3 h-3 rounded-full ${
            connected ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        <span>{connected ? "Connected" : "Disconnected"}</span>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Auction ID</label>
        <Input
          value={auctionId}
          onChange={(e) => setAuctionId(e.target.value)}
          placeholder="Enter auction ID"
        />
        
        <div className="flex space-x-2">
          <Button onClick={handleJoinAuction} variant="outline">
            Join Auction
          </Button>
          <Button onClick={handleLeaveAuction} variant="outline">
            Leave Auction
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Send Test Message</label>
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium">Received Messages:</h3>
        <div className="border rounded-md h-40 overflow-y-auto p-2">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-sm">No messages yet...</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="mb-2 text-sm">
                <p className="font-medium break-words">{msg.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SocketTest;