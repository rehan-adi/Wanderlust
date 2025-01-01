import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const userId = session.user.id;

  const newSession = await prisma.chatSession.create({
    data: { userId },
  });
  const sessionId = newSession.id;

  return NextResponse.json({ sessionId }, { status: 201 });
}
