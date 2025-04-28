import { formatTimeLeft, formatPrice } from "@/utils/helpers";
import { Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type AuctionItem } from "@/types/auction";
import { Link } from "react-router";

const AuctionItem = ({ item }: { item: AuctionItem }) => {
  return (
    <div
      key={item.id}
      className="group bg-white rounded-lg overflow-hidden transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.imageURL || "/placeholder.svg"}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="h-4 w-4 text-gray-700" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-white" />
            <span className="text-xs font-medium text-white">
              {formatTimeLeft(item.endsAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-base text-gray-900 leading-tight">
            {item.title}
          </h3>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <div className="text-xl font-medium text-gray-900">
              {formatPrice(item.currentPrice)}
            </div>
            <div className="text-xs text-gray-500 mt-1">{item.bids} bids</div>
          </div>

          <Link to={`/auction/${item.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="text-xs rounded-lg border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionItem;
