"use client";

import { useEffect } from "react";
import { usePersistedState } from "@/hooks/usePersistedState";
import Header from "@/components/Header";
import HumanView from "@/components/HumanView";
import AIView from "@/components/AIView";
import Footer from "@/components/Footer";

export default function Home() {
  const [theme, setTheme] = usePersistedState<"light" | "dark">("theme", "light");
  const [mode, setMode] = usePersistedState<"human" | "ai">("mode", "human");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
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
