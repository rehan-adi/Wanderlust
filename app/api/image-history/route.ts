import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export const GET = async (req: NextRequest) => {
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
  } catch (error: any) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
