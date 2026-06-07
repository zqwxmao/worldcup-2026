// 社区讨论数据
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
  {
    id: 1, user: "绿茵预言家", avatar: "🔮",
    content: "🇺🇸🇨🇦🇲🇽 2026世界杯就要在美国、加拿大、墨西哥开打了！48支球队、104场比赛，史上最大规模的世界杯！你最期待哪支球队的表现？",
    likes: 128, comments: 56, time: "10分钟前", tags: ["热门", "讨论"],
  },
  {
    id: 2, user: "梅老板的右脚", avatar: "⚡",
    content: "阿根廷 vs 巴西这场真的有看点！梅西最后一次世界杯之旅，能不能卫冕？我个人预测 2-1，阿根廷胜🇦🇷 梅老板最后一舞🏆",
    likes: 89, comments: 34, time: "25分钟前", tags: ["预测", "焦点战"],
  },
  {
    id: 3, user: "拜仁慕尼黑魂", avatar: "🇩🇪",
    content: "德国队这次分组D组，要和巴西、葡萄牙竞争，压力不小啊！不过穆西亚拉和维尔茨双核驱动，我觉得能小组出线🇩🇪💪",
    likes: 67, comments: 28, time: "1小时前", tags: ["分析", "德国"],
  },
  {
    id: 4, user: "英超通", avatar: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    content: "英格兰这届真的好强！贝林厄姆+福登+萨卡+凯恩的进攻线，全世界都羡慕的配置。三狮军团今年该拿一个了吧？🏴󠁧󠁢󠁥󠁮󠁧󠁿🏆",
    likes: 145, comments: 62, time: "30分钟前", tags: ["热门", "英格兰"],
  },
  {
    id: 5, user: "桑巴舞者", avatar: "🇧🇷",
    content: "巴西永远是我心中的冠军！维尼修斯+拉菲尼亚+罗德里戈的前场三叉戟，谁能挡？🇧🇷🇧🇷🇧🇷 内马尔最后一届世界杯，加油！",
    likes: 76, comments: 31, time: "2小时前", tags: ["巴西", "加油"],
  },
  {
    id: 6, user: "高卢雄鸡", avatar: "🇫🇷",
    content: "姆巴佩已经是世界第一人了！法国队这届虽然少了几个老将，但年轻人完全顶得上。卫冕冠军的实力还在🇫🇷⚡",
    likes: 93, comments: 42, time: "3小时前", tags: ["法国", "分析"],
  },
  {
    id: 7, user: "足球小将南葛", avatar: "⚽",
    content: "日本队这次分组在C组，法国荷兰两个强敌…不过森保一教练总能创造奇迹！三笘薰和久保建英是日本的大杀器🇯🇵⚡",
    likes: 54, comments: 19, time: "4小时前", tags: ["日本", "亚洲之光"],
  },
  {
    id: 8, user: "巴萨梦四", avatar: "🔵🔴",
    content: "西班牙的亚马尔简直逆天！16岁欧洲杯冠军，18岁世界杯主力。拉玛西亚青训永远的神🇪🇸💫",
    likes: 72, comments: 24, time: "5小时前", tags: ["西班牙", "新星"],
  },
  {
    id: 9, user: "亚洲之鹰", avatar: "🦅",
    content: "韩国队这次和阿根廷、英格兰分在一组？签运也太差了吧…不过孙兴慜带队，说不定能创造奇迹！🇰🇷💪 大韩民国fighting！",
    likes: 41, comments: 17, time: "6小时前", tags: ["韩国", "死亡之组"],
  },
  {
    id: 10, user: "蓝衣军团", avatar: "🇮🇹",
    content: "意大利连续两届无缘世界杯正赛…这次终于回来了！虽然后防有些老化，但意大利的DNA就是防守反击，看好小组出线🇮🇹",
    likes: 63, comments: 28, time: "7小时前", tags: ["意大利", "归来"],
  },
  {
    id: 11, user: "郁金香使者", avatar: "🌷",
    content: "荷兰这届阵容真不差！范戴克+德里赫特+阿克的后防线太豪华了，前场有加克波，看好进四强🇳🇱",
    likes: 48, comments: 21, time: "8小时前", tags: ["荷兰", "分析"],
  },
  {
    id: 12, user: "足球哲学家", avatar: "🧠",
    content: "我发现一个规律：近20年世界杯冠军交替在南美和欧洲之间（巴-意-西-德-法-阿），这届该欧洲拿了？大胆预测法国卫冕🇫🇷🏆",
    likes: 35, comments: 45, time: "9小时前", tags: ["玄学", "预测"],
  },
]
