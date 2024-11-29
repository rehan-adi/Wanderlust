import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "Session ID is required" },
        { status: 400 }
      );
    }

    const chatHistory = await prisma.chatHistory.findMany({
      where: {
        chatSessionId: sessionId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (chatHistory.length === 0) {
      return NextResponse.json(
        { success: false, message: "No chat history found for this session" },
        { status: 404 }
      );
    }

    // Return the chat history
    return NextResponse.json({
      success: true,
      chatHistory,
      message: "Chat history fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error },
      { status: 500 }
    );
  }
};
