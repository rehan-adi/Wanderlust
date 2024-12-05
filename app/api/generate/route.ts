import z from "zod";
import axios from "axios";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { pinecone } from "../../../lib/pinecone";
import { getImageEmbedding } from "@/utils/embedding";
import { uploadOnCloudinary } from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY as string;
const HUGGINGFACE_API_URL = process.env.HUGGINGFACE_API_URL as string;

const promptValidation = z.object({
  prompt: z.string().max(100, "Prompt must be less than 100 characters"),
});

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No user ID provided" },
        { status: 403 }
      );
    }

    const userId = session.user.id;

    const body = await req.json();
    const prompt = promptValidation.parse(body);

    const activeSession = await prisma.chatSession.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        chatHistory: true,
      },
    });

    let sessionId = activeSession ? activeSession.id : null;

    if (!sessionId) {
      const newSession = await prisma.chatSession.create({
        data: {
          userId: userId,
        },
      });
      sessionId = newSession.id;
    }

    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: prompt.prompt },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    const imageBuffer = Buffer.from(response.data);

    const cloudinaryResponse = await uploadOnCloudinary(imageBuffer);

    if (!cloudinaryResponse) {
      return NextResponse.json(
        { success: false, message: "Error uploading image to Cloudinary" },
        { status: 500 }
      );
    }

    const imageUrl = cloudinaryResponse.secure_url;

    await prisma.chatHistory.create({
      data: {
        prompt: prompt.prompt,
        imageUrl,
        chatSessionId: sessionId,
      },
    });

    await prisma.images.create({
      data: {
        userId: userId,
        imageUrl,
        prompt: prompt.prompt,
      },
    });

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.errors[0]?.message || "Invalid input",
        },
        { status: 400 }
      );
    }
    console.error("Unexpected error:", error.response?.data || error.message);
    return NextResponse.json(
      { success: false, message: "Error generating image" },
      { status: 500 }
    );
  }
};
