// app/api/add-auction-item/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const date = formData.get("date");

  if (!title || !description || !date) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const auctionEnd = new Date(
    new Date(date.toString()).getTime() + 2 * 60 * 60 * 1000
  );

  try {
    const newAuctionItem = await prisma.auction.create({
      data: {
        title: title.toString(),
        description: description.toString(),
        startingPrice: 1000,
        currentPrice: 1000,
        isSold: false,
        sellerId: 1,
        startDate: new Date(),
        endDate: auctionEnd,
        isLive: false,
        watchCount: 0,
        bidCount: 0,
      },
    });

    return NextResponse.json(newAuctionItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating auction item" },
      { status: 500 }
    );
  }
}
