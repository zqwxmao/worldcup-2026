#!/usr/bin/env node
// seed-db.js — 读取 .ts 数据文件，写入 SQLite 数据库
const Database = require("better-sqlite3")
const fs = require("fs")
const path = require("path")

const DB_PATH = path.join(__dirname, "..", "data", "worldcup.db")
const TS_DATA = path.join(__dirname, "..", "src", "data")

// 确保 data 目录存在
fs.mkdirSync(path.join(__dirname, "..", "data"), { recursive: true })

const db = new Database(DB_PATH)
db.pragma("journal_mode = WAL")
db.pragma("foreign_keys = ON")

// 建表
db.exec(`
  CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    flag TEXT NOT NULL,
    group_name TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY,
    home_team TEXT NOT NULL,
    away_team TEXT NOT NULL,
    home_flag TEXT NOT NULL,
    away_flag TEXT NOT NULL,
    group_name TEXT NOT NULL,
    round_name TEXT NOT NULL DEFAULT 'group',
    match_time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'scheduled',
    home_score INTEGER,
    away_score INTEGER,
    stadium TEXT
  );
  CREATE TABLE IF NOT EXISTS player_cards (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    flag TEXT NOT NULL,
    country TEXT NOT NULL,
    position TEXT NOT NULL,
    rarity TEXT NOT NULL,
    rating INTEGER NOT NULL,
    team TEXT NOT NULL,
    description TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    avatar TEXT NOT NULL,
    score INTEGER NOT NULL,
    correct_rate INTEGER NOT NULL DEFAULT 0,
    badges TEXT DEFAULT '[]'
  );
  CREATE TABLE IF NOT EXISTS community_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    avatar TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    time_text TEXT DEFAULT '刚刚',
    tags TEXT DEFAULT '[]'
  );
  CREATE TABLE IF NOT EXISTS schema_version (
    version INTEGER PRIMARY KEY,
    updated_at TEXT NOT NULL
  );
`)

// 删除旧数据
for (const t of ["teams", "matches", "player_cards", "leaderboard", "community_posts"]) {
  db.exec(`DELETE FROM ${t}`)
}

