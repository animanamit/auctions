"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuctionCard } from "@/components/auction-card";
import { useBudgetStore } from "@/lib/stores/budget-store";
import type { AuctionItem } from "@/types/auction";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const loggedInUserId = 1; // Replace with actual authentication logic

async function getAllAuctionItems() {
  const response = await fetch("/api/get-all-auctions");
  if (!response.ok) throw new Error("Failed to fetch all auctions");
  return response.json();
}

async function fetchWatchedAuctions() {
  const response = await fetch("/api/get-watched-auction-items");
  if (!response.ok) throw new Error("Failed to fetch watched auctions");
  return response.json();
}

async function fetchAll() {
  const watchedAuctions = await fetchWatchedAuctions();
  const allAuctionItems = await getAllAuctionItems();

  const watchedAuctionIds = watchedAuctions.map(
    (auction: AuctionItem) => auction.id
  );
  return {
    allAuctionItems,
    watchedAuctions,
    watchedAuctionIds,
  };
}

export default function Dashboard() {
  const router = useRouter();
  const { budget } = useBudgetStore();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchAll"],
    queryFn: fetchAll,
  });

  const watchMutation = useMutation({
    mutationFn: async (auctionId: number) => {
      const response = await fetch("/api/watch-auction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auctionId }),
      });
      if (!response.ok) throw new Error("Failed to watch auction");
      toast.success("Auction added to watchlist");
      return response.json();
    },
    onMutate: async (auctionId) => {
      await queryClient.cancelQueries({ queryKey: ["fetchAll"] });
      const previousData = queryClient.getQueryData<typeof data>(["fetchAll"]);
      queryClient.setQueryData<typeof data>(["fetchAll"], (old) => {
        if (!old) return old;
        return {
          ...old,
          watchedAuctionIds: [...old.watchedAuctionIds, auctionId],
          watchedAuctions: [
            ...old.watchedAuctions,
            old.allAuctionItems.find((a) => a.id === auctionId),
          ],
        };
      });
      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<typeof data>(
          ["fetchAll"],
          context.previousData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchAll"] });
    },
  });

  const unwatchMutation = useMutation({
    mutationFn: async (auctionId: number) => {
      const response = await fetch("/api/unwatch-auction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auctionId }),
      });
      if (!response.ok) throw new Error("Failed to unwatch auction");
      toast.success("Auction removed from watchlist");
      return response.json();
    },
    onMutate: async (auctionId) => {
      await queryClient.cancelQueries({ queryKey: ["fetchAll"] });
      const previousData = queryClient.getQueryData<typeof data>(["fetchAll"]);
      queryClient.setQueryData<typeof data>(["fetchAll"], (old) => {
        if (!old) return old;
        return {
          ...old,
          watchedAuctionIds: old.watchedAuctionIds.filter(
            (id) => id !== auctionId
          ),
          watchedAuctions: old.watchedAuctions.filter(
            (a) => a.id !== auctionId
          ),
        };
      });
      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<typeof data>(
          ["fetchAll"],
          context.previousData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchAll"] });
    },
  });

  const handleWatchToggle = async (auctionId: number) => {
    if (data?.watchedAuctionIds.includes(auctionId)) {
      await unwatchMutation.mutateAsync(auctionId);
    } else {
      await watchMutation.mutateAsync(auctionId);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-thin text-gray-900">Welcome Animan</h1>
        <p className="mt-2 text-base font-thin text-gray-500">
          Track your auctions and manage your bids
        </p>
      </div>

      {/* Budget Display */}
      <Card className="mb-8 bg-black/5">
        <CardHeader>
          <CardTitle className="text-lg font-thin text-gray-900">
            Available Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-thin text-gray-900">
            ${budget.toLocaleString()}
          </p>
          <p className="mt-2 text-sm font-thin text-gray-500">
            This budget will automatically update as you place and cancel bids
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Auctions</TabsTrigger>
          <TabsTrigger value="watching">Watching</TabsTrigger>
          <TabsTrigger value="mybids">My Bids</TabsTrigger>
          <TabsTrigger value="myitems">My Items</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.allAuctionItems?.map((auction: AuctionItem) => (
              <AuctionCard
                key={auction.id}
                auction={auction}
                isWatching={data.watchedAuctionIds.includes(auction.id)}
                onWatchToggle={handleWatchToggle}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="watching" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.watchedAuctions.map((auction: AuctionItem) => (
              <AuctionCard
                key={auction.id}
                auction={auction}
                isWatching={true}
                onWatchToggle={handleWatchToggle}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mybids" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Add My Bids content here */}
          </div>
        </TabsContent>

        <TabsContent value="myitems" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Add My Items content here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
