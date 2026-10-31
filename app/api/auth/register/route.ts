import { NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/lib/userService";
import { hashPassword, signToken, COOKIE_NAME, SEVEN_DAYS_IN_SECONDS } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    // Rate Limiting (Fix for SEC-05): Max 5 registration requests per minute per IP
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`register:${clientIp}`, 5, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: `Too many registration attempts. Please wait ${rateCheck.resetInSeconds} seconds before retrying.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Bcrypt DoS Defense (Fix for SEC-08): Cap maximum password length at 72 characters
    if (password.length > 72) {
      return NextResponse.json(
        { error: "Password must not exceed 72 characters" },
        { status: 400 }
      );
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Unable to register with this email address. Please sign in or use another email." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({
      name: name?.trim() || null,
      email: email.trim().toLowerCase(),
      passwordHash,
      role: "CUSTOMER",
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      tokenVersion: user.tokenVersion || 1,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
      { status: 201 }
    );

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
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Something went wrong while creating your account" },
      { status: 500 }
    );
  }
}
