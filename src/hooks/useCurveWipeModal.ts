"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

export function useCurveWipeModal(
  open: boolean,
  onClose: () => void,
  onBeforeOpen?: () => void
) {
  const [mounted, setMounted] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
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

    const mobile = window.innerWidth < 768;

    gsap.set(svg, { display: "block" });
    gsap.set(backdrop, { opacity: 0 });
    gsap.set(modal, mobile ? { opacity: 1, y: "100%" } : { opacity: 0, scale: 0.95, y: 30 });

    tl.fromTo(
      path,
      { attr: { d: "M-30,120 Q50,120 130,120 L130,120 L-30,120 Z" } },
      { attr: { d: "M-30,120 Q50,20 130,120 L130,120 L-30,120 Z" }, duration: 0.5, ease: "power3.inOut" }
    )
      .to(backdrop, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.15)
      .to(path, { attr: { d: "M-30,-10 Q50,-10 130,-10 L130,120 L-30,120 Z" }, duration: 1.2, ease: "power1.out" }, 0.35)
      .to(
        modal,
        mobile ? { y: 0, duration: 0.4, ease: "power2.out" } : { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" },
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

    const tl = gsap.timeline({ onComplete: () => setMounted(false) });
    tlRef.current = tl;

    const mobile = window.innerWidth < 768;

    gsap.set(svg, { display: "block" });

    tl.to(modal, mobile ? { y: "100%", duration: 0.3, ease: "power2.in" } : { opacity: 0, scale: 0.95, y: 30, duration: 0.25, ease: "power2.in" })
      .fromTo(path, { attr: { d: "M-30,-10 Q50,-10 130,-10 L130,120 L-30,120 Z" } }, { attr: { d: "M-30,120 Q50,20 130,120 L130,120 L-30,120 Z" }, duration: 0.3, ease: "power2.out" }, 0.1)
      .to(backdrop, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.15)
      .to(path, { attr: { d: "M-30,120 Q50,120 130,120 L130,120 L-30,120 Z" }, duration: 0.4, ease: "power3.inOut" }, 0.25);
  }, []);

  useEffect(() => {
    if (open) {
      onBeforeOpen?.();
      setMounted(true);
    } else if (mounted) {
      animateOut();
    }
  }, [open, mounted, animateOut, onBeforeOpen]);

  useEffect(() => {
    if (mounted && open) {
      requestAnimationFrame(() => animateIn());
    }
  }, [mounted, open, animateIn]);

  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open, onClose]);

  return { mounted, backdropRef, modalRef, svgRef };
}
