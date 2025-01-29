"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Edit2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AuctionItem } from "@/types/auction";

interface MyItemCardProps {
  item: AuctionItem;
  onEditClick?: () => void;
}

export function MyItemCard({ item, onEditClick }: MyItemCardProps) {
  const router = useRouter();
  const startTime = item.scheduledStartTime
    ? new Date(item.scheduledStartTime)
    : null;
  const isUpcoming = startTime && startTime > new Date();

  return (
    <Card className="overflow-hidden bg-white">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={item.photos.obsPhoto || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover"
          />
          <div className="absolute right-2 top-2 flex gap-2">
            {!item.isLive && !isUpcoming && (
              <Badge variant="secondary" className="bg-gray-100 font-medium">
                Draft
              </Badge>
            )}
            {isUpcoming && (
              <Badge
                variant="secondary"
                className="bg-secondary text-secondary-foreground font-medium"
              >
                Scheduled
              </Badge>
            )}
            {item.isLive && (
              <Badge
                variant="secondary"
                className="bg-green-50 text-green-600 font-medium"
              >
                Live
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-4">
        <h3 className="font-thin text-lg">{item.name}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Starting Price</span>
          <span className="font-medium text-foreground">
            ${item.startingPrice.toLocaleString()}
          </span>
        </div>
        {isUpcoming && startTime && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              Goes live on {startTime.toLocaleDateString()} at{" "}
              {startTime.toLocaleTimeString()}
            </span>
          </div>
        )}
        {item.isLive && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Current Bid</span>
            <span className="font-medium text-foreground">
              ${(item.currentPrice || item.startingPrice).toLocaleString()}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        {item.isLive ? (
          <Button
            className="col-span-2 rounded-full font-thin"
            onClick={() => router.push(`/auction/${item.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Auction
          </Button>
        ) : (
          <Button
            className="col-span-2 rounded-full font-thin"
            variant="outline"
            onClick={onEditClick}
            disabled={item.isLive}
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
