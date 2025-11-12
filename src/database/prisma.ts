import { PrismaClient } from "@prisma/client";

// Ensure a single PrismaClient across hot-reloads and serverless invocations
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		// log: ["query", "error", "warn"],
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
