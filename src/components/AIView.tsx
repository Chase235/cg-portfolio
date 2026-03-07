"use client";

import { siteContent } from "@/data/content";

type LineType = "comment" | "h1" | "h2" | "h3" | "key" | "value" | "text" | "blank";

interface Line {
  type: LineType;
  text: string;
}

function parseMarkdownToLines(md: string): Line[] {
  const rawLines = md.split("\n");
  return rawLines.map((line): Line => {
    const trimmed = line.trimStart();
    if (trimmed === "---") return { type: "comment", text: line };
    if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) return { type: "h1", text: line };
    if (trimmed.startsWith("### ")) return { type: "h3", text: line };
    if (trimmed.startsWith("## ")) return { type: "h2", text: line };
    if (trimmed === "") return { type: "blank", text: "" };
    if (trimmed.startsWith("- ") || trimmed.match(/^\w[\w-]*:/)) return { type: "key", text: line };
    if (line.startsWith("  ") || line.startsWith(" ")) return { type: "value", text: line };
    if (trimmed.startsWith("[") || trimmed.startsWith(" ")) return { type: "value", text: line };
    return { type: "text", text: line };
  });
}

const colorMap: Record<LineType, string> = {
  h1: "text-[#7EB9FE]",
  h2: "text-[#7EB9FE]",
  h3: "text-[#7EB9FE]",
  text: "text-[#D1D9E0]",
  key: "text-[#9BD59A]",
  value: "text-[#F1C67C]",
  comment: "text-[#738090]",
  blank: "",
};

export default function AIView() {
  const lines = parseMarkdownToLines(siteContent.aiMarkdown);

  return (
    <div className="flex-1 px-4 md:px-12 py-4 md:py-6 overflow-auto">
      <div className="bg-[#0E1320] rounded-lg overflow-hidden w-full max-w-[1344px] mx-auto">
        {/* Terminal bar */}
        <div className="flex items-center justify-center h-7 md:h-8 bg-[#0B0F18] px-3 md:px-4">
          <span className="text-[9px] md:text-[11px] font-mono text-[#738090]">
            chase-gobble.md
          </span>
        </div>

        {/* Code content */}
        <div className="flex p-3 md:p-4 overflow-x-auto">
          {/* Line numbers */}
          <div className="flex-shrink-0 pr-2 md:pr-3 mr-2 md:mr-3 border-r border-[#262B36] select-none">
            {lines.map((_, i) => (
              <div
                key={i}
                className="text-[10px] md:text-[12px] leading-[15px] md:leading-[18px] text-[#4D5666] text-right font-mono w-5 md:w-6"
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code lines */}
          <div className="flex-1 min-w-0">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`text-[10px] md:text-[12px] leading-[15px] md:leading-[18px] font-mono whitespace-pre ${
                  line.type === "h1" || line.type === "h2"
                    ? "font-bold"
                    : ""
                } ${colorMap[line.type]}`}
              >
                {line.text || "\u00A0"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
