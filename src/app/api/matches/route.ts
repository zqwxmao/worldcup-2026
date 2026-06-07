import { NextResponse } from "next/server"
import { prismaPromise } from "@/lib/prisma"

export async function GET() {
  try {
    const prisma = await prismaPromise
    if (!prisma) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 })
    }
    const matches = await prisma.match.findMany({
      orderBy: { matchTime: "asc" },
    })
    return NextResponse.json(matches)
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 })
  }
}
