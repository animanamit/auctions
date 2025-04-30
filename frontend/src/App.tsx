import { AuctionItems } from "./components/auction-items";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Featured Auctions</h1>
        <AuctionItems />
      </main>
    </div>
  );
}

export default App;
