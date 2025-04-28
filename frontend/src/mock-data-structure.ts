//@ts-expect-error just for brainstorming purposes
import { AuctionItem } from "@/mock-data";

export const mockAuctionItemsStructure: AuctionItem[] = [
  {
    id: "1",
    title: "Vintage Rolex Submariner",
    currentPrice: 12500,
    bids: 12,
    endsAt: new Date("2024-05-15T18:00:00"),
    imageURL: "https://picsum.photos/200",
  },
  {
    id: "2",
    title: "Rare First Edition Book",
    currentPrice: 850,
    bids: 5,
    endsAt: new Date("2024-05-10T12:00:00"),
    imageURL: "https://picsum.photos/200",
  },
  {
    id: "3",
    title: "Antique Persian Rug",
    currentPrice: 3200,
    bids: 8,
    endsAt: new Date("2024-05-20T15:00:00"),
    imageURL: "https://picsum.photos/200",
  },
  {
    id: "4",
    title: "Signed Sports Memorabilia",
    currentPrice: 1500,
    bids: 3,
    endsAt: new Date("2024-05-12T20:00:00"),
    imageURL: "https://picsum.photos/200",
  },
];
