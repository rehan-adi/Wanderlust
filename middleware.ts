import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const middleware = async (req: NextRequest) => {
  const url = req.nextUrl.pathname;

  // Define routes to exclude from middleware
  const excludedRoutes = [
    "/api/auth",
    "/api/auth/signin",
    "/api/auth/callback",
    "/api/auth/session",
  ];

  // Skip middleware for excluded routes
  if (excludedRoutes.some((route) => url.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for Authorization header
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization token missing or invalid" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded !== "object" || !decoded.id) {
      return NextResponse.json(
        { message: "User ID missing in token" },
        { status: 401 }
      );
    }

    // Attach user ID to the response headers
    const response = NextResponse.next();
    response.headers.set("x-user-id", decoded.id);

    return response;
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
};

// Middleware configuration to apply middleware only to specific routes
export const config = {
  matcher: ["/api/generate", "/api/session", "/api/chat-history"],
};
