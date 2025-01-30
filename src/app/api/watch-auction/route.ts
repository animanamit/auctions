import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure this points to your Prisma client instance

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

    // Check if user is already watching
    const existingWatch = await prisma.watchedAuction.findUnique({
      where: { userId_auctionId: { userId: loggedInUserId, auctionId } },
    });

    if (existingWatch) {
      return NextResponse.json(
        { message: "Already watching this auction" },
        { status: 409 }
      );
    }

    // Start a transaction to ensure atomicity
    await prisma.$transaction([
      prisma.watchedAuction.create({
        data: { userId: loggedInUserId, auctionId },
      }),
      prisma.auction.update({
        where: { id: auctionId },
        data: { watchCount: { increment: 1 } }, // Increment watch count
      }),
    ]);

    return NextResponse.json({ message: "Auction added to watchlist" });
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
