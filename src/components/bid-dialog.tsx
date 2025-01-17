"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBudgetStore } from "@/lib/stores/budget-store";
import { useNotificationStore } from "@/lib/stores/notification-store";

interface BidDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auctionTitle: string;
  currentBid: number;
}

export function BidDialog({
  open,
  onOpenChange,
  auctionTitle,
  currentBid,
}: BidDialogProps) {
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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Place a Bid</DialogTitle>
          <DialogDescription>
            Current bid is ${currentBid.toLocaleString()}. Your available budget
            is ${budget.toLocaleString()}
          </DialogDescription>
        </DialogHeader>

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

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleBid}>Place Bid</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
