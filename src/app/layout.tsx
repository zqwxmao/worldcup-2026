import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "2026 世界杯 · 绿茵竞技场",
  description: "2026 FIFA 世界杯球迷互动站 — 赛程、竞猜、球星卡、排行、社区",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        <nav className="sticky top-0 z-50 bg-white border-b border-pitch-border">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="text-xl font-extrabold tracking-wide">
              <span className="text-pitch">⚽ 2026</span>
              <span className="text-pitch-dark"> 世界杯</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="/" className="text-sm font-semibold text-pitch border-b-2 border-pitch pb-1">首页</a>
              <a href="/matches" className="text-sm text-pitch-muted hover:text-pitch transition-colors">赛程</a>
              <a href="/predict" className="text-sm text-pitch-muted hover:text-pitch transition-colors">竞猜</a>
              <a href="/cards" className="text-sm text-pitch-muted hover:text-pitch transition-colors">卡牌</a>
              <a href="/leaderboard" className="text-sm text-pitch-muted hover:text-pitch transition-colors">排行</a>
              <a href="/community" className="text-sm text-pitch-muted hover:text-pitch transition-colors">社区</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-pitch-gold bg-amber-50 px-3 py-1 rounded-full">🏆 0</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pitch to-pitch-light flex items-center justify-center text-white text-sm font-bold">G</div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
