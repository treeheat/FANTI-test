/**
 * 七维顺序（与 dimension.md 表 1–7 行一致，文案采用产品命名）
 * 视线→审美→基调→版图→声量→投入→边界
 */
export const DIMENSION_AXIS_ORDER = [
  { key: "gaze", labelZh: "视线", en: "gaze" },
  { key: "filter", labelZh: "审美", en: "filter" },
  { key: "attitude", labelZh: "基调", en: "attitude" },
  { key: "scope", labelZh: "版图", en: "scope" },
  { key: "voice", labelZh: "声量", en: "voice" },
  { key: "investment", labelZh: "投入", en: "investment" },
  { key: "combat", labelZh: "边界", en: "combat" },
] as const;

export type DimensionKey = (typeof DIMENSION_AXIS_ORDER)[number]["key"];

export const DIMENSION_COUNT = DIMENSION_AXIS_ORDER.length;
