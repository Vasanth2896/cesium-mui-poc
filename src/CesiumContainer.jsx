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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { DARK_THEME } from "./utils/constants.js";

const CesiumContainer = ({ viewerRef, toggleTheme, appState, updateState }) => {
  const containerRef = useRef(null);
  const theme = useTheme();

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

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        ref={containerRef}
        id="cesiumContainer"
        style={{ width: "100%", height: "100%" }}
      ></div>

      {/* Search and Control Buttons (collapsible) */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "flex-start",
        }}
      >
        {/* Toggle handle - always visible */}
        {/* Search Bar */}
        {appState.searchOpen && (
          <form onSubmit={handleSearch}>
            <TextField
              autoFocus
              size="small"
              placeholder="Search location..."
              value={appState.searchQuery}
              onChange={(e) => updateState({ searchQuery: e.target.value })}
              sx={{
                backgroundColor:
                  theme.palette.mode === DARK_THEME
                    ? "rgba(30, 30, 30, 0.9)"
                    : "rgba(255, 255, 255, 0.9)",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  color:
                    theme.palette.mode === DARK_THEME
                      ? theme.palette.primary.light
                      : theme.palette.primary.main,
                  "& fieldset": {
                    borderColor:
                      theme.palette.mode === DARK_THEME
                        ? "rgba(144, 202, 249, 0.3)"
                        : "rgba(144, 202, 249, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      theme.palette.mode === DARK_THEME
                        ? "rgba(144, 202, 249, 0.5)"
                        : "rgba(144, 202, 249, 0.7)",
                  },
                },
                "& .MuiOutlinedInput-input::placeholder": {
                  color:
                    theme.palette.mode === DARK_THEME
                      ? "rgba(144, 202, 249, 0.5)"
                      : "rgba(0, 0, 0, 0.5)",
                  opacity: 1,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => {
                        updateState({ searchOpen: false, searchQuery: "" });
                      }}
                      sx={{
                        color:
                          theme.palette.mode === DARK_THEME
                            ? theme.palette.primary.light
                            : theme.palette.primary.main,
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        )}

        {/* Search Button */}
        <IconButton
          onClick={() => updateState({ searchOpen: !appState.searchOpen })}
          sx={{
            backgroundColor:
              theme.palette.mode === DARK_THEME
                ? "rgba(30, 30, 30, 0.9)"
                : "rgba(255, 255, 255, 0.9)",
            color:
              theme.palette.mode === DARK_THEME
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === DARK_THEME
                  ? "rgba(30, 30, 30, 1)"
                  : "rgba(255, 255, 255, 1)",
            },
            "&:focus": {
              outline: "none",
            },
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <SearchIcon />
        </IconButton>

        {/* Error Message */}
        {appState.searchError && (
          <Alert
            severity="error"
            onClose={() => updateState({ searchError: "" })}
            sx={{
              mt: 1,
              fontSize: "0.85rem",
              padding: "8px 12px",
              backgroundColor:
                theme.palette.mode === DARK_THEME
                  ? "rgba(211, 47, 47, 0.9)"
                  : "rgba(244, 67, 54, 0.9)",
            }}
          >
            {appState.searchError}
          </Alert>
        )}

        {/* Home Button */}
        <IconButton
          onClick={handleHomeClick}
          sx={{
            backgroundColor:
              theme.palette.mode === DARK_THEME
                ? "rgba(30, 30, 30, 0.9)"
                : "rgba(255, 255, 255, 0.9)",
            color:
              theme.palette.mode === DARK_THEME
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === DARK_THEME
                  ? "rgba(30, 30, 30, 1)"
                  : "rgba(255, 255, 255, 1)",
            },
            "&:focus": {
              outline: "none",
            },
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <HomeIcon />
        </IconButton>

        {/* Theme Toggle Button */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            backgroundColor:
              theme.palette.mode === DARK_THEME
                ? "rgba(30, 30, 30, 0.9)"
                : "rgba(255, 255, 255, 0.9)",
            color:
              theme.palette.mode === DARK_THEME
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === DARK_THEME
                  ? "rgba(30, 30, 30, 1)"
                  : "rgba(255, 255, 255, 1)",
            },
            "&:focus": {
              outline: "none",
            },
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          {theme.palette.mode === DARK_THEME ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
    </div>
  );
};

export default CesiumContainer;
