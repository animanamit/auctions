import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const loggedInUserId = 1; // Replace with actual session/user context

export async function GET() {
  try {
    const watchedAuctions = await prisma.watchedAuction.findMany({
      where: { userId: loggedInUserId },
      include: {
        auction: {
          include: {
            seller: { select: { id: true, name: true, email: true } }, // Include seller details
            bids: { select: { amount: true, userId: true } }, // Include bids
          },
        },
      },
    });

    // Extract auction objects, or return an empty array if none exist
    const auctions = watchedAuctions.map((watched) => watched.auction) ?? [];

    return NextResponse.json(auctions);
  } catch (error) {
    console.error("Error fetching watched auctions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
