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

    const sessions = await prisma.chatSession.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        createdAt: true,
        user: {
          select: {
            images: {
              select: {
                id: true,
              },
            },
          },
        },
        chatHistory: {
          orderBy: { createdAt: "desc" },
          select: {
            prompt: true,
            createdAt: true,
            imageUrl: true,
          },
        },
      },
    });

    const sessionsWithImageCount = sessions.map((session) => ({
      ...session,
      imageCount: session.user.images.length,
    }));

    return NextResponse.json(
      {
        success: true,
        sessions: sessions,
        imageCount: sessionsWithImageCount.reduce(
          (acc, curr) => acc + curr.imageCount,
          0
        ),
        message: "Successfully fetched chat history",
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
