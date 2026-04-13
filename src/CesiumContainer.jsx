import { Viewer, Ion, Terrain } from "cesium";
import { useEffect, useRef } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { CESIUM_TOKEN } from "./config/config";
import { refDestroy } from "./utils/ref";
import {
  handleGeocoderSearch,
  flyToLocation,
} from "./utils/cesiumController.js";
import {
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { DARK_THEME, SCALE_FACTORS } from "./utils/constants.js";
import { useScale } from "./contexts/ScaleContext";

/**
 * CesiumContainer
 * ---------------
 * Renders the Cesium globe full-screen with a minimal floating toolbar.
 *
 * Toolbar layout goals (Req #1 — maximize map space):
 *   - All controls are in a single left-side column using compact MUI sizes.
 *   - The search field expands inline above the search button — no modal.
 *   - Scale selector is a ToggleButtonGroup (vertical) so it occupies one
 *     column rather than a row.
 *   - All sizing flows from the theme's spacing + scaleFactor, so the toolbar
 *     shrinks/grows with the global scale setting (Req #3, #4, #5).
 */
const CesiumContainer = ({
  viewerRef,
  toggleTheme,
  appState,
  updateState,
}) => {
  const containerRef = useRef(null);
  const theme = useTheme();
  const { onScaleChange } = useScale();
  const scale = appState.scaleFactor;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (appState.searchQuery.trim() && viewerRef.current) {
      const result = await handleGeocoderSearch(
        viewerRef.current,
        appState.searchQuery
      );
      if (result.success) {
        updateState({ searchQuery: "", searchOpen: false, searchError: "" });
      } else {
        updateState({ searchError: result.error });
      }
    }
  };

  const handleHomeClick = () => {
    flyToLocation(viewerRef.current, "home");
  };

  const handleScaleChange = (_event, newScale) => {
    if (newScale !== null) {
      onScaleChange(newScale);
    }
  };

  useEffect(() => {
    if (viewerRef.current) return;
    Ion.defaultAccessToken = CESIUM_TOKEN;

    viewerRef.current = new Viewer(containerRef.current, {
      animation: false,
      timeline: false,
      geocoder: false,
      homeButton: false,
      terrain: Terrain.fromWorldTerrain(),
    });

    console.log("viewer ref created:", viewerRef.current);

    return () => {
      refDestroy(viewerRef);
      console.log("viewer ref destroyed");
    };
  }, []);

  // Shared styles for all floating action buttons so they're consistent
  // and reference only theme tokens (Req #8).
  const actionButtonSx = {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    borderRadius: theme.spacing(0.75),
    border: `2px solid ${theme.palette.primary.main}`,
    // Slightly stronger backdrop for outdoor readability (Req #7)
    backdropFilter: "blur(4px)",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    "&:focus": { outline: "none" },
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        ref={containerRef}
        id="cesiumContainer"
        style={{ width: "100%", height: "100%" }}
      />

      {/* ── Floating toolbar ── */}
      <Box
        sx={{
          position: "absolute",
          top: theme.spacing(1.5),
          left: theme.spacing(1.5),
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(0.75),
          alignItems: "flex-start",
        }}
      >
        {/* Inline search field — visible only when searchOpen */}
        {appState.searchOpen && (
          <form onSubmit={handleSearch}>
            <TextField
              autoFocus
              placeholder="Search location…"
              value={appState.searchQuery}
              onChange={(e) => updateState({ searchQuery: e.target.value })}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.spacing(0.75),
                // Override fieldset border to use primary color
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                  borderWidth: "2px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() =>
                        updateState({ searchOpen: false, searchQuery: "" })
                      }
                      sx={{ color: theme.palette.primary.main }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        )}

        {/* Search toggle */}
        <Tooltip title="Search location" placement="right">
          <IconButton
            size="small"
            onClick={() => updateState({ searchOpen: !appState.searchOpen })}
            sx={actionButtonSx}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>

        {/* Search error */}
        {appState.searchError && (
          <Alert
            severity="error"
            onClose={() => updateState({ searchError: "" })}
            sx={{ maxWidth: `${220 * scale}px` }}
          >
            {appState.searchError}
          </Alert>
        )}

        {/* Home */}
        <Tooltip title="Fly home" placement="right">
          <IconButton size="small" onClick={handleHomeClick} sx={actionButtonSx}>
            <HomeIcon />
          </IconButton>
        </Tooltip>

        {/* ── UI Scale selector ──
            ToggleButtonGroup (vertical) keeps the toolbar in a single column.
            Labels: S / M / L / XL map to SCALE_FACTORS [0.75, 1, 1.25, 1.5].
            The button width is fixed to the icon button size so it blends with
            the rest of the toolbar. */}
        <ToggleButtonGroup
          value={appState.scaleFactor}
          exclusive
          onChange={handleScaleChange}
          orientation="vertical"
          size="small"
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: theme.spacing(0.75),
            overflow: "hidden",
            // Remove default internal borders — the outer border is enough
            "& .MuiToggleButtonGroup-grouped": {
              border: "none",
              borderRadius: 0,
              // Fixed width matching icon button so toolbar stays aligned
              width: `${32 * scale}px`,
              minHeight: `${28 * scale}px`,
              padding: 0,
              fontSize: `${10 * scale}px`,
              fontWeight: 700,
              color: theme.palette.primary.main,
              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              },
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              "&:focus": { outline: "none" },
            },
          }}
        >
          {SCALE_FACTORS.map((s) => {
            const label =
              s === 0.75 ? "S" : s === 1 ? "M" : s === 1.25 ? "L" : "XL";
            return (
              <Tooltip key={s} title={`UI size: ${label}`} placement="right">
                <ToggleButton value={s}>{label}</ToggleButton>
              </Tooltip>
            );
          })}
        </ToggleButtonGroup>

        {/* Light / dark theme toggle */}
        <Tooltip
          title={
            theme.palette.mode === DARK_THEME
              ? "Switch to light theme"
              : "Switch to dark theme"
          }
          placement="right"
        >
          <IconButton size="small" onClick={toggleTheme} sx={actionButtonSx}>
            {theme.palette.mode === DARK_THEME ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
};

export default CesiumContainer;