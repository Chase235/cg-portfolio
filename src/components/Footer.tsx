import InspirationTicker from "./InspirationTicker";

export default function Footer() {
  return (
    <footer className="flex-shrink-0 px-[var(--space-gutter)] pb-4 md:pb-[1.5vh]">
      <div className="h-px bg-[var(--divider)] mb-3 md:mb-[1vh]" />
      <div className="flex flex-col md:flex-row md:items-center">
        <p
          className="font-mono text-[var(--text-muted)] whitespace-nowrap flex-shrink-0 md:w-[30%] order-2 md:order-1"
          style={{ fontSize: "var(--type-footer)" }}
        >
          © 2026 Chase Gobble
        </p>
        <div className="flex items-center gap-2 flex-1 min-w-0 mb-2 md:mb-0 order-1 md:order-2">
          <p
            className="font-mono font-bold text-[var(--text-muted)] flex-shrink-0 leading-tight"
            style={{ fontSize: "var(--type-footer)" }}
          >
            Inspired<br />By:
          </p>
          <div className="flex-1 min-w-0">
            <InspirationTicker />
          </div>
        </div>
      </div>
    </footer>
  );
}
