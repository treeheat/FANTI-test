"use client";

import html2canvas from "html2canvas";
import Image from "next/image";
import { useCallback, useRef, useState, type CSSProperties } from "react";
import type { PersonalityId, ResultPersonality } from "@/data";
import { PERSONALITIES, RESULT_DISPLAY_COPY } from "@/data";

export type ResultViewProps = {
  resultPersonality: ResultPersonality;
  className?: string;
};

function downloadDataUrl(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function isLikelyMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

function copyToResult(id: PersonalityId): ResultPersonality {
  const c = RESULT_DISPLAY_COPY[id];
  return { id, name: c.name, quote: c.quote, description: c.description };
}

function CatalogThumb({
  id,
  label,
  active,
  onOpen,
}: {
  id: PersonalityId;
  label: string;
  active: boolean;
  onOpen: () => void;
}) {
  const [ok, setOk] = useState(true);
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`flex w-full flex-col items-center rounded-xl border p-2 text-center transition ${
        active
          ? "border-amber-400/50 bg-amber-400/10 shadow-[0_0_0_1px_rgba(251,191,36,0.25)]"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
      }`}
    >
      <div
        className="relative mb-2 aspect-square w-full overflow-hidden rounded-lg bg-zinc-900 ring-1 ring-white/10"
        style={
          {
            background:
              "linear-gradient(145deg, rgba(39,39,42,0.9), rgba(24,24,27,0.95))",
          } as CSSProperties
        }
      >
        {ok ? (
          // eslint-disable-next-line @next/next/no-img-element -- 缩略图需可靠 onError 回退
          <img
            src={`/images/${id}.png`}
            alt=""
            className="h-full w-full object-cover object-top"
            loading="lazy"
            onError={() => setOk(false)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-1">
            <span className="font-mono text-[10px] text-zinc-500">{id}</span>
          </div>
        )}
      </div>
      <p className="line-clamp-2 text-[10px] font-medium leading-tight text-zinc-200">
        {label}
      </p>
      <span className="mt-1 text-[9px] text-zinc-500">查看详情</span>
    </button>
  );
}

function PortraitBlock({
  id,
  name,
  priority,
}: {
  id: PersonalityId;
  name: string;
  priority?: boolean;
}) {
  const [portraitOk, setPortraitOk] = useState(true);
  const src = `/images/${id}.png`;

  return (
    <div className="relative mx-auto mt-6 flex w-full max-w-[280px] justify-center">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-900/90 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
        {portraitOk ? (
          <Image
            src={src}
            alt={name}
            fill
            sizes="280px"
            className="object-cover object-top"
            unoptimized
            priority={priority}
            onError={() => setPortraitOk(false)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-zinc-800 to-zinc-950 p-6 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              portrait
            </p>
            <p className="font-mono text-lg text-zinc-300">{id}</p>
            <p className="text-xs text-zinc-500">将立绘置于 /public/images/{id}.png</p>
          </div>
        )}
      </div>
    </div>
  );
}

/** 与测试结果主卡片相同的版式（标题区按场景切换） */
function ResultStyleCard({
  personality,
  headingMode,
}: {
  personality: ResultPersonality;
  headingMode: "result" | "archive";
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-zinc-950/80 px-5 pb-8 pt-7 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_80px_-20px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-20%,rgba(250,250,250,0.08),transparent_55%)]"
      />

      {headingMode === "result" ? (
        <h1 className="relative text-center text-[1.65rem] font-bold leading-tight tracking-tight text-white sm:text-3xl">
          你的FANTI是
          <span className="mt-2 block bg-gradient-to-br from-zinc-100 via-white to-zinc-400 bg-clip-text text-[1.85rem] font-extrabold text-transparent sm:text-4xl">
            {personality.name}
          </span>
        </h1>
      ) : (
        <div className="relative text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-500">
            人格档案
          </p>
          <h2 className="mt-2 text-[1.65rem] font-bold leading-tight tracking-tight text-white sm:text-3xl">
            <span className="block bg-gradient-to-br from-zinc-100 via-white to-zinc-400 bg-clip-text text-[1.85rem] font-extrabold text-transparent sm:text-4xl">
              {personality.name}
            </span>
          </h2>
        </div>
      )}

      <PortraitBlock id={personality.id} name={personality.name} priority={headingMode === "result"} />

      <blockquote className="relative mx-auto mt-8 max-w-prose border-l-2 border-amber-400/70 pl-4 text-left">
        <span
          aria-hidden
          className="mb-1 block font-serif text-3xl leading-none text-amber-400/50"
        >
          &ldquo;
        </span>
        <p className="text-base font-medium leading-relaxed text-zinc-100/95 sm:text-lg">
          {personality.quote}
        </p>
        <span
          aria-hidden
          className="mt-1 block text-right font-serif text-3xl leading-none text-amber-400/50"
        >
          &rdquo;
        </span>
      </blockquote>

      <div className="relative mx-auto mt-6 max-w-prose text-left">
        <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-400 sm:text-[0.95rem]">
          {personality.description}
        </p>
      </div>
    </div>
  );
}

