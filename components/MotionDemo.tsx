"use client";

import { useState } from "react";
import { QuestionTransition } from "./QuestionTransition";

/** 用于确认 framer-motion 已接入；正式做题流程可删除或移出 */
export function MotionDemo() {
  const [step, setStep] = useState(0);
  const lines = [
    "题目切换动效已就绪（淡入 + 轻微位移）。",
    "后续把题干与选项放进 QuestionTransition 即可复用。",
  ];

  return (
    <div className="mt-8 space-y-4 rounded-2xl border border-[var(--app-hairline)] bg-[var(--app-elevated)] p-5">
      <QuestionTransition stepKey={step}>
        <p className="text-sm leading-relaxed text-[var(--app-muted)]">
          {lines[step % lines.length]}
        </p>
      </QuestionTransition>
      <button
        type="button"
        onClick={() => setStep((s) => s + 1)}
        className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-medium text-zinc-50 transition hover:bg-zinc-800 active:scale-[0.99]"
      >
        下一屏（动效演示）
      </button>
    </div>
  );
}
