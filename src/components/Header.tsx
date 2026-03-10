"use client";

import SegmentedToggle from "./SegmentedToggle";
import TitlesTicker from "./TitlesTicker";
import BlurHeadline from "./BlurHeadline";

interface HeaderProps {
  isLight: boolean;
  isHuman: boolean;
  onThemeToggle: () => void;
  onModeToggle: () => void;
}

export default function Header({
  isLight,
  isHuman,
  onThemeToggle,
  onModeToggle,
}: HeaderProps) {
  return (
    <header className="px-[var(--space-gutter)] pt-8 md:pt-[2vh] pb-0 flex-shrink-0">
      {/* Row 1: Headline + Toggles */}
      <div className="flex items-center md:items-end justify-between mb-2">
        <BlurHeadline text="Chase Gobble" />
        <div className="flex gap-2 md:gap-3 scale-90 md:scale-110 origin-right md:mb-1">
          <div
            className="transition-opacity duration-300"
            style={{ opacity: isHuman ? 1 : 0, pointerEvents: isHuman ? "auto" : "none" }}
          >
            <SegmentedToggle
              leftLabel="Light"
              rightLabel="Dark"
              activeLeft={isLight}
              onToggle={onThemeToggle}
            />
          </div>
          <SegmentedToggle
            leftLabel="Human"
            rightLabel="AI"
            activeLeft={isHuman}
            onToggle={onModeToggle}
          />
        </div>
      </div>

      {/* Row 2: Titles ticker — subtitle for SEO */}
      <div role="doc-subtitle" aria-label="Creative Leader, Founding Designer, Design Engineer">
        <TitlesTicker />
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--divider)] mt-3 md:mt-[1vh]" />
    </header>
  );
}
