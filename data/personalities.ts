import type { DimensionVector, PersonalityType } from "./types";

/** 人格标准坐标（personality.md），七维顺序：视线…边界 */
const V = (a: DimensionVector) => a;

/**
 * 15 人格数据库（向量与 personality.md 一致）
 */
export const PERSONALITIES: readonly PersonalityType[] = [
  {
    id: "KPIS",
    name: "KPIS",
    tagline: "仰视、造神、苛刻、排他、硬核",
    vector: V([1, 1, -1, 1, 0, 1, 0]),
  },
  {
    id: "MASK",
    name: "MASK",
    tagline: "俯视、解构、苛刻、硬核、外放",
    vector: V([-1, -1, -1, 0, 1, 1, 0]),
  },
  {
    id: "SHADOW",
    name: "SHADOW",
    tagline: "仰视、造神、溺爱、排他、潜水",
    vector: V([1, 1, 1, 1, -1, 0, 0]),
  },
  {
    id: "COOKER",
    name: "COOKER",
    tagline: "解构、溺爱、羁绊、外放、佛系",
    vector: V([0, -1, 1, -1, 1, -1, 0]),
  },
  {
    id: "ATM-er",
    name: "ATM-er",
    tagline: "造神、溺爱、潜水、硬核",
    vector: V([0, 1, 1, 0, -1, 1, 0]),
  },
  {
    id: "LMAO",
    name: "LMAO",
    tagline: "解构、羁绊、潜水、抽离",
    vector: V([0, -1, 0, -1, -1, -1, -1]),
  },
  {
    id: "GUARD",
    name: "GUARD",
    tagline: "造神、溺爱、排他、外放、冲锋",
    vector: V([0, 1, 1, 1, 1, 0, 1]),
  },
  {
    id: "PLAY-er",
    name: "PLAY-er",
    tagline: "俯视、解构、溺爱、羁绊、外放",
    vector: V([-1, -1, 1, -1, 1, -1, -1]),
  },
  {
    id: "WIKI",
    name: "WIKI",
    tagline: "苛刻、羁绊、硬核、外放",
    vector: V([0, 0, -1, -1, 1, 1, 0]),
  },
  {
    id: "MAMA",
    name: "MAMA",
    tagline: "俯视、造神、溺爱、冲锋",
    vector: V([-1, 1, 1, 0, 0, 0, 1]),
  },
  {
    id: "FACE",
    name: "FACE",
    tagline: "仰视、造神、溺爱、排他、抽离",
    vector: V([1, 1, 1, 1, 0, -1, -1]),
  },
  {
    id: "ADDICT",
    name: "ADDICT",
    tagline: "解构、溺爱、硬核、冲锋",
    vector: V([0, -1, 1, 0, 0, 1, 1]),
  },
  {
    id: "HOME",
    name: "HOME",
    tagline: "造神、溺爱、羁绊、外放、硬核",
    vector: V([0, 1, 1, -1, 1, 1, 0]),
  },
  {
    id: "SOUL",
    name: "SOUL",
    tagline: "仰视、溺爱、排他、抽离",
    vector: V([1, 0, 1, 1, -1, 0, -1]),
  },
  {
    id: "KE-er",
    name: "KE-er",
    tagline: "解构、溺爱、羁绊、外放、冲锋",
    vector: V([0, -1, 1, -1, 1, 0, 1]),
  },
];
