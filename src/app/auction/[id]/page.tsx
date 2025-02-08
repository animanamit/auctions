/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BidForm } from "@/components/bid-dialog";
import { AuctionTimer } from "@/components/auction-timer";
import type { AuctionItem, Bid } from "@/types/auction";

const makeBid = async (bidValue: number) => {
  // Call API to make bid
  console.log(bidValue);
};

export default function AuctionPage() {
  const [isWatching, setIsWatching] = useState(false);
  const [showBidderNames, setShowBidderNames] = useState(false);

  // Sample auction data
  const auction: AuctionItem = {
    id: 1,
    name: "1909 VDB Lincoln Cent",
    description:
      "Extremely rare first-year Lincoln Cent with designer Victor David Brenner's initials on reverse. Excellent condition with minimal wear.",
    startingPrice: 1000,
    currentPrice: 1300,
    isSold: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: 1,
    isLive: true,
    duration: 24,
    watchCount: 45,
    bidCount: 12,
    photos: {
      obsPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/obs-df2fa651-33ae-430b-a11f-900ad465b13e",
      revPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/rev-df2fa651-33ae-430b-a11f-900ad465b13e",
      obsRemarkPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/obs-remark-df2fa651-33ae-430b-a11f-900ad465b13e",
      revRemarkPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/rev-remark-03ad72e8-895a-4880-904b-82e92e130731",
    },
  };

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="overflow-hidden bg-white p-0">
              <div className="relative aspect-square">
                <Image
                  src={auction.photos.obsPhoto || "/placeholder.svg"}
                  alt="Obverse"
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
            <Card className="overflow-hidden bg-white p-0">
              <div className="relative aspect-square">
                <Image
                  src={auction.photos.revPhoto || "/placeholder.svg"}
                  alt="Reverse"
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          </div>
          {(auction.photos.obsRemarkPhoto || auction.photos.revRemarkPhoto) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {auction.photos.obsRemarkPhoto && (
                <Card className="overflow-hidden bg-white p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={auction.photos.obsRemarkPhoto || "/placeholder.svg"}
                      alt="Obverse Remark"
                      fill
                      className="object-cover"
                    />
                  </div>
                </Card>
              )}
              {auction.photos.revRemarkPhoto && (
                <Card className="overflow-hidden bg-white p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={auction.photos.revRemarkPhoto || "/placeholder.svg"}
                      alt="Reverse Remark"
                      fill
                      className="object-cover"
                    />
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Auction Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-thin">{auction.name}</h1>
            <p className="mt-2 text-muted-foreground">{auction.description}</p>
          </div>

          <Card className="bg-white p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Current Bid</span>
                <span className="text-2xl font-thin">
                  ${auction.currentPrice?.toLocaleString()}
                </span>
              </div>

              <AuctionTimer
                endTime={new Date(Date.now() + auction.duration * 3600000)}
              />

              <div className="flex gap-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>45 watching</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsWatching(!isWatching)}
                >
                  <Eye
                    className={`h-4 w-4 ${isWatching ? "fill-current" : ""}`}
                  />
                </Button>
              </div>

              <BidForm
                auctionTitle={auction.name}
                currentBid={auction.currentPrice || auction.startingPrice}
              />
            </div>
          </Card>

          {/* Bid History */}
          <Card className="bg-white p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-thin">Bid History</h2>
                <Button
                  variant="ghost"
                  className="rounded-full text-sm font-thin"
                  onClick={() => setShowBidderNames(!showBidderNames)}
                >
                  {showBidderNames ? "Hide Names" : "Show Names"}
                </Button>
              </div>
              <div className="space-y-2">
                <p>No bids yet</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
