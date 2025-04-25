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

const Home = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Featured Auctions</h1>
        <p className="text-gray-600">Discover unique items up for auction</p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search auctions..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Categories</option>
          <option value="coins">Coins & Currency</option>
          <option value="watches">Watches</option>
          <option value="art">Art</option>
          <option value="books">Books</option>
          <option value="instruments">Musical Instruments</option>
          <option value="antiques">Antiques</option>
          <option value="collectibles">Collectibles</option>
        </select>
      </div>

      {/* Auction Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockAuctionItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="aspect-square rounded-t-lg overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <span className="text-sm text-gray-500">{item.category}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">
                    ${item.currentPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">{item.bids} bids</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    Ends in{" "}
                    {Math.floor(
                      (item.endsAt.getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </div>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
