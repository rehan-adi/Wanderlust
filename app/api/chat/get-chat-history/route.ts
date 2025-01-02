import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Session ID required" }), {
        status: 400,
      });
    }

    const chatHistory = await prisma.chatHistory.findMany({
      where: { chatSessionId: sessionId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ success: true, chatHistory }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
