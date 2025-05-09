import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Please sign in." },
        { status: 403 }
      );
    }

    const chatSessionId = params.sessionId;

    const existingSession = await prisma.chatSession.findFirst({
      where: {
        id: chatSessionId,
        userId: session.user.id,
      },
    });

    if (!existingSession) {
      return NextResponse.json(
        { success: false, message: "Chat session not found." },
        { status: 404 }
      );
    }

    // Delete the session (history is deleted via onDelete: Cascade)
    await prisma.chatSession.delete({
      where: { id: chatSessionId },
    });

    return NextResponse.json({
      success: true,
      message: "Chat session deleted.",
    });
  } catch (error) {
    console.error("Delete ChatSession Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
