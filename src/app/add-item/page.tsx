/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
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
import { prisma } from "@/lib/prisma";

export default function AddItemPage() {
  // const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("2");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    if (!date) {
      toast.error("Please select a start date.");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    const form = e.target as HTMLFormElement;

    formData.append("title", form.title);
    formData.append("description", form.description.value);
    formData.append("date", date.toISOString());
    formData.append("startingPrice", form.startingPrice.value);
    formData.append("duration", duration);

    const response = await fetch("/api/add-auction-item", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      toast.success("Item added successfully!");
    } else {
      const error = await response.json();
      toast.error(error.error || "Failed to add item");
    }

    setUploading(false);
  };

  return (
    <div className="container max-w-2xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-thin">Add Item for Auction</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to list your item for auction.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="title">Item Name</Label>
            <Input
              id="title"
              placeholder="e.g. 1909 VDB Lincoln Cent"
              className="bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the coin's condition, history, and any notable features..."
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
            {/* <div className="space-y-2">
              <Label htmlFor="time">Start Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-white"
                required
              />
            </div> */}
          </div>

          {/* <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="obsPhoto">Obverse Photo</Label>
              <Input
                id="obsPhoto"
                type="file"
                accept="image/*"
                className="bg-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revPhoto">Reverse Photo</Label>
              <Input
                id="revPhoto"
                type="file"
                accept="image/*"
                className="bg-white"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="obsRemarkPhoto">
                Obverse Remark Photo (Optional)
              </Label>
              <Input
                id="obsRemarkPhoto"
                type="file"
                accept="image/*"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revRemarkPhoto">
                Reverse Remark Photo (Optional)
              </Label>
              <Input
                id="revRemarkPhoto"
                type="file"
                accept="image/*"
                className="bg-white"
              />
            </div>
          </div> */}

          <Button
            type="submit"
            className="w-full rounded-full font-thin"
            disabled={uploading}
          >
            {uploading ? "Adding Item..." : "Add Item"}
          </Button>
        </form>
      </div>
    </div>
  );
}
