"use client";

import { useState } from "react";
import {
  Clock,
  Heart,
  ArrowLeft,
  Share2,
  Eye,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTimeLeft, formatPrice } from "@/utils/helpers";
import { formatDate } from "date-fns";

const AuctionPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWatching, setIsWatching] = useState(false);

  const mockAuctionItem = {
    id: "auction-123",
    title: "Rare 1921 Morgan Silver Dollar",
    description:
      "A pristine condition 1921 Morgan Silver Dollar, graded MS-65 by PCGS. This coin features the iconic Lady Liberty design and is one of the last Morgan dollars minted. Comes with original certification and protective case.",
    imageUrls: [
      "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/obs-e49fb3ad-96be-46d1-a3e7-b9590a954225",
      "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/obs-e49fb3ad-96be-46d1-a3e7-b9590a954225-back",
      "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/obs-e49fb3ad-96be-46d1-a3e7-b9590a954225-cert",
    ],
    startingPrice: 1000.0,
    currentPrice: 1500.0,
    category: {
      id: "category-1",
      name: "Coins & Currency",
    },
    categoryId: "category-1",
    status: "ACTIVE",
    startsAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // Started 1 day ago
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // Ends in 2 days
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // Created 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30), // Updated 30 minutes ago
    bids: [
      {
        id: "bid-1",
        amount: 1000.0,
        bidder: {
          id: "bidder-789",
          name: "JohnDoe",
          rating: 4.9,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: "bid-2",
        amount: 1200.0,
        bidder: {
          id: "bidder-101",
          name: "CoinEnthusiast",
          rating: 4.7,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: "bid-3",
        amount: 1500.0,
        bidder: {
          id: "bidder-202",
          name: "SilverCollector",
          rating: 5.0,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      },
    ],
    itemDetails: {
      year: 1921,
      mint: "Philadelphia",
      condition: "MS-65",
      certification: "PCGS",
      metal: "Silver",
      weight: "26.73g",
      diameter: "38.1mm",
    },
    shipping: {
      cost: 15.0,
      estimatedDelivery: "3-5 business days",
      location: "New York, NY",
    },
    views: 245,
    watchers: 12,
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === mockAuctionItem.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? mockAuctionItem.imageUrls.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleWatch = () => {
    setIsWatching(!isWatching);
  };

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-12 bg-[#f9f9f7]">
      {/* Back Button */}
      <div className="mb-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 pl-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to auctions</span>
        </Button>
      </div>

      {/* Header Section */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900">
            {mockAuctionItem.title}
          </h1>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-xs rounded-lg border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              onClick={toggleWatch}
            >
              {isWatching ? (
                <>
                  <Heart className="h-4 w-4 mr-2 fill-rose-500 text-rose-500" />
                  Watching
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  Watch
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-xs rounded-lg border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <span className="font-medium text-gray-700">
              {mockAuctionItem.category.name}
            </span>
          </div>
          <div className="h-1 w-1 rounded-full bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span>{mockAuctionItem.views} views</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{mockAuctionItem.watchers} watchers</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Ends in {formatTimeLeft(mockAuctionItem.endsAt)}</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
            <img
              src={
                mockAuctionItem.imageUrls[currentImageIndex] ||
                "/placeholder.svg"
              }
              alt={`${mockAuctionItem.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />

            {mockAuctionItem.imageUrls.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </>
            )}
          </div>

          {mockAuctionItem.imageUrls.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {mockAuctionItem.imageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`relative min-w-[80px] aspect-square rounded-md overflow-hidden ${
                    currentImageIndex === index
                      ? "ring-2 ring-gray-900"
                      : "ring-1 ring-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`${mockAuctionItem.title} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="bg-white p-6 rounded-lg mt-8">
            <h3 className="text-lg font-medium mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {mockAuctionItem.description}
            </p>
          </div>

          {/* Item Details */}
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Item Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
              {Object.entries(mockAuctionItem.itemDetails).map(
                ([key, value]) => (
                  <div key={key}>
                    <div className="text-sm text-gray-500 capitalize mb-1">
                      {key}
                    </div>
                    <div className="font-medium">{value}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Details and Bidding */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price and Bid Section */}
          <div className="bg-white p-6 rounded-lg">
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">Current Bid</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-medium text-gray-900">
                  {formatPrice(mockAuctionItem.currentPrice)}
                </span>
                <span className="text-sm text-gray-500">
                  started at {formatPrice(mockAuctionItem.startingPrice)}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">Time Remaining</div>
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5 text-gray-700" />
                <span className="text-xl font-medium">
                  {formatTimeLeft(mockAuctionItem.endsAt)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-lg text-base">
                Place Bid
              </Button>

              <div className="text-xs text-center text-gray-500">
                By placing a bid, you agree to our terms of service
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping Cost</span>
                <span className="font-medium">
                  {formatPrice(mockAuctionItem.shipping.cost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Delivery</span>
                <span className="font-medium">
                  {mockAuctionItem.shipping.estimatedDelivery}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ships From</span>
                <span className="font-medium">
                  {mockAuctionItem.shipping.location}
                </span>
              </div>
            </div>
          </div>

          {/* Bidding History */}
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Bid History</h3>

            {mockAuctionItem.bids.length > 0 ? (
              <div className="space-y-4">
                {mockAuctionItem.bids.map((bid, index) => (
                  <div
                    key={bid.id}
                    className={`p-3 rounded-lg ${
                      index === 0 ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium">{bid.bidder.name}</div>
                      <div className="font-medium">
                        {formatPrice(bid.amount)}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-gray-500">
                        <span className="flex items-center">
                          Rating: {bid.bidder.rating}
                        </span>
                      </div>
                      <div className="text-gray-500">
                        {formatDate(bid.timestamp, "MMM d, yyyy h:mm a")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No bids yet. Be the first to bid!
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuctionPage;
