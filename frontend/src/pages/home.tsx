import Nav from "@/components/nav";
import { AuctionItems } from "@/components/auction-items";
const Home = () => {
  return (
    <main className="mx-auto p-18 bg-light flex flex-col gap-8">
      <Nav />
      <AuctionItems />
    </main>
  );
};

export default Home;
