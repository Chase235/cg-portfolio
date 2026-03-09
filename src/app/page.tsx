"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HumanView from "@/components/HumanView";

const AIView = lazy(() => import("@/components/AIView"));

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mode, setMode] = useState<"human" | "ai">("human");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === '"dark"' || saved === "dark") {
        setTheme("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } catch {}
    requestAnimationFrame(() => document.body.classList.add("ready"));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="page-container">
      <Header
        isLight={theme === "light"}
        isHuman={mode === "human"}
        onThemeToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        onModeToggle={() => setMode(mode === "human" ? "ai" : "human")}
      />
      {mode === "human" ? (
        <HumanView />
      ) : (
        <Suspense fallback={null}>
          <AIView />
        </Suspense>
      )}
      <Footer />
    </div>
  );
}
