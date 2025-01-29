import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auctionItems = await prisma.auction.findMany();
    console.log(auctionItems);
    return NextResponse.json(auctionItems);
  } catch (error) {
    console.error("Error fetching auction item:", error);
    return NextResponse.json(
      { error: "Error fetching auction item" },
      { status: 500 }
    );
  }
}
