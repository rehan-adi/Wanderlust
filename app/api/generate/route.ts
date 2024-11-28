import z from "zod";
import axios from "axios";
import { uploadOnCloudinary } from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY as string;
const HUGGINGFACE_API_URL = process.env.HUGGINGFACE_API_URL as string;

const promptValidation = z.object({
  prompt: z.string().max(100, "Prompt must be less than 100 characters"),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const prompt = promptValidation.parse(body);

    const response = await axios.post(HUGGINGFACE_API_URL, prompt, {
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
    });

    const imageBuffer = Buffer.from(response.data);

    const cloudinaryResponse = await uploadOnCloudinary(imageBuffer);

    if (!cloudinaryResponse) {
      return NextResponse.json(
        { success: false, message: "Error uploading image to Cloudinary" },
        { status: 500 }
      );
    }

    const imageUrl = cloudinaryResponse.secure_url;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "Error generating image" },
      { status: 500 }
    );
  }
};
