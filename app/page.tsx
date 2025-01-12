import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { bids as bidsSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const bids = await database.query.bids.findMany();
  return (
    <main className="flex items-center justify-center h-screen gap-y-4">
      <div className="max-w-[250px] gap-y-4">
        home page
        <form
          action={async (formData: FormData) => {
            "use server";
            const bid = formData.get("bid");
            console.log(bid);
            await database.insert(bidsSchema).values({});
            revalidatePath("/");
          }}
        >
          <Input
            name="bid"
            type="number"
            placeholder="Bid"
            className="text-black"
          />
          <Button type="submit">Place bid</Button>
        </form>
        <div>
          {bids.map((bid) => (
            <div key={bid.id}>{bid.id}</div>
          ))}
        </div>
      </div>
    </main>
  );
}
