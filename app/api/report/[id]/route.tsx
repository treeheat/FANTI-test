import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import type { PersonalityId } from "@/data/types";
import { RESULT_DISPLAY_COPY } from "@/data/resultPersonalityCopy";

export const runtime = "nodejs";

const KNOWN_IDS = new Set(Object.keys(RESULT_DISPLAY_COPY));

function isPersonalityId(id: string): id is PersonalityId {
  return KNOWN_IDS.has(id);
}

/** 手机导出：9:16 画布内放得下，优先前两段，再按字数截断 */
function descriptionForPhone(full: string): string {
  const paras = full.split(/\n\n/).filter(Boolean);
  const head = paras.slice(0, 2).join("\n\n");
  const max = 780;
  if (head.length <= max) return head;
  return `${head.slice(0, max).trimEnd()}…`;
}

export async function GET(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id: raw } = await ctx.params;
  const id = decodeURIComponent(raw);
  if (!isPersonalityId(id)) {
    return NextResponse.json({ error: "unknown personality" }, { status: 404 });
  }

  const reqUrl = new URL(request.url);
  const compact =
    reqUrl.searchParams.get("compact") === "1" ||
    reqUrl.searchParams.get("mobile") === "1";

  const copy = RESULT_DISPLAY_COPY[id];
  const bodyText = compact ? descriptionForPhone(copy.description) : copy.description;

  // next/og（Satori）仅支持 TTF/OTF/WOFF，不支持 WOFF2（会抛 Unsupported OpenType signature wOF2）
  const font400Path = join(
    process.cwd(),
    "node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff",
  );
  const font700Path = join(
    process.cwd(),
    "node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-700-normal.woff",
  );
  const portraitPath = join(process.cwd(), "public", "images", `${id}.png`);

  const [font400, font700, imageBuf] = await Promise.all([
    readFile(font400Path),
    readFile(font700Path),
    readFile(portraitPath).catch(() => null),
  ]);

  const portraitSrc = imageBuf
    ? `data:image/png;base64,${imageBuf.toString("base64")}`
    : null;

  const W = compact ? 1080 : 720;
  const H = compact ? 1920 : 2800;
  const pad = compact ? 36 : 40;
  const labelSize = compact ? 24 : 26;
  const nameSize = compact ? 40 : 48;
  const nameMb = compact ? 20 : 28;
  const portraitW = compact ? 280 : 260;
  const portraitH = compact ? 350 : 325;
  const radius = compact ? 18 : 22;
  const quoteMt = compact ? 22 : 32;
  const quoteSize = compact ? 20 : 24;
  const bodyMt = compact ? 20 : 28;
  const bodySize = compact ? 16 : 19;
  const bodyLh = compact ? 1.5 : 1.65;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#0b0b0f",
          padding: pad,
          fontFamily: '"Noto Sans SC", sans-serif',
        }}
      >
        <div
          style={{
            fontSize: labelSize,
            color: "#a1a1aa",
            marginBottom: 8,
            fontWeight: 400,
          }}
        >
          你的 FANTI 是
        </div>
        <div
          style={{
            fontSize: nameSize,
            fontWeight: 700,
            color: "#fafafa",
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: nameMb,
          }}
        >
          {copy.name}
        </div>
        {portraitSrc ? (
          <img
            src={portraitSrc}
            width={portraitW}
            height={portraitH}
            alt=""
            style={{
              borderRadius: radius,
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        ) : null}
        <div
          style={{
            marginTop: quoteMt,
            width: "100%",
            paddingLeft: 12,
            borderLeft: "4px solid rgba(251, 191, 36, 0.8)",
            fontSize: quoteSize,
            fontWeight: 400,
            color: "#f4f4f5",
            lineHeight: 1.5,
          }}
        >
          {copy.quote}
        </div>
        <div
          style={{
            marginTop: bodyMt,
            width: "100%",
            fontSize: bodySize,
            fontWeight: 400,
            color: "#a1a1aa",
            lineHeight: bodyLh,
            whiteSpace: "pre-wrap",
          }}
        >
          {bodyText}
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [
        { name: "Noto Sans SC", data: font400, style: "normal", weight: 400 },
        { name: "Noto Sans SC", data: font700, style: "normal", weight: 700 },
      ],
      headers: {
        "Content-Disposition": `inline; filename="FANTI-${id}.png"`,
      },
    },
  );
}
