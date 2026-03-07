"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onRequestAccess: () => void;
}

export default function PasswordModal({ open, onClose, onRequestAccess }: PasswordModalProps) {
  const [passcode, setPasscode] = useState("");
  const [mounted, setMounted] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const animateIn = useCallback(() => {
    const svg = svgRef.current;
    const backdrop = backdropRef.current;
    const modal = modalRef.current;
    if (!svg || !backdrop || !modal) return;

    const path = svg.querySelector("path");
    if (!path) return;

    gsap.killTweensOf([path, backdrop, modal]);
    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline();
    tlRef.current = tl;

    const isMobile = window.innerWidth < 768;

    gsap.set(svg, { display: "block" });
    gsap.set(backdrop, { opacity: 0 });

    if (isMobile) {
      gsap.set(modal, { opacity: 1, y: "100%" });
    } else {
      gsap.set(modal, { opacity: 0, scale: 0.95, y: 30 });
    }

    tl.fromTo(
      path,
      { attr: { d: "M-30,120 Q50,120 130,120 L130,120 L-30,120 Z" } },
      {
        attr: { d: "M-30,120 Q50,20 130,120 L130,120 L-30,120 Z" },
        duration: 0.5,
        ease: "power3.inOut",
      }
    )
    .to(
      backdrop,
      { opacity: 1, duration: 0.3, ease: "power2.out" },
      0.15
    )
    .to(
      path,
      {
        attr: { d: "M-30,-10 Q50,-10 130,-10 L130,120 L-30,120 Z" },
        duration: 1.2,
        ease: "power1.out",
      },
      0.35
    )
    .to(
      modal,
      isMobile
        ? { y: 0, duration: 0.4, ease: "power2.out" }
        : { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" },
      0.55
    )
    .set(svg, { display: "none" });
  }, []);

  const animateOut = useCallback(() => {
    const svg = svgRef.current;
    const backdrop = backdropRef.current;
    const modal = modalRef.current;
    if (!svg || !backdrop || !modal) return;

    const path = svg.querySelector("path");
    if (!path) return;

    gsap.killTweensOf([path, backdrop, modal]);
    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => setMounted(false),
    });
    tlRef.current = tl;

    const isMobile = window.innerWidth < 768;

    gsap.set(svg, { display: "block" });

    tl.to(modal, isMobile
        ? { y: "100%", duration: 0.3, ease: "power2.in" }
        : { opacity: 0, scale: 0.95, y: 30, duration: 0.25, ease: "power2.in" }
      )
      .fromTo(
        path,
        { attr: { d: "M-30,-10 Q50,-10 130,-10 L130,120 L-30,120 Z" } },
        {
          attr: { d: "M-30,120 Q50,20 130,120 L130,120 L-30,120 Z" },
          duration: 0.3,
          ease: "power2.out",
        },
        0.1
      )
      .to(backdrop, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.15)
      .to(
        path,
        {
          attr: { d: "M-30,120 Q50,120 130,120 L130,120 L-30,120 Z" },
          duration: 0.4,
          ease: "power3.inOut",
        },
        0.25
      );
  }, []);

  useEffect(() => {
    if (open) {
      setPasscode("");
      setMounted(true);
    } else if (mounted) {
      animateOut();
    }
  }, [open, mounted, animateOut]);

  useEffect(() => {
    if (mounted && open) {
      requestAnimationFrame(() => {
        animateIn();
        setTimeout(() => inputRef.current?.focus(), 400);
      });
    }
  }, [mounted, open, animateIn]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!mounted && !open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === "turkey") {
      onClose();
      // TODO: open portfolio view
    } else {
      // Shake the modal
      if (modalRef.current) {
        gsap.to(modalRef.current, {
          keyframes: [
            { x: -8, duration: 0.06 },
            { x: 8, duration: 0.06 },
            { x: -6, duration: 0.05 },
            { x: 6, duration: 0.05 },
            { x: 0, duration: 0.04 },
          ],
          ease: "power1.inOut",
        });
      }
      setPasscode("");
    }
  };

  return (
    <>
      <svg
        ref={svgRef}
        className="fixed inset-0 z-[60] pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ display: "none", width: "100vw", height: "100vh" }}
      >
        <path
          d="M-30,120 Q50,120 130,120 L130,120 L-30,120 Z"
          fill="var(--bg)"
          opacity="0.64"
        />
      </svg>

      <div
        ref={backdropRef}
        className="fixed inset-0 z-[70] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm"
        style={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === backdropRef.current) onClose();
        }}
      >
        <div
          ref={modalRef}
          className="w-full max-w-sm mx-0 md:mx-4 bg-[#0E1320] border border-[#1E2D45] rounded-t-xl md:rounded-lg shadow-2xl overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Terminal header */}
          <div className="flex items-center px-4 py-3 border-b border-[#1E2D45]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all cursor-pointer"
                />
              </div>
              <span className="ml-3 text-[11px] font-mono text-[#738090]">
                authenticate
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="flex items-center gap-2 font-mono text-xs text-[#738090] mb-1.5">
                <span className="text-[#7EB9FE]">$</span>
                passcode
              </label>
              <input
                ref={inputRef}
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="enter passcode"
                className="w-full bg-[#0A0F1A] border border-[#1E2D45] rounded px-3 py-2.5 font-mono text-sm text-[#D1D9E0] placeholder:text-[#3A4A5C] focus:outline-none focus:border-[#7EB9FE] transition-colors"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestAccess();
                }}
                className="group flex items-center gap-1.5 font-mono text-[11px] text-[#738090] hover:text-[#D1D9E0] transition-colors cursor-pointer"
              >
                request access
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-mono text-xs font-medium bg-[#7EB9FE] text-[#0E1320] rounded hover:bg-[#9ECBFF] transition-colors cursor-pointer"
              >
                proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
