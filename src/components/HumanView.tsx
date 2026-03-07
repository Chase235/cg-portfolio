import { siteContent } from "@/data/content";
import VideoPlaceholder from "./VideoPlaceholder";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-spaceMono tracking-wider text-[var(--text-muted)] mb-1"
      style={{ fontSize: "var(--type-label)" }}
    >
      {children}
    </p>
  );
}

function SecondaryText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[var(--text-primary)] font-sans ${className}`}
      style={{ fontSize: "var(--type-secondary)" }}
    >
      {children}
    </p>
  );
}

export default function HumanView() {
  return (
    <div className="flex-1 flex flex-col md:flex-row md:gap-0 px-[var(--space-gutter)] overflow-hidden">
      {/* Left column — ~1/3 width on desktop */}
      <div className="md:w-[38%] md:flex-shrink-0 flex flex-col md:pr-12 md:border-r border-[var(--divider)] min-w-0">
        {/* About */}
        <div className="pt-6 md:pt-8">
          <p
            className="font-mono font-medium tracking-wider text-[var(--text-muted)] mb-3 md:mb-4"
            style={{ fontSize: "var(--type-label)" }}
          >
            ABOUT
          </p>
          <div className="space-y-4 md:space-y-5">
            {siteContent.about.map((p, i) => (
              <p
                key={i}
                className="text-[var(--text-primary)] font-sans"
                style={{
                  fontSize: "var(--type-body)",
                  lineHeight: "var(--type-body-leading)",
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Currently / Previously — visible on desktop in left column */}
        <div className="hidden md:flex flex-col mt-auto pb-6">
          <div className="mt-8">
            <SectionLabel>{siteContent.currently.label}</SectionLabel>
            <SecondaryText>{siteContent.currently.value}</SecondaryText>
          </div>
          <div className="mt-5">
            <SectionLabel>{siteContent.previously.label}</SectionLabel>
            <SecondaryText>{siteContent.previously.value}</SecondaryText>
          </div>
          <div className="border-t border-[var(--divider)] mt-6 pt-5">
            <SectionLabel>{siteContent.contact.label}</SectionLabel>
            <p className="font-sans" style={{ fontSize: "var(--type-secondary)" }}>
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="text-[var(--text-link)] hover:underline"
              >
                {siteContent.contact.email}
              </a>
              <span className="text-[var(--text-muted)] mx-2">·</span>
              <a
                href={siteContent.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-link)] hover:underline"
              >
                {siteContent.contact.linkedin}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right column — fills remaining ~2/3 */}
      <div className="md:pl-12 flex flex-col flex-1 min-w-0">
        {/* Design Reel */}
        <div className="pt-6 md:pt-8">
          <p
            className="font-mono font-medium tracking-wider text-[var(--text-muted)] mb-3"
            style={{ fontSize: "var(--type-label)" }}
          >
            DESIGN REEL
          </p>
          <VideoPlaceholder />
        </div>

        {/* CTA */}
        <div className="mt-6">
          <button
            className="w-full md:w-auto px-8 py-3 bg-[var(--cta-bg)] text-[var(--cta-text)] font-mono font-medium rounded-md hover:opacity-90 transition-opacity cursor-pointer"
            style={{ fontSize: "var(--type-cta)" }}
          >
            View Selected Work
          </button>
          <p
            className="font-spaceMono text-[var(--text-muted)] mt-2"
            style={{ fontSize: "var(--type-label)" }}
          >
            Password-protected case studies
          </p>
        </div>

        {/* Clients — desktop */}
        <div className="hidden md:block mt-auto pb-6">
          <SectionLabel>{siteContent.clients.label}</SectionLabel>
          <SecondaryText>{siteContent.clients.list}</SecondaryText>
        </div>
      </div>

      {/* Mobile-only sections below the fold */}
      <div className="md:hidden mt-8 space-y-6 pb-8">
        <div className="border-t border-[var(--divider)] pt-5">
          <SectionLabel>{siteContent.currently.label}</SectionLabel>
          <SecondaryText>{siteContent.currently.value}</SecondaryText>
        </div>
        <div>
          <SectionLabel>{siteContent.previously.label}</SectionLabel>
          <SecondaryText>{siteContent.previously.value}</SecondaryText>
        </div>
        <div className="border-t border-[var(--divider)] pt-5">
          <SectionLabel>{siteContent.contact.label}</SectionLabel>
          <p className="font-sans" style={{ fontSize: "var(--type-secondary)" }}>
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="text-[var(--text-link)] hover:underline"
            >
              {siteContent.contact.email}
            </a>
            <span className="text-[var(--text-muted)] mx-2">·</span>
            <a
              href={siteContent.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-link)] hover:underline"
            >
              {siteContent.contact.linkedin}
            </a>
          </p>
        </div>
        <div className="border-t border-[var(--divider)] pt-5">
          <SectionLabel>{siteContent.clients.label}</SectionLabel>
          <SecondaryText>{siteContent.clients.list}</SecondaryText>
        </div>
      </div>
    </div>
  );
}
