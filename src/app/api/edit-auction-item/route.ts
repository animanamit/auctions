import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const updatedAuctionItem = await prisma.auction.update({
      where: { id: Number.parseInt(params.id) },
      data: {
        title: title.toString(),
        description: description.toString(),
        startingPrice: Number.parseFloat(startingPrice.toString()),
        startDate: auctionStart,
        endDate: auctionEnd,
        // Note: We're not updating currentPrice, isSold, isLive, watchCount, or bidCount here
      },
    });

    console.log("Auction item updated:", updatedAuctionItem);
    return NextResponse.json(updatedAuctionItem, { status: 200 });
  } catch (error) {
    console.error("Error updating auction item:", error);
    return NextResponse.json({
      error: "Error updating auction item",
      status: 500,
    });
  }
}
