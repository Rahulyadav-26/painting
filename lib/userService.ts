import fs from "fs";
import path from "path";
import prisma, { isDbConfigured } from "./prisma";

export interface UserRecord {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string;
  role: string;
  tokenVersion?: number;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

function ensureUsersFile(): UserRecord[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), "utf8");
      return [];
    }
    const content = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    console.error("Error reading users file:", err);
    return [];
  }
}

function saveUsersToFile(users: UserRecord[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing users file:", err);
  }
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const normalizedEmail = email.trim().toLowerCase();

  if (isDbConfigured && prisma) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
      return user as UserRecord | null;
    } catch (err) {
      console.warn("Prisma query failed, falling back to local storage:", err);
    }
  }

  const users = ensureUsersFile();
  const match = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  return match || null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  if (isDbConfigured && prisma) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user as UserRecord | null;
    } catch (err) {
      console.warn("Prisma query failed, falling back to local storage:", err);
    }
  }

  const users = ensureUsersFile();
  const match = users.find((u) => u.id === id);
  return match || null;
}

export async function createUser(data: {
  email: string;
  passwordHash: string;
  name?: string | null;
  role?: string;
}): Promise<UserRecord> {
  const normalizedEmail = data.email.trim().toLowerCase();

  if (isDbConfigured && prisma) {
    try {
      const created = await prisma.user.create({
        data: {
          email: normalizedEmail,
          passwordHash: data.passwordHash,
          name: data.name?.trim() || null,
          role: data.role || "CUSTOMER",
        },
      });
      return created as UserRecord;
    } catch (err) {
      console.warn("Prisma create failed, falling back to local storage:", err);
    }
  }

  const users = ensureUsersFile();
  const newUser: UserRecord = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    email: normalizedEmail,
    name: data.name?.trim() || null,
    passwordHash: data.passwordHash,
    role: data.role || "CUSTOMER",
    tokenVersion: 1,
    avatar: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(newUser);
  saveUsersToFile(users);
  return newUser;
}

/**
 * Revokes all active sessions for a user by incrementing their tokenVersion (Fix for SEC-04)
 */
export async function revokeUserSessions(userId: string): Promise<number> {
  const users = ensureUsersFile();
  const user = users.find((u) => u.id === userId);
  if (!user) return 1;

  user.tokenVersion = (user.tokenVersion || 1) + 1;
  user.updatedAt = new Date();
  saveUsersToFile(users);

  if (isDbConfigured && prisma) {
    try {
      await (prisma.user as any).update({
        where: { id: userId },
        data: { updatedAt: new Date() },
      });
    } catch (err) {
      console.warn("Prisma session revocation warning:", err);
    }
  }

  return user.tokenVersion;
}
