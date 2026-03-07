"use client";

import SegmentedToggle from "./SegmentedToggle";
import TitlesTicker from "./TitlesTicker";

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
    <header className="px-[var(--space-gutter)] pt-8 md:pt-12 pb-0 flex-shrink-0">
      {/* Row 1: Headline + Toggles */}
      <div className="flex items-end justify-between mb-2">
        <h1 className="font-display leading-none text-[var(--text-primary)]" style={{ fontSize: 'var(--type-display)' }}>
          Chase Gobble
        </h1>
        <div className="flex gap-2 md:gap-3 mb-[2px] md:mb-1">
          <SegmentedToggle
            leftLabel="Light"
            rightLabel="Dark"
            activeLeft={isLight}
            onToggle={onThemeToggle}
          />
          <SegmentedToggle
            leftLabel="Human"
            rightLabel="AI"
            activeLeft={isHuman}
            onToggle={onModeToggle}
          />
        </div>
      </div>

      {/* Row 2: Titles ticker */}
      <TitlesTicker />

      {/* Divider */}
      <div className="h-px bg-[var(--divider)] mt-3 md:mt-4" />
    </header>
  );
}
