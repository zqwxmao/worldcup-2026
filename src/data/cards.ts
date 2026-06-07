// 2026 世界杯球星卡数据 - 46 张真实球员卡
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
  packWeight: number // 抽卡权重（越低越稀有）
}

// 权重设计：legendary ~2%, rare ~8%, elite ~25%, common ~65%
export const allCards: PlayerCard[] = [
  // ⭐⭐ 传奇 (6张 - 2%)
  { id: 1, name: "梅西", flag: "🇦🇷", country: "阿根廷", position: "前锋", rarity: "legendary", rating: 96, team: "迈阿密国际", description: "八座金球奖得主，2022世界杯冠军领袖，足球史上最伟大的球员之一", packWeight: 2 },
  { id: 2, name: "C罗", flag: "🇵🇹", country: "葡萄牙", position: "前锋", rarity: "legendary", rating: 95, team: "利雅得胜利", description: "五座金球奖，欧冠历史射手王，足坛永动机", packWeight: 2 },
  { id: 3, name: "姆巴佩", flag: "🇫🇷", country: "法国", position: "前锋", rarity: "legendary", rating: 94, team: "皇家马德里", description: "新一代球王候选，2018世界杯冠军，速度与技术的完美结合", packWeight: 3 },
  { id: 4, name: "哈兰德", flag: "🇳🇴", country: "挪威", position: "前锋", rarity: "legendary", rating: 93, team: "曼城", description: "进球机器，北欧怪兽，英超单赛季进球纪录保持者", packWeight: 3 },
  { id: 5, name: "德布劳内", flag: "🇧🇪", country: "比利时", position: "中场", rarity: "legendary", rating: 92, team: "曼城", description: "世界第一中场大师，传球视野无与伦比的组织核心", packWeight: 3 },
  { id: 6, name: "内马尔", flag: "🇧🇷", country: "巴西", position: "前锋", rarity: "legendary", rating: 91, team: "利雅得新月", description: "桑巴足球最后的舞者，华丽技巧与创造力的代名词", packWeight: 3 },

  // 🔥 稀有 (12张 - 8%)
  { id: 7, name: "维尼修斯", flag: "🇧🇷", country: "巴西", position: "边锋", rarity: "rare", rating: 90, team: "皇家马德里", description: "皇马新一代爆点，边路突破无人能挡", packWeight: 8 },
  { id: 8, name: "贝林厄姆", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", country: "英格兰", position: "中场", rarity: "rare", rating: 90, team: "皇家马德里", description: "全能中场，英格兰新生代领袖", packWeight: 8 },
  { id: 9, name: "萨拉赫", flag: "🇪🇬", country: "埃及", position: "边锋", rarity: "rare", rating: 89, team: "利物浦", description: "埃及法老，红军传奇射手", packWeight: 8 },
  { id: 10, name: "凯恩", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", country: "英格兰", position: "前锋", rarity: "rare", rating: 89, team: "拜仁慕尼黑", description: "英格兰队史射手王，全能中锋", packWeight: 8 },
  { id: 11, name: "莱万", flag: "🇵🇱", country: "波兰", position: "前锋", rarity: "rare", rating: 88, team: "巴塞罗那", description: "波兰神锋，两届世界足球先生", packWeight: 8 },
  { id: 12, name: "格列兹曼", flag: "🇫🇷", country: "法国", position: "前锋", rarity: "rare", rating: 88, team: "马德里竞技", description: "法国核心，2018世界杯冠军功臣", packWeight: 10 },
  { id: 13, name: "穆西亚拉", flag: "🇩🇪", country: "德国", position: "中场", rarity: "rare", rating: 88, team: "拜仁慕尼黑", description: "德国新天才，盘带魔术师", packWeight: 10 },
  { id: 14, name: "福登", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", country: "英格兰", position: "中场", rarity: "rare", rating: 87, team: "曼城", description: "曼城青训瑰宝，英超最佳年轻球员", packWeight: 10 },
  { id: 15, name: "劳塔罗", flag: "🇦🇷", country: "阿根廷", position: "前锋", rarity: "rare", rating: 87, team: "国际米兰", description: "阿根廷锋线尖刀，国米队长", packWeight: 10 },
  { id: 16, name: "巴尔韦德", flag: "🇺🇾", country: "乌拉圭", position: "中场", rarity: "rare", rating: 87, team: "皇家马德里", description: "乌拉圭全能战士，B2B中场", packWeight: 10 },
  { id: 17, name: "罗德里", flag: "🇪🇸", country: "西班牙", position: "后腰", rarity: "rare", rating: 87, team: "曼城", description: "世界第一后腰，金球奖得主", packWeight: 10 },
  { id: 18, name: "维尔茨", flag: "🇩🇪", country: "德国", position: "中场", rarity: "rare", rating: 86, team: "勒沃库森", description: "德国新核，药厂天才指挥官", packWeight: 12 },

  // 💎 精英 (15张 - 25%)
  { id: 19, name: "亚马尔", flag: "🇪🇸", country: "西班牙", position: "边锋", rarity: "elite", rating: 85, team: "巴塞罗那", description: "史上最年轻欧洲杯冠军，拉玛西亚新瑰宝", packWeight: 25 },
  { id: 20, name: "佩德里", flag: "🇪🇸", country: "西班牙", position: "中场", rarity: "elite", rating: 85, team: "巴塞罗那", description: "西班牙新大脑，科曼式节拍器", packWeight: 25 },
  { id: 21, name: "加维", flag: "🇪🇸", country: "西班牙", position: "中场", rarity: "elite", rating: 84, team: "巴塞罗那", description: "金童奖得主，斗牛士中场新核", packWeight: 25 },
  { id: 22, name: "萨卡", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", country: "英格兰", position: "边锋", rarity: "elite", rating: 85, team: "阿森纳", description: "枪王之王，三狮军团右路王牌", packWeight: 25 },
  { id: 23, name: "楚阿梅尼", flag: "🇫🇷", country: "法国", position: "后腰", rarity: "elite", rating: 84, team: "皇家马德里", description: "法国新一代铁腰", packWeight: 25 },
  { id: 24, name: "卡马文加", flag: "🇫🇷", country: "法国", position: "中场", rarity: "elite", rating: 83, team: "皇家马德里", description: "法国全能中场，多面手", packWeight: 28 },
  { id: 25, name: "库尔图瓦", flag: "🇧🇪", country: "比利时", position: "门将", rarity: "elite", rating: 84, team: "皇家马德里", description: "世界第一门将身高臂长", packWeight: 25 },
  { id: 26, name: "范戴克", flag: "🇳🇱", country: "荷兰", position: "后卫", rarity: "elite", rating: 84, team: "利物浦", description: "荷兰后防领袖，铁血中卫", packWeight: 25 },
  { id: 27, name: "阿方索·戴维斯", flag: "🇨🇦", country: "加拿大", position: "边卫", rarity: "elite", rating: 83, team: "拜仁慕尼黑", description: "加拿大闪电，世界第一左后卫候选", packWeight: 28 },
  { id: 28, name: "普利西奇", flag: "🇺🇸", country: "美国", position: "边锋", rarity: "elite", rating: 82, team: "AC米兰", description: "美国队长，北美足球旗帜", packWeight: 28 },
  { id: 29, name: "孙兴慜", flag: "🇰🇷", country: "韩国", position: "边锋", rarity: "elite", rating: 83, team: "热刺", description: "亚洲足球天王，英超金靴得主", packWeight: 28 },
  { id: 30, name: "三笘薰", flag: "🇯🇵", country: "日本", position: "边锋", rarity: "elite", rating: 82, team: "布莱顿", description: "日本最强边锋，盘带突破高手", packWeight: 28 },
  { id: 31, name: "库库雷利亚", flag: "🇪🇸", country: "西班牙", position: "边卫", rarity: "elite", rating: 81, team: "切尔西", description: "欧洲杯冠军左后卫", packWeight: 30 },
  { id: 32, name: "吉鲁", flag: "🇫🇷", country: "法国", position: "前锋", rarity: "elite", rating: 82, team: "AC米兰", description: "法国历史射手王，老而弥坚", packWeight: 30 },
  { id: 33, name: "恩佐", flag: "🇦🇷", country: "阿根廷", position: "中场", rarity: "elite", rating: 83, team: "切尔西", description: "阿根廷世界杯冠军中场核心", packWeight: 28 },

  // 💎 精英 (续 - 约13张)
  { id: 34, name: "久保建英", flag: "🇯🇵", country: "日本", position: "边锋", rarity: "elite", rating: 81, team: "皇家社会", description: "日本梅西，西甲过人王", packWeight: 30 },
  { id: 35, name: "埃贝尔", flag: "🇧🇷", country: "巴西", position: "前锋", rarity: "elite", rating: 84, team: "波尔图", description: "巴西新一代9号，欧陆新宠", packWeight: 28 },

  // 首发/常见 (13张 - 65%)
  { id: 36, name: "麦卡利斯特", flag: "🇦🇷", country: "阿根廷", position: "中场", rarity: "common", rating: 80, team: "利物浦", description: "阿根廷世界杯冠军中场", packWeight: 60 },
  { id: 37, name: "拉什福德", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", country: "英格兰", position: "前锋", rarity: "common", rating: 79, team: "曼联", description: "拉师傅，红魔青训瑰宝", packWeight: 65 },
  { id: 38, name: "克里斯蒂安·罗梅罗", flag: "🇦🇷", country: "阿根廷", position: "后卫", rarity: "common", rating: 79, team: "热刺", description: "阿根廷铁血中卫", packWeight: 65 },
  { id: 39, name: "迪马利亚", flag: "🇦🇷", country: "阿根廷", position: "边锋", rarity: "common", rating: 78, team: "本菲卡", description: "迪天使，决赛之王", packWeight: 65 },
  { id: 40, name: "格雷利什", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", country: "英格兰", position: "边锋", rarity: "common", rating: 78, team: "曼城", description: "曼城盘带高手", packWeight: 65 },
  { id: 41, name: "基米希", flag: "🇩🇪", country: "德国", position: "中场", rarity: "common", rating: 80, team: "拜仁慕尼黑", description: "德国战车驱动器", packWeight: 60 },
  { id: 42, name: "京多安", flag: "🇩🇪", country: "德国", position: "中场", rarity: "common", rating: 78, team: "巴塞罗那", description: "德国中场大脑", packWeight: 65 },
  { id: 43, name: "B席", flag: "🇵🇹", country: "葡萄牙", position: "中场", rarity: "common", rating: 80, team: "曼城", description: "葡萄牙魔术师", packWeight: 60 },
  { id: 44, name: "奥尔莫", flag: "🇪🇸", country: "西班牙", position: "中场", rarity: "common", rating: 79, team: "巴塞罗那", description: "欧洲杯射手王", packWeight: 65 },
  { id: 45, name: "特奥·埃尔南德斯", flag: "🇫🇷", country: "法国", position: "边卫", rarity: "common", rating: 79, team: "AC米兰", description: "法国左路快马", packWeight: 65 },
  { id: 46, name: "科曼", flag: "🇫🇷", country: "法国", position: "边锋", rarity: "common", rating: 78, team: "拜仁慕尼黑", description: "法国边路飞翼", packWeight: 65 },
]

// 按稀有度分组
export const cardsByRarity = {
  legendary: allCards.filter(c => c.rarity === "legendary"),
  rare: allCards.filter(c => c.rarity === "rare"),
  elite: allCards.filter(c => c.rarity === "elite"),
  common: allCards.filter(c => c.rarity === "common"),
}

// 按国家分组
export function getCardsByCountry(country: string): PlayerCard[] {
  return allCards.filter(c => c.country === country)
}

// 开卡包（随机抽 5 张）
export function openPack(): { cards: PlayerCard[]; highlight: PlayerCard } {
  const pack: PlayerCard[] = []
  for (let i = 0; i < 5; i++) {
    const rand = Math.random() * 100
    let card: PlayerCard | undefined
    const pool = rand < 2 ? cardsByRarity.legendary
      : rand < 10 ? cardsByRarity.rare
      : rand < 35 ? cardsByRarity.elite
      : cardsByRarity.common
    card = pool[Math.floor(Math.random() * pool.length)]
    pack.push(card!)
  }
  const highlight = pack.reduce((best, c) => c.rating > best.rating ? c : best, pack[0])
  return { cards: pack, highlight }
}
