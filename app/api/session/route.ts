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
        updatedAt: true,
        chatHistory: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: { prompt: true },
        },
      },
    });

    const Sessions = sessions.map((session) => ({
      id: session.id,
      prompt: session.chatHistory?.[0]?.prompt || "No prompt yet",
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    }));

    return NextResponse.json(
      {
        success: true,
        sessions: Sessions,
        message: "Successfully fetched chat sessions",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server error", error: error },
      { status: 500 }
    );
  }
};
