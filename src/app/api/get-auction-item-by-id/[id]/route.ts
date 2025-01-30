import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params.id);
    const auctionItem = await prisma.auction.findUnique({
      where: { id },
    });

    if (!auctionItem) {
      return NextResponse.json(
        { error: "Auction item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(auctionItem);
  } catch (error) {
    console.error("Error fetching auction item:", error);
    return NextResponse.json(
      { error: "Error fetching auction item" },
      { status: 500 }
    );
  }
}
