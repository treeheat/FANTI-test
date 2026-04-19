"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type QuestionTransitionProps = {
  /** 与题目索引或 id 同步，用于触发动画 */
  stepKey: string | number;
  children: ReactNode;
  className?: string;
};

/**
 * 题目切换容器：后续把单题内容放在 children 内即可衔接滑入/淡出。
 */
export function QuestionTransition({
  stepKey,
  children,
  className = "",
}: QuestionTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
