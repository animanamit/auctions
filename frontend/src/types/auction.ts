export type AuctionStatus = "live" | "upcoming" | "ended";

export interface AuctionItem {
  id: string;
  title: string;
  currentPrice: number;
  bids: number;
  endsAt: Date;
  imageURL?: string;
  status: AuctionStatus;
}
