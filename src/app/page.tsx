"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HumanView from "@/components/HumanView";
import AIView from "@/components/AIView";
import Footer from "@/components/Footer";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mode, setMode] = useState<"human" | "ai">("human");

  // On mount, read saved theme and enable transitions after first paint
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === '"dark"' || saved === "dark") {
        setTheme("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } catch {}
    // Enable body transitions only after hydration to prevent flash/pointer blocking
    requestAnimationFrame(() => {
      document.body.classList.add("ready");
    });
  }, []);

  // Sync data-theme attribute whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleMode = () => setMode(mode === "human" ? "ai" : "human");

  return (
    <div className="page-container">
      <Header
        isLight={theme === "light"}
        isHuman={mode === "human"}
        onThemeToggle={toggleTheme}
        onModeToggle={toggleMode}
      />

      {mode === "human" ? <HumanView /> : <AIView />}

      <Footer />
    </div>
  );
}
