import {
  DIMENSION_COUNT,
  PERSONALITIES,
  QUESTIONS,
  type DimensionVector,
  type PersonalityId,
  type PersonalityType,
  type QuestionTier,
  type UserAnswer,
} from "@/data";

/** 基础题相似度权重 */
export const BASE_SIMILARITY_WEIGHT = 0.8;
/** 情景绝杀题相似度权重 */
export const KILLER_SIMILARITY_WEIGHT = 0.2;

export type SimilarityBoard = Record<PersonalityId, number>;

const ZERO_VEC = (): number[] => Array.from({ length: DIMENSION_COUNT }, () => 0);

function dot(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < DIMENSION_COUNT; i++) s += (a[i] ?? 0) * (b[i] ?? 0);
  return s;
}

function norm(a: number[]): number {
  return Math.sqrt(dot(a, a));
}

/** 余弦相似度，全零向量时返回 0 */
export function cosineSimilarity(a: number[], b: number[]): number {
  const na = norm(a);
  const nb = norm(b);
  if (na === 0 || nb === 0) return 0;
  const c = dot(a, b) / (na * nb);
  if (!Number.isFinite(c)) return 0;
  return Math.max(-1, Math.min(1, c));
}

/** 对同一 tier 下所选选项向量取算术平均，得到用户侧向量 */
export function meanAnswerVector(
  answers: UserAnswer[],
  tier: QuestionTier,
): { vector: number[]; count: number } {
  const byId = new Map(QUESTIONS.map((q) => [q.id, q]));
  const acc = ZERO_VEC();
  let count = 0;

  for (const { questionId, optionId } of answers) {
    const q = byId.get(questionId);
    if (!q || q.tier !== tier) continue;
    const opt = q.options.find((o) => o.id === optionId);
    if (!opt) continue;
    count += 1;
    for (let i = 0; i < DIMENSION_COUNT; i++) {
      acc[i] += opt.vector[i] ?? 0;
    }
  }

  if (count === 0) return { vector: ZERO_VEC(), count: 0 };
  for (let i = 0; i < DIMENSION_COUNT; i++) acc[i] /= count;
  return { vector: acc, count };
}

/**
 * 融合相似度：有基础且有绝杀时 0.8·cos(用户基础, 人格) + 0.2·cos(用户绝杀, 人格)；
 * 仅有一层有答题时，只用该层余弦（避免缺数据仍硬拆 80/20）。
 */
export function blendedSimilarity(
  userBase: number[],
  userKiller: number[],
  personalityVector: DimensionVector,
  baseCount: number,
  killerCount: number,
): number {
  const p = Array.from(personalityVector, (x) => x);

  const hasBase = baseCount > 0;
  const hasKiller = killerCount > 0;

  if (hasBase && hasKiller) {
    return (
      BASE_SIMILARITY_WEIGHT * cosineSimilarity(userBase, p) +
      KILLER_SIMILARITY_WEIGHT * cosineSimilarity(userKiller, p)
    );
  }
  if (hasBase) return cosineSimilarity(userBase, p);
  if (hasKiller) return cosineSimilarity(userKiller, p);
  return 0;
}

export function computeSimilarityBoard(answers: UserAnswer[]): SimilarityBoard {
  const { vector: baseVec, count: baseCount } = meanAnswerVector(answers, "base");
  const { vector: killerVec, count: killerCount } = meanAnswerVector(answers, "killer");

  const board = {} as SimilarityBoard;
  for (const p of PERSONALITIES) {
    board[p.id] = blendedSimilarity(baseVec, killerVec, p.vector, baseCount, killerCount);
  }
  return board;
}

/** 取融合相似度最高的人格；平局按 personality.md 表顺序（即 PERSONALITIES 数组序） */
export function pickTopPersonality(similarities: SimilarityBoard): PersonalityType {
  let best = PERSONALITIES[0]!;
  let bestScore = similarities[best.id] ?? -Infinity;
  for (const p of PERSONALITIES) {
    const s = similarities[p.id] ?? 0;
    if (s > bestScore) {
      best = p;
      bestScore = s;
    }
  }
  return best;
}

export type ResolveResult = {
  personality: PersonalityType;
  similarities: SimilarityBoard;
  userBaseVector: number[];
  userKillerVector: number[];
  baseAnswerCount: number;
  killerAnswerCount: number;
};

/** 计分引擎入口：余弦相似度 + 基础/绝杀分层权重 */
export function resolveResult(answers: UserAnswer[]): ResolveResult {
  const { vector: userBaseVector, count: baseAnswerCount } = meanAnswerVector(
    answers,
    "base",
  );
  const { vector: userKillerVector, count: killerAnswerCount } = meanAnswerVector(
    answers,
    "killer",
  );
  const similarities = computeSimilarityBoard(answers);
  const personality = pickTopPersonality(similarities);
  return {
    personality,
    similarities,
    userBaseVector,
    userKillerVector,
    baseAnswerCount,
    killerAnswerCount,
  };
}
