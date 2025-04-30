import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/utils/helpers";
import { toast } from "sonner";

// Helper function to determine minimum bid increment based on current price
function getMinimumBidIncrement(currentBid: number): number {
  if (currentBid < 100) return 5;
  if (currentBid < 500) return 10;
  if (currentBid < 1000) return 25;
  if (currentBid < 5000) return 50;
  return 100;
}

interface BidFormProps {
  auctionId: string;
  currentPrice: number;
  isConnected: boolean;
  onPlaceBid: (amount: number) => void;
}

export const BidForm = ({ 
  auctionId, 
  currentPrice, 
  isConnected,
  onPlaceBid 
}: BidFormProps) => {
  const [bidAmount, setBidAmount] = useState<string>("");
  
  // Calculate minimum bid
  const minIncrement = getMinimumBidIncrement(currentPrice);
  const minBid = currentPrice + minIncrement;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
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
    
    if (amount <= currentPrice) {
      toast.error(
        `Bid must be higher than current price (${formatPrice(currentPrice)})`
      );
      return;
    }
    
    if (amount < minBid) {
      toast.error(
        `Bid must be at least ${formatPrice(minBid)} (${formatPrice(minIncrement)} more than current price)`
      );
      return;
    }
    
    onPlaceBid(amount);
    setBidAmount("");
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label
          htmlFor="bidAmount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Bid (minimum: {formatPrice(minBid)})
        </label>
        <Input
          id="bidAmount"
          type="number"
          step="0.01"
          min={minBid}
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder={`Enter amount (${formatPrice(minBid)}+)`}
          className="w-full py-6"
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
      
      <div className="text-xs text-center text-gray-500">
        By placing a bid, you agree to our terms of service
      </div>
    </form>
  );
};