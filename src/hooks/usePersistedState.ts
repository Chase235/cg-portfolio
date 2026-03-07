"use client";

import { useState, useEffect, useRef } from "react";

export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(defaultValue);
  const initialized = useRef(false);

  // On mount, read localStorage and override default
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setState(JSON.parse(stored));
      }
    } catch {}
    initialized.current = true;
  }, [key]);

  // Persist to localStorage on every change after init
  useEffect(() => {
    if (initialized.current) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}
