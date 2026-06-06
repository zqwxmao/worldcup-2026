import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const matches = [
  // Group A
  { homeTeam: "美国", awayTeam: "加拿大", homeFlag: "🇺🇸", awayFlag: "🇨🇦", group: "A", matchTime: new Date("2026-06-12T13:00:00Z"), status: "scheduled" },
  { homeTeam: "墨西哥", awayTeam: "韩国", homeFlag: "🇲🇽", awayFlag: "🇰🇷", group: "A", matchTime: new Date("2026-06-12T16:00:00Z"), status: "scheduled" },
  // Group B
  { homeTeam: "巴西", awayTeam: "葡萄牙", homeFlag: "🇧🇷", awayFlag: "🇵🇹", group: "B", matchTime: new Date("2026-06-13T13:00:00Z"), status: "scheduled" },
  { homeTeam: "法国", awayTeam: "摩洛哥", homeFlag: "🇫🇷", awayFlag: "🇲🇦", group: "B", matchTime: new Date("2026-06-13T16:00:00Z"), status: "scheduled" },
  // Group C
  { homeTeam: "阿根廷", awayTeam: "英格兰", homeFlag: "🇦🇷", awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "C", matchTime: new Date("2026-06-14T13:00:00Z"), status: "scheduled" },
  { homeTeam: "西班牙", awayTeam: "德国", homeFlag: "🇪🇸", awayFlag: "🇩🇪", group: "C", matchTime: new Date("2026-06-14T16:00:00Z"), status: "scheduled" },
  // Group D
  { homeTeam: "荷兰", awayTeam: "比利时", homeFlag: "🇳🇱", awayFlag: "🇧🇪", group: "D", matchTime: new Date("2026-06-13T19:00:00Z"), status: "scheduled" },
  { homeTeam: "日本", awayTeam: "克罗地亚", homeFlag: "🇯🇵", awayFlag: "🇭🇷", group: "D", matchTime: new Date("2026-06-12T19:00:00Z"), status: "scheduled" },
  // Group E
  { homeTeam: "意大利", awayTeam: "乌拉圭", homeFlag: "🇮🇹", awayFlag: "🇺🇾", group: "E", matchTime: new Date("2026-06-14T19:00:00Z"), status: "scheduled" },
  { homeTeam: "塞内加尔", awayTeam: "丹麦", homeFlag: "🇸🇳", awayFlag: "🇩🇰", group: "E", matchTime: new Date("2026-06-15T13:00:00Z"), status: "scheduled" },
  // Group F
  { homeTeam: "瑞士", awayTeam: "塞尔维亚", homeFlag: "🇨🇭", awayFlag: "🇷🇸", group: "F", matchTime: new Date("2026-06-15T16:00:00Z"), status: "scheduled" },
  { homeTeam: "澳大利亚", awayTeam: "厄瓜多尔", homeFlag: "🇦🇺", awayFlag: "🇪🇨", group: "F", matchTime: new Date("2026-06-15T19:00:00Z"), status: "scheduled" },
  // Group G
  { homeTeam: "哥伦比亚", awayTeam: "尼日利亚", homeFlag: "🇨🇴", awayFlag: "🇳🇬", group: "G", matchTime: new Date("2026-06-16T13:00:00Z"), status: "scheduled" },
  { homeTeam: "埃及", awayTeam: "波兰", homeFlag: "🇪🇬", awayFlag: "🇵🇱", group: "G", matchTime: new Date("2026-06-16T16:00:00Z"), status: "scheduled" },
  // Group H
  { homeTeam: "智利", awayTeam: "苏格兰", homeFlag: "🇨🇱", awayFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "H", matchTime: new Date("2026-06-16T19:00:00Z"), status: "scheduled" },
  { homeTeam: "加纳", awayTeam: "挪威", homeFlag: "🇬🇭", awayFlag: "🇳🇴", group: "H", matchTime: new Date("2026-06-17T13:00:00Z"), status: "scheduled" },
  // some demo matches set to today/live
  { homeTeam: "阿根廷", awayTeam: "巴西", homeFlag: "🇦🇷", awayFlag: "🇧🇷", group: "A", matchTime: new Date(), status: "live", homeScore: 1, awayScore: 0 },
  { homeTeam: "法国", awayTeam: "英格兰", homeFlag: "🇫🇷", awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "B", matchTime: new Date(Date.now() + 2 * 60 * 60 * 1000), status: "scheduled" },
  { homeTeam: "德国", awayTeam: "葡萄牙", homeFlag: "🇩🇪", awayFlag: "🇵🇹", group: "C", matchTime: new Date(Date.now() + 5 * 60 * 60 * 1000), status: "scheduled" },
  { homeTeam: "西班牙", awayTeam: "荷兰", homeFlag: "🇪🇸", awayFlag: "🇳🇱", group: "B", matchTime: new Date(Date.now() - 2 * 60 * 60 * 1000), status: "finished", homeScore: 2, awayScore: 1 },
]

