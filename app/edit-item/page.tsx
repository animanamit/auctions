"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { AuctionItem } from "@/types/auction";

// This would typically come from an API call
const fetchItem = async (id: string): Promise<AuctionItem> => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: parseInt(id),
    name: "1933 Double Eagle",
    description: "Extremely rare gold coin",
    startingPrice: 5000,
    watchCount: 0,
    bidCount: 0,
    currentPrice: 0,
    isSold: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: 1,
    isLive: false,
    scheduledStartTime: new Date(Date.now() + 86400000), // 24 hours from now
    duration: 168, // 7 days
    photos: {
      obsPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/obs-df2fa651-33ae-430b-a11f-900ad465b13e",
      revPhoto:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/rev-df2fa651-33ae-430b-a11f-900ad465b13e",
    },
  };
};

export default function EditItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [item, setItem] = useState<AuctionItem | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const fetchedItem = await fetchItem(params.id);
        setItem(fetchedItem);
        setName(fetchedItem.name);
        setDescription(fetchedItem.description || "");
        setStartingPrice(fetchedItem.startingPrice.toString());
        setDuration(fetchedItem.duration.toString());
        setDate(fetchedItem.scheduledStartTime);
        if (fetchedItem.scheduledStartTime) {
          setTime(format(fetchedItem.scheduledStartTime, "HH:mm"));
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch item:", error);
        toast.error("Failed to load item details");
        setIsLoading(false);
      }
    };

    loadItem();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to update item
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Item updated successfully!");
    router.push("/");
  };

  if (isLoading) {
    return <div className="container py-8 text-center">Loading...</div>;
  }

  if (!item) {
    return <div className="container py-8 text-center">Item not found</div>;
  }

  if (item.isLive) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-light mb-4">Cannot Edit Live Auction</h1>
        <p className="text-gray-600 mb-4">
          This item is currently live and cannot be edited.
        </p>
        <Button
          onClick={() => router.push("/")}
          className="rounded-full font-light"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-light">Edit Auction Item</h1>
          <p className="text-sm text-muted-foreground">
            Update the details of your auction item below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] bg-white"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startingPrice">Starting Price ($)</Label>
              <Input
                id="startingPrice"
                type="number"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                min="0"
                step="0.01"
                className="bg-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Auction Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
                max="168"
                className="bg-white"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start bg-white text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Start Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-white"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full font-light"
            disabled={isLoading}
          >
            {isLoading ? "Updating Item..." : "Update Item"}
          </Button>
        </form>
      </div>
    </div>
  );
}
