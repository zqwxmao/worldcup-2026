// 2026 世界杯完整赛程数据
// 48 支队伍，8 个小组（A-H），每组 6 队 → 小组赛每队 3 场

export interface Match {
  id: number
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  group: string
  round: string // "group" | "round32" | "round16" | "quarter" | "semi" | "final"
  matchTime: string // ISO
  status: "scheduled" | "live" | "finished"
  homeScore?: number
  awayScore?: number
  stadium?: string
}

// 2026 世界杯 48 队分组（基于 FIFA 排名 + 各大洲名额）
export const groups: Record<string, { team: string; flag: string }[]> = {
  A: [
    { team: "美国", flag: "🇺🇸" },
    { team: "加拿大", flag: "🇨🇦" },
    { team: "墨西哥", flag: "🇲🇽" },
    { team: "韩国", flag: "🇰🇷" },
    { team: "摩洛哥", flag: "🇲🇦" },
    { team: "新西兰", flag: "🇳🇿" },
  ],
  B: [
    { team: "阿根廷", flag: "🇦🇷" },
    { team: "英格兰", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { team: "克罗地亚", flag: "🇭🇷" },
    { team: "沙特阿拉伯", flag: "🇸🇦" },
    { team: "冰岛", flag: "🇮🇸" },
    { team: "牙买加", flag: "🇯🇲" },
  ],
  C: [
    { team: "法国", flag: "🇫🇷" },
    { team: "荷兰", flag: "🇳🇱" },
    { team: "日本", flag: "🇯🇵" },
    { team: "伊朗", flag: "🇮🇷" },
    { team: "尼日利亚", flag: "🇳🇬" },
    { team: "厄瓜多尔", flag: "🇪🇨" },
  ],
  D: [
    { team: "巴西", flag: "🇧🇷" },
    { team: "德国", flag: "🇩🇪" },
    { team: "葡萄牙", flag: "🇵🇹" },
    { team: "瑞士", flag: "🇨🇭" },
    { team: "澳大利亚", flag: "🇦🇺" },
    { team: "哥斯达黎加", flag: "🇨🇷" },
  ],
  E: [
    { team: "西班牙", flag: "🇪🇸" },
    { team: "意大利", flag: "🇮🇹" },
    { team: "乌拉圭", flag: "🇺🇾" },
    { team: "喀麦隆", flag: "🇨🇲" },
    { team: "伊拉克", flag: "🇮🇶" },
    { team: "加纳", flag: "🇬🇭" },
  ],
  F: [
    { team: "比利时", flag: "🇧🇪" },
    { team: "哥伦比亚", flag: "🇨🇴" },
    { team: "塞尔维亚", flag: "🇷🇸" },
    { team: "阿尔及利亚", flag: "🇩🇿" },
    { team: "巴拉圭", flag: "🇵🇾" },
    { team: "斯洛文尼亚", flag: "🇸🇮" },
  ],
  G: [
    { team: "丹麦", flag: "🇩🇰" },
    { team: "波兰", flag: "🇵🇱" },
    { team: "土耳其", flag: "🇹🇷" },
    { team: "埃及", flag: "🇪🇬" },
    { team: "塞内加尔", flag: "🇸🇳" },
    { team: "阿联酋", flag: "🇦🇪" },
  ],
  H: [
    { team: "智利", flag: "🇨🇱" },
    { team: "奥地利", flag: "🇦🇹" },
    { team: "挪威", flag: "🇳🇴" },
    { team: "捷克", flag: "🇨🇿" },
    { team: "马里", flag: "🇲🇱" },
    { team: "阿曼", flag: "🇴🇲" },
  ],
}

const stadiums = [
  "梅赛德斯-奔驰体育场 (亚特兰大)",
  "大都会体育场 (东卢瑟福)",
  "SoFi体育场 (洛杉矶)",
  "AT&T体育场 (阿灵顿)",
  "箭头体育场 (堪萨斯城)",
  "NRG体育场 (休斯顿)",
  "李维斯体育场 (旧金山)",
  "吉列体育场 (波士顿)",
  "卢蒙体育场 (西雅图)",
  "硬石体育场 (迈阿密)",
  "BC体育馆 (温哥华)",
  "阿兹特克体育场 (墨西哥城)",
]

// 生成小组赛（每组 6 队，每队踢 3 场 = 9 场/组）
function generateGroupMatches(): Match[] {
  const matches: Match[] = []
  let id = 1

  for (const [group, teams] of Object.entries(groups)) {
    // 每组 6 队，每队 3 场 → 9 场
    const fixtures = [
      [0, 1], [2, 3], [4, 5],
      [1, 3], [0, 4], [2, 5],
      [3, 5], [1, 2], [0, 3],
    ]
    const baseDate = new Date("2026-06-11T10:00:00Z")
    const dayOffset = (Object.keys(groups).indexOf(group) * 3) + 1

    fixtures.forEach(([h, a], idx) => {
      const date = new Date(baseDate)
      date.setDate(date.getDate() + dayOffset + Math.floor(idx / 3))
      date.setHours(10 + (idx % 3) * 4)

      matches.push({
        id: id++,
        homeTeam: teams[h].team,
        awayTeam: teams[a].team,
        homeFlag: teams[h].flag,
        awayFlag: teams[a].flag,
        group: `第${group}组`,
        round: "group",
        matchTime: date.toISOString(),
        status: idx === 0 ? "live" : idx < 3 ? "finished" : "scheduled",
        homeScore: idx === 0 ? 1 : idx < 3 ? [2, 1, 3, 0, 1, 1][idx] : undefined,
        awayScore: idx === 0 ? 0 : idx < 3 ? [0, 1, 1, 2, 0, 2][idx] : undefined,
        stadium: stadiums[id % stadiums.length],
      })
    })
  }

  return matches
}

export const allMatches = generateGroupMatches()

export function getMatchesByGroup(group: string): Match[] {
  return allMatches.filter((m) => m.group === `第${group}组`)
}

export function getMatchesByRound(round: string): Match[] {
  return allMatches.filter((m) => m.round === round)
}
