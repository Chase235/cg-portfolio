"use client";

interface SegmentedToggleProps {
  leftLabel: string;
  rightLabel: string;
  activeLeft: boolean;
  onToggle: () => void;
}

export default function SegmentedToggle({
  leftLabel,
  rightLabel,
  activeLeft,
  onToggle,
}: SegmentedToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center rounded-md overflow-hidden h-7 w-[120px] md:w-[120px] cursor-pointer select-none
        bg-[var(--toggle-bg)] transition-colors duration-300"
      aria-label={`Toggle between ${leftLabel} and ${rightLabel}`}
    >
      {/* Active pill */}
      <div
        className="absolute top-[2px] h-[calc(100%-4px)] w-[calc(50%-3px)] rounded transition-all duration-300 ease-in-out
          bg-[var(--toggle-pill)] shadow-sm"
        style={{ left: activeLeft ? "2px" : "calc(50% + 1px)" }}
      />
      {/* Left label */}
      <span
        className={`relative z-10 flex-1 text-center text-[9px] font-medium tracking-wider font-mono transition-colors duration-300
          ${activeLeft ? "text-[var(--toggle-active)]" : "text-[var(--toggle-inactive)]"}`}
      >
        {leftLabel}
      </span>
      {/* Right label */}
      <span
        className={`relative z-10 flex-1 text-center text-[9px] font-medium tracking-wider font-mono transition-colors duration-300
          ${!activeLeft ? "text-[var(--toggle-active)]" : "text-[var(--toggle-inactive)]"}`}
      >
        {rightLabel}
      </span>
    </button>
  );
}
