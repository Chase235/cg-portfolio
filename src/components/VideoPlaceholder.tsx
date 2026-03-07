export default function VideoPlaceholder() {
  return (
    <div className="relative aspect-square w-[calc(100%+var(--space-gutter))] md:w-full md:aspect-auto md:h-full md:rounded-l-xl md:rounded-r-none rounded-none bg-[var(--video-bg)] flex items-center justify-center overflow-hidden">
      {/* Play button */}
      <div className="w-14 h-14 rounded-full border-[1.5px] border-white/40 flex items-center justify-center opacity-50">
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="white"
          className="ml-1"
        >
          <polygon points="0,0 16,9 0,18" />
        </svg>
      </div>
    </div>
  );
}
