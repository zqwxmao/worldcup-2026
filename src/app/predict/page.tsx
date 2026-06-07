"use client"

import { useState } from "react"
import MatchCard from "@/components/MatchCard"
import { allMatches } from "@/data/matches"

export const dynamic = "force-static"

export default function PredictPage() {
  const [predictions, setPredictions] = useState<Record<number, { home: number; away: number }>>({})
  const [submitted, setSubmitted] = useState(false)

  // 只显示 upcoming 的比赛
  const upcoming = allMatches.filter(m => m.status === "scheduled").slice(0, 8)

  const handleScore = (matchId: number, side: "home" | "away", val: string) => {
    const num = parseInt(val) || 0
    setPredictions(prev => ({
      ...prev,
      [matchId]: {
        home: side === "home" ? num : (prev[matchId]?.home ?? 0),
        away: side === "away" ? num : (prev[matchId]?.away ?? 0),
      },
    }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-3 py-4 pb-20">
      <h1 className="text-xl font-extrabold text-green-900 mb-1">⚡ 比赛竞猜</h1>
      <p className="text-xs text-gray-500 mb-4">预测比赛比分，猜中赢积分！积分可兑换球星卡包</p>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mb-6">
          <div className="text-3xl mb-2">✅</div>
          <h2 className="font-bold text-green-900 mb-1">竞猜已提交！</h2>
          <p className="text-sm text-gray-600">你的预测已记录，比赛结束后自动结算积分</p>
          <button
            onClick={() => { setSubmitted(false); setPredictions({}) }}
            className="mt-4 text-sm text-green-700 underline"
          >
            继续竞猜
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {upcoming.map((match) => {
              const pred = predictions[match.id] || { home: 0, away: 0 }
              return (
                <div key={match.id} className="bg-white border border-green-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-gray-400 font-medium">{match.group}</span>
                    <span className="text-[10px] text-gray-400">📅 即将开始</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-center">
                      <div className="text-xl mb-1">{match.homeFlag}</div>
                      <div className="text-xs font-bold text-gray-700 mb-1">{match.homeTeam}</div>
                      <input
                        type="number"
                        min="0"
                        max="15"
                        value={pred.home}
                        onChange={(e) => handleScore(match.id, "home", e.target.value)}
                        className="w-10 text-center text-sm font-bold border border-green-200 rounded-md py-1 mx-auto block focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold">VS</div>
                    <div className="flex-1 text-center">
                      <div className="text-xl mb-1">{match.awayFlag}</div>
                      <div className="text-xs font-bold text-gray-700 mb-1">{match.awayTeam}</div>
                      <input
                        type="number"
                        min="0"
                        max="15"
                        value={pred.away}
                        onChange={(e) => handleScore(match.id, "away", e.target.value)}
                        className="w-10 text-center text-sm font-bold border border-green-200 rounded-md py-1 mx-auto block focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-200 p-3">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-green-700 to-green-600 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
              >
                📤 提交竞猜 ({Object.keys(predictions).length} 场)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
