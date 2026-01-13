const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const LOCAL_STORAGE_THEME_KEY = "theme-mode";
const LOCAL_STORAGE_SCALE_KEY = "ui-scale";

// UI Scale factors - compact first to maximize map space
const SCALE_FACTORS = [0.75, 1, 1.25, 1.5];
const DEFAULT_SCALE = 1;

// Outdoor-optimized color palettes for high visibility in bright sunlight
// Light theme: Maximum contrast with very dark text on bright background
const OUTDOOR_LIGHT_COLORS = {
  primary: {
    main: "#0066CC",      // Bright saturated blue - high visibility
    light: "#3385DB",     // Lighter variant for hover states
    dark: "#004D99",      // Darker for text/borders
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#E91E63",      // Vibrant pink - high visibility
    light: "#F06292",     
    dark: "#C2185B",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#D32F2F",      // High contrast red
    light: "#EF5350",
    dark: "#C62828",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#F57C00",      // High visibility orange
    light: "#FF9800",
    dark: "#E65100",
    contrastText: "#000000",
  },
  info: {
    main: "#0288D1",      // Bright info blue
    light: "#03A9F4",
    dark: "#01579B",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#388E3C",      // High contrast green
    light: "#4CAF50",
    dark: "#2E7D32",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#FAFAFA",   // Very bright background
    paper: "#FFFFFF",     // Pure white for cards
  },
  text: {
    primary: "#212121",   // Almost black - maximum contrast
    secondary: "#424242", // Dark gray for secondary text
  },
};

// Dark theme: Higher luminance for outdoor readability
const OUTDOOR_DARK_COLORS = {
  primary: {
    main: "#64B5F6",      // Brighter blue for dark mode outdoor use
    light: "#90CAF9",
    dark: "#42A5F5",
    contrastText: "#000000",
  },
  secondary: {
    main: "#F48FB1",      // Bright pink for visibility
    light: "#F8BBD0",
    dark: "#EC407A",
    contrastText: "#000000",
  },
  error: {
    main: "#EF5350",      // Brighter red for visibility
    light: "#E57373",
    dark: "#F44336",
    contrastText: "#000000",
  },
  warning: {
    main: "#FFA726",      // Bright orange
    light: "#FFB74D",
    dark: "#FF9800",
    contrastText: "#000000",
  },
  info: {
    main: "#29B6F6",      // Bright info blue
    light: "#4FC3F7",
    dark: "#03A9F4",
    contrastText: "#000000",
  },
  success: {
    main: "#66BB6A",      // Brighter green
    light: "#81C784",
    dark: "#4CAF50",
    contrastText: "#000000",
  },
  background: {
    default: "#1E1E1E",   // Lighter than pure black for reduced eye strain
    paper: "#2D2D2D",     // Lighter gray for cards
  },
  text: {
    primary: "#E0E0E0",   // Bright text for readability
    secondary: "#B0B0B0", // Medium gray for secondary
  },
};

// Location mappings for Cesium map navigation
const LOCATIONS = {
  home: { latitude: 37.7749, longitude: -122.4194, altitude: 400000, label: "Home" }, // San Francisco
  office: { latitude: 40.7128, longitude: -74.0060, altitude: 400000, label: "Office" }, // New York
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