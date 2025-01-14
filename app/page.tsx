import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db/database";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { users, bids, items } from "@/db/schema";
import { SignOutButton } from "@clerk/nextjs";

export default async function Home() {
  const clerkUser = await currentUser();
  console.log(clerkUser?.id);

  if (!clerkUser) {
    return <div>Loading...</div>;
  }

  const bidsData = await db.query.bids.findMany();
  console.log("bidsData", bidsData);

  const data = await db.select().from(users);
  console.log(data);

  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkUser.id));
  console.log("dbuser", dbUser);

  // const itemsData = await db.query.items.findMany();
  const itemsData = (await db.select().from(items)).filter(
    (item) => item.sellerId === dbUser[0].id
  );

  console.log("itemsData", itemsData);

  return (
    <main className="flex items-center justify-center h-screen gap-y-4">
      <div className="max-w-[250px] gap-y-4">
        home page
        <form
          action={async (formData: FormData) => {
            "use server";
            const bid = formData.get("bid");
            console.log(bid);
            await db.insert(bids).values({});
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
        <div className="flex flex-col gap-y-4 bg-blue-300">
          <form
            action={async (formData: FormData) => {
              "use server";
              const name = formData.get("name");
              const description = formData.get("description");
              const startingPrice = formData.get("startingPrice");

              if (!name || !startingPrice || !dbUser) {
                console.error("Missing required fields");
                return;
              }

              const startingPriceValue = parseInt(startingPrice.toString(), 10);
              if (isNaN(startingPriceValue)) {
                console.error("Invalid starting price");
                return;
              }

              await db.insert(items).values({
                name: name.toString(),
                description: description?.toString() || "",
                startingPrice: startingPriceValue,
                currentPrice: startingPriceValue,
                sellerId: dbUser[0].id,
                isLive: false,
                isSold: false,
              });
              revalidatePath("/");
            }}
          >
            <Input
              name="name"
              type="text"
              placeholder="Item Name"
              className="text-black"
            />
            <Input
              name="description"
              type="text"
              placeholder="Description"
              className="text-black"
            />
            <Input
              name="startingPrice"
              type="number"
              placeholder="Starting Price"
              className="text-black"
            />
            <Button type="submit">Add Item</Button>
          </form>
        </div>
        <div>
          {bidsData.map((bid) => (
            <div key={bid.id}>{bid.id}</div>
          ))}
        </div>
        <div>
          {itemsData.map((item) => (
            <div key={item.id}>
              <div>{item.name}</div>
              <div>{item.description}</div>
              <div>{item.startingPrice}</div>
              <div>{item.currentPrice}</div>
              <div>{item.isSold}</div>
              {/* <div>{item.createdAt}</div> */}
              {/* <div>{item.updatedAt}</div> */}
              <div>{item.sellerId}</div>
              <div>{item.buyerId}</div>
              <div>{item.isLive}</div>
            </div>
          ))}
        </div>
        <h1>Welcome {clerkUser?.firstName}</h1>
        <SignOutButton />
      </div>
    </main>
  );
}
