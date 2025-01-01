import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { sendPrompt } from "@/utils/aiResponse";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { chatSessionId, prompt } = await req.json();

  const aiResponse = await sendPrompt(prompt);

  await prisma.chatHistory.create({
    data: {
      prompt,
      message: aiResponse,
      chatSessionId: chatSessionId.toString(),
    },
  });

  return NextResponse.json({ aiResponse }, { status: 201 });
}
