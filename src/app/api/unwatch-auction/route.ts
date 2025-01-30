import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { auctionId } = await req.json();
    const loggedInUserId = 1; // Replace with actual authentication logic

    if (!auctionId) {
      return NextResponse.json(
        { error: "Auction ID is required" },
        { status: 400 }
      );
    }

    // Ensure the user is watching the auction
    const existingWatch = await prisma.watchedAuction.findUnique({
      where: { userId_auctionId: { userId: loggedInUserId, auctionId } },
    });

    if (!existingWatch) {
      return NextResponse.json(
        { message: "Not watching this auction" },
        { status: 404 }
      );
    }

    // Remove from watchlist & decrement watch count
    await prisma.$transaction([
      prisma.watchedAuction.delete({
        where: { userId_auctionId: { userId: loggedInUserId, auctionId } },
      }),
      prisma.auction.update({
        where: { id: auctionId },
        data: { watchCount: { decrement: 1 } },
      }),
    ]);

    return NextResponse.json({ message: "Auction removed from watchlist" });
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
