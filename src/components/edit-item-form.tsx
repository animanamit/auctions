"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface EditItemFormProps {
  itemId: string;
}

// This would typically come from an API call
const fetchItem = async (id: string) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: parseInt(id),
    name: "1933 Double Eagle",
    description: "Extremely rare gold coin",
    startingPrice: 5000,
    duration: 168, // 7 days
    scheduledStartTime: new Date(Date.now() + 86400000), // 24 hours from now
  };
};

export default function EditItemForm({ itemId }: EditItemFormProps) {
  const router = useRouter();
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
        const item = await fetchItem(itemId);
        setName(item.name);
        setDescription(item.description);
        setStartingPrice(item.startingPrice.toString());
        setDuration(item.duration.toString());
        setDate(item.scheduledStartTime);
        setTime(format(item.scheduledStartTime, "HH:mm"));
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch item:", error);
        toast.error("Failed to load item details");
        setIsLoading(false);
      }
    };

    loadItem();
  }, [itemId]);

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
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
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
