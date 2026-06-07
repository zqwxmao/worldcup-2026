#!/usr/bin/env node
// generate-data.js — 从 SQLite 数据库读取数据，生成 src/data/ 下的 .ts 文件
// 在 next build 之前运行

const Database = require("better-sqlite3")
const fs = require("fs")
const path = require("path")

const DB_PATH = path.join(__dirname, "..", "data", "worldcup.db")
const DATA_DIR = path.join(__dirname, "..", "src", "data")

const db = new Database(DB_PATH, { readonly: true })

function generateMatchesFile() {
  const rows = db.prepare("SELECT * FROM matches ORDER BY id").all()

  const matchesJson = JSON.stringify(rows.map(r => {
    const m = {
      id: r.id,
      homeTeam: r.home_team,
      awayTeam: r.away_team,
      homeFlag: r.home_flag,
      awayFlag: r.away_flag,
      group: r.group_name,
      round: r.round_name,
      matchTime: r.match_time,
      status: r.status,
    }
    if (r.home_score !== null) m.homeScore = r.home_score
    if (r.away_score !== null) m.awayScore = r.away_score
    if (r.stadium) m.stadium = r.stadium
    return m
  }), null, 2)

  const groups = db.prepare("SELECT group_name, name, flag FROM teams ORDER BY group_name, id").all()
  const groupsMap = {}
  for (const g of groups) {
    const key = g.group_name
    if (!groupsMap[key]) groupsMap[key] = []
    groupsMap[key].push({ team: g.name, flag: g.flag })
  }

  const groupsTs = Object.entries(groupsMap).map(([k, v]) => {
    const teamsStr = v.map(t => `    { team: "${t.team}", flag: "${t.flag}" }`).join(",\n")
    return `  "${k}": [\n${teamsStr}\n  ]`
  }).join(",\n")

  const content = `// 此文件由 scripts/generate-data.js 自动生成
// 数据源: data/worldcup.db (SQLite)
// 手动修改将被覆盖！请修改数据库或 seed 脚本。

export interface Match {
  id: number
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  group: string
  round: string
  matchTime: string
  status: "scheduled" | "live" | "finished"
  homeScore?: number
  awayScore?: number
  stadium?: string
}

export const groups: Record<string, { team: string; flag: string }[]> = {
${groupsTs}
}

export const allMatches: Match[] = ${matchesJson}

export function getMatchesByGroup(group: string): Match[] {
  return allMatches.filter((m) => m.group === \`第\${group}组\`)
}

export function getMatchesByRound(round: string): Match[] {
  return allMatches.filter((m) => m.round === round)
}
`

  fs.writeFileSync(path.join(DATA_DIR, "matches.ts"), content)
  console.log(`  ✓ matches.ts (${rows.length} matches, ${Object.keys(groupsMap).length} groups)`)
}

function generateCardsFile() {
  const rows = db.prepare("SELECT * FROM player_cards ORDER BY id").all()

  const cardsTs = rows.map(r => {
    const desc = r.description || ""
    let weight = 60
    if (r.rarity === "legendary") weight = 3
    else if (r.rarity === "rare") weight = 10
    else if (r.rarity === "elite") weight = 28
    return `  { id: ${r.id}, name: "${r.name}", flag: "${r.flag}", country: "${r.country}", position: "${r.position}", rarity: "${r.rarity}", rating: ${r.rating}, team: "${r.team}", description: "${desc}", packWeight: ${weight} }`
  }).join(",\n")

  const content = `// 此文件由 scripts/generate-data.js 自动生成
// 数据源: data/worldcup.db (SQLite)

export interface PlayerCard {
  id: number
  name: string
  flag: string
  country: string
  position: string
  rarity: "legendary" | "rare" | "elite" | "common"
  rating: number
  team: string
  description: string
  packWeight: number
}

export const allCards: PlayerCard[] = [
${cardsTs}
]

export const cardsByRarity = {
  legendary: allCards.filter(c => c.rarity === "legendary"),
  rare: allCards.filter(c => c.rarity === "rare"),
  elite: allCards.filter(c => c.rarity === "elite"),
  common: allCards.filter(c => c.rarity === "common"),
}

export function getCardsByCountry(country: string): PlayerCard[] {
  return allCards.filter(c => c.country === country)
}

export function openPack(): { cards: PlayerCard[]; highlight: PlayerCard } {
  const pack: PlayerCard[] = []
  const totalWeight = allCards.reduce((s, c) => s + c.packWeight, 0)
  for (let i = 0; i < 5; i++) {
    let rand = Math.random() * totalWeight
    let card = allCards[0]
    for (const c of allCards) {
      rand -= c.packWeight
      if (rand <= 0) { card = c; break }
    }
    pack.push(card)
  }
  const highlight = pack.reduce((best, c) => c.rating > best.rating ? c : best, pack[0])
  return { cards: pack, highlight }
}
`

  fs.writeFileSync(path.join(DATA_DIR, "cards.ts"), content)
  console.log(`  ✓ cards.ts (${rows.length} cards)`)
}

function generateLeaderboardFile() {
  const rows = db.prepare("SELECT * FROM leaderboard ORDER BY score DESC").all()

  const entries = rows.map((r, i) => {
    const badges = JSON.parse(r.badges || "[]")
    return `  { rank: ${i + 1}, name: "${r.name}", avatar: "${r.avatar}", score: ${r.score}, correctRate: ${r.correct_rate}, badges: ${JSON.stringify(badges)} }`
  }).join(",\n")

  const content = `// 此文件由 scripts/generate-data.js 自动生成
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
${entries}
]

export const weeklyLeaderboard: LeaderboardEntry[] = leaderboardData.map(e => ({
  ...e,
  score: Math.floor(e.score * (0.4 + Math.random() * 0.3)),
}))
`

  fs.writeFileSync(path.join(DATA_DIR, "leaderboard.ts"), content)
  console.log(`  ✓ leaderboard.ts (${rows.length} entries)`)
}

function generateCommunityFile() {
  const rows = db.prepare("SELECT * FROM community_posts ORDER BY id").all()

  const posts = rows.map(r => {
    const tags = JSON.parse(r.tags || "[]")
    return `  { id: ${r.id}, user: "${r.user_name}", avatar: "${r.avatar}", content: ${JSON.stringify(r.content)}, likes: ${r.likes}, comments: ${r.comments}, time: "${r.time_text}", tags: ${JSON.stringify(tags)} }`
  }).join(",\n")

  const content = `// 此文件由 scripts/generate-data.js 自动生成
// 数据源: data/worldcup.db (SQLite)

export interface CommunityPost {
  id: number
  user: string
  avatar: string
  content: string
  likes: number
  comments: number
  time: string
  tags: string[]
}

export const communityPosts: CommunityPost[] = [
${posts}
]
`

  fs.writeFileSync(path.join(DATA_DIR, "community.ts"), content)
  console.log(`  ✓ community.ts (${rows.length} posts)`)
}

console.log("Generating data files from SQLite database...")
generateMatchesFile()
generateCardsFile()
generateLeaderboardFile()
generateCommunityFile()
console.log("✅ All data files generated successfully!")

db.close()
