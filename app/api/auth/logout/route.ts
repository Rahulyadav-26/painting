import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { revokeUserSessions } from "@/lib/userService";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      const payload = verifyToken(token);
      if (payload?.userId) {
        // Increment tokenVersion on server to invalidate any copied/cached JWT tokens
        await revokeUserSessions(payload.userId);
      }
    }
  } catch (err) {
    console.warn("Session revocation error during logout:", err);
  }

  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  const isHttps = request.url.startsWith("https://") || request.headers.get("x-forwarded-proto") === "https";
  const isLocalhost = request.headers.get("host")?.includes("localhost") || request.headers.get("host")?.includes("127.0.0.1");
  const isSecure = !isLocalhost && (process.env.NODE_ENV === "production" || isHttps);

  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
