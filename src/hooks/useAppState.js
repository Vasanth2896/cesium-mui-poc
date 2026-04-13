import { useState, useCallback } from "react";
import {
  DARK_THEME,
  LIGHT_THEME,
  LOCAL_STORAGE_THEME_KEY,
  LOCAL_STORAGE_SCALE_KEY,
  DEFAULT_SCALE,
} from "../utils/constants";

const initialState = {
  darkTheme: (() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    // Default to system preference if no saved value
    if (savedTheme === null) {
      return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    }
    return savedTheme === DARK_THEME;
  })(),
  scaleFactor: (() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_SCALE_KEY);
    return saved ? parseFloat(saved) : DEFAULT_SCALE; // 0.75 — ultra-compact default
  })(),
  searchOpen: false,
  searchQuery: "",
  searchError: "",
};

export const useAppState = () => {
  const [appState, setAppState] = useState(initialState);

  const updateState = useCallback((updates) => {
    setAppState((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleTheme = useCallback(() => {
    setAppState((prev) => {
      const newDark = !prev.darkTheme;
      localStorage.setItem(
        LOCAL_STORAGE_THEME_KEY,
        newDark ? DARK_THEME : LIGHT_THEME
      );
      return { ...prev, darkTheme: newDark };
    });
  }, []);

  const setScaleFactor = useCallback((scale) => {
    localStorage.setItem(LOCAL_STORAGE_SCALE_KEY, scale.toString());
    setAppState((prev) => ({ ...prev, scaleFactor: scale }));
  }, []);

  return { appState, updateState, toggleTheme, setScaleFactor };
};