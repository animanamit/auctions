import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const startingPrice = formData.get("startingPrice");
  const duration = formData.get("duration");
  const startDate = formData.get("startDate");

  if (!title || !description || !startingPrice || !duration || !startDate) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const auctionStart = new Date(startDate.toString());
  const auctionEnd = new Date(
    auctionStart.getTime() + Number.parseInt(duration.toString()) * 60 * 1000
  );

  try {
    const newAuctionItem = await prisma.auction.create({
      data: {
        title: title.toString(),
        description: description.toString(),
        startingPrice: Number.parseFloat(startingPrice.toString()),
        currentPrice: Number.parseFloat(startingPrice.toString()),
        isSold: false,
        sellerId: 1, // Hardcoded user ID for testing
        startDate: auctionStart,
        endDate: auctionEnd,
        isLive: false,
        watchCount: 0,
        bidCount: 0,
      },
    });

    console.log("New auction item created:", newAuctionItem);
    return NextResponse.json(newAuctionItem, { status: 201 });
  } catch (error) {
    console.error("Error creating auction item:", error);
    return NextResponse.json({
      error: "Error creating auction item",
      status: 500,
    });
  }
}
