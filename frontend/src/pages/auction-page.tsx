import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Clock, Heart, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTimeLeft, formatPrice } from "@/utils/helpers";
import { mockAuctionItems } from "@/mock-data";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { BidForm } from "@/components/bid-form";
import { BidHistory } from "@/components/bid-history";
import { useNotification } from "@/contexts/notification-context";

export const AuctionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isWatching, setIsWatching] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userCount, setUserCount] = useState(1); // Start with 1 (current user)
  const [latestBids, setLatestBids] = useState<
    Array<{ message: string; timestamp: string }>
  >([]);
  const { addNotification } = useNotification();

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
      // Only show toast on first connection, not on reconnects
      if (!socket) {
        toast.success(`Connected to live updates`, { id: "connection-toast" });
      }
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setIsConnected(false);
      // No toast for disconnection to avoid too many notifications
    });

    newSocket.on("auction-update", (data) => {
      console.log("Received auction update:", data);
      if (data.type === "test") {
        // Only add to latest bids if this is a new message or one we don't already have
        // This prevents duplicate bids in the list when our own bid comes back from server
        const messageExists = latestBids.some(
          (bid) =>
            bid.message === data.message && bid.timestamp === data.timestamp
        );

        if (!messageExists) {
          // For now, we'll display our test messages
          setLatestBids((prev) => [
            { message: data.message, timestamp: data.timestamp },
            ...prev.slice(0, 4), // Keep only latest 5 bids
          ]);
        }

        console.log(data);

        // Create a notification for the bid update only if it's not our own bid
        // We already created a notification for our own bid in handlePlaceBid
        const isBidFromCurrentUser = data.message.startsWith("Bid placed:");
        if (!isBidFromCurrentUser) {
          addNotification({
            message: data.message,
            type: "bid",
            auctionId: auctionItem.id,
            auctionTitle: auctionItem.title,
          });
        }
      }
    });

    // Listen for room count updates
    newSocket.on("room-count-update", (data) => {
      console.log("Room count update:", data);
      if (data.auctionId === id) {
        setUserCount(data.count);
      }
    });

    setSocket(newSocket);

    // Clean up the socket connection when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [auctionItem.title, auctionItem.id, id, addNotification]);

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

    if (!isWatching) {
      // Add "watching" notification when user starts watching
      addNotification({
        message: `You are now watching "${auctionItem.title}"`,
        type: "watched",
        auctionId: auctionItem.id,
        auctionTitle: auctionItem.title,
      });
    }
  };

  const handlePlaceBid = (amount: number) => {
    if (!socket || !isConnected) {
      toast.error("Not connected to auction server", {
        id: "connection-error-toast",
      });
      return;
    }

    // Create bid data with a timestamp to ensure consistent display across tabs
    const timestamp = new Date().toISOString();
    const bidMessage = `Bid placed: ${formatPrice(amount)}`;

    // In a real implementation, this would call an API to place the bid
    // For now, we'll just simulate it with the WebSocket test-broadcast
    // Include a timestamp in the broadcast to ensure consistent display
    socket.emit("test-broadcast", id, bidMessage, timestamp);

    // Update local latest bids immediately to avoid lag
    // This will be overwritten when the server broadcasts back to all clients
    setLatestBids((prev) => [
      { message: bidMessage, timestamp },
      ...prev.slice(0, 4), // Keep only 5 most recent
    ]);

    // Create a unique ID for this bid's toast to prevent duplicates
    // (Note: we're not using this directly anymore since our notification system handles IDs)

    // Add notification for the user's own bid with a custom type that ensures only one toast
    addNotification({
      message: `Your bid of ${formatPrice(amount)} was placed successfully`,
      type: "success", // This will show a toast because it's in the allowed types
      auctionId: auctionItem.id,
      auctionTitle: auctionItem.title,
    });
  };

  return (
    <main>
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

      {/* Connection Status with User Count */}
      <div className="mb-4 flex items-center gap-6">
        <div className="flex items-center gap-2">
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

        {isConnected && (
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <Users className="h-3.5 w-3.5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {userCount} {userCount === 1 ? "person" : "people"} watching
            </span>
          </div>
        )}
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
            <BidHistory bids={latestBids} />
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

            <BidForm
              auctionId={auctionItem.id}
              currentPrice={auctionItem.currentPrice}
              isConnected={isConnected}
              onPlaceBid={handlePlaceBid}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuctionPage;
