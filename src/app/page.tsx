import { prismaPromise } from "@/lib/prisma"
import MatchCard from "@/components/MatchCard"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  let displayMatches: any[] = []

  try {
    const prisma = await prismaPromise
    if (!prisma) throw new Error("no prisma")
    const matchesRaw = await prisma.match.findMany({
      orderBy: { matchTime: "asc" },
    })

    const matches = matchesRaw.map((m) => ({
      ...m,
      matchTime: m.matchTime.toISOString(),
    }))

    const todayMatches = matches.filter((m) => {
      const today = new Date()
      const matchDate = new Date(m.matchTime)
      return matchDate.toDateString() === today.toDateString()
    })

    displayMatches = todayMatches.length > 0 ? todayMatches : matches.slice(0, 6)
  } catch (e) {
    console.log("数据库暂未连接，显示静态内容")
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-pitch-dark via-pitch to-pitch-light rounded-2xl p-8 md:p-10 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-72 h-72 bg-white/5 rounded-full pointer-events-none" />
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-1">
            2026 FIFA <span className="text-pitch-gold">世界杯</span>
          </h1>
          <p className="text-white/80 text-sm md:text-base mb-5">
            🇺🇸 🇨🇦 🇲🇽 · 48支球队 · 104场比赛 · 绿茵盛宴
          </p>
          <div className="flex gap-3">
            <a href="/predict" className="inline-block bg-pitch-gold text-pitch-dark px-6 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-pitch-gold/30 transition-all">
              ⚡ 开始竞猜
            </a>
            <a href="/matches" className="inline-block bg-white/15 backdrop-blur-sm border border-white/30 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/25 transition-all">
              📅 赛程表
            </a>
          </div>
        </div>
      </div>

      {/* Today's Matches */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-pitch-dark">📋 今日比赛</h2>
        <a href="/matches" className="text-sm font-semibold text-pitch hover:underline">全部赛程 →</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {displayMatches.length > 0 ? (
          displayMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-pitch-muted bg-white rounded-xl border border-pitch-border">
            <p className="text-lg mb-1">🏟️ 数据加载中</p>
            <p className="text-sm">连接数据库后即可查看赛程</p>
          </div>
        )}
      </div>

      {/* Features Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Card Preview */}
        <div className="bg-white rounded-xl border border-pitch-border p-5 shadow-sm">
          <h3 className="font-bold text-pitch-dark mb-3">🃏 球星卡收集</h3>
          <div className="flex gap-2 mb-3">
            {[
              { name: "梅西", flag: "🇦🇷", rarity: "legendary" },
              { name: "姆巴佩", flag: "🇫🇷", rarity: "rare" },
              { name: "维尼修斯", flag: "🇧🇷", rarity: "common" },
              { name: "亚马尔", flag: "🇪🇸", rarity: "common" },
            ].map((card, i) => (
              <div
                key={i}
                className={`flex-1 aspect-[3/4] rounded-lg p-2 text-center cursor-pointer transition-all hover:-translate-y-1 ${
                  card.rarity === "legendary"
                    ? "bg-gradient-to-b from-amber-50 to-yellow-100 border border-pitch-gold"
                    : card.rarity === "rare"
                    ? "bg-gradient-to-b from-blue-50 to-sky-100 border border-sky-200"
                    : "bg-gradient-to-b from-green-50 to-emerald-50 border border-pitch-border"
                }`}
              >
                <div className="text-lg mt-1">{card.flag}</div>
                <div className="text-[10px] font-bold mt-1">{card.name}</div>
                <div className="text-[8px] text-pitch-muted">
                  {card.rarity === "legendary" ? "⭐ 传奇" : card.rarity === "rare" ? "🔥 稀有" : "💎 精英"}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-pitch to-pitch-light text-white text-sm font-bold hover:shadow-md hover:shadow-pitch/30 transition-all">
            🎁 开启卡包
          </button>
        </div>

        {/* Leaderboard Preview */}
        <div className="bg-white rounded-xl border border-pitch-border p-5 shadow-sm">
          <h3 className="font-bold text-pitch-dark mb-3">🏆 竞猜排行 · 本周</h3>
          {[
            { rank: "🥇", name: "足球小将", score: 1280 },
            { rank: "🥈", name: "梅西的左脚", score: 1150 },
            { rank: "🥉", name: "预测之神", score: 980 },
            { rank: "4", name: "球场老司机", score: 870 },
            { rank: "5", name: "桑巴舞者", score: 760 },
          ].map((user, i) => (
            <div key={i} className="flex items-center py-1.5 border-b border-pitch-border/50 last:border-0">
              <span className={`w-6 text-xs font-bold ${i < 3 ? "text-pitch-gold" : "text-pitch-muted"}`}>{user.rank}</span>
              <span className="flex-1 text-sm font-medium">{user.name}</span>
              <span className="text-sm font-bold text-pitch">{user.score}</span>
            </div>
          ))}
          <a href="/leaderboard" className="block text-center text-sm font-semibold text-pitch mt-3 hover:underline">
            完整排行 →
          </a>
        </div>
      </div>

      {/* Community Preview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-pitch-dark">💬 社区热议</h2>
          <a href="/community" className="text-sm font-semibold text-pitch hover:underline">发帖讨论 →</a>
        </div>
        {[
          { user: "足球小将", avatar: "🔥", content: "这届美国队主场buff拉满啊！大家觉得能进8强吗？🇺🇸", likes: 24, comments: 8 },
          { user: "梅西的左脚", avatar: "⚡", content: "阿根廷 vs 巴西这场我的预测是2-1，兄弟们怎么看？🤔", likes: 56, comments: 23 },
        ].map((post, i) => (
          <div key={i} className="bg-white rounded-lg border border-pitch-border p-3.5 mb-2">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full text-xs flex items-center justify-center bg-green-50">{post.avatar}</div>
              <span className="text-xs font-semibold text-pitch">{post.user}</span>
              <span className="text-[10px] text-pitch-muted">刚刚</span>
            </div>
            <p className="text-sm mb-2">{post.content}</p>
            <div className="flex gap-4 text-[11px] text-pitch-muted">
              <span className="cursor-pointer hover:text-pitch transition-colors">👍 {post.likes}</span>
              <span className="cursor-pointer hover:text-pitch transition-colors">💬 {post.comments}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-pitch-muted border-t border-pitch-border">
        © 2026 世界杯球迷站 · 非官方 · 仅供娱乐 · 🌿 绿茵竞技场
      </footer>
    </div>
  )
}
