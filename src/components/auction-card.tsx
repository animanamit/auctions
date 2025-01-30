"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Eye, Gavel } from "lucide-react";
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
import type { Prisma } from "@prisma/client";

type AuctionWithWatchers = Prisma.AuctionGetPayload<{
  include: { WatchedBy: true };
}>;

interface AuctionCardProps {
  auction: AuctionWithWatchers;
  isWatching: boolean;
  onWatchToggle: (auctionId: number) => void;
}

export function AuctionCard({
  auction,
  isWatching,
  onWatchToggle,
}: AuctionCardProps) {
  const router = useRouter();
  const startTime = new Date(auction.startDate);
  const endTime = new Date(auction.endDate);
  const isUpcoming = startTime > new Date();
  const isEnded = new Date() > endTime;

  return (
    <Card className="overflow-hidden bg-white">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={auction.photo1 || "/placeholder.svg"}
            alt={auction.title}
            fill
            className="object-cover"
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onWatchToggle(auction.id)}
            className="absolute right-2 top-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          >
            <Eye className={`h-4 w-4 ${isWatching ? "text-pink-500" : ""}`} />
          </Button>
          {isUpcoming && (
            <Badge
              variant="secondary"
              className="absolute left-2 top-2 bg-secondary text-secondary-foreground font-medium"
            >
              Upcoming
            </Badge>
          )}
          {isEnded && (
            <Badge
              variant="destructive"
              className="absolute left-2 top-2 font-medium"
            >
              Auction Ended
            </Badge>
          )}
          {auction.isSold && (
            <Badge
              variant="destructive"
              className="absolute left-2 top-10 font-medium"
            >
              Sold
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-4">
        <h3 className="font-thin text-lg">{auction.title}</h3>

        {isUpcoming ? (
          <>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Starting Price</span>
              <span className="font-medium text-foreground">
                ${auction.startingPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                Starts {format(startTime, "dd/MM/yyyy")} at{" "}
                {format(startTime, "HH:mm")}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Current Bid</span>
              <span className="font-medium text-foreground">
                ${auction.currentPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gavel className="h-4 w-4" />
              <span>{auction.bidCount} bids</span>
            </div>
            <AuctionTimer endTime={endTime} />
          </>
        )}
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Eye className="h-4 w-4" />
          <span>{auction.watchCount}</span>
        </div>
        {auction.isLive && !isEnded ? (
          <Button
            className="rounded-full font-thin"
            onClick={() => router.push(`/auction/${auction.id}`)}
          >
            View Details
          </Button>
        ) : (
          <Button className="rounded-full font-thin" variant="outline" disabled>
            {isEnded ? "Auction Ended" : "Coming Soon"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
