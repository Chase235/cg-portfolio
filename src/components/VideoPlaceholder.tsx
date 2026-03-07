export default function VideoPlaceholder() {
  return (
    <div className="relative aspect-square w-full md:w-1/2 bg-[var(--video-bg)] rounded-md flex items-center justify-center">
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
