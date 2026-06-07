"use client"

import { usePathname } from "next/navigation"
import type { Metadata } from "next"
import "./globals.css"

const navItems = [
  { label: "首页", href: "/", icon: "⚽" },
  { label: "赛程", href: "/matches", icon: "📅" },
  { label: "竞猜", href: "/predict", icon: "⚡" },
  { label: "卡牌", href: "/cards", icon: "🃏" },
  { label: "排行", href: "/leaderboard", icon: "🏆" },
  { label: "社区", href: "/community", icon: "💬" },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-green-50">
        {/* 顶部导航 - 只显示首页logo */}
        <nav className="sticky top-0 z-40 bg-white border-b border-green-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-3 h-12 flex items-center justify-between">
            <a href="/" className="font-extrabold text-lg tracking-wide">
              <span className="text-green-700">⚽ 2026</span>
              <span className="text-green-900"> 世界杯</span>
            </a>
            <a href="/cards" className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full">
              🎁 免费开卡包
            </a>
          </div>
        </nav>

        {children}

        {/* 底部 Tab Bar */}
        <BottomNav />
      </body>
    </html>
  )
}

function BottomNav() {
  const pathname = usePathname()
  const basePath = "/worldcup-2026"

  // 这个处理在 client side 取相对路径
  const relativePath = pathname.replace(basePath, "") || "/"
  const currentPath = relativePath === "/" ? "/" : relativePath.endsWith("/") ? relativePath.slice(0, -1) : relativePath

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-200 z-40">
      <div className="max-w-4xl mx-auto flex justify-around items-center h-14">
        {navItems.map((item) => {
          const isActive = item.href === "/"
            ? currentPath === "/"
            : currentPath.startsWith(item.href)
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 transition-all ${
                isActive ? "text-green-700 scale-105" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className={`text-[9px] font-semibold ${isActive ? "text-green-700" : "text-gray-400"}`}>
                {item.label}
              </span>
              {isActive && <div className="w-4 h-0.5 bg-green-700 rounded-full mt-0.5" />}
            </a>
          )
        })}
      </div>
    </div>
  )
}
