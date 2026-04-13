import { createTheme } from "@mui/material";
import {
  DARK_THEME,
  OUTDOOR_LIGHT_COLORS,
  OUTDOOR_DARK_COLORS,
} from "../utils/constants";

/**
 * buildTheme(scale, isDark)
 *
 * Single source of truth: rootFontSize = 12 * scale
 * Everything in rem — no * scale anywhere else.
 *
 * EXCEPTIONS:
 * 1. MuiOutlinedInput "input" slot — no theme token for inner padding in MUI v5
 */
export const buildTheme = (scale, isDark) => {
  const rootFontSize = 12 * scale;
  const colorPalette = isDark ? OUTDOOR_DARK_COLORS : OUTDOOR_LIGHT_COLORS;

  const baseTheme = createTheme({
    palette: {
      mode: isDark ? DARK_THEME : "light",
      ...colorPalette,
    },
    spacing: (factor) => `${factor}rem`,
    typography: {
      htmlFontSize: rootFontSize,
      fontSize: rootFontSize,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 700,
      button: {
        fontSize: "1rem",
        fontWeight: 600,
        textTransform: "none",
        letterSpacing: "0.02em",
      },
      body1:   { fontSize: "1rem",    lineHeight: 1.5,  fontWeight: 500 },
      body2:   { fontSize: "0.92rem", lineHeight: 1.43, fontWeight: 500 },
      caption: { fontSize: "0.83rem", fontWeight: 500 },
    },
  });

  return createTheme(baseTheme, {
    components: {

      // ── IconButton ─────────────────────────────────────────────────────────
      // Used by: search toggle, home, theme toggle, search close button
      MuiIconButton: {
        defaultProps: { size: "small" },
        styleOverrides: {
          root: ({ theme }) => ({
            padding: theme.spacing(0.5),
            borderRadius: theme.spacing(0.4),
            "& .MuiSvgIcon-root": { fontSize: "1.25rem" },
          }),
        },
      },

      // ── SvgIcon ────────────────────────────────────────────────────────────
      // Used by: all icons inside toolbar buttons
      MuiSvgIcon: {
        styleOverrides: {
          fontSizeSmall:  { fontSize: "1.25rem" },
          fontSizeMedium: { fontSize: "1.5rem"  },
        },
      },

      // ── TextField ──────────────────────────────────────────────────────────
      // Used by: search field
      MuiTextField: {
        defaultProps: { size: "small" },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontSize: "1rem",
            borderRadius: theme.spacing(0.4),
          }),
          // EXCEPTION: MUI v5 has no theme token for inner <input> padding.
          // Using rem so it still scales with htmlFontSize.
          input: {
            padding: "0.4rem 0.6rem",
          },
        },
      },
      MuiInputLabel: {
        defaultProps: { size: "small" },
        styleOverrides: {
          root: { fontSize: "1rem" },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            "& .MuiSvgIcon-root": { fontSize: "1.25rem" },
          },
        },
      },

      // ── ToggleButton ───────────────────────────────────────────────────────
      // Used by: S/M/L/XL scale selector
      MuiToggleButton: {
        defaultProps: { size: "small" },
        styleOverrides: {
          root: ({ theme }) => ({
            padding: `${theme.spacing(0.35)} ${theme.spacing(0.6)}`,
            fontSize: "1rem",
            fontWeight: 600,
            minHeight: "1.75rem",
            lineHeight: 1,
          }),
        },
      },

      // ── Tooltip ────────────────────────────────────────────────────────────
      // Used by: all toolbar button tooltips
      MuiTooltip: {
        defaultProps: { arrow: true, enterDelay: 300 },
        styleOverrides: {
          tooltip: ({ theme }) => ({
            fontSize: "0.83rem",
            padding: `${theme.spacing(0.3)} ${theme.spacing(0.6)}`,
            borderRadius: theme.spacing(0.3),
          }),
        },
      },

      // ── Alert ──────────────────────────────────────────────────────────────
      // Used by: search error message
      MuiAlert: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontSize: "1rem",
            padding: `${theme.spacing(0.4)} ${theme.spacing(1)}`,
            borderRadius: theme.spacing(0.4),
            alignItems: "center",
          }),
          icon:    { fontSize: "1.25rem", padding: 0 },
          message: { padding: 0 },
        },
      },

      // ── Paper ──────────────────────────────────────────────────────────────
      // Used by: background of toolbar buttons
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: isDark
              ? "0 3px 10px rgba(0,0,0,0.6)"
              : "0 2px 8px rgba(0,0,0,0.18)",
          },
          rounded: ({ theme }) => ({
            borderRadius: theme.spacing(0.4),
          }),
        },
      },

    },
  });
};