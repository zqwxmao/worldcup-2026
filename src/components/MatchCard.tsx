export interface Match {
  id: number
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  group: string
  round: string
  matchTime: string
  status: "scheduled" | "live" | "finished"
  homeScore?: number
  awayScore?: number
  stadium?: string
}

export default function MatchCard({ match }: { match: Match }) {
  const matchDate = new Date(match.matchTime)
  const dateStr = matchDate.toLocaleDateString("zh-CN", { month: "short", day: "numeric" })
  const timeStr = matchDate.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })

  const statusBadge = match.status === "live"
    ? <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded animate-pulse">● 直播中</span>
    : match.status === "finished"
    ? <span className="text-[10px] text-gray-500">已结束</span>
    : <span className="text-[10px] text-gray-400">{timeStr}</span>

  return (
    <div className={`bg-white rounded-lg border p-3 shadow-sm transition-all ${
      match.status === "live" ? "border-red-300 ring-1 ring-red-200" : "border-green-200"
    }`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] text-gray-400 font-medium">{match.group}</span>
        {statusBadge}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 text-right">
          <div className="text-lg">{match.homeFlag}</div>
          <div className={`text-xs font-bold truncate ${match.homeScore !== undefined && match.awayScore !== undefined && match.homeScore > match.awayScore ? "text-green-800" : "text-gray-700"}`}>
            {match.homeTeam}
          </div>
        </div>
        <div className="text-center">
          {match.status !== "scheduled" && match.homeScore !== undefined ? (
            <span className="text-sm font-extrabold text-gray-800">{match.homeScore}:{match.awayScore}</span>
          ) : (
            <span className="text-[10px] text-gray-400 font-bold">VS</span>
          )}
        </div>
        <div className="flex-1">
          <div className="text-lg">{match.awayFlag}</div>
          <div className={`text-xs font-bold truncate ${match.homeScore !== undefined && match.awayScore !== undefined && match.awayScore > match.homeScore ? "text-green-800" : "text-gray-700"}`}>
            {match.awayTeam}
          </div>
        </div>
      </div>
      {match.stadium && match.status !== "live" && (
        <div className="text-[9px] text-gray-400 text-center mt-1.5 truncate">🏟️ {match.stadium}</div>
      )}
    </div>
  )
}
