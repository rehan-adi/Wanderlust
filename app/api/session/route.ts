import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No user ID provided" },
        { status: 403 }
      );
    }

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
