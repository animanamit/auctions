"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBudgetStore } from "@/lib/stores/budget-store";
import { useNotificationStore } from "@/lib/stores/notification-store";

interface BidFormProps {
  auctionTitle: string;
  currentBid: number;
}

export function BidForm({ auctionTitle, currentBid }: BidFormProps) {
  const [bidAmount, setBidAmount] = useState(currentBid + 10);
  const { budget, updateBudget } = useBudgetStore();
  const { addNotification } = useNotificationStore();

  const handleBid = () => {
    if (bidAmount <= currentBid) {
      toast.error("Bid must be higher than the current bid");
      return;
    }

    if (bidAmount > budget) {
      toast.error("Bid amount exceeds your available budget");
      return;
    }

    updateBudget(budget - bidAmount);
    addNotification({
      title: "Bid Placed Successfully",
      message: `You placed a bid of $${bidAmount.toLocaleString()} on ${auctionTitle}`,
    });
    toast.success("Bid placed successfully!");
  };

  return (
    <div>
      <div>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="bid">Your Bid Amount</Label>
            <Input
              id="bid"
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              min={currentBid + 10}
              step={10}
            />
            <p className="text-sm text-muted-foreground">
              Minimum bid increment is $10
            </p>
          </div>
        </div>

        <div>
          <Button onClick={handleBid}>Place Bid</Button>
        </div>
      </div>
    </div>
  );
}
