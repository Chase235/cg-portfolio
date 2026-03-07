"use client";

import { useState, useRef, useEffect } from "react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [replyTo, setReplyTo] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setSent(false);
      setReplyTo("");
      setMessage("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — wire to an API later
    setSent(true);
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      <div className="w-full max-w-lg mx-4 bg-[#0E1320] border border-[#1E2D45] rounded-lg shadow-2xl overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E2D45]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all cursor-pointer"
              />
            </div>
            <span className="ml-3 text-[11px] font-mono text-[#738090]">
              contact.md
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#738090] tracking-wider">
            MARKDOWN SUPPORTED
          </span>
        </div>

        {sent ? (
          <div className="p-8 text-center">
            <p className="font-mono text-[#9BD59A] text-sm">
              {">"} Message sent successfully.
            </p>
            <p className="font-mono text-[#738090] text-xs mt-2">
              I&apos;ll get back to you soon.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 font-mono text-xs text-[#D1D9E0] border border-[#2D4F78] rounded hover:bg-[#1E2D45] transition-colors cursor-pointer"
            >
              close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Reply-to field */}
            <div>
              <label className="flex items-center gap-2 font-mono text-xs text-[#738090] mb-1.5">
                <span className="text-[#7EB9FE]">$</span>
                reply_to
              </label>
              <input
                ref={inputRef}
                type="text"
                required
                value={replyTo}
                onChange={(e) => setReplyTo(e.target.value)}
                placeholder="your name or phone number"
                className="w-full bg-[#0A0F1A] border border-[#1E2D45] rounded px-3 py-2.5 font-mono text-sm text-[#D1D9E0] placeholder:text-[#3A4A5C] focus:outline-none focus:border-[#7EB9FE] transition-colors"
              />
            </div>

            {/* Message field */}
            <div>
              <label className="flex items-center justify-between font-mono text-xs text-[#738090] mb-1.5">
                <span className="flex items-center gap-2">
                  <span className="text-[#7EB9FE]">$</span>
                  message
                </span>
                <span className="text-[10px] text-[#3A4A5C]">
                  # **bold** *italic* `code` supported
                </span>
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

            {/* Submit */}
            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-[10px] text-[#3A4A5C]">
                esc to close
              </span>
              <button
                type="submit"
                className="px-5 py-2 font-mono text-xs font-medium bg-[#7EB9FE] text-[#0E1320] rounded hover:bg-[#9ECBFF] transition-colors cursor-pointer"
              >
                send_message()
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
