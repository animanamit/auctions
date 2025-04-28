import AuctionItem from "@/components/auction-item";
import { mockAuctionItems } from "@/mock-data";

export const AuctionItems = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {mockAuctionItems.map((item) => (
        <AuctionItem key={item.id} item={item} />
      ))}
    </div>
  );
};
