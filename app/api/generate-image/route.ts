import z from "zod";
import { v4 as uuid } from "uuid";
import prisma from "@/lib/prisma";
import { pinecone } from "@/lib/pinecone";
import { client } from "@/utils/huggingface";
import { getServerSession } from "next-auth";
import { HUGGINGFACE_MODEL } from "@/config/config";
import { getTextEmbedding } from "@/utils/embedding";
import { NextRequest, NextResponse } from "next/server";
import { uploadOnCloudinary } from "@/utils/cloudinary";
import { authOptions } from "../auth/[...nextauth]/options";

const promptValidation = z.object({
  prompt: z.string().max(300, "Prompt must be less than 300 characters"),
});

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Please sign in to access this resource.",
        },
        { status: 403 }
      );
    }

    const userId = session.user.id;

    const body = await req.json();
    const validatePromptdata = promptValidation.safeParse(body);

    if (!validatePromptdata.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validatePromptdata.error.flatten(),
        },
        { status: 400 }
      );
    }

    const response: Blob | string = await client.textToImage({
      provider: "hf-inference",
      model: HUGGINGFACE_MODEL,
      inputs: validatePromptdata.data.prompt,
      parameters: { guidance_scale: 8 },
    });

    let imageBuffer: Buffer;

    if (typeof response !== "string") {
      const blob = response as Blob;
      const arrayBuffer = await blob.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    } else if (response.startsWith("data:image/")) {
      const base64Data = response.split(",")[1];
      imageBuffer = Buffer.from(base64Data, "base64");
    } else {
      return NextResponse.json(
        { success: false, message: "Unsupported image format from API" },
        { status: 500 }
      );
    }

    const cloudinaryResponse = await uploadOnCloudinary(imageBuffer);

    if (!cloudinaryResponse) {
      return NextResponse.json(
        { success: false, message: "Failed to upload image to Cloudinary" },
        { status: 500 }
      );
    }

    console.log("Image created and uploaded to Cloudnary");

    const imageUrl = cloudinaryResponse.secure_url;

    const embedding = await getTextEmbedding(validatePromptdata.data.prompt);
    const index = pinecone.Index("image-embeddings");
    const vectorId = `image-${uuid()}`;

    try {
      await index.upsert([
        {
          id: vectorId,
          metadata: { prompt: validatePromptdata.data.prompt, imageUrl },
          values: embedding,
        },
      ]);
    } catch (pineconeError) {
      console.error("Pinecone upsert failed:", pineconeError);
    }

    try {
      await prisma.imagePromptHistory.create({
        data: {
          userId,
          prompt: validatePromptdata.data.prompt,
          imageUrl,
        },
      });
    } catch (historyError) {
      console.error("Failed to save prompt history:", historyError);
    }

    try {
      await prisma.images.create({
        data: {
          userId,
          prompt: validatePromptdata.data.prompt,
          imageUrl,
        },
      });
    } catch (imageSaveError) {
      console.error("Failed to save image record:", imageSaveError);
    }

    return NextResponse.json(
      { success: true, imageUrl, message: "Image generated successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.errors[0]?.message || "Invalid input",
        },
        { status: 400 }
      );
    }

    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error generating image",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
