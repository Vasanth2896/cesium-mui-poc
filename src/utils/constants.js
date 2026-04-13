const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const LOCAL_STORAGE_THEME_KEY = "theme-mode";
const LOCAL_STORAGE_SCALE_KEY = "ui-scale";

// UI Scale factors — S (0.75) is the ultra-compact default for maximum map space.
// Each step scales ALL spacing, typography, and component sizes proportionally
// via the MUI theme's spacing() function and typography fontSize multipliers.
const SCALE_FACTORS = [0.75, 1, 1.25, 1.5];
const DEFAULT_SCALE = 0.75; // Ultra-compact by default to maximize map real-estate

/**
 * COMPACT DENSITY RATIONALE
 * --------------------------
 * MUI's built-in "dense" prop only handles a subset of components and cannot
 * be applied globally. Instead we drive compactness entirely through the theme:
 *
 *   - spacing: base unit = 6px * scale (vs MUI default 8px), so all spacing(n)
 *     calls in styleOverrides scale proportionally.
 *   - typography.fontSize: 12px * scale at the base level.
 *   - Component styleOverrides use only `theme.spacing()` and
 *     `theme.typography.fontSize` — no hardcoded px values — so everything
 *     scales together when the user changes the scale factor (#4, #5).
 *
 * This satisfies:
 *   Req #2 — compact defaults (scale=0.75 is smaller than MUI "small")
 *   Req #3 — user-selectable scale at runtime
 *   Req #4/#5 — proportional scaling via 4 fixed steps
 *   Req #6 — light/dark themes switchable at runtime
 *   Req #7 — outdoor-optimized high-contrast colors
 *   Req #8 — all overrides via MUI theme tokens; one necessary exception
 *             documented in App.jsx (MuiInputBase inner padding).
 */

// Outdoor-optimized color palettes — high saturation, strong contrast,
// legible on both OLED and LCD in direct sunlight.
const OUTDOOR_LIGHT_COLORS = {
  primary: {
    main: "#0059B3",
    light: "#1976D2",
    dark: "#003D80",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#C62828",
    light: "#EF5350",
    dark: "#8E0000",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#B71C1C",
    light: "#E53935",
    dark: "#7F0000",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#E65100",
    light: "#FF6D00",
    dark: "#BF360C",
    contrastText: "#000000",  
  },
  info: {
    main: "#01579B",
    light: "#0288D1",
    dark: "#003D6B",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#1B5E20",
    light: "#388E3C",
    dark: "#003300",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#F5F5F5",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#0D0D0D",
    secondary: "#37474F",
    disabled: "#78909C",
  },
};

const OUTDOOR_DARK_COLORS = {
  primary: {
    main: "#82B1FF",      // Bright periwinkle — stands out on dark bg
    light: "#B3CFFF",
    dark: "#4D82CB",
    contrastText: "#000000",
  },
  secondary: {
    main: "#FF6E40",      // Vivid orange — high visibility
    light: "#FFAB91",
    dark: "#C63D00",
    contrastText: "#000000",
  },
  error: {
    main: "#FF5252",
    light: "#FF867F",
    dark: "#C50E29",
    contrastText: "#000000",
  },
  warning: {
    main: "#FFD740",      // Bright amber
    light: "#FFE57F",
    dark: "#C8A600",
    contrastText: "#000000",
  },
  info: {
    main: "#40C4FF",
    light: "#80D8FF",
    dark: "#0094CC",
    contrastText: "#000000",
  },
  success: {
    main: "#69F0AE",      // Bright mint green
    light: "#B9F6CA",
    dark: "#2BBD7E",
    contrastText: "#000000",
  },
  background: {
    default: "#141414",
    paper: "#1E1E1E",
  },
  text: {
    primary: "#F5F5F5",
    secondary: "#B0BEC5",
    disabled: "#546E7A",
  },
};

// Location mappings for Cesium map navigation
const LOCATIONS = {
  home: { latitude: 37.7749, longitude: -122.4194, altitude: 400000, label: "Home" },
  office: { latitude: 40.7128, longitude: -74.0060, altitude: 400000, label: "Office" },
  london: { latitude: 51.5074, longitude: -0.1278, altitude: 400000, label: "London" },
  paris: { latitude: 48.8566, longitude: 2.3522, altitude: 400000, label: "Paris" },
  tokyo: { latitude: 35.6762, longitude: 139.6503, altitude: 400000, label: "Tokyo" },
};

export {
  DARK_THEME,
  LIGHT_THEME,
  LOCAL_STORAGE_THEME_KEY,
  LOCAL_STORAGE_SCALE_KEY,
  SCALE_FACTORS,
  DEFAULT_SCALE,
  OUTDOOR_LIGHT_COLORS,
  OUTDOOR_DARK_COLORS,
  LOCATIONS,
};