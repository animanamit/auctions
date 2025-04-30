"use client";

import { useState } from "react";
import { Clock, Heart, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTimeLeft, formatPrice } from "@/utils/helpers";
import { mockAuctionItems } from "@/mock-data";

const AuctionPage = () => {
  const [isWatching, setIsWatching] = useState(false);

  // Using the first item from mock data for now
  const auctionItem = mockAuctionItems[0];

  const toggleWatch = () => {
    setIsWatching(!isWatching);
  };

  return (
    <main className="mx-auto px-6 py-12">
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
            {auctionItem.title}
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
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <span className="font-medium text-gray-700">
              {auctionItem.status}
            </span>
          </div>
          <div className="h-1 w-1 rounded-full bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{auctionItem.bids} bids</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Ends in {formatTimeLeft(auctionItem.endsAt)}</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column - Image */}
        <div className="lg:col-span-3">
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
            <img
              src={auctionItem.imageURL}
              alt={auctionItem.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Column - Details and Bidding */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price and Bid Section */}
          <div className="bg-white p-6 rounded-lg">
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">Current Price</div>
              <div className="text-3xl font-medium text-gray-900">
                {formatPrice(auctionItem.currentPrice)}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">Time Remaining</div>
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5 text-gray-700" />
                <span className="text-xl font-medium">
                  {formatTimeLeft(auctionItem.endsAt, true)}
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
        </div>
      </div>
    </main>
  );
};

export default AuctionPage;
