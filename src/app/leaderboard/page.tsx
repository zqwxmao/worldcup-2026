"use client"

import { useState } from "react"
import { leaderboardData, weeklyLeaderboard } from "@/data/leaderboard"

export const dynamic = "force-static"

export default function LeaderboardPage() {
  const [tab, setTab] = useState<"all" | "weekly">("all")
  const data = tab === "all" ? leaderboardData : weeklyLeaderboard

  return (
    <div className="max-w-4xl mx-auto px-3 py-4">
      <h1 className="text-xl font-extrabold text-green-900 mb-1">🏆 排行榜</h1>
      <p className="text-xs text-gray-500 mb-4">竞猜积分排名，猜对越多排名越高</p>

      {/* Tab切换 */}
      <div className="flex gap-1.5 mb-4">
        <button
          onClick={() => setTab("all")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            tab === "all" ? "bg-green-700 text-white shadow-sm" : "bg-white border border-green-200 text-gray-500 hover:bg-green-50"
          }`}
        >
          总排行
        </button>
        <button
          onClick={() => setTab("weekly")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            tab === "weekly" ? "bg-green-700 text-white shadow-sm" : "bg-white border border-green-200 text-gray-500 hover:bg-green-50"
          }`}
        >
          本周排行
        </button>
      </div>

      {/* 领奖台 Top 3 */}
      <div className="flex items-end gap-2 mb-5">
        {[1, 0, 2].map((idx) => {
          const u = data[idx]
          if (!u) return null
          const heights = ["h-24", "h-20", "h-16"]
          const medals = ["🥇", "🥈", "🥉"]
          const colors = ["bg-yellow-100 border-yellow-400", "bg-gray-100 border-gray-300", "bg-orange-100 border-orange-300"]
          return (
            <div key={idx} className={`flex-1 ${idx === 1 ? "" : "scale-90"}`}>
              <div className="flex justify-center mb-1">
                <span className="text-lg">{medals[idx]}</span>
              </div>
              <div className={`rounded-t-xl border ${colors[idx]} p-2 text-center ${heights[idx]} flex flex-col justify-end`}>
                <div className="text-lg">{u.avatar}</div>
                <div className="text-[10px] font-bold truncate">{u.name}</div>
                <div className="text-[9px] font-bold text-green-800">{u.score}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 完整列表 */}
      <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
        {data.map((user, i) => {
          const rankColor = i < 3
            ? "text-yellow-600"
            : i < 10
            ? "text-gray-500"
            : "text-gray-400"

          const bgColor = i < 3 ? "bg-yellow-50" : i % 2 === 0 ? "bg-white" : "bg-gray-50/50"

          return (
            <div key={i} className={`flex items-center px-4 py-2.5 border-b border-green-100 last:border-0 ${bgColor}`}>
              <span className={`w-6 text-xs font-bold ${rankColor}`}>
                {i < 3 ? ["🥇", "🥈", "🥉"][i] : `${user.rank}`}
              </span>
              <div className="w-7 h-7 rounded-full bg-green-50 text-xs flex items-center justify-center mr-2">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate">{user.name}</div>
                {user.badges.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {user.badges.map((badge, j) => (
                      <span key={j} className="text-[8px] bg-green-50 text-green-700 px-1 rounded">{badge}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-green-800">{user.score}</div>
                <div className="text-[9px] text-gray-400">{user.correctRate}% 正确率</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
