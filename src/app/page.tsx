import MatchCard from "@/components/MatchCard"
import { allMatches } from "@/data/matches"

export const dynamic = "force-static"

const todayMatches = allMatches.slice(0, 6)
const previewCards = [
  { name: "梅西", flag: "🇦🇷", country: "阿根廷", rarity: "legendary", rating: 96 },
  { name: "姆巴佩", flag: "🇫🇷", country: "法国", rarity: "legendary", rating: 94 },
  { name: "哈兰德", flag: "🇳🇴", country: "挪威", rarity: "legendary", rating: 93 },
  { name: "维尼修斯", flag: "🇧🇷", country: "巴西", rarity: "rare", rating: 90 },
  { name: "贝林厄姆", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", country: "英格兰", rarity: "rare", rating: 90 },
  { name: "亚马尔", flag: "🇪🇸", country: "西班牙", rarity: "elite", rating: 85 },
]

const previewLeaderboard = [
  { rank: "🥇", name: "绿茵预言家", score: 2460 },
  { rank: "🥈", name: "足球先知", score: 2210 },
  { rank: "🥉", name: "梅老板的右脚", score: 1980 },
  { rank: "4", name: "红魔之心", score: 1850 },
  { rank: "5", name: "拜仁慕尼黑魂", score: 1720 },
]

const previewPosts = [
  { user: "绿茵预言家", avatar: "🔮", content: "🇺🇸🇨🇦🇲🇽 2026世界杯就要开打了！48支球队、104场比赛，史上最大规模的世界杯！你最期待哪支球队？", likes: 128, comments: 56 },
  { user: "梅老板的右脚", avatar: "⚡", content: "阿根廷 vs 巴西这场真的有看点！梅西最后一次世界杯之旅，能不能卫冕？我个人预测 2-1，阿根廷胜🇦🇷", likes: 89, comments: 34 },
  { user: "英超通", avatar: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", content: "英格兰这届真的好强！贝林厄姆+福登+萨卡+凯恩的进攻线，三狮军团今年该拿一个了吧？🏴󠁧󠁢󠁥󠁮󠁧󠁿🏆", likes: 145, comments: 62 },
]

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-3 py-4">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 rounded-xl p-6 text-white mb-5 relative overflow-hidden shadow-lg">
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/5 rounded-full pointer-events-none" />
        <div className="relative">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-1">
            2026 <span className="text-yellow-400">世界杯</span>
          </h1>
          <p className="text-white/80 text-sm mb-4">
            🇺🇸 🇨🇦 🇲🇽 · 48支球队 · 104场比赛
          </p>
          <div className="flex gap-2">
            <a href="/predict" className="inline-block bg-yellow-500 text-green-900 px-5 py-2 rounded-lg font-bold text-sm hover:bg-yellow-400 transition-all shadow-md">
              ⚡ 开始竞猜
            </a>
            <a href="/matches" className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-white/30 transition-all">
              📅 赛程表
            </a>
          </div>
        </div>
      </div>

      {/* 今日比赛 */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-green-900">📋 热门比赛</h2>
        <a href="/matches" className="text-xs font-semibold text-green-700 hover:underline">全部赛程 →</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-6">
        {todayMatches.slice(0, 4).map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {/* 功能卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">

        {/* 球星卡预览 */}
        <div className="bg-white rounded-xl border border-green-200 p-4 shadow-sm">
          <h3 className="font-bold text-green-900 mb-3 text-sm">🃏 球星卡收集</h3>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {previewCards.slice(0, 6).map((card, i) => {
              const rarityColors: Record<string, string> = {
                legendary: "bg-gradient-to-b from-yellow-50 to-yellow-100 border-yellow-400",
                rare: "bg-gradient-to-b from-blue-50 to-sky-100 border-sky-300",
                elite: "bg-gradient-to-b from-purple-50 to-purple-100 border-purple-300",
                common: "bg-gradient-to-b from-green-50 to-emerald-50 border-green-200",
              }
              return (
                <div key={i} className={`aspect-[3/4] rounded-lg p-1.5 text-center ${rarityColors[card.rarity]} border cursor-pointer hover:-translate-y-0.5 transition-all`}>
                  <div className="text-lg">{card.flag}</div>
                  <div className="text-[9px] font-bold leading-tight mt-0.5">{card.name}</div>
                  <div className="text-[7px] text-gray-500">{card.rating}</div>
                </div>
              )
            })}
          </div>
          <a href="/cards" className="block w-full py-2 rounded-lg bg-gradient-to-r from-green-700 to-green-600 text-white text-xs font-bold text-center hover:shadow-md transition-all">
            🎁 开启卡包
          </a>
        </div>

        {/* 排行榜预览 */}
        <div className="bg-white rounded-xl border border-green-200 p-4 shadow-sm">
          <h3 className="font-bold text-green-900 mb-3 text-sm">🏆 竞猜排行</h3>
          {previewLeaderboard.map((user, i) => (
            <div key={i} className="flex items-center py-1.5 border-b border-green-100 last:border-0">
              <span className={`w-5 text-xs font-bold ${i < 3 ? "text-yellow-600" : "text-gray-400"}`}>{user.rank}</span>
              <span className="flex-1 text-xs font-medium">{user.name}</span>
              <span className="text-xs font-bold text-green-700">{user.score}</span>
            </div>
          ))}
          <a href="/leaderboard" className="block text-center text-xs font-semibold text-green-700 mt-2 hover:underline">
            完整排行 →
          </a>
        </div>
      </div>

      {/* 社区热议 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-green-900">💬 社区热议</h2>
          <a href="/community" className="text-xs font-semibold text-green-700 hover:underline">发帖讨论 →</a>
        </div>
        {previewPosts.map((post, i) => (
          <div key={i} className="bg-white rounded-lg border border-green-200 p-3 mb-2 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center bg-green-50">{post.avatar}</div>
              <span className="text-[11px] font-semibold text-green-800">{post.user}</span>
              <span className="text-[9px] text-gray-400">刚刚</span>
            </div>
            <p className="text-xs mb-1.5 leading-relaxed">{post.content}</p>
            <div className="flex gap-3 text-[10px] text-gray-400">
              <span className="cursor-pointer hover:text-green-700 transition-colors">👍 {post.likes}</span>
              <span className="cursor-pointer hover:text-green-700 transition-colors">💬 {post.comments}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-[10px] text-gray-400 border-t border-green-200">
        © 2026 世界杯球迷站 · 非官方 · 仅供娱乐 · Powered by ⚽
      </footer>
    </div>
  )
}
