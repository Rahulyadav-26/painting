import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { findUserById, type UserRecord } from "./userService";

const JWT_SECRET = process.env.JWT_SECRET || "minted-whimsy-fallback-secret-2026";
const COOKIE_NAME = "auth_token";
const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;

export interface TokenPayload {
  userId: string;
  email: string;
  name?: string | null;
  role: string;
  tokenVersion?: number;
}

export interface SanitizedUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  avatar?: string | null;
  createdAt?: string | Date;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
}

/**
 * Verifies JWT token and pins HS256 algorithm (Fix for SEC-07)
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    }) as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Authenticates request and validates session revocation / token version (Fix for SEC-04)
 */
export async function getAuthenticatedUser(request: NextRequest): Promise<UserRecord | null> {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload || !payload.userId) return null;

    const user = await findUserById(payload.userId);
    if (!user) return null;

    // Invalidate if tokenVersion does not match current user record
    const currentVersion = user.tokenVersion || 1;
    const tokenVersion = payload.tokenVersion || 1;
    if (currentVersion !== tokenVersion) {
      return null; // Session has been revoked / logged out
    }

    return user;
  } catch {
    return null;
  }
}

export { COOKIE_NAME, SEVEN_DAYS_IN_SECONDS };
