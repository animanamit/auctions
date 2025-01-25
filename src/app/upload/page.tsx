"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Coin uploaded successfully!");
    setUploading(false);
  };

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-thin">
            Upload Coin for Auction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Coin Title</Label>
              <Input
                id="title"
                placeholder="e.g. 1909 VDB Lincoln Cent"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the coin's condition, history, and any notable features..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startingBid">Starting Bid ($)</Label>
                <Input
                  id="startingBid"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Auction Duration (hours)</Label>
                <Input id="duration" type="number" min="1" max="168" required />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="obsPhoto">Obverse Photo</Label>
                <Input id="obsPhoto" type="file" accept="image/*" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="revPhoto">Reverse Photo</Label>
                <Input id="revPhoto" type="file" accept="image/*" required />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="obsRemarkPhoto">
                  Obverse Remark Photo (Optional)
                </Label>
                <Input id="obsRemarkPhoto" type="file" accept="image/*" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="revRemarkPhoto">
                  Reverse Remark Photo (Optional)
                </Label>
                <Input id="revRemarkPhoto" type="file" accept="image/*" />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Coin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
