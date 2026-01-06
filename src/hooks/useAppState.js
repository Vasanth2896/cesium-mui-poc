import { useState, useCallback } from "react";
import {
  DARK_THEME,
  LIGHT_THEME,
  LOCAL_STORAGE_THEME_KEY,
} from "../utils/constants";

const initialState = {
  darkTheme: (() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    return savedTheme === DARK_THEME;
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

  return {
    appState,
    updateState,
    toggleTheme,
  };
};
