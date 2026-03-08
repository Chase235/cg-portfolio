"use client";

import { useState, useRef, useCallback } from "react";
import { useCurveWipeModal } from "@/hooks/useCurveWipeModal";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [replyTo, setReplyTo] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetForm = useCallback(() => {
    setSent(false);
    setSending(false);
    setReplyTo("");
    setMessage("");
  }, []);

  const { mounted, backdropRef, modalRef, svgRef } = useCurveWipeModal(open, onClose, resetForm);

  // Focus input after mount animation
  const prevMounted = useRef(false);
  if (mounted && open && !prevMounted.current) {
    prevMounted.current = true;
    setTimeout(() => inputRef.current?.focus(), 500);
  }
  if (!mounted) prevMounted.current = false;

  if (!mounted && !open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyTo, message }),
      });
    } catch {
      // Show success regardless — we don't want to expose errors to visitors
    }
    setSending(false);
    setSent(true);
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
          className="w-full max-w-lg mx-0 md:mx-4 bg-[#0E1320] border border-[#1E2D45] rounded-t-xl md:rounded-lg shadow-2xl overflow-hidden"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E2D45]">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all cursor-pointer"
              />
              <span className="ml-3 text-[11px] font-mono text-[#738090]">contact.md</span>
            </div>
            <span className="text-[10px] font-mono text-[#738090] tracking-wider">MARKDOWN SUPPORTED</span>
          </div>

          {sent ? (
            <div className="p-8 text-center">
              <p className="font-mono text-[#9BD59A] text-sm">{">"} Message sent successfully.</p>
              <p className="font-mono text-[#738090] text-xs mt-2">I&apos;ll get back to you soon.</p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 font-mono text-xs text-[#D1D9E0] border border-[#2D4F78] rounded hover:bg-[#1E2D45] transition-colors cursor-pointer"
              >
                close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="flex items-center gap-2 font-mono text-xs text-[#738090] mb-1.5">
                  <span className="text-[#7EB9FE]">$</span>reply_to
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  required
                  value={replyTo}
                  onChange={(e) => setReplyTo(e.target.value)}
                  placeholder="your email or phone number"
                  className="w-full bg-[#0A0F1A] border border-[#1E2D45] rounded px-3 py-2.5 font-mono text-sm text-[#D1D9E0] placeholder:text-[#3A4A5C] focus:outline-none focus:border-[#7EB9FE] transition-colors"
                />
              </div>
              <div>
                <label className="flex items-center justify-between font-mono text-xs text-[#738090] mb-1.5">
                  <span className="flex items-center gap-2">
                    <span className="text-[#7EB9FE]">$</span>message
                  </span>
                  <span className="text-[10px] text-[#3A4A5C]"># **bold** *italic* `code` supported</span>
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="let's discuss"
                  rows={6}
                  className="w-full bg-[#0A0F1A] border border-[#1E2D45] rounded px-3 py-2.5 font-mono text-sm text-[#D1D9E0] placeholder:text-[#3A4A5C] focus:outline-none focus:border-[#7EB9FE] transition-colors resize-none"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="hidden md:inline font-mono text-[10px] text-[#3A4A5C]">esc to close</span>
                <button
                  type="submit"
                  disabled={sending}
                  className="px-5 py-2 font-mono text-xs font-medium bg-[#7EB9FE] text-[#0E1320] rounded hover:bg-[#9ECBFF] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {sending ? "sending..." : "send_message()"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
