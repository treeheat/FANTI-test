import { PERSONALITIES } from "./personalities";
import type { DimensionVector, PersonalityId, Question } from "./types";

const g = (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
  h: number,
): DimensionVector => [a, b, c, d, e, f, h];

const PV = Object.fromEntries(PERSONALITIES.map((p) => [p.id, p.vector])) as Record<
  PersonalityId,
  DimensionVector
>;

/** 题库来源：《FANTI 测试题》.docx；Q1–Q21 基础维度题，Q22–Q25 情景绝杀题。绝杀题选项向量对齐对应人格标准坐标（directBonus）。 */
export const QUESTIONS: Question[] = [
  {
    id: 1,
    tier: "base",
    prompt: "Q1. 当自担在舞台上出现了一个明显的失误，你的第一反应是：",
    options: [
      {
        id: "A",
        label: "是最近行程太密累坏了吧。",
        vector: g(-1, 0, 0, 0, 0, 0, 0),
        explanation: "视线（gaze）：-1，俯视怜爱 / 体谅向。",
      },
      {
        id: "B",
        label: "希望TA迅速复盘调整，展现出对得起舞台的业务能力。",
        vector: g(1, 0, 0, 0, 0, 0, 0),
        explanation: "视线（gaze）：+1，强仰视慕强。",
      },
      {
        id: "C",
        label: "人无完人，希望这个失误不要影响TA后续的心态。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "视线（gaze）：0，中立。",
      },
      {
        id: "D",
        label: "好搞笑，想做成动图。",
        vector: g(-1, 0, 0, 0, 0, 0, 0),
        explanation: "视线（gaze）：-1，解构 / 玩梗向。",
      },
    ],
  },
  {
    id: 2,
    tier: "base",
    prompt: "Q2. 在你的潜意识里，你更希望自担在你生命中扮演什么角色？",
    options: [
      {
        id: "A",
        label: "一颗遥不可及但永远闪闪发光的星星。",
        vector: g(1, 0, 0, 0, 0, 0, 0),
        explanation: "视线（gaze）：+1，仰视慕强。",
      },
      {
        id: "B",
        label: "一个会激发怜爱之心的对象。",
        vector: g(-1, 0, 0, 0, 0, 0, 0),
        explanation: "视线（gaze）：-1，俯视怜爱。",
      },
      {
        id: "C",
        label: "一个远方的知己或共同成长的人。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "视线（gaze）：0，平视 / 伙伴向。",
      },
      {
        id: "D",
        label: "一个路人。",
        vector: g(-2, 0, 0, 0, 0, 0, 0),
        explanation: "视线（gaze）：-2，解构 / 玩梗向。",
      },
    ],
  },
  {
    id: 3,
    tier: "base",
    prompt: "Q3. 看到TA在Vlog里因为遇到巨大挫折而默默流泪，你的真实感受是：",
    options: [
      {
        id: "A",
        label: "眼泪砸在我心上了。",
        vector: g(-2, 0, 0, 0, 0, 0, 0),
        explanation: "视线（gaze）：-2，强俯视怜爱。",
      },
      {
        id: "B",
        label: "欲戴王冠必承其重。",
        vector: g(1, 0, 0, 0, 0, 0, 0),
        explanation: "视线（gaze）：+1，仰视慕强。",
      },
      {
        id: "C",
        label: "可恶的队友/公司/资本。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "视线（gaze）：0，外归因 / 中立。",
      },
      {
        id: "D",
        label: "都208了不要老卖惨。",
        vector: g(-1, 0, 0, 0, 0, 0, 0),
        explanation: "视线（gaze）：-1，抽离 / 解构向。",
      },
    ],
  },
  {
    id: 4,
    tier: "base",
    prompt: "Q4. 自担的丑图上了热搜，你会：",
    options: [
      {
        id: "A",
        label: "烦躁。想去广场发高清精修图，不能让路人觉得TA丑。",
        vector: g(0, 2, 0, 0, 0, 0, 0),
        explanation: "审美（filter）：+2，强造神维护。",
      },
      {
        id: "B",
        label: "保存图片，偷偷和同担吐槽。",
        vector: g(0, -2, 0, 0, 0, 0, 0),
        explanation: "审美（filter）：-2，强解构打破。",
      },
      {
        id: "C",
        label: "无所谓。只要没有真的触碰道德底线或塌房，长什么样我都爱看。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "审美（filter）：0，中立。",
      },
    ],
  },
  {
    id: 5,
    tier: "base",
    prompt: "Q5. 你如何看待自担粉圈里大热的泥塑、性转或者反差二创？",
    options: [
      {
        id: "A",
        label: "极度排斥，喜欢原原本本的TA。",
        vector: g(0, 2, 0, 0, 0, 0, 0),
        explanation: "审美（filter）：+2，强造神维护。",
      },
      {
        id: "B",
        label: "狂炫，喜欢这种打破刻板印象的反差爽感。",
        vector: g(0, -2, 0, 0, 0, 0, 0),
        explanation: "审美（filter）：-2，强解构打破。",
      },
      {
        id: "C",
        label: "不产出也不反感，只要饭好吃，我什么都能看。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "审美（filter）：0，中立。",
      },
    ],
  },
  {
    id: 6,
    tier: "base",
    prompt: "Q6. 你如何看待公司给自担设定的官方人设？",
    options: [
      {
        id: "A",
        label: "喜欢，不希望打破这层滤镜。",
        vector: g(0, 1, 0, 0, 0, 0, 0),
        explanation: "审美（filter）：+1，造神维护。",
      },
      {
        id: "B",
        label: "无所谓，我可以在脑洞里赋予TA新设定。",
        vector: g(0, -1, 0, 0, 0, 0, 0),
        explanation: "审美（filter）：-1，解构打破。",
      },
      {
        id: "C",
        label: "都是打工人的包装而已，无所谓。我只挑我喜欢的物料看，不深究背后的概念。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "审美（filter）：0，中立。",
      },
    ],
  },
  {
    id: 7,
    tier: "base",
    prompt:
      "Q7. 自担最近接的一部剧/一首歌客观上数据拉垮、口碑扑街，你在社交平台上的态度是：",
    options: [
      {
        id: "A",
        label: "TA已经尽力了，团队没规划好没办法。",
        vector: g(0, 0, 2, 0, 0, 0, 0),
        explanation: "基调（attitude）：+2，强全肯定溺爱。",
      },
      {
        id: "B",
        label: "TA自己实力不太行。",
        vector: g(0, 0, -2, 0, 0, 0, 0),
        explanation: "基调（attitude）：-2，强事业鞭策。",
      },
      {
        id: "C",
        label: "这次确实没做好，等下一个好作品再出来安利。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "基调（attitude）：0，中立。",
      },
    ],
  },
  {
    id: 8,
    tier: "base",
    prompt: "Q8. 面对粉圈常说的“TA还只是个孩子/TA已经很努力了”，你的内心OS是：",
    options: [
      {
        id: "A",
        label: "确实，娱乐圈也是很辛苦的。",
        vector: g(0, 0, 2, 0, 0, 0, 0),
        explanation: "基调（attitude）：+2，强全肯定溺爱。",
      },
      {
        id: "B",
        label: "借口，拿着大工资就该交出对等的作品。",
        vector: g(0, 0, -2, 0, 0, 0, 0),
        explanation: "基调（attitude）：-2，强事业鞭策。",
      },
      {
        id: "C",
        label: "努力是基础，但实力也确实需要再提升，希望TA能听到真实的建议。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "基调（attitude）：0，理智中立。",
      },
    ],
  },
  {
    id: 9,
    tier: "base",
    prompt: "Q9. 自担出席红毯，状态明显疲惫，甚至有点丑，你会：",
    options: [
      {
        id: "A",
        label: "TA最近连轴转太累了，希望别太多人骂了。",
        vector: g(0, 0, 1, 0, 0, 0, 0),
        explanation: "基调（attitude）：+1，溺爱向。",
      },
      {
        id: "B",
        label: "想脱粉一分钟。",
        vector: g(0, 0, -2, 0, 0, 0, 0),
        explanation: "基调（attitude）：-2，强事业鞭策。",
      },
      {
        id: "C",
        label: "叹口气，希望TA赶紧休假调整状态。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "基调（attitude）：0，中立。",
      },
    ],
  },
  {
    id: 10,
    tier: "base",
    prompt: "Q10. 看群像综艺或者剧组花絮时，你的视线通常是怎么分配的？",
    options: [
      {
        id: "A",
        label: "除了自担，其他人全是模糊的背景板。",
        vector: g(0, 0, 0, 2, 0, 0, 0),
        explanation: "版图（scope）：+2，强孤星唯粉。",
      },
      {
        id: "B",
        label: "热衷于观察他们之间的化学反应。",
        vector: g(0, 0, 0, -2, 0, 0, 0),
        explanation: "版图（scope）：-2，强群像羁绊。",
      },
      {
        id: "C",
        label: "喜欢这种其乐融融的大家庭感。",
        vector: g(0, 0, 0, -1, 0, 0, 0),
        explanation: "版图（scope）：-1，群像 / 家族感。",
      },
    ],
  },
  {
    id: 11,
    tier: "base",
    prompt: "Q11. 如果自担官宣加入了一个人数众多的常驻综艺，你最大的担忧是？",
    options: [
      {
        id: "A",
        label: "镜头被抢、被其他人吸血蹭热度，好烦，好想让TA独美。",
        vector: g(0, 0, 0, 2, 0, 0, 0),
        explanation: "版图（scope）：+2，强孤星唯粉。",
      },
      {
        id: "B",
        label: "没有任何担忧！人多才热闹，已经迫不及待想看新CP了。",
        vector: g(0, 0, 0, -2, 0, 0, 0),
        explanation: "版图（scope）：-2，强群像羁绊。",
      },
      {
        id: "C",
        label: "只要这是一个有助于TA事业发展的平台，跟谁合作都行。",
        vector: g(0, 0, 0, 1, 0, 0, 0),
        explanation: "版图（scope）：+1，事业向孤星。",
      },
    ],
  },
  {
    id: 12,
    tier: "base",
    prompt: "Q12. 当曾经并肩作战的团体解散，或经典剧集收官时，你的第一感受是：",
    options: [
      {
        id: "A",
        label: "终于解绑了，我担可以有新发展了。",
        vector: g(0, 0, 0, 2, 0, 0, 0),
        explanation: "版图（scope）：+2，强孤星唯粉。",
      },
      {
        id: "B",
        label: "有点难受，那些羁绊永远不能重现了。",
        vector: g(0, 0, 0, -2, 0, 0, 0),
        explanation: "版图（scope）：-2，强群像羁绊。",
      },
      {
        id: "C",
        label: "天下没有不散的筵席，祝大家各自在最高处相见。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "版图（scope）：0，中立。",
      },
    ],
  },
  {
    id: 13,
    tier: "base",
    prompt: "Q13. 自担出了一个封神级别的出圈视频，你会：",
    options: [
      {
        id: "A",
        label: "转发到所有平台，让全世界都来看。",
        vector: g(0, 0, 0, 0, 2, 0, 0),
        explanation: "声量（voice）：+2，强外放悍匪。",
      },
      {
        id: "B",
        label: "默默点个收藏，在深夜被窝里独自看五十遍。",
        vector: g(0, 0, 0, 0, -2, 0, 0),
        explanation: "声量（voice）：-2，强内敛潜水。",
      },
      {
        id: "C",
        label: "转发一次或发给同样追星的朋友，仅此而已。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "声量（voice）：0，中立。",
      },
    ],
  },
  {
    id: 14,
    tier: "base",
    prompt: "Q14. 在各大饭圈超话或微信群里，你的常态是：",
    options: [
      {
        id: "A",
        label: "产出大户，社交痕迹拉满。",
        vector: g(0, 0, 0, 0, 2, 0, 0),
        explanation: "声量（voice）：+2，强外放悍匪。",
      },
      {
        id: "B",
        label: "万年隐身人，连打卡都懒得点。",
        vector: g(0, 0, 0, 0, -2, 0, 0),
        explanation: "声量（voice）：-2，强内敛潜水。",
      },
      {
        id: "C",
        label: "偶尔遇到特别有感触的话题会评论两句。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "声量（voice）：0，中立。",
      },
    ],
  },
  {
    id: 15,
    tier: "base",
    prompt: "Q15. 如果有路人差评了一句你的自担，你会：",
    options: [
      {
        id: "A",
        label: "用详实的证据和路人进行辩论。",
        vector: g(0, 0, 0, 0, 2, 0, 0),
        explanation: "声量（voice）：+2，强外放悍匪。",
      },
      {
        id: "B",
        label: "笑笑不说话，内心毫无波澜。",
        vector: g(0, 0, 0, 0, -2, 0, 0),
        explanation: "声量（voice）：-2，强内敛潜水。",
      },
      {
        id: "C",
        label: "客观地补充一句解释，如果对方不听就算了。",
        vector: g(0, 0, 0, 0, 1, 0, 0),
        explanation: "声量（voice）：+1，适度外放。",
      },
    ],
  },
  {
    id: 16,
    tier: "base",
    prompt: "Q16. 明天就是某项重要打投的截榜日，自担目前屈居第二，你会：",
    options: [
      {
        id: "A",
        label: "连夜切几十个号，不拿第一誓不罢休。",
        vector: g(0, 0, 0, 0, 0, 2, 0),
        explanation: "投入（investment）：+2，强燃烧硬核。",
      },
      {
        id: "B",
        label: "随缘投一下手头的免费票。追星是为了快乐，不想被资本的KPI绑架。",
        vector: g(0, 0, 0, 0, 0, -2, 0),
        explanation: "投入（investment）：-2，强佛系白嫖。",
      },
      {
        id: "C",
        label: "在自己能力和时间允许的范围内多投几票，但绝不会熬夜伤身或影响工作。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "投入（investment）：0，中立。",
      },
    ],
  },
  {
    id: 17,
    tier: "base",
    prompt: "Q17. 你如何看待给偶像花钱这件事？",
    options: [
      {
        id: "A",
        label: "钱在哪里爱就在哪里。",
        vector: g(0, 0, 0, 0, 0, 2, 0),
        explanation: "投入（investment）：+2，强燃烧硬核。",
      },
      {
        id: "B",
        label: "精神陪伴更重要，最多买个小周边图个开心。",
        vector: g(0, 0, 0, 0, 0, -2, 0),
        explanation: "投入（investment）：-2，强佛系白嫖。",
      },
      {
        id: "C",
        label: "只要周边用心就会买，我是在为高质量的产品买单，而不是盲目冲销量。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "投入（investment）：0，消费者理性中立。",
      },
    ],
  },
  {
    id: 18,
    tier: "base",
    prompt: "Q18. 没抢到自担十周年演唱会的门票，你会：",
    options: [
      {
        id: "A",
        label: "勤勤恳恳找黄牛",
        vector: g(0, 0, 0, 0, 0, 2, 0),
        explanation: "投入（investment）：+2，强燃烧硬核。",
      },
      {
        id: "B",
        label: "算了，省下一笔钱吃顿好的。",
        vector: g(0, 0, 0, 0, 0, -2, 0),
        explanation: "投入（investment）：-2，强佛系白嫖。",
      },
      {
        id: "C",
        label: "尽力抢票，如果没有就不去了，绝不给黄牛送钱。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "投入（investment）：0，理智底线中立。",
      },
    ],
  },
  {
    id: 19,
    tier: "base",
    prompt: "Q19. 对家粉丝突然大规模造谣抹黑你的自担，此时你会：",
    options: [
      {
        id: "A",
        label: "带tag对线，不把对面骂到闭麦不睡觉。",
        vector: g(0, 0, 0, 0, 0, 0, 2),
        explanation: "边界（combat）：+2，强冲锋战士。",
      },
      {
        id: "B",
        label: "觉得饭圈好乌烟瘴气，立刻退出微博。",
        vector: g(0, 0, 0, 0, 0, 0, -2),
        explanation: "边界（combat）：-2，强抽离跑路。",
      },
      {
        id: "C",
        label: "默默收集造谣截图，自己绝不下场撕逼。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "边界（combat）：0，冷静处理。",
      },
    ],
  },
  {
    id: 20,
    tier: "base",
    prompt: "Q20. 当自担出现了一些模糊不清的“塌房预警”时，你的第一反应是：",
    options: [
      {
        id: "A",
        label: "不相信洗脑包，到处搜集澄清证据。",
        vector: g(0, 0, 0, 0, 0, 0, 2),
        explanation: "边界（combat）：+2，强冲锋战士。",
      },
      {
        id: "B",
        label: "默默开始物色下一个墙头，随时准备提桶跑路保平安。",
        vector: g(0, 0, 0, 0, 0, 0, -2),
        explanation: "边界（combat）：-2，强抽离跑路。",
      },
      {
        id: "C",
        label: "静观其变，等官方实锤出来再决定是留下还是脱粉。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "边界（combat）：0，观察者中立。",
      },
    ],
  },
  {
    id: 21,
    tier: "base",
    prompt: "Q21. 你追星时的情绪边界感是怎样的？",
    options: [
      {
        id: "A",
        label: "高度绑定，甚至会因此精神内耗。",
        vector: g(0, 0, 0, 0, 0, 0, 2),
        explanation: "边界（combat）：+2，强冲锋战士。",
      },
      {
        id: "B",
        label: "泾渭分明，TA只是我无聊时的电子榨菜。",
        vector: g(0, 0, 0, 0, 0, 0, -2),
        explanation: "边界（combat）：-2，强抽离跑路。",
      },
      {
        id: "C",
        label: "有开心也有难过，但一旦关掉手机，就能立刻无缝切回现实生活。",
        vector: g(0, 0, 0, 0, 0, 0, 0),
        explanation: "边界（combat）：0，中立。",
      },
    ],
  },
  {
    id: 22,
    tier: "killer",
    prompt:
      "Q22. 凌晨一点，一张模糊的狗仔图冲上热搜，暗示你的自担正在恋爱。此时饭圈大乱，接下来的12个小时，你最有可能的做法是：",
    options: [
      {
        id: "A",
        label: "冷静如冰，对比现有证据，要用严密的逻辑写一篇辟谣贴。",
        vector: PV.WIKI,
        explanation: "情景绝杀：directBonus → WIKI（标准人格向量）。",
      },
      {
        id: "B",
        label: "感觉心脏被击中，在微博写心碎日记。",
        vector: PV.ADDICT,
        explanation: "情景绝杀：directBonus → ADDICT。",
      },
      {
        id: "C",
        label: "毫无波澜甚至想笑，到处去打探嫂子是谁。",
        vector: PV.LMAO,
        explanation: "情景绝杀：directBonus → LMAO。",
      },
      {
        id: "D",
        label: "怒骂TA不争气，自毁前程。",
        vector: PV.MASK,
        explanation: "情景绝杀：directBonus → MASK。",
      },
    ],
  },
  {
    id: 23,
    tier: "killer",
    prompt:
      "Q23. 今晚是年度最大的红毯，但工作室给自担穿了一套极其拉垮、暴露身材短板的衣服。你的反应是：",
    options: [
      {
        id: "A",
        label: "冲刷工作室评论区，要求立刻换造型团队。",
        vector: PV.KPIS,
        explanation: "情景绝杀：directBonus → KPIS。",
      },
      {
        id: "B",
        label: "截图，像黑粉一样吐槽",
        vector: PV.COOKER,
        explanation: "情景绝杀：directBonus → COOKER。",
      },
      {
        id: "C",
        label: "其实更关心TA今晚穿这么薄会不会冻着。",
        vector: PV.MAMA,
        explanation: "情景绝杀：directBonus → MAMA。",
      },
      {
        id: "D",
        label: "衣服难看又怎样，脸在江山在。",
        vector: PV.FACE,
        explanation: "情景绝杀：directBonus → FACE。",
      },
    ],
  },
  {
    id: 24,
    tier: "killer",
    prompt:
      "Q24. 自担的生日/出道纪念日即将到来，粉圈开启了声势浩大的应援集资活动。面对这个大事件，你的真实做法是：",
    options: [
      {
        id: "A",
        label: "不发一言，默默点开集资链接买下。",
        vector: PV["ATM-er"],
        explanation: "情景绝杀：directBonus → ATM-er。",
      },
      {
        id: "B",
        label: "不关心粉圈的排面之争，只会在纪念日当天的零点，独自为TA庆祝。",
        vector: PV.SHADOW,
        explanation: "情景绝杀：directBonus → SHADOW。",
      },
      {
        id: "C",
        label: "看到为了排面攀比，甚至拉踩撕逼就头疼。",
        vector: PV.HOME,
        explanation: "情景绝杀：directBonus → HOME。",
      },
      {
        id: "D",
        label: "真情实感花钱是不可能的，顺手存两张今天新出的美图就够了。",
        vector: PV["PLAY-er"],
        explanation: "情景绝杀：directBonus → PLAY-er。",
      },
    ],
  },
  {
    id: 25,
    tier: "killer",
    prompt: "Q25. 深夜，自担突然发了一条和对家在私下聚会的合照，你的第一感觉是：",
    options: [
      {
        id: "A",
        label: "我去，有点配。",
        vector: PV["KE-er"],
        explanation: "情景绝杀：directBonus → KE-er。",
      },
      {
        id: "B",
        label: "TA开心就好。",
        vector: PV.SOUL,
        explanation: "情景绝杀：directBonus → SOUL。",
      },
      {
        id: "C",
        label: "谁允许TA跟这种人互动的。",
        vector: PV.GUARD,
        explanation: "情景绝杀：directBonus → GUARD。",
      },
      {
        id: "D",
        label: "开始敏锐检查合照里的细节。",
        vector: PV.WIKI,
        explanation: "情景绝杀：directBonus → WIKI。",
      },
    ],
  },
];

export const QUESTION_TOTAL = QUESTIONS.length;
