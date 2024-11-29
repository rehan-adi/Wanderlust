import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const middleware = async (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization token missing or invalid" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded !== "object" || !decoded.id) {
      return NextResponse.json(
        { message: "User ID missing in token" },
        { status: 401 }
      );
    }

    const userId = decoded.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID missing in token" },
        { status: 401 }
      );
    }

    const response = NextResponse.next();
    response.headers.set("x-user-id", userId);

    return response;
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
};
