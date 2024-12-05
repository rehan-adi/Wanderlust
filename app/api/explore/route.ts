import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const images = await prisma.images.findMany({
      select: {
        imageUrl: true,
        prompt: true,
        user: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (images.length > 0) {
      return NextResponse.json({ success: true, images });
    }

    return NextResponse.json(
      { success: false, message: "No images found" },
      { status: 404 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
