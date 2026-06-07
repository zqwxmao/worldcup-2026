// 此文件由 scripts/generate-data.js 自动生成
// 数据源: data/worldcup.db (SQLite)

export interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string
  score: number
  correctRate: number
  badges: string[]
}

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "绿茵预言家", avatar: "🔮", score: 2460, correctRate: 78, badges: ["👑 冠军","🔥 10连胜"] },
  { rank: 2, name: "足球先知", avatar: "📊", score: 2210, correctRate: 75, badges: ["🥈 亚军","🔥 5连胜"] },
  { rank: 3, name: "梅老板的右脚", avatar: "⚡", score: 1980, correctRate: 72, badges: ["🥉 季军"] },
  { rank: 4, name: "红魔之心", avatar: "🔴", score: 1850, correctRate: 70, badges: ["🔥 3连胜"] },
  { rank: 5, name: "拜仁慕尼黑魂", avatar: "🇩🇪", score: 1720, correctRate: 68, badges: ["🏆 单日最佳"] },
  { rank: 6, name: "阿根廷别哭泣", avatar: "🇦🇷", score: 1680, correctRate: 69, badges: [] },
  { rank: 7, name: "英超通", avatar: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", score: 1590, correctRate: 67, badges: [] },
  { rank: 8, name: "足球小将南葛", avatar: "⚽", score: 1510, correctRate: 66, badges: [] },
  { rank: 9, name: "桑巴舞者", avatar: "🇧🇷", score: 1450, correctRate: 64, badges: [] },
  { rank: 10, name: "高卢雄鸡", avatar: "🇫🇷", score: 1390, correctRate: 63, badges: [] },
  { rank: 11, name: "蓝衣军团", avatar: "🇮🇹", score: 1320, correctRate: 62, badges: [] },
  { rank: 12, name: "斗牛士", avatar: "🇪🇸", score: 1280, correctRate: 61, badges: [] },
  { rank: 13, name: "风之子", avatar: "🌪️", score: 1210, correctRate: 60, badges: [] },
  { rank: 14, name: "无锋不欢", avatar: "🗡️", score: 1150, correctRate: 58, badges: [] },
  { rank: 15, name: "足球哲学家", avatar: "🧠", score: 1080, correctRate: 57, badges: [] },
  { rank: 16, name: "小白球迷", avatar: "🐼", score: 990, correctRate: 55, badges: [] },
  { rank: 17, name: "梅西信徒", avatar: "🐐", score: 920, correctRate: 54, badges: [] },
  { rank: 18, name: "疯狂科学家", avatar: "🔬", score: 860, correctRate: 52, badges: [] },
  { rank: 19, name: "老特拉福德", avatar: "🏟️", score: 780, correctRate: 50, badges: [] },
  { rank: 20, name: "新手上路", avatar: "🌱", score: 650, correctRate: 45, badges: [] }
]

export const weeklyLeaderboard: LeaderboardEntry[] = leaderboardData.map(e => ({
  ...e,
  score: Math.floor(e.score * (0.4 + Math.random() * 0.3)),
}))
