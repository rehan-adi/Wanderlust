import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface DecodedToken {
  id: string;
  [key: string]: any;
}

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

  // Get the token from the cookie
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Authorization token missing or invalid" },
      { status: 401 }
    );
  }

  try {
    // Verify the token and type the decoded value correctly
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if the decoded token is valid and has the 'id' property
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      const { id } = decoded as DecodedToken;

      // Attach user ID to the response headers
      const response = NextResponse.next();
      response.headers.set("x-user-id", id);

      return response;
    } else {
      return NextResponse.json(
        { message: "Invalid token structure or missing user ID" },
        { status: 401 }
      );
    }
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
