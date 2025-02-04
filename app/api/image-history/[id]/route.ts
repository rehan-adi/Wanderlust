import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

// DELETE method to delete image history
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No user ID provided" },
        { status: 403 }
      );
    }

    // Delete the chat session
    const deletedSession = await prisma.chatSession.delete({
      where: {
        id: params.id,
        userId: session.user.id, // Ensure the session belongs to the logged-in user
      },
    });

    if (!deletedSession) {
      return NextResponse.json(
        { success: false, message: "Chat session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Chat session deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
};
