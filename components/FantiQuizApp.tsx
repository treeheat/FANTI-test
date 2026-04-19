"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import {
  QUESTIONS,
  QUESTION_TOTAL,
  toResultPersonalityFromMatch,
  type ResultPersonality,
  type UserAnswer,
} from "@/data";
import { resolveResult } from "@/utils/scoring";
import { ResultView } from "./ResultView";

type Phase = "idle" | "quiz" | "loading" | "result";

const slideEase = [0.22, 1, 0.36, 1] as const;

export function FantiQuizApp() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestionCard, setShowQuestionCard] = useState(true);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [resultPersonality, setResultPersonality] = useState<ResultPersonality | null>(null);
  const advanceLock = useRef(false);
  const pendingFinishRef = useRef<UserAnswer[] | null>(null);
  /** 1：前进（下一题从右入）；-1：返回上一题（从左侧入、当前题向右出） */
  const [slideDir, setSlideDir] = useState<1 | -1>(1);

  const question = QUESTIONS[currentIndex] ?? QUESTIONS[0]!;

  const progressCurrent = Math.min(currentIndex + 1, QUESTION_TOTAL);
  const progressRatio = progressCurrent / QUESTION_TOTAL;

  const startQuiz = useCallback(() => {
    setPhase("quiz");
    setCurrentIndex(0);
    setShowQuestionCard(true);
    setAnswers([]);
    setResultPersonality(null);
    advanceLock.current = false;
    pendingFinishRef.current = null;
    setSlideDir(1);
  }, []);

  const finishQuiz = useCallback((finalAnswers: UserAnswer[]) => {
    setPhase("loading");
    window.setTimeout(() => {
      const { personality } = resolveResult(finalAnswers);
      setResultPersonality(toResultPersonalityFromMatch(personality));
      setPhase("result");
    }, 500);
  }, []);

  const handleExitComplete = useCallback(() => {
    const pending = pendingFinishRef.current;
    if (pending) {
      pendingFinishRef.current = null;
      advanceLock.current = false;
      finishQuiz(pending);
    }
  }, [finishQuiz]);

  const handleBack = useCallback(() => {
    if (phase !== "quiz" || !showQuestionCard || currentIndex <= 0 || advanceLock.current) {
      return;
    }
    setSlideDir(-1);
    advanceLock.current = false;
    setAnswers((prev) => prev.slice(0, -1));
    setCurrentIndex((i) => i - 1);
  }, [currentIndex, phase, showQuestionCard]);

  const onSelectOption = useCallback(
    (optionId: string) => {
      if (phase !== "quiz" || advanceLock.current || !showQuestionCard) return;
      advanceLock.current = true;
      setSlideDir(1);

      const q = QUESTIONS[currentIndex];
      if (!q) {
        advanceLock.current = false;
        return;
      }

      const nextAnswer: UserAnswer = { questionId: q.id, optionId };
      const nextAnswers = [...answers, nextAnswer];
      setAnswers(nextAnswers);

      const isLast = currentIndex >= QUESTION_TOTAL - 1;

      if (isLast) {
        pendingFinishRef.current = nextAnswers;
        setShowQuestionCard(false);
        return;
      }

      setCurrentIndex((i) => i + 1);
      window.setTimeout(() => {
        advanceLock.current = false;
      }, 360);
    },
    [answers, currentIndex, phase, showQuestionCard],
  );

  if (phase === "result" && resultPersonality) {
    return (
      <div className="min-h-dvh bg-zinc-950">
        <ResultView resultPersonality={resultPersonality} />
        <div className="mx-auto max-w-md px-4 pb-8">
          <button
            type="button"
            onClick={() => {
              setPhase("idle");
              setCurrentIndex(0);
              setShowQuestionCard(true);
              setAnswers([]);
              setResultPersonality(null);
              advanceLock.current = false;
              pendingFinishRef.current = null;
              setSlideDir(1);
            }}
            className="w-full rounded-xl border border-white/15 py-3 text-sm text-zinc-400 transition hover:border-white/25 hover:text-zinc-200"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  if (phase === "loading") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-zinc-950 px-6 text-center">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="relative h-12 w-12">
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-white/15 border-t-amber-400/90"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-base font-medium tracking-wide text-zinc-200">
            正在生成你的FANTI切片...
          </p>
          <p className="max-w-xs text-xs leading-relaxed text-zinc-500">
            正在根据你的选择计算人格匹配度
          </p>
        </motion.div>
      </div>
    );
  }

  if (phase === "idle") {
    return (
      <div className="relative min-h-dvh overflow-hidden bg-zinc-950">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgba(251,191,36,0.12),transparent_55%),radial-gradient(80%_60%_at_100%_100%,rgba(120,113,198,0.12),transparent_50%)]"
        />
        <div className="absolute inset-0 backdrop-blur-[2px]" />

        <div className="relative z-10 mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: slideEase }}
            className="w-full rounded-3xl border border-white/[0.14] bg-white/[0.06] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_80px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl"
          >
            <p className="text-center text-xs font-medium uppercase tracking-[0.35em] text-zinc-500">
              FANTI
            </p>
            <h1 className="mt-3 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              追星女 15 型人格
            </h1>
            <p className="mt-4 text-center text-sm leading-relaxed text-zinc-400">
              共 {QUESTION_TOTAL} 题 · 测测你的追星体质切片
            </p>
            <p className="mt-5 text-center text-xs text-zinc-500">（测试约2分钟）</p>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={startQuiz}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-zinc-100 to-zinc-300 py-4 text-base font-semibold text-zinc-950 shadow-[0_0_32px_-6px_rgba(250,250,250,0.35)]"
            >
              开始测试
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  /* quiz */
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="sticky top-0 z-20 border-b border-white/[0.08] bg-zinc-950/90 px-4 pb-3 pt-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <span className="font-mono text-xs tabular-nums text-zinc-500">
            {progressCurrent} / {QUESTION_TOTAL}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            FANTI
          </span>
        </div>
        <div className="mx-auto mt-2 h-1 max-w-md overflow-hidden rounded-full bg-zinc-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-400/90 to-amber-200/80"
            initial={false}
            animate={{ width: `${progressRatio * 100}%` }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-md px-4 pb-10 pt-6">
        <div className="relative min-h-[min(72vh,520px)] overflow-hidden">
          <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
            {showQuestionCard ? (
              <motion.div
                key={currentIndex}
                custom={slideDir}
                variants={{
                  enter: (dir: 1 | -1) => ({
                    x: dir === 1 ? "100%" : "-100%",
                    opacity: 0,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    transition: { duration: 0.34, ease: slideEase },
                  },
                  leave: (dir: 1 | -1) => ({
                    x: dir === 1 ? "-100%" : "100%",
                    opacity: 0,
                    transition: { duration: 0.3, ease: slideEase },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="leave"
                className="w-full"
              >
                <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:p-6">
                  <h2 className="text-lg font-semibold leading-snug text-white sm:text-xl">
                    {question.prompt}
                  </h2>

                  <div className="mt-8 flex flex-col gap-3">
                    {question.options.map((opt) => (
                      <motion.button
                        key={opt.id}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 520, damping: 28 }}
                        onClick={() => onSelectOption(opt.id)}
                        className="flex w-full items-start gap-3 rounded-2xl border border-white/[0.1] bg-zinc-900/50 px-4 py-4 text-left shadow-sm transition hover:border-white/20 hover:bg-zinc-900"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 font-mono text-sm font-bold text-amber-300/95">
                          {opt.id}
                        </span>
                        <span className="text-base leading-relaxed text-zinc-100 sm:text-lg">
                          {opt.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-6 flex min-h-[2.25rem] items-end justify-start border-t border-white/[0.06] pt-4">
                    {currentIndex > 0 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="text-sm font-medium text-zinc-500 transition hover:text-zinc-200 active:text-zinc-300"
                      >
                        ← 上一题
                      </button>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
