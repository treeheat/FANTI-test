import type { ReactNode } from "react";

type MobileShellProps = {
  children: ReactNode;
  className?: string;
};

/**
 * 移动端优先：外层铺满中性底，内层 max-w-md 居中，模拟单手握持宽度。
 */
export function MobileShell({ children, className = "" }: MobileShellProps) {
  return (
    <div className="min-h-dvh w-full bg-[var(--app-canvas)] text-[var(--app-ink)]">
      <div
        className={`mx-auto flex min-h-dvh w-full max-w-md flex-col shadow-[0_0_0_1px_var(--app-hairline)] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
