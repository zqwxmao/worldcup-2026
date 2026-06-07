import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: Promise<PrismaClient | undefined> }

/**
 * Creates a PrismaClient that fails fast when DB is unreachable.
 * Instead of hanging for 30+ seconds on Neon cold start, it times out in ~5s.
 */
function createPrismaClient() {
  const client = new PrismaClient({
    log: ['error', 'warn'],
  })

  // Test the connection with a timeout - if it fails, return undefined
  // so callers fall back to static data immediately
  const connectWithTimeout = async (): Promise<PrismaClient | undefined> => {
    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('DB connection timed out')), 7000)
      )
      await Promise.race([
        client.$connect(),
        timeout,
      ])
      return client
    } catch (e) {
      // DB unavailable - return undefined so callers fallback to static data
      console.log('DB unavailable, using static fallback:', (e as Error).message)
      return undefined
    }
  }

  return connectWithTimeout()
}

export const prismaPromise = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prismaPromise
}
