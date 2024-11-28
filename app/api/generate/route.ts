import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY as string;
const HUGGINGFACE_API_URL = process.env.HUGGINGFACE_API_URL as string;

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { prompt } = body;

    const response = await axios.post(HUGGINGFACE_API_URL, prompt, {
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data);
    const imageUrl = `data:image/png;base64,${buffer.toString("base64")}`;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Error generating image" },
      { status: 500 }
    );
  }
};
