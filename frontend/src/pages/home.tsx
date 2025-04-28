import { useState } from "react";
import { Clock, Search, ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const formatTimeLeft = (endsAt: Date) => {
  const now = new Date();
  const timeLeft = endsAt.getTime() - now.getTime();
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  if (days <= 0) return "Ending today";
  if (days === 1) return "1 day left";
  return `${days} days left`;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");

  const mockAuctionItems = [
    {
      id: "auction-1",
      title: "1921 Morgan Silver Dollar",
      description: "Pristine condition MS-65 graded Morgan Dollar",
      imageUrl:
        "https://pxqmxxjuewlpptvibnhg.supabase.co/storage/v1/object/public/coins/coins/obs-e49fb3ad-96be-46d1-a3e7-b9590a954225",
      currentPrice: 1500.0,
      startingPrice: 1000.0,
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days
      category: "Coins & Currency",
      bids: 12,
    },
    {
      id: "auction-2",
      title: "Vintage Rolex Submariner",
      description: "1965 Rolex Submariner, all original parts",
      imageUrl:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      currentPrice: 25000.0,
      startingPrice: 20000.0,
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 day
      category: "Watches",
      bids: 8,
    },
    {
      id: "auction-3",
      title: "Picasso Lithograph",
      description: "Original signed lithograph from 1950s",
      imageUrl:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      currentPrice: 50000.0,
      startingPrice: 45000.0,
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
      category: "Art",
      bids: 5,
    },
    {
      id: "auction-4",
      title: "First Edition Harry Potter",
      description:
        "First edition, first printing of Harry Potter and the Philosopher's Stone",
      imageUrl:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      currentPrice: 15000.0,
      startingPrice: 12000.0,
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), // 4 days
      category: "Books",
      bids: 15,
    },
    {
      id: "auction-5",
      title: "Vintage Gibson Les Paul",
      description: "1959 Gibson Les Paul Standard in Sunburst",
      imageUrl:
        "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      currentPrice: 200000.0,
      startingPrice: 180000.0,
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days
      category: "Musical Instruments",
      bids: 3,
    },
    {
      id: "auction-6",
      title: "Antique Persian Rug",
      description: "19th century hand-woven Persian rug, excellent condition",
      imageUrl:
        "https://images.unsplash.com/photo-1600166898405-da9535204843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      currentPrice: 8000.0,
      startingPrice: 6000.0,
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days
      category: "Antiques",
      bids: 7,
    },
    {
      id: "auction-7",
      title: "Rare Pokemon Card Collection",
      description:
        "Complete set of first edition Pokemon cards, including Charizard",
      imageUrl:
        "https://images.unsplash.com/photo-1613771404784-3a8c2c0c0f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      currentPrice: 30000.0,
      startingPrice: 25000.0,
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 day
      category: "Collectibles",
      bids: 20,
    },
  ];

  const filteredItems = mockAuctionItems.filter(
    (item) =>
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-12 bg-[#f9f9f7]">
      {/* Header Section */}
      <div className="mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight text-gray-900">
          Discover rare treasures
        </h1>
        <p className="text-lg text-gray-600 font-light">
          Explore our curated collection of unique items from around the world.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-12 flex flex-col md:flex-row gap-4 items-start">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search auctions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-0 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <select
              className="appearance-none w-full pl-4 pr-10 py-3 border-0 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="ending-soon">Ending Soon</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Showing {filteredItems.length} items
        </p>
      </div>

      {/* Auction Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

              <div className="text-xs text-gray-500 mb-4">{item.category}</div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xl font-medium text-gray-900">
                    {formatPrice(item.currentPrice)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.bids} bids
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-lg border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
