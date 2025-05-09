import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

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

    const deleteChatHistory = await prisma.imagePromptHistory.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!deleteChatHistory) {
      return NextResponse.json(
        { success: false, message: "Failed to delete History" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Image history deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
};
