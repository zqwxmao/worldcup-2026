"use client"

import { useState } from "react"
import MatchCard from "@/components/MatchCard"
import { allMatches, groups } from "@/data/matches"

export const dynamic = "force-static"

export default function MatchesPage() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  const groupKeys = Object.keys(groups)
  const filtered = activeGroup
    ? allMatches.filter(m => m.group === `第${activeGroup}组`)
    : allMatches

  return (
    <div className="max-w-4xl mx-auto px-3 py-4">
      <h1 className="text-xl font-extrabold text-green-900 mb-1">📅 赛程表</h1>
      <p className="text-xs text-gray-500 mb-4">2026 世界杯 · 全部 72 场小组赛</p>

      {/* 分组筛选 */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => setActiveGroup(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            !activeGroup
              ? "bg-green-700 text-white shadow-sm"
              : "bg-white border border-green-200 text-gray-600 hover:bg-green-50"
          }`}
        >
          全部
        </button>
        {groupKeys.map((g) => (
          <button
            key={g}
            onClick={() => setActiveGroup(g)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeGroup === g
                ? "bg-green-700 text-white shadow-sm"
                : "bg-white border border-green-200 text-gray-600 hover:bg-green-50"
            }`}
          >
            {g}组
          </button>
        ))}
      </div>

      {/* 比赛列表 */}
      <div className="space-y-2.5">
        {filtered.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          暂无比赛数据
        </div>
      )}
    </div>
  )
}