export function ResultView({ resultPersonality, className = "" }: ResultViewProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [catalogDetailId, setCatalogDetailId] = useState<PersonalityId | null>(null);

  const closeCatalog = useCallback(() => {
    setCatalogOpen(false);
    setCatalogDetailId(null);
  }, []);

  const handleExport = useCallback(async () => {
    const el = cardRef.current;
    if (!el) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(el, {
        scale: Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 2),
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#0b0b0f",
        logging: false,
        scrollX: 0,
        scrollY: 0,
      });
      const url = canvas.toDataURL("image/png");
      const filename = `FANTI-${resultPersonality.id}.png`;

      if (isLikelyMobile()) {
        setPreviewUrl(url);
      } else {
        downloadDataUrl(url, filename);
      }
    } catch (e) {
      console.error(e);
      alert("生成图片失败，请稍后重试。");
    } finally {
      setExporting(false);
    }
  }, [resultPersonality.id]);

  return (
    <div
      className={`mx-auto w-full max-w-md px-4 py-6 text-zinc-100 ${className}`}
    >
      <div ref={cardRef}>
        <ResultStyleCard personality={resultPersonality} headingMode="result" />
      </div>

      <div className="mt-5 flex gap-4" data-html2canvas-ignore>
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="flex-1 rounded-xl bg-gradient-to-r from-zinc-100 to-zinc-300 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_-4px_rgba(250,250,250,0.35)] transition enabled:hover:brightness-105 enabled:active:scale-[0.99] disabled:opacity-60"
        >
          {exporting ? "生成中…" : "生成专属报告"}
        </button>
        <button
          type="button"
          onClick={() => setCatalogOpen(true)}
          className="flex-1 rounded-xl border border-white/20 bg-transparent py-3.5 text-sm font-medium text-zinc-200 transition hover:border-white/35 hover:bg-white/[0.04]"
        >
          查看所有人格
        </button>
      </div>

      {previewUrl ? (
        <div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fanti-preview-title"
        >
          <div className="mb-3 flex w-full max-w-sm items-center justify-between text-zinc-300">
            <h2 id="fanti-preview-title" className="text-sm font-medium">
              报告已生成
            </h2>
            <button
              type="button"
              onClick={() => setPreviewUrl(null)}
              className="rounded-lg px-3 py-1 text-xs text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
            >
              关闭
            </button>
          </div>
          <div className="max-h-[70vh] w-full max-w-sm overflow-auto rounded-xl border border-white/10 bg-zinc-900/50 p-2 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="FANTI 测试结果报告"
              className="h-auto w-full rounded-lg"
            />
          </div>
          <p className="mt-4 max-w-sm text-center text-xs leading-relaxed text-zinc-500">
            请<strong className="text-zinc-300">长按图片保存到相册</strong>
            。若系统无反应，可截屏本页后再裁剪。
          </p>
          {!isLikelyMobile() ? (
            <button
              type="button"
              onClick={() => downloadDataUrl(previewUrl, `FANTI-${resultPersonality.id}.png`)}
              className="mt-4 rounded-lg border border-white/15 px-4 py-2 text-xs font-medium text-zinc-200 hover:bg-white/5"
            >
              再次下载 PNG
            </button>
          ) : null}
        </div>
      ) : null}

      {catalogOpen ? (
        <div
          className="fixed inset-0 z-[110] flex flex-col bg-zinc-950/95 text-zinc-100 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fanti-catalog-title"
        >
          <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 id="fanti-catalog-title" className="text-sm font-semibold tracking-wide">
              {catalogDetailId ? "人格详情" : "全部 15 型人格"}
            </h2>
            <div className="flex items-center gap-2">
              {catalogDetailId ? (
                <button
                  type="button"
                  onClick={() => setCatalogDetailId(null)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-zinc-100"
                >
                  返回列表
                </button>
              ) : null}
              <button
                type="button"
                onClick={closeCatalog}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
              >
                关闭
              </button>
            </div>
          </header>

          {catalogDetailId ? (
            <div className="mx-auto w-full max-w-md flex-1 overflow-y-auto px-4 pb-8 pt-4">
              <ResultStyleCard
                personality={copyToResult(catalogDetailId)}
                headingMode="archive"
              />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-3 pb-6 pt-4">
              <ul className="grid grid-cols-3 gap-3 sm:grid-cols-3">
                {PERSONALITIES.map((p) => {
                  const copy = RESULT_DISPLAY_COPY[p.id as PersonalityId];
                  const active = p.id === resultPersonality.id;
                  return (
                    <li key={p.id}>
                      <CatalogThumb
                        id={p.id}
                        label={copy.name}
                        active={active}
                        onOpen={() => setCatalogDetailId(p.id)}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
