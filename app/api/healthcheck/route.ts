import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    return NextResponse.json(
      { success: true, message: "Server is running" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Health check failed" },
      { status: 500 }
    );
  }
};
