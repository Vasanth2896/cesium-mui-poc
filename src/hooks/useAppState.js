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
    return savedTheme === DARK_THEME;
  })(),
  scaleFactor: (() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_SCALE_KEY);
    return saved ? parseFloat(saved) : DEFAULT_SCALE;
  })(),
  searchOpen: false,
  searchQuery: "",
  searchError: "",
  uiCollapsed: false,
};

export const useAppState = () => {
  const [appState, setAppState] = useState(initialState);

  const updateState = useCallback((updates) => {
    setAppState((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const toggleTheme = useCallback(() => {
    setAppState((prev) => {
      const newTheme = !prev.darkTheme;
      localStorage.setItem(
        LOCAL_STORAGE_THEME_KEY,
        newTheme ? DARK_THEME : LIGHT_THEME
      );
      return {
        ...prev,
        darkTheme: newTheme,
      };
    });
  }, []);

  const setScaleFactor = useCallback((scale) => {
    localStorage.setItem(LOCAL_STORAGE_SCALE_KEY, scale.toString());
    setAppState((prev) => ({
      ...prev,
      scaleFactor: scale,
    }));
  }, []);

  return {
    appState,
    updateState,
    toggleTheme,
    setScaleFactor,
  };
};
