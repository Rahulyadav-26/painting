import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

export const isDbConfigured = Boolean(
  process.env.DATABASE_URL &&
  process.env.DATABASE_URL.trim() !== "" &&
  !process.env.DATABASE_URL.includes("ep-xyz")
);

function createPrismaClient(): PrismaClient | null {
  if (!isDbConfigured) {
    return null;
  }

  try {
    const connectionString = process.env.DATABASE_URL!;
    const pool = globalForPrisma.pool ?? new Pool({ connectionString });
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.pool = pool;
    }

    const adapter = new PrismaPg(pool);
    const client = new PrismaClient({ adapter });
    return client;
  } catch (error) {
    console.warn("Prisma client initialization failed:", error);
    return null;
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}

export default prisma;
