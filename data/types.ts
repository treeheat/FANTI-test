/** 15 人格 ID（与 personality.md 一致） */
export type PersonalityId =
  | "KPIS"
  | "MASK"
  | "SHADOW"
  | "COOKER"
  | "ATM-er"
  | "LMAO"
  | "GUARD"
  | "PLAY-er"
  | "WIKI"
  | "MAMA"
  | "FACE"
  | "ADDICT"
  | "HOME"
  | "SOUL"
  | "KE-er";

/** 七维向量，下标 0–6 对应 DIMENSION_AXIS_ORDER（视线→边界） */
export type DimensionVector = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type PersonalityType = {
  id: PersonalityId;
  /** 展示名，默认与 id 一致 */
  name: string;
  /** 核心判定说明 */
  tagline: string;
  /** [视线, 审美, 基调, 版图, 声量, 投入, 边界] */
  vector: DimensionVector;
};

export type QuestionTier = "base" | "killer";

export type QuestionOption = {
  id: string;
  label: string;
  vector: DimensionVector;
  /** 计分/维度含义说明，供结果页展示 */
  explanation?: string;
};

/** 原文档中部分题为三选一，其余为四选一 */
export type QuestionOptionTuple =
  | readonly [QuestionOption, QuestionOption, QuestionOption]
  | readonly [
      QuestionOption,
      QuestionOption,
      QuestionOption,
      QuestionOption,
    ];

export type Question = {
  id: number;
  /** 基础题参与「基础相似度」；绝杀题参与「情景相似度」 */
  tier: QuestionTier;
  prompt: string;
  options: QuestionOptionTuple;
};

export type UserAnswer = {
  questionId: number;
  optionId: string;
};

/** 测试结果页展示用人格（由计分结果 + 文案库合并得到） */
export type ResultPersonality = {
  id: PersonalityId;
  /** 主标题展示名，如「领导型 (KPIS)」 */
  name: string;
  quote: string;
  description: string;
};
