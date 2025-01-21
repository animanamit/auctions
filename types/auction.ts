export interface AuctionItem {
  id: number;
  name: string;
  description?: string;
  startingPrice: number;
  currentPrice?: number;
  isSold: boolean;
  createdAt: Date;
  updatedAt: Date;
  sellerId: number;
  buyerId?: number;
  isLive: boolean;
  scheduledStartTime?: Date;
  watchCount: number;
  bidCount: number;
  duration: number; // in hours
  photos: {
    obsPhoto: string;
    revPhoto: string;
    obsRemarkPhoto?: string;
    revRemarkPhoto?: string;
  };
}

export interface Bid {
  id: number;
  auctionId: number;
  bidderId: number;
  bidderName: string;
  amount: number;
  timestamp: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  budget: number;
  itemsForSale: AuctionItem[];
}
