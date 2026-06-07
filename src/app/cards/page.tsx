"use client"

import { useState } from "react"
import { allCards, openPack } from "@/data/cards"
import type { PlayerCard } from "@/data/cards"

export const dynamic = "force-static"

const rarityLabels: Record<string, string> = {
  legendary: "⭐ 传奇",
  rare: "🔥 稀有",
  elite: "💎 精英",
  common: "⚽ 普通",
}

const rarityColors: Record<string, string> = {
  legendary: "from-yellow-300 via-yellow-200 to-yellow-100 border-yellow-500 text-yellow-900",
  rare: "from-blue-300 via-blue-200 to-blue-100 border-blue-500 text-blue-900",
  elite: "from-purple-300 via-purple-200 to-purple-100 border-purple-500 text-purple-900",
  common: "from-green-200 via-green-100 to-green-50 border-green-400 text-green-900",
}

const rarityStars: Record<string, string> = {
  legendary: "⭐⭐⭐⭐⭐",
  rare: "⭐⭐⭐⭐",
  elite: "⭐⭐⭐",
  common: "⭐⭐",
}

const rarityBorder: Record<string, string> = {
  legendary: "ring-2 ring-yellow-400 ring-offset-2",
  rare: "ring-2 ring-blue-400 ring-offset-2",
  elite: "ring-2 ring-purple-400 ring-offset-1",
  common: "",
}

export default function CardsPage() {
  const [collection, setCollection] = useState<PlayerCard[]>([])
  const [lastPack, setLastPack] = useState<{ cards: PlayerCard[]; highlight: PlayerCard } | null>(null)
  const [showAnimation, setShowAnimation] = useState(false)
  const [filter, setFilter] = useState<string>("all")

  const handleOpenPack = () => {
    setShowAnimation(true)
    setTimeout(() => {
      const pack = openPack()
      setLastPack(pack)
      setCollection(prev => [...pack.cards, ...prev])
      setShowAnimation(false)
    }, 1000)
  }

  const filteredCollection = filter === "all"
    ? collection
    : collection.filter(c => c.rarity === filter)

  const rarityCounts = {
    legendary: collection.filter(c => c.rarity === "legendary").length,
    rare: collection.filter(c => c.rarity === "rare").length,
    elite: collection.filter(c => c.rarity === "elite").length,
    common: collection.filter(c => c.rarity === "common").length,
  }

  return (
    <div className="max-w-4xl mx-auto px-3 py-4 pb-20">
      <h1 className="text-xl font-extrabold text-green-900 mb-1">🃏 球星卡</h1>
      <p className="text-xs text-gray-500 mb-3">收集世界杯球星卡，组成你的梦幻阵容</p>

      {/* 收藏统计 */}
      <div className="bg-white rounded-xl border border-green-200 p-3 shadow-sm mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-green-900">我的收藏</span>
          <span className="text-xs text-gray-400">{collection.length} / {allCards.length} 张</span>
        </div>
        <div className="flex gap-2 text-[10px]">
          <span className="text-yellow-600">⭐ 传奇 {rarityCounts.legendary}</span>
          <span className="text-blue-600">🔥 稀有 {rarityCounts.rare}</span>
          <span className="text-purple-600">💎 精英 {rarityCounts.elite}</span>
          <span className="text-green-600">⚽ 普通 {rarityCounts.common}</span>
        </div>
        {/* 进度条 */}
        <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-green-500 to-green-700 rounded-full transition-all"
            style={{ width: `${(collection.length / allCards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 开卡包 */}
      <button
        onClick={handleOpenPack}
        disabled={showAnimation}
        className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg transition-all mb-4 ${
          showAnimation
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-xl hover:from-yellow-400 hover:to-orange-400"
        }`}
      >
        {showAnimation ? "🎴 开包中..." : "🎁 开启卡包 (免费)"}
      </button>

      {/* 开包动画 */}
      {showAnimation && (
        <div className="text-center py-10">
          <div className="text-4xl animate-bounce">🎴</div>
          <p className="text-sm text-gray-400 mt-2">正在为你开启卡包...</p>
        </div>
      )}

      {/* 最新卡包展示 */}
      {lastPack && !showAnimation && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-green-900">🎴 最新卡包</h3>
            <span className="text-[10px] text-green-600 font-semibold">
              ✨ 最高 {lastPack.highlight.rating} 分 · {rarityLabels[lastPack.highlight.rarity]}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {lastPack.cards.map((card, i) => (
              <div
                key={i}
                className={`aspect-[3/4] rounded-lg p-1.5 text-center bg-gradient-to-b ${rarityColors[card.rarity]} border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md ${
                  card.id === lastPack.highlight.id ? rarityBorder[card.rarity] : ""
                }`}
              >
                <div className="text-lg mt-0.5">{card.flag}</div>
                <div className="text-[8px] font-bold leading-tight mt-0.5">{card.name}</div>
                <div className="text-[7px] mt-0.5">{rarityStars[card.rarity]}</div>
                <div className="text-[7px] font-bold mt-auto">{card.rating}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 稀有度筛选 */}
      <div className="flex gap-1.5 mb-3 overflow-x-auto">
        {["all", "legendary", "rare", "elite", "common"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all ${
              filter === f
                ? "bg-green-700 text-white"
                : "bg-white border border-green-200 text-gray-500 hover:bg-green-50"
            }`}
          >
            {f === "all" ? "全部" : rarityLabels[f]}
          </button>
        ))}
      </div>

      {/* 收藏列表 */}
      {filteredCollection.length > 0 ? (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {filteredCollection.map((card, i) => (
            <div
              key={`${card.id}-${i}`}
              className={`aspect-[3/4] rounded-lg p-1.5 text-center bg-gradient-to-b ${rarityColors[card.rarity]} border cursor-pointer hover:-translate-y-0.5 transition-all`}
            >
              <div className="text-lg mt-0.5">{card.flag}</div>
              <div className="text-[8px] font-bold leading-tight mt-0.5">{card.name}</div>
              <div className="text-[6px] text-gray-500 mt-0.5">{card.country}</div>
              <div className="text-[6px] mt-0.5">{rarityStars[card.rarity]}</div>
              <div className="text-[8px] font-bold mt-auto">{card.rating}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400 text-sm">
          {collection.length === 0
            ? "还没有卡片哦，点击上方开启卡包 🎁"
            : "没有该稀有度的卡片"}
        </div>
      )}
    </div>
  )
}
