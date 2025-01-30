import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const loggedInUserId = 1; // Global variable for now

export async function GET() {
  try {
    const watchedAuctions = await prisma.user.findUnique({
      where: { id: loggedInUserId },
      select: {
        WatchedAuctions: {
          include: {
            auction: true,
          },
        },
      },
    });

    if (!watchedAuctions) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(watchedAuctions.WatchedAuctions);
  } catch (error) {
    console.error("Error fetching watched auctions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
