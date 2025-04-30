"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Clock, Heart, ArrowLeft, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatTimeLeft, formatPrice } from "@/utils/helpers";
import { mockAuctionItems } from "@/mock-data";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

const AuctionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isWatching, setIsWatching] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [latestBids, setLatestBids] = useState<
    Array<{ message: string; timestamp: string }>
  >([]);

  // Find the auction item from the mock data
  // In a real implementation, this would be fetched from the API
  const auctionItem =
    mockAuctionItems.find((item) => item.id === id) || mockAuctionItems[0];

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
      setIsConnected(true);
      toast.success(`Connected to live updates for "${auctionItem.title}"`);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setIsConnected(false);
      toast.error(`Disconnected from live updates for "${auctionItem.title}"`);
    });

    newSocket.on("auction-update", (data) => {
      console.log("Received auction update:", data);
      if (data.type === "test") {
        // For now, we'll display our test messages
        setLatestBids((prev) => [
          { message: data.message, timestamp: data.timestamp },
          ...prev.slice(0, 4), // Keep only latest 5 bids
        ]);

        console.log(data);

        toast.info(`New bid received for "${auctionItem.title}"!`);
      }
    });

    setSocket(newSocket);

    // Clean up the socket connection when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [auctionItem.title]);

  // Join auction room when component mounts or auction ID changes
  useEffect(() => {
    if (socket && isConnected && id) {
      // Use the auction ID from the route params
      socket.emit("join-auction", id);
      console.log(`Joined auction room: ${id}`);

      // Leave the auction room when component unmounts or ID changes
      return () => {
        socket.emit("leave-auction", id);
        console.log(`Left auction room: ${id}`);
      };
    }
  }, [socket, isConnected, id]);

  const toggleWatch = () => {
    setIsWatching(!isWatching);
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!socket || !isConnected) {
      toast.error("Not connected to auction server");
      return;
    }

    if (!bidAmount.trim()) {
      toast.error("Please enter a bid amount");
      return;
    }

    const amount = parseFloat(bidAmount);

    if (isNaN(amount)) {
      toast.error("Please enter a valid number");
      return;
    }

    if (amount <= auctionItem.currentPrice) {
      toast.error(
        `Bid must be higher than current price (${formatPrice(
          auctionItem.currentPrice
        )})`
      );
      return;
    }

    // In a real implementation, this would call an API to place the bid
    // For now, we'll just simulate it with the WebSocket test-broadcast
    socket.emit("test-broadcast", id, `Bid placed: ${formatPrice(amount)}`);

    toast.success(
      `Bid of ${formatPrice(amount)} placed successfully on "${
        auctionItem.title
      }"!`
    );
    setBidAmount("");
  };

  return (
    <main className="mx-auto px-6 py-12">
      {/* Back Button */}
      <div className="mb-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 pl-0"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to auctions</span>
        </Button>
      </div>

      {/* Connection Status */}
      <div className="mb-4 flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        <span className="text-sm text-gray-500">
          {isConnected
            ? "Connected to live updates"
            : "Not connected to live updates"}
        </span>
      </div>

      {/* Header Section */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900">
            {auctionItem.title}
          </h1>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-xs rounded-lg border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              onClick={toggleWatch}
            >
              {isWatching ? (
                <>
                  <Heart className="h-4 w-4 mr-2 fill-rose-500 text-rose-500" />
                  Watching
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  Watch
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <span className="font-medium text-gray-700">
              {auctionItem.status}
            </span>
          </div>
          <div className="h-1 w-1 rounded-full bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{auctionItem.bids} bids</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Ends in {formatTimeLeft(auctionItem.endsAt)}</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column - Image */}
        <div className="lg:col-span-3">
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
            <img
              src={auctionItem.imageURL}
              alt={auctionItem.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Latest Bids Section */}
          <div className="mt-6 bg-white p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Latest Bids</h3>
            {latestBids.length > 0 ? (
              <div className="space-y-3">
                {latestBids.map((bid, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 rounded-lg bg-gray-50"
                  >
                    <div className="font-medium">{bid.message}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(bid.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <AlertCircle className="h-5 w-5 mx-auto mb-2" />
                <p>No bids yet. Be the first to bid!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Details and Bidding */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price and Bid Section */}
          <div className="bg-white p-6 rounded-lg">
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">Current Price</div>
              <div className="text-3xl font-medium text-gray-900">
                {formatPrice(auctionItem.currentPrice)}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">Time Remaining</div>
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5 text-gray-700" />
                <span className="text-xl font-medium">
                  {formatTimeLeft(auctionItem.endsAt, true)}
                </span>
              </div>
            </div>

            <form onSubmit={handleBidSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="bidAmount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Bid
                </label>
                <Input
                  id="bidAmount"
                  type="number"
                  step="0.01"
                  min={auctionItem.currentPrice + 1}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={`Enter amount higher than ${formatPrice(
                    auctionItem.currentPrice
                  )}`}
                  className="w-full"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-lg text-base"
                disabled={!isConnected}
              >
                {isConnected ? "Place Bid" : "Connecting..."}
              </Button>
            </form>

            <div className="text-xs text-center text-gray-500 mt-3">
              By placing a bid, you agree to our terms of service
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuctionPage;
