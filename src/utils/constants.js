const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const LOCAL_STORAGE_THEME_KEY = "theme-mode";

// Location mappings for Cesium map navigation
const LOCATIONS = {
  home: { latitude: 37.7749, longitude: -122.4194, altitude: 400000, label: "Home" }, // San Francisco
  office: { latitude: 40.7128, longitude: -74.0060, altitude: 400000, label: "Office" }, // New York
  london: { latitude: 51.5074, longitude: -0.1278, altitude: 400000, label: "London" },
  paris: { latitude: 48.8566, longitude: 2.3522, altitude: 400000, label: "Paris" },
  tokyo: { latitude: 35.6762, longitude: 139.6503, altitude: 400000, label: "Tokyo" },
};

export { DARK_THEME, LIGHT_THEME, LOCAL_STORAGE_THEME_KEY, LOCATIONS };