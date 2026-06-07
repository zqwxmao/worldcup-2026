import { NextResponse } from "next/server"
import { getMatches } from "@/lib/db"

export async function GET() {
  try {
    const matches = await getMatches()
    return NextResponse.json(matches)
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 })
  }
}
