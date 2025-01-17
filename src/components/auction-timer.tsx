"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface AuctionTimerProps {
  endTime: Date;
}

export function AuctionTimer({ endTime }: AuctionTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("Auction ended");
        setProgress(0);
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

      // Calculate progress
      const totalDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
      const elapsed = totalDuration - distance;
      const progressValue = 100 - (elapsed / totalDuration) * 100;
      setProgress(Math.max(0, progressValue));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Time Remaining</span>
        <span className="font-medium">{timeLeft}</span>
      </div>
      <Progress value={progress} className="h-1" />
    </div>
  );
}