const playerCards = [
  // Legendary (10)
  { name: "梅西", country: "阿根廷", countryFlag: "🇦🇷", rarity: "legendary", position: "FW" },
  { name: "C罗", country: "葡萄牙", countryFlag: "🇵🇹", rarity: "legendary", position: "FW" },
  { name: "姆巴佩", country: "法国", countryFlag: "🇫🇷", rarity: "legendary", position: "FW" },
  { name: "内马尔", country: "巴西", countryFlag: "🇧🇷", rarity: "legendary", position: "FW" },
  { name: "德布劳内", country: "比利时", countryFlag: "🇧🇪", rarity: "legendary", position: "MF" },
  { name: "萨拉赫", country: "埃及", countryFlag: "🇪🇬", rarity: "legendary", position: "FW" },
  { name: "莱万", country: "波兰", countryFlag: "🇵🇱", rarity: "legendary", position: "FW" },
  { name: "凯恩", country: "英格兰", countryFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rarity: "legendary", position: "FW" },
  { name: "维尼修斯", country: "巴西", countryFlag: "🇧🇷", rarity: "legendary", position: "FW" },
  { name: "贝林厄姆", country: "英格兰", countryFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rarity: "legendary", position: "MF" },
  // Rare (30) - sample
  { name: "亚马尔", country: "西班牙", countryFlag: "🇪🇸", rarity: "rare", position: "FW" },
  { name: "佩德里", country: "西班牙", countryFlag: "🇪🇸", rarity: "rare", position: "MF" },
  { name: "加维", country: "西班牙", countryFlag: "🇪🇸", rarity: "rare", position: "MF" },
  { name: "福登", country: "英格兰", countryFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rarity: "rare", position: "FW" },
  { name: "萨卡", country: "英格兰", countryFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rarity: "rare", position: "FW" },
  { name: "穆夏拉", country: "德国", countryFlag: "🇩🇪", rarity: "rare", position: "MF" },
  { name: "维尔茨", country: "德国", countryFlag: "🇩🇪", rarity: "rare", position: "MF" },
  { name: "哈兰德", country: "挪威", countryFlag: "🇳🇴", rarity: "rare", position: "FW" },
  { name: "巴尔韦德", country: "乌拉圭", countryFlag: "🇺🇾", rarity: "rare", position: "MF" },
  { name: "劳塔罗", country: "阿根廷", countryFlag: "🇦🇷", rarity: "rare", position: "FW" },
  { name: "阿尔瓦雷斯", country: "阿根廷", countryFlag: "🇦🇷", rarity: "rare", position: "FW" },
  { name: "拉菲尼亚", country: "巴西", countryFlag: "🇧🇷", rarity: "rare", position: "FW" },
  { name: "罗德里戈", country: "巴西", countryFlag: "🇧🇷", rarity: "rare", position: "FW" },
  { name: "楚阿梅尼", country: "法国", countryFlag: "🇫🇷", rarity: "rare", position: "MF" },
  { name: "卡马文加", country: "法国", countryFlag: "🇫🇷", rarity: "rare", position: "MF" },
  { name: "琼阿梅尼", country: "法国", countryFlag: "🇫🇷", rarity: "rare", position: "DF" },
  // Common (60) - sample
  { name: "孙兴慜", country: "韩国", countryFlag: "🇰🇷", rarity: "common", position: "FW" },
  { name: "李刚仁", country: "韩国", countryFlag: "🇰🇷", rarity: "common", position: "MF" },
  { name: "三笘薰", country: "日本", countryFlag: "🇯🇵", rarity: "common", position: "FW" },
  { name: "久保建英", country: "日本", countryFlag: "🇯🇵", rarity: "common", position: "FW" },
  { name: "普利西奇", country: "美国", countryFlag: "🇺🇸", rarity: "common", position: "FW" },
  { name: "麦肯尼", country: "美国", countryFlag: "🇺🇸", rarity: "common", position: "MF" },
  { name: "戴维斯", country: "加拿大", countryFlag: "🇨🇦", rarity: "common", position: "DF" },
  { name: "戴维", country: "加拿大", countryFlag: "🇨🇦", rarity: "common", position: "FW" },
  { name: "希门尼斯", country: "墨西哥", countryFlag: "🇲🇽", rarity: "common", position: "FW" },
  { name: "洛萨诺", country: "墨西哥", countryFlag: "🇲🇽", rarity: "common", position: "FW" },
  { name: "吉鲁", country: "法国", countryFlag: "🇫🇷", rarity: "common", position: "FW" },
  { name: "格列兹曼", country: "法国", countryFlag: "🇫🇷", rarity: "common", position: "FW" },
  { name: "京多安", country: "德国", countryFlag: "🇩🇪", rarity: "common", position: "MF" },
  { name: "基米希", country: "德国", countryFlag: "🇩🇪", rarity: "common", position: "MF" },
  { name: "范迪克", country: "荷兰", countryFlag: "🇳🇱", rarity: "common", position: "DF" },
  { name: "德容", country: "荷兰", countryFlag: "🇳🇱", rarity: "common", position: "MF" },
  { name: "库尔图瓦", country: "比利时", countryFlag: "🇧🇪", rarity: "common", position: "GK" },
  { name: "B席", country: "葡萄牙", countryFlag: "🇵🇹", rarity: "common", position: "MF" },
  { name: "迪亚斯", country: "葡萄牙", countryFlag: "🇵🇹", rarity: "common", position: "DF" },
  { name: "莫德里奇", country: "克罗地亚", countryFlag: "🇭🇷", rarity: "common", position: "MF" },
]

async function main() {
  console.log("🌱 Seeding database...")

  // Clear existing data
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.prediction.deleteMany()
  await prisma.userCard.deleteMany()
  await prisma.playerCard.deleteMany()
  await prisma.match.deleteMany()

  // Seed matches
  for (const match of matches) {
    await prisma.match.create({ data: match })
  }

  // Seed player cards
  for (const card of playerCards) {
    await prisma.playerCard.create({ data: card })
  }

  console.log(`✅ Seeded ${matches.length} matches`)
  console.log(`✅ Seeded ${playerCards.length} player cards`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
