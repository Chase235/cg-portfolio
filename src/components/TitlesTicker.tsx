"use client";

import { siteContent } from "@/data/content";

export default function TitlesTicker() {
  const text = siteContent.titles.join(" · ") + " · ";
  // Triple for seamless loop without gaps
  const tripled = text + text + text;

  return (
    <div className="relative overflow-hidden" style={{ height: 'calc(var(--type-ticker) + 6px)' }}>
      <div className="ticker-track whitespace-nowrap font-spaceMono text-[var(--text-secondary)]" style={{ fontSize: 'var(--type-ticker)' }}>
        {tripled}
      </div>
      {/* Fade mask — starts at ~33% from left to align with bottom ticker start */}
      <div className="absolute right-0 top-0 h-full w-[67%] bg-gradient-to-l from-[var(--bg)] via-[var(--bg)] via-30% to-transparent pointer-events-none" />
    </div>
  );
}
