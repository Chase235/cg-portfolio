"use client";

import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { useCurveWipeModal } from "@/hooks/useCurveWipeModal";

interface CVPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CVPasswordModal({ open, onClose }: CVPasswordModalProps) {
  const [passcode, setPasscode] = useState("");
  const [format, setFormat] = useState<"pdf" | "md">("pdf");
  const inputRef = useRef<HTMLInputElement>(null);

  const resetForm = useCallback(() => {
    setPasscode("");
    setFormat("pdf");
  }, []);

  const { mounted, backdropRef, modalRef, svgRef } = useCurveWipeModal(open, onClose, resetForm);

  const prevMounted = useRef(false);
  if (mounted && open && !prevMounted.current) {
    prevMounted.current = true;
    setTimeout(() => inputRef.current?.focus(), 500);
  }
  if (!mounted) prevMounted.current = false;

  if (!mounted && !open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === "croissant22") {
      const file = format === "pdf" ? "/ChaseGobble_resume.pdf" : "/ChaseGobble_resume.md";
      const link = document.createElement("a");
      link.href = file;
      link.download = file.split("/").pop()!;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onClose();
    } else {
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
        <path d="M-30,120 Q50,120 130,120 L130,120 L-30,120 Z" fill="var(--bg)" opacity="0.64" />
      </svg>

      <div
        ref={backdropRef}
        className="fixed inset-0 z-[70] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm"
        style={{ opacity: 0 }}
        onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      >
        <div
          ref={modalRef}
          className="w-full max-w-sm mx-0 md:mx-4 bg-[#0E1320] border border-[#1E2D45] rounded-t-xl md:rounded-lg shadow-2xl overflow-hidden"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center px-4 py-3 border-b border-[#1E2D45]">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all cursor-pointer"
            />
            <span className="ml-3 text-[11px] font-mono text-[#738090]">download cv</span>
          </div>

          <form onSubmit={handleSubmit} className="p-4 flex flex-col" style={{ minHeight: "280px" }}>
            <div>
              <label className="flex items-center gap-2 font-mono text-xs text-[#738090] mb-1.5">
                <span className="text-[#7EB9FE]">$</span>passcode
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

            <div className="mt-4">
              <label className="flex items-center gap-2 font-mono text-xs text-[#738090] mb-1.5">
                <span className="text-[#7EB9FE]">$</span>format
              </label>
              <div className="flex rounded overflow-hidden border border-[#1E2D45]">
                <button
                  type="button"
                  onClick={() => setFormat("pdf")}
                  className={`flex-1 py-2 font-mono text-xs transition-colors cursor-pointer ${
                    format === "pdf"
                      ? "bg-[#7EB9FE] text-[#0E1320] font-medium"
                      : "bg-[#0A0F1A] text-[#738090] hover:text-[#D1D9E0]"
                  }`}
                >
                  PDF
                </button>
                <button
                  type="button"
                  onClick={() => setFormat("md")}
                  className={`flex-1 py-2 font-mono text-xs transition-colors cursor-pointer border-l border-[#1E2D45] ${
                    format === "md"
                      ? "bg-[#7EB9FE] text-[#0E1320] font-medium"
                      : "bg-[#0A0F1A] text-[#738090] hover:text-[#D1D9E0]"
                  }`}
                >
                  Markdown
                </button>
              </div>
            </div>

            <div className="flex-1" />
            <div className="flex items-center justify-end pt-1">
              <button
                type="submit"
                className="px-5 py-2 font-mono text-xs font-medium bg-[#7EB9FE] text-[#0E1320] rounded hover:bg-[#9ECBFF] transition-colors cursor-pointer"
              >
                download
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
