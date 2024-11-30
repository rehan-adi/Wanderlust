import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";  // Import jsonwebtoken for generating the token
import { serialize } from "cookie";  // Import cookie serializer for setting cookies

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email } = body;
  
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
        },
      });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // Set the token in the cookie
    const cookie = serialize("token", token, {
      httpOnly: true, // Make the cookie inaccessible to JavaScript
      secure: process.env.NODE_ENV === "production", // Ensure it's only sent over HTTPS in production
      maxAge: 3600, // Expire in 1 hour
      path: "/", // Set the cookie for the entire app
    });

    return NextResponse.json(
      { success: true, message: "User created or authenticated successfully" },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
