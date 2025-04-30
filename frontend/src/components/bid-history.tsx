import { AlertCircle } from "lucide-react";

interface Bid {
  message: string;
  timestamp: string;
}

interface BidHistoryProps {
  bids: Bid[];
}

export const BidHistory = ({ bids }: BidHistoryProps) => {
  if (!bids || bids.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <AlertCircle className="h-5 w-5 mx-auto mb-2" />
        <p>No bids yet. Be the first to bid!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bids.map((bid, index) => (
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
  );
};