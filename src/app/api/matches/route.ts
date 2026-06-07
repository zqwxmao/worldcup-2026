import { NextResponse } from "next/server"

const matches = [
  { id: 1, homeTeam: "阿根廷", awayTeam: "巴西", homeFlag: "🇦🇷", awayFlag: "🇧🇷", group: "A", matchTime: new Date().toISOString(), status: "live", homeScore: 1, awayScore: 0 },
  { id: 2, homeTeam: "法国", awayTeam: "英格兰", homeFlag: "🇫🇷", awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "B", matchTime: new Date(Date.now() + 7200000).toISOString(), status: "scheduled" },
  { id: 3, homeTeam: "德国", awayTeam: "葡萄牙", homeFlag: "🇩🇪", awayFlag: "🇵🇹", group: "C", matchTime: new Date(Date.now() + 18000000).toISOString(), status: "scheduled" },
]

export async function GET() {
  return NextResponse.json(matches)
}
