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

const AuctionPage = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{mockAuctionItem.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>Category: {mockAuctionItem.category.name}</span>
          <span>•</span>
          <span>Status: {mockAuctionItem.status}</span>
          <span>•</span>
          <span>Views: {mockAuctionItem.views}</span>
          <span>•</span>
          <span>Watchers: {mockAuctionItem.watchers}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={mockAuctionItem.imageUrls[0]}
              alt={mockAuctionItem.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {mockAuctionItem.imageUrls.map((url, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={url}
                  alt={`${mockAuctionItem.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Details and Bidding */}
        <div className="space-y-6">
          {/* Price Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                ${mockAuctionItem.currentPrice.toFixed(2)}
              </span>
              <span className="text-gray-500">Current Bid</span>
            </div>
            <div className="text-gray-500 mt-1">
              Starting Price: ${mockAuctionItem.startingPrice.toFixed(2)}
            </div>
            <div className="mt-4">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Place Bid
              </button>
            </div>
          </div>

          {/* Auction Timer */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Auction Ends In</h3>
            <div className="text-2xl font-bold">
              {Math.floor(
                (mockAuctionItem.endsAt.getTime() - Date.now()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              days
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{mockAuctionItem.description}</p>
          </div>

          {/* Item Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Item Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(mockAuctionItem.itemDetails).map(
                ([key, value]) => (
                  <div key={key}>
                    <span className="text-gray-500 capitalize">{key}:</span>
                    <span className="ml-2">{value}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Bidding History */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Bidding History</h3>
            <div className="space-y-4">
              {mockAuctionItem.bids.map((bid) => (
                <div key={bid.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{bid.bidder.name}</span>
                    <span className="text-gray-500 ml-2">
                      (Rating: {bid.bidder.rating})
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${bid.amount.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(bid.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Shipping Information</h3>
            <div className="space-y-2">
              <div>
                <span className="text-gray-500">Cost:</span>
                <span className="ml-2">
                  ${mockAuctionItem.shipping.cost.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Estimated Delivery:</span>
                <span className="ml-2">
                  {mockAuctionItem.shipping.estimatedDelivery}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Location:</span>
                <span className="ml-2">
                  {mockAuctionItem.shipping.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuctionPage;