// 写入分组数据
const groups = {
  A: [{team:"美国",flag:"🇺🇸"},{team:"加拿大",flag:"🇨🇦"},{team:"墨西哥",flag:"🇲🇽"},{team:"韩国",flag:"🇰🇷"},{team:"摩洛哥",flag:"🇲🇦"},{team:"新西兰",flag:"🇳🇿"}],
  B: [{team:"阿根廷",flag:"🇦🇷"},{team:"英格兰",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿"},{team:"克罗地亚",flag:"🇭🇷"},{team:"沙特阿拉伯",flag:"🇸🇦"},{team:"冰岛",flag:"🇮🇸"},{team:"牙买加",flag:"🇯🇲"}],
  C: [{team:"法国",flag:"🇫🇷"},{team:"荷兰",flag:"🇳🇱"},{team:"日本",flag:"🇯🇵"},{team:"伊朗",flag:"🇮🇷"},{team:"尼日利亚",flag:"🇳🇬"},{team:"厄瓜多尔",flag:"🇪🇨"}],
  D: [{team:"巴西",flag:"🇧🇷"},{team:"德国",flag:"🇩🇪"},{team:"葡萄牙",flag:"🇵🇹"},{team:"瑞士",flag:"🇨🇭"},{team:"澳大利亚",flag:"🇦🇺"},{team:"哥斯达黎加",flag:"🇨🇷"}],
  E: [{team:"西班牙",flag:"🇪🇸"},{team:"意大利",flag:"🇮🇹"},{team:"乌拉圭",flag:"🇺🇾"},{team:"喀麦隆",flag:"🇨🇲"},{team:"伊拉克",flag:"🇮🇶"},{team:"加纳",flag:"🇬🇭"}],
  F: [{team:"比利时",flag:"🇧🇪"},{team:"哥伦比亚",flag:"🇨🇴"},{team:"塞尔维亚",flag:"🇷🇸"},{team:"阿尔及利亚",flag:"🇩🇿"},{team:"巴拉圭",flag:"🇵🇾"},{team:"斯洛文尼亚",flag:"🇸🇮"}],
  G: [{team:"丹麦",flag:"🇩🇰"},{team:"波兰",flag:"🇵🇱"},{team:"土耳其",flag:"🇹🇷"},{team:"埃及",flag:"🇪🇬"},{team:"塞内加尔",flag:"🇸🇳"},{team:"阿联酋",flag:"🇦🇪"}],
  H: [{team:"智利",flag:"🇨🇱"},{team:"奥地利",flag:"🇦🇹"},{team:"挪威",flag:"🇳🇴"},{team:"捷克",flag:"🇨🇿"},{team:"马里",flag:"🇲🇱"},{team:"阿曼",flag:"🇴🇲"}],
}

const insertTeam = db.prepare("INSERT INTO teams (name, flag, group_name) VALUES (?, ?, ?)")
const insertMatch = db.prepare("INSERT INTO matches (id, home_team, away_team, home_flag, away_flag, group_name, round_name, match_time, status, home_score, away_score, stadium) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
const insertCard = db.prepare("INSERT INTO player_cards (id, name, flag, country, position, rarity, rating, team, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
const insertLeaderboard = db.prepare("INSERT INTO leaderboard (name, avatar, score, correct_rate, badges) VALUES (?, ?, ?, ?, ?)")
const insertPost = db.prepare("INSERT INTO community_posts (user_name, avatar, content, likes, comments, time_text, tags) VALUES (?, ?, ?, ?, ?, ?, ?)")

const stadiums = ["梅赛德斯-奔驰体育场 (亚特兰大)","大都会体育场 (东卢瑟福)","SoFi体育场 (洛杉矶)","AT&T体育场 (阿灵顿)","箭头体育场 (堪萨斯城)","NRG体育场 (休斯顿)","李维斯体育场 (旧金山)","吉列体育场 (波士顿)","卢蒙体育场 (西雅图)","硬石体育场 (迈阿密)","BC体育馆 (温哥华)","阿兹特克体育场 (墨西哥城)"]

const transaction = db.transaction(() => {
  // 写球队 + 比赛
  let matchId = 1
  const groupKeys = Object.keys(groups)

  for (const [group, teams] of Object.entries(groups)) {
    for (const t of teams) {
      insertTeam.run(t.team, t.flag, group)
    }

    const fixtures = [[0,1],[2,3],[4,5],[1,3],[0,4],[2,5],[3,5],[1,2],[0,3]]
    const baseDate = new Date("2026-06-11T10:00:00Z")
    const dayOffset = groupKeys.indexOf(group) * 3 + 1

    fixtures.forEach(([h, a], idx) => {
      const date = new Date(baseDate)
      date.setDate(date.getDate() + dayOffset + Math.floor(idx / 3))
      date.setHours(10 + (idx % 3) * 4)

      const isLive = idx === 0
      const isFinished = idx < 3 && idx > 0
      const scores = idx === 0 ? [1,0] : idx < 3 ? [[2,0],[1,1]][idx-1] || [null,null] : [null,null]

      insertMatch.run(
        matchId,
        teams[h].team, teams[a].team,
        teams[h].flag, teams[a].flag,
        `第${group}组`, "group",
        date.toISOString(),
        isLive ? "live" : isFinished ? "finished" : "scheduled",
        scores[0], scores[1],
        stadiums[matchId % stadiums.length]
      )
      matchId++
    })
  }

  // 写球员卡
  const cards = [
    // 传奇
    [1,"梅西","🇦🇷","阿根廷","前锋","legendary",96,"迈阿密国际","八座金球奖得主"],
    [2,"C罗","🇵🇹","葡萄牙","前锋","legendary",95,"利雅得胜利","欧冠历史射手王"],
    [3,"姆巴佩","🇫🇷","法国","前锋","legendary",94,"皇家马德里","新一代球王候选"],
    [4,"哈兰德","🇳🇴","挪威","前锋","legendary",93,"曼城","进球机器"],
    [5,"德布劳内","🇧🇪","比利时","中场","legendary",92,"曼城","传球视野无与伦比"],
    [6,"内马尔","🇧🇷","巴西","前锋","legendary",91,"利雅得新月","桑巴足球最后的舞者"],
    // 稀有
    [7,"维尼修斯","🇧🇷","巴西","边锋","rare",90,"皇家马德里","皇马爆点"],
    [8,"贝林厄姆","🏴󠁧󠁢󠁥󠁮󠁧󠁿","英格兰","中场","rare",90,"皇家马德里","全能中场"],
    [9,"萨拉赫","🇪🇬","埃及","边锋","rare",89,"利物浦","埃及法老"],
    [10,"凯恩","🏴󠁧󠁢󠁥󠁮󠁧󠁿","英格兰","前锋","rare",89,"拜仁慕尼黑","英格兰射手王"],
    [11,"莱万","🇵🇱","波兰","前锋","rare",88,"巴塞罗那","两届世界足球先生"],
    [12,"格列兹曼","🇫🇷","法国","前锋","rare",88,"马德里竞技","法国核心"],
    [13,"穆西亚拉","🇩🇪","德国","中场","rare",88,"拜仁慕尼黑","德国新天才"],
    [14,"福登","🏴󠁧󠁢󠁥󠁮󠁧󠁿","英格兰","中场","rare",87,"曼城","英超最佳年轻球员"],
    [15,"劳塔罗","🇦🇷","阿根廷","前锋","rare",87,"国际米兰","阿根廷锋线尖刀"],
    [16,"巴尔韦德","🇺🇾","乌拉圭","中场","rare",87,"皇家马德里","B2B中场"],
    [17,"罗德里","🇪🇸","西班牙","后腰","rare",87,"曼城","世界第一后腰"],
    [18,"维尔茨","🇩🇪","德国","中场","rare",86,"勒沃库森","药厂天才指挥官"],
    // 精英
    [19,"亚马尔","🇪🇸","西班牙","边锋","elite",85,"巴塞罗那","史上最年轻欧洲杯冠军"],
    [20,"佩德里","🇪🇸","西班牙","中场","elite",85,"巴塞罗那","西班牙新大脑"],
    [21,"加维","🇪🇸","西班牙","中场","elite",84,"巴塞罗那","金童奖得主"],
    [22,"萨卡","🏴󠁧󠁢󠁥󠁮󠁧󠁿","英格兰","边锋","elite",85,"阿森纳","枪王之王"],
    [23,"楚阿梅尼","🇫🇷","法国","后腰","elite",84,"皇家马德里","法国新一代铁腰"],
    [24,"卡马文加","🇫🇷","法国","中场","elite",83,"皇家马德里","法国全能中场"],
    [25,"库尔图瓦","🇧🇪","比利时","门将","elite",84,"皇家马德里","世界第一门将"],
    [26,"范戴克","🇳🇱","荷兰","后卫","elite",84,"利物浦","荷兰后防领袖"],
    [27,"阿方索·戴维斯","🇨🇦","加拿大","边卫","elite",83,"拜仁慕尼黑","加拿大闪电"],
    [28,"普利西奇","🇺🇸","美国","边锋","elite",82,"AC米兰","美国队长"],
    [29,"孙兴慜","🇰🇷","韩国","边锋","elite",83,"热刺","亚洲足球天王"],
    [30,"三笘薰","🇯🇵","日本","边锋","elite",82,"布莱顿","盘带突破高手"],
    [31,"库库雷利亚","🇪🇸","西班牙","边卫","elite",81,"切尔西","欧洲杯冠军左后卫"],
    [32,"吉鲁","🇫🇷","法国","前锋","elite",82,"AC米兰","法国历史射手王"],
    [33,"恩佐","🇦🇷","阿根廷","中场","elite",83,"切尔西","世界杯冠军中场核心"],
    [34,"久保建英","🇯🇵","日本","边锋","elite",81,"皇家社会","日本梅西"],
    [35,"埃贝尔","🇧🇷","巴西","前锋","elite",84,"波尔图","巴西新一代9号"],
    // 普通
    [36,"麦卡利斯特","🇦🇷","阿根廷","中场","common",80,"利物浦","阿根廷冠军中场"],
    [37,"拉什福德","🏴󠁧󠁢󠁥󠁮󠁧󠁿","英格兰","前锋","common",79,"曼联","红魔青训瑰宝"],
    [38,"C·罗梅罗","🇦🇷","阿根廷","后卫","common",79,"热刺","阿根廷铁血中卫"],
    [39,"迪马利亚","🇦🇷","阿根廷","边锋","common",78,"本菲卡","决赛之王"],
    [40,"格雷利什","🏴󠁧󠁢󠁥󠁮󠁧󠁿","英格兰","边锋","common",78,"曼城","盘带高手"],
    [41,"基米希","🇩🇪","德国","中场","common",80,"拜仁慕尼黑","德国战车驱动器"],
    [42,"京多安","🇩🇪","德国","中场","common",78,"巴塞罗那","德国中场大脑"],
    [43,"B席","🇵🇹","葡萄牙","中场","common",80,"曼城","葡萄牙魔术师"],
    [44,"奥尔莫","🇪🇸","西班牙","中场","common",79,"巴塞罗那","欧洲杯射手王"],
    [45,"特奥·埃尔南德斯","🇫🇷","法国","边卫","common",79,"AC米兰","法国左路快马"],
    [46,"科曼","🇫🇷","法国","边锋","common",78,"拜仁慕尼黑","法国边路飞翼"],
  ]
  for (const c of cards) {
    insertCard.run(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8])
  }

  // 写排行榜
  const leaderboardData = [
    ["绿茵预言家","🔮",2460,78,'["👑 冠军","🔥 10连胜"]'],
    ["足球先知","📊",2210,75,'["🥈 亚军","🔥 5连胜"]'],
    ["梅老板的右脚","⚡",1980,72,'["🥉 季军"]'],
    ["红魔之心","🔴",1850,70,'["🔥 3连胜"]'],
    ["拜仁慕尼黑魂","🇩🇪",1720,68,'["🏆 单日最佳"]'],
    ["阿根廷别哭泣","🇦🇷",1680,69,'[]'],
    ["英超通","🏴󠁧󠁢󠁥󠁮󠁧󠁿",1590,67,'[]'],
    ["足球小将南葛","⚽",1510,66,'[]'],
    ["桑巴舞者","🇧🇷",1450,64,'[]'],
    ["高卢雄鸡","🇫🇷",1390,63,'[]'],
    ["蓝衣军团","🇮🇹",1320,62,'[]'],
    ["斗牛士","🇪🇸",1280,61,'[]'],
    ["风之子","🌪️",1210,60,'[]'],
    ["无锋不欢","🗡️",1150,58,'[]'],
    ["足球哲学家","🧠",1080,57,'[]'],
    ["小白球迷","🐼",990,55,'[]'],
    ["梅西信徒","🐐",920,54,'[]'],
    ["疯狂科学家","🔬",860,52,'[]'],
    ["老特拉福德","🏟️",780,50,'[]'],
    ["新手上路","🌱",650,45,'[]'],
  ]
  for (const l of leaderboardData) {
    insertLeaderboard.run(l[0], l[1], l[2], l[3], l[4])
  }

  // 写社区帖子
  const posts = [
    ["绿茵预言家","🔮","🇺🇸🇨🇦🇲🇽 2026世界杯就要开打了！48支球队、104场比赛，史上最大规模的世界杯！你最期待哪支球队的表现？",128,56,"10分钟前",'["热门","讨论"]'],
    ["梅老板的右脚","⚡","阿根廷 vs 巴西！梅西最后一次世界杯之旅，能不能卫冕？预测2-1阿根廷胜🇦🇷",89,34,"25分钟前",'["预测","焦点战"]'],
    ["拜仁慕尼黑魂","🇩🇪","德国队这次分组D组要和巴西、葡萄牙竞争，穆西亚拉+维尔茨双核驱动能出线💪",67,28,"1小时前",'["分析","德国"]'],
    ["英超通","🏴󠁧󠁢󠁥󠁮󠁧󠁿","英格兰这届真的好强！贝林厄姆+福登+萨卡+凯恩的进攻线，今年该拿一个了吧？🏆",145,62,"30分钟前",'["热门","英格兰"]'],
    ["桑巴舞者","🇧🇷","巴西永远是我心中的冠军！维尼修斯+拉菲尼亚+罗德里戈三叉戟，内马尔最后一届世界杯🇧🇷",76,31,"2小时前",'["巴西","加油"]'],
    ["高卢雄鸡","🇫🇷","姆巴佩已经是世界第一人了！卫冕冠军实力还在🇫🇷⚡",93,42,"3小时前",'["法国","分析"]'],
    ["足球小将南葛","⚽","日本队C组有法国荷兰两个强敌…但森保一总能创造奇迹！三笘薰+久保建英🇯🇵",54,19,"4小时前",'["日本","亚洲之光"]'],
    ["巴萨梦四","🔵🔴","西班牙的亚马尔16岁欧洲杯冠军、18岁世界杯主力，拉玛西亚永远的神🇪🇸",72,24,"5小时前",'["西班牙","新星"]'],
    ["亚洲之鹰","🦅","韩国队和阿根廷英格兰分一组？孙兴慜带队创造奇迹吧🇰🇷💪",41,17,"6小时前",'["韩国","死亡之组"]'],
    ["蓝衣军团","🇮🇹","意大利终于回来了！防守反击DNA还在，看好小组出线🇮🇹",63,28,"7小时前",'["意大利","归来"]'],
    ["郁金香使者","🌷","荷兰范戴克+德里赫特+阿克后防线太豪华了，看好四强🇳🇱",48,21,"8小时前",'["荷兰","分析"]'],
    ["足球哲学家","🧠","近20年冠军交替南美欧洲（巴-意-西-德-法-阿），该欧洲了！法国卫冕🇫🇷🏆",35,45,"9小时前",'["玄学","预测"]'],
  ]
  for (const p of posts) {
    insertPost.run(p[0], p[1], p[2], p[3], p[4], p[5], p[6])
  }

  // 更新版本
  db.exec(`INSERT OR REPLACE INTO schema_version (version, updated_at) VALUES (1, datetime('now'))`)
})

transaction()
db.close()
console.log(`✅ SQLite database created at data/worldcup.db`)
console.log(`   - ${Object.keys(groups).length} groups, 48 teams`)
console.log(`   - 72 matches`)
console.log(`   - 46 player cards`)
console.log(`   - 20 leaderboard entries`)
console.log(`   - ${12} community posts`)
