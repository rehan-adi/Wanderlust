import { NextResponse } from "next/server";
import { getImages } from "@/lib/getImages";

export const GET = async () => {
  try {
    const images = await getImages();

    if (images.length > 0) {
      return NextResponse.json({ success: true, images });
    }

    return NextResponse.json(
      { success: false, message: "No images found" },
      { status: 404 }
    );
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
