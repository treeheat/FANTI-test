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

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id: raw } = await ctx.params;
  const id = decodeURIComponent(raw);
  if (!isPersonalityId(id)) {
    return NextResponse.json({ error: "unknown personality" }, { status: 404 });
  }

  const copy = RESULT_DISPLAY_COPY[id];

  const font400Path = join(
    process.cwd(),
    "node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff2",
  );
  const font700Path = join(
    process.cwd(),
    "node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-700-normal.woff2",
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
          padding: 40,
          fontFamily: '"Noto Sans SC", sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: "#a1a1aa",
            marginBottom: 10,
            fontWeight: 400,
          }}
        >
          你的 FANTI 是
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#fafafa",
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: 28,
          }}
        >
          {copy.name}
        </div>
        {portraitSrc ? (
          <img
            src={portraitSrc}
            width={260}
            height={325}
            alt=""
            style={{
              borderRadius: 22,
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        ) : null}
        <div
          style={{
            marginTop: 32,
            width: "100%",
            paddingLeft: 14,
            borderLeft: "4px solid rgba(251, 191, 36, 0.8)",
            fontSize: 24,
            fontWeight: 400,
            color: "#f4f4f5",
            lineHeight: 1.55,
          }}
        >
          {copy.quote}
        </div>
        <div
          style={{
            marginTop: 28,
            width: "100%",
            fontSize: 19,
            fontWeight: 400,
            color: "#a1a1aa",
            lineHeight: 1.65,
            whiteSpace: "pre-wrap",
          }}
        >
          {copy.description}
        </div>
      </div>
    ),
    {
      width: 720,
      height: 2800,
      fonts: [
        { name: "Noto Sans SC", data: font400, style: "normal", weight: 400 },
        { name: "Noto Sans SC", data: font700, style: "normal", weight: 700 },
      ],
      headers: {
        "Content-Disposition": `attachment; filename="FANTI-${id}.png"`,
      },
    },
  );
}
