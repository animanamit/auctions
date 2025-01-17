"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuctionCard } from "@/components/auction-card";
import { MyItemCard } from "@/components/my-item-card";
import { BidDialog } from "@/components/bid-dialog";
import { useBudgetStore } from "@/lib/stores/budget-store";
import type { AuctionItem } from "@/types/auction";

// Sample data
const auctions: AuctionItem[] = [
  {
    id: 1,
    name: "1909 VDB Lincoln Cent",
    description: "Rare first-year Lincoln Cent",
    startingPrice: 1000,
    currentPrice: 1250,
    isSold: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: 1,
    isLive: true,
    scheduledStartTime: new Date(Date.now() - 3600000), // 1 hour ago
    duration: 24,
    photos: {
      obsPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/obs-df2fa651-33ae-430b-a11f-900ad465b13e",
      revPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/rev-df2fa651-33ae-430b-a11f-900ad465b13e",
    },
    watchCount: 45,
    bidCount: 12,
  },
  {
    id: 2,
    name: "1955 Double Die Lincoln Cent",
    description: "Famous error coin",
    startingPrice: 800,
    currentPrice: 980,
    isSold: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: 2,
    isLive: true,
    scheduledStartTime: new Date(Date.now() - 7200000), // 2 hours ago
    duration: 48,
    photos: {
      obsPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/obs-df2fa651-33ae-430b-a11f-900ad465b13e",
      revPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/rev-df2fa651-33ae-430b-a11f-900ad465b13e",
    },
    watchCount: 32,
    bidCount: 8,
  },
  {
    id: 3,
    name: "1804 Draped Bust Silver Dollar",
    description: "One of the rarest U.S. coins",
    startingPrice: 1200,
    currentPrice: 1500,
    isSold: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: 3,
    isLive: false,
    scheduledStartTime: new Date(Date.now() + 3600000), // 1 hour from now
    duration: 72,
    photos: {
      obsPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/obs-df2fa651-33ae-430b-a11f-900ad465b13e",
      revPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/rev-df2fa651-33ae-430b-a11f-900ad465b13e",
    },
    watchCount: 67,
    bidCount: 0,
  },
];

const myItems: AuctionItem[] = [
  {
    id: 4,
    name: "1933 Double Eagle",
    description: "Extremely rare gold coin",
    startingPrice: 5000,
    currentPrice: 0,
    isSold: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: 1, // Assuming this is the current user's ID
    isLive: false,
    scheduledStartTime: new Date(Date.now() + 86400000), // 24 hours from now
    duration: 168, // 7 days
    photos: {
      obsPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/obs-df2fa651-33ae-430b-a11f-900ad465b13e",
      revPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/rev-df2fa651-33ae-430b-a11f-900ad465b13e",
    },
    watchCount: 0,
    bidCount: 0,
  },
];

export default function Dashboard() {
  // const router = useRouter();
  const [selectedAuction, setSelectedAuction] = useState<AuctionItem | null>(
    null
  );
  const { budget } = useBudgetStore();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900">Welcome Animan</h1>
        <p className="mt-2 text-base font-light text-gray-500">
          Track your auctions and manage your bids
        </p>
      </div>

      {/* Budget Display */}
      <Card className="mb-8 bg-black/5">
        <CardHeader>
          <CardTitle className="text-lg font-light text-gray-900">
            Available Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-light text-gray-900">
            ${budget.toLocaleString()}
          </p>
          <p className="mt-2 text-sm font-light text-gray-500">
            This budget will automatically update as you place and cancel bids
          </p>
        </CardContent>
      </Card>

      {/* Auction Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Auctions</TabsTrigger>
          <TabsTrigger value="watching">Watching</TabsTrigger>
          <TabsTrigger value="mybids">My Bids</TabsTrigger>
          <TabsTrigger value="myitems">My Items</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {auctions.map((auction) => (
              <AuctionCard
                key={auction.id}
                auction={auction}
                onBidClick={() => setSelectedAuction(auction)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="watching" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {auctions.slice(0, 2).map((auction) => (
              <AuctionCard
                key={auction.id}
                auction={auction}
                onBidClick={() => setSelectedAuction(auction)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mybids" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {auctions.slice(1, 3).map((auction) => (
              <AuctionCard
                key={auction.id}
                auction={auction}
                onBidClick={() => setSelectedAuction(auction)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="myitems" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myItems.map((item) => (
              <MyItemCard
                key={item.id}
                item={item}
                // onEditClick={() => router.push(`/edit-item/${item.id}`)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedAuction && (
        <BidDialog
          open={!!selectedAuction}
          onOpenChange={(open) => !open && setSelectedAuction(null)}
          auctionTitle={selectedAuction.name}
          currentBid={
            selectedAuction.currentPrice || selectedAuction.startingPrice
          }
        />
      )}
    </div>
  );
}
