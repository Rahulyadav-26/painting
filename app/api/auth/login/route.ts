import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/userService";
import { comparePassword, signToken, COOKIE_NAME, SEVEN_DAYS_IN_SECONDS } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    // Rate Limiting (Fix for SEC-05): Max 5 failed/login requests per minute per IP
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`login:${clientIp}`, 5, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: `Too many login attempts. Please wait ${rateCheck.resetInSeconds} seconds before retrying.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Bcrypt DoS Defense (Fix for SEC-08): Cap maximum password length at 72 characters
    if (typeof password === "string" && password.length > 72) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      tokenVersion: user.tokenVersion || 1,
    });

    const response = NextResponse.json({
      success: true,
      message: "Signed in successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SEVEN_DAYS_IN_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong while signing in" },
      { status: 500 }
    );
  }
}
