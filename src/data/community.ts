// 此文件由 scripts/generate-data.js 自动生成
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
  { id: 13, user: "绿茵预言家", avatar: "🔮", content: "🇺🇸🇨🇦🇲🇽 2026世界杯就要开打了！48支球队、104场比赛，史上最大规模的世界杯！你最期待哪支球队的表现？", likes: 128, comments: 56, time: "10分钟前", tags: ["热门","讨论"] },
  { id: 14, user: "梅老板的右脚", avatar: "⚡", content: "阿根廷 vs 巴西！梅西最后一次世界杯之旅，能不能卫冕？预测2-1阿根廷胜🇦🇷", likes: 89, comments: 34, time: "25分钟前", tags: ["预测","焦点战"] },
  { id: 15, user: "拜仁慕尼黑魂", avatar: "🇩🇪", content: "德国队这次分组D组要和巴西、葡萄牙竞争，穆西亚拉+维尔茨双核驱动能出线💪", likes: 67, comments: 28, time: "1小时前", tags: ["分析","德国"] },
  { id: 16, user: "英超通", avatar: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", content: "英格兰这届真的好强！贝林厄姆+福登+萨卡+凯恩的进攻线，今年该拿一个了吧？🏆", likes: 145, comments: 62, time: "30分钟前", tags: ["热门","英格兰"] },
  { id: 17, user: "桑巴舞者", avatar: "🇧🇷", content: "巴西永远是我心中的冠军！维尼修斯+拉菲尼亚+罗德里戈三叉戟，内马尔最后一届世界杯🇧🇷", likes: 76, comments: 31, time: "2小时前", tags: ["巴西","加油"] },
  { id: 18, user: "高卢雄鸡", avatar: "🇫🇷", content: "姆巴佩已经是世界第一人了！卫冕冠军实力还在🇫🇷⚡", likes: 93, comments: 42, time: "3小时前", tags: ["法国","分析"] },
  { id: 19, user: "足球小将南葛", avatar: "⚽", content: "日本队C组有法国荷兰两个强敌…但森保一总能创造奇迹！三笘薰+久保建英🇯🇵", likes: 54, comments: 19, time: "4小时前", tags: ["日本","亚洲之光"] },
  { id: 20, user: "巴萨梦四", avatar: "🔵🔴", content: "西班牙的亚马尔16岁欧洲杯冠军、18岁世界杯主力，拉玛西亚永远的神🇪🇸", likes: 72, comments: 24, time: "5小时前", tags: ["西班牙","新星"] },
  { id: 21, user: "亚洲之鹰", avatar: "🦅", content: "韩国队和阿根廷英格兰分一组？孙兴慜带队创造奇迹吧🇰🇷💪", likes: 41, comments: 17, time: "6小时前", tags: ["韩国","死亡之组"] },
  { id: 22, user: "蓝衣军团", avatar: "🇮🇹", content: "意大利终于回来了！防守反击DNA还在，看好小组出线🇮🇹", likes: 63, comments: 28, time: "7小时前", tags: ["意大利","归来"] },
  { id: 23, user: "郁金香使者", avatar: "🌷", content: "荷兰范戴克+德里赫特+阿克后防线太豪华了，看好四强🇳🇱", likes: 48, comments: 21, time: "8小时前", tags: ["荷兰","分析"] },
  { id: 24, user: "足球哲学家", avatar: "🧠", content: "近20年冠军交替南美欧洲（巴-意-西-德-法-阿），该欧洲了！法国卫冕🇫🇷🏆", likes: 35, comments: 45, time: "9小时前", tags: ["玄学","预测"] }
]
