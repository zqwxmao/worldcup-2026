interface Match {
  id: number
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  group: string
  matchTime: string
  homeScore: number | null
  awayScore: number | null
  status: string
}

export default function MatchCard({ match }: { match: Match }) {
  const matchDate = new Date(match.matchTime)
  const now = new Date()
  const isToday = matchDate.toDateString() === now.toDateString()
  const timeStr = matchDate.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })

  const statusBadge = () => {
    if (match.status === "live") return <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">🔴 LIVE</span>
    if (match.status === "finished") return <span className="text-[10px] font-bold text-pitch-muted bg-gray-100 px-2 py-0.5 rounded">✅ FT</span>
    return null
  }

  return (
    <div className="bg-white rounded-xl border border-pitch-border p-4 text-center shadow-sm transition-all hover:shadow-md hover:border-pitch-light cursor-pointer">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-[10px] font-semibold text-pitch bg-green-50 px-2 py-0.5 rounded-full">
          {isToday ? `今天 ${timeStr}` : matchDate.toLocaleDateString("zh-CN", { month: "short", day: "numeric" }) + " " + timeStr}
        </span>
        <span className="text-[10px] text-pitch-muted">{match.group}组</span>
        {statusBadge()}
      </div>
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xl">{match.homeFlag}</span>
          <span className="text-xs font-semibold">{match.homeTeam}</span>
        </div>
        {match.status === "scheduled" ? (
          <span className="text-2xl font-bold text-pitch-muted">VS</span>
        ) : (
          <div className="text-center">
            <span className="text-xl font-extrabold text-pitch-dark">{match.homeScore ?? "-"}</span>
            <span className="text-xs text-pitch-muted mx-1">:</span>
            <span className="text-xl font-extrabold text-pitch-dark">{match.awayScore ?? "-"}</span>
          </div>
        )}
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xl">{match.awayFlag}</span>
          <span className="text-xs font-semibold">{match.awayTeam}</span>
        </div>
      </div>
      {match.status === "scheduled" && (
        <button className="text-xs font-semibold text-pitch border border-pitch/30 rounded-lg px-4 py-1.5 hover:bg-pitch hover:text-white transition-all">
          🎯 预测胜负
        </button>
      )}
      {match.status === "live" && (
        <span className="text-xs font-semibold text-red-500">⚡ 比赛进行中</span>
      )}
      {match.status === "finished" && (
        <span className="text-xs font-semibold text-pitch-muted">📊 查看详情</span>
      )}
    </div>
  )
}
