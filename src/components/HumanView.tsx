"use client";

import { useState, lazy, Suspense } from "react";
import { siteContent } from "@/data/content";
import LogoCarousel from "./LogoCarousel";

const ContactModal = lazy(() => import("./ContactModal"));
const PasswordModal = lazy(() => import("./PasswordModal"));

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

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      <path d="M8 9h8M8 13h4"/>
    </svg>
  );
}

function ContactIcons({ onMessageClick }: { onMessageClick: () => void }) {
  return (
    <div className="flex items-center gap-6">
      <a
        href="https://github.com/Chase235"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--text-link)] hover:opacity-70 transition-opacity"
        aria-label="GitHub"
      >
        <GitHubIcon />
      </a>
      <a
        href="https://instagram.com/chase_gobble"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--text-link)] hover:opacity-70 transition-opacity"
        aria-label="Instagram"
      >
        <InstagramIcon />
      </a>
      <button
        onClick={onMessageClick}
        className="text-[var(--text-link)] hover:opacity-70 transition-opacity cursor-pointer"
        aria-label="Send a message"
      >
        <MessageIcon />
      </button>
    </div>
  );
}

export default function HumanView() {
  const [contactOpen, setContactOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <>
      <div className="flex-1 flex flex-col md:flex-row md:gap-0 pl-[var(--space-gutter)] pr-[var(--space-gutter)] md:pr-0 overflow-hidden">
        {/* Left column — shrinks slower than right */}
        <div className="md:w-[42%] md:flex-shrink-0 flex flex-col md:pr-12 md:border-r border-[var(--divider)] min-w-0">
          {/* About — flex-1 + min-h-0 lets this shrink when viewport is short */}
          <div className="pt-6 md:pt-[2vh] md:flex-1 md:min-h-0 md:overflow-hidden">
            <p
              className="font-mono font-medium tracking-wider text-[var(--text-muted)] mb-3 md:mb-[1vh]"
              style={{ fontSize: "var(--type-label)" }}
            >
              ABOUT
            </p>
            <div className="space-y-4" style={{ gap: "min(1.2vw, 1.8vh)" }}>
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

          {/* Currently / Previously — mobile, between about and video */}
          <div className="md:hidden mt-6 space-y-4">
            <div>
              <SectionLabel>{siteContent.currently.label}</SectionLabel>
              <SecondaryText>{siteContent.currently.value}</SecondaryText>
            </div>
            <div>
              <SectionLabel>{siteContent.previously.label}</SectionLabel>
              <SecondaryText>{siteContent.previously.value}</SecondaryText>
            </div>
          </div>

          {/* Currently / Previously — visible on desktop in left column */}
          <div className="hidden md:flex flex-col flex-shrink-0 pb-[1.5vh]">
            <div className="mt-[1.5vh]">
              <SectionLabel>{siteContent.currently.label}</SectionLabel>
              <SecondaryText>{siteContent.currently.value}</SecondaryText>
            </div>
            <div className="mt-[1.5vh]">
              <SectionLabel>{siteContent.previously.label}</SectionLabel>
              <SecondaryText>{siteContent.previously.value}</SecondaryText>
            </div>
            <div className="border-t border-[var(--divider)] mt-[1.5vh] pt-[2vh]">
              <div className="mb-2">
                <SectionLabel>{siteContent.contact.label}</SectionLabel>
              </div>
              <ContactIcons onMessageClick={() => setContactOpen(true)} />
            </div>
          </div>
        </div>

        {/* Right column — fills remaining width, no right padding so video bleeds */}
        <div className="md:pl-12 flex flex-col flex-1 min-w-0">
          {/* Design Reel + CTA pinned below */}
          <div className="pt-6 md:pt-[2vh] md:flex-1 md:min-h-0 flex flex-col">
            <p
              className="font-mono font-medium tracking-wider text-[var(--text-muted)] mb-3 md:mb-[1vh]"
              style={{ fontSize: "var(--type-label)" }}
            >
              PRESENT AND PAST CLIENTS
            </p>
            <div className="md:flex-1 md:min-h-0 md:flex md:items-center relative">
              <LogoCarousel />
              {/* CTA — pinned inside frame on desktop only */}
              <div className="hidden md:flex absolute bottom-4 left-0 flex-row items-center gap-4 z-10">
                <button
                  onClick={() => setPasswordOpen(true)}
                  className="px-8 py-[1vh] bg-[var(--cta-bg)] text-[var(--cta-text)] font-mono font-medium rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ fontSize: "var(--type-cta)" }}
                >
                  View Selected Work
                </button>
                <p
                  className="font-spaceMono text-[var(--text-muted)]"
                  style={{ fontSize: "var(--type-label)" }}
                >
                  Password-protected case studies
                </p>
              </div>
            </div>
            {/* CTA — below frame on mobile only */}
            <div className="md:hidden mt-4 mb-4 flex flex-col">
              <button
                onClick={() => setPasswordOpen(true)}
                className="w-full px-8 py-3 bg-[var(--cta-bg)] text-[var(--cta-text)] font-mono font-medium rounded-md hover:opacity-90 transition-opacity cursor-pointer"
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
          </div>

          {/* Clients — desktop */}
          <div className="hidden md:block mt-auto pb-[2vh]">
            <SectionLabel>{siteContent.clients.label}</SectionLabel>
            <SecondaryText>{siteContent.clients.list}</SecondaryText>
          </div>
        </div>

        {/* Mobile-only sections below the fold */}
        <div className="md:hidden mt-8 space-y-6 pb-8">
          <div className="border-t border-[var(--divider)] pt-5">
            <SectionLabel>{siteContent.contact.label}</SectionLabel>
            <ContactIcons onMessageClick={() => setContactOpen(true)} />
          </div>
          <div className="border-t border-[var(--divider)] pt-5">
            <SectionLabel>{siteContent.clients.label}</SectionLabel>
            <SecondaryText>{siteContent.clients.list}</SecondaryText>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
        <PasswordModal
          open={passwordOpen}
          onClose={() => setPasswordOpen(false)}
          onRequestAccess={() => setContactOpen(true)}
        />
      </Suspense>
    </>
  );
}
