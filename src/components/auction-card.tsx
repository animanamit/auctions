"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuctionTimer } from "./auction-timer";

import { format } from "date-fns";
import { AuctionItem } from "@/types/auction";
import { useState } from "react";

interface AuctionCardProps {
  auction: AuctionItem;
  onBidClick?: () => void;
}

export function AuctionCard({ auction }: AuctionCardProps) {
  const router = useRouter();
  const startTime = auction.scheduledStartTime
    ? new Date(auction.scheduledStartTime)
    : null;
  const isUpcoming = startTime && startTime > new Date();
  const [isWatching, setIsWatching] = useState(false);

  return (
    <Card className="overflow-hidden bg-white">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={auction.photos.obsPhoto || "/placeholder.svg"}
            alt={auction.name}
            fill
            className="object-cover"
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsWatching(!isWatching)}
            className="absolute right-2 top-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          >
            <Eye
              className={`h-4 w-4 ${
                isWatching ? "fill-pink-500 text-pink-500" : ""
              }`}
            />
          </Button>
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 bg-secondary text-secondary-foreground font-medium"
          >
            Upcoming
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-4">
        <h3 className="font-light text-lg">{auction.name}</h3>
        {isUpcoming ? (
          <>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Starting Price</span>
              <span className="font-medium text-foreground">
                ${auction.startingPrice.toLocaleString()}
              </span>
            </div>
            {startTime && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  Starts {format(startTime, "dd/MM/yyyy")} at{" "}
                  {format(startTime, "HH:mm")}
                </span>
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              Duration: {auction.duration} hours
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Current Bid</span>
              <span className="font-medium text-foreground">
                $
                {(
                  auction.currentPrice || auction.startingPrice
                ).toLocaleString()}
              </span>
            </div>
            {startTime && (
              <AuctionTimer
                endTime={
                  new Date(startTime.getTime() + auction.duration * 3600000)
                }
              />
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Eye className="h-4 w-4" />
          <span>{auction.watchCount || 0}</span>
        </div>
        {auction.isLive ? (
          <Button
            className="rounded-full font-light"
            onClick={() => router.push(`/auction/${auction.id}`)}
          >
            View Details
          </Button>
        ) : (
          <Button
            className="rounded-full font-light"
            variant="outline"
            disabled={!auction.isLive}
          >
            Coming Soon
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
