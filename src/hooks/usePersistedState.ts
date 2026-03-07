"use client";

import { useState, useEffect } from "react";

export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(defaultValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      setState(JSON.parse(stored));
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, hydrated]);

  return [state, setState];
}
