import prisma from "@/lib/prisma";
import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No user ID provided" },
        { status: 403 }
      );
    }

    const userId = session.user.id;

    const imageHistory = await prisma.imagePromptHistory.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        prompt: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    const imageCount = await prisma.imagePromptHistory.count({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        imageHistory: imageHistory,
        imageCount: imageCount,
        message: "Successfully fetched image history",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
