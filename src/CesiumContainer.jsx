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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { DARK_THEME, SCALE_FACTORS } from "./utils/constants.js";
import { useScale } from "./contexts/ScaleContext";

const CesiumContainer = ({
  viewerRef,
  toggleTheme,
  appState,
  updateState,
}) => {
  const containerRef = useRef(null);
  const theme = useTheme();
  const { onScaleChange } = useScale();

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

  const handleScaleChange = (event, newScale) => {
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
                backgroundColor: theme.palette.background.paper,
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  color: theme.palette.text.primary,
                  "& fieldset": {
                    borderColor: theme.palette.primary.main,
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.light,
                  },
                },
                "& .MuiOutlinedInput-input::placeholder": {
                  color: theme.palette.text.secondary,
                  opacity: 0.7,
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
                        color: theme.palette.primary.main,
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
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.main,
            borderRadius: "8px",
            border: `2px solid ${theme.palette.primary.main}`,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
            "&:focus": {
              outline: "none",
            },
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
              backgroundColor: theme.palette.error.main,
              color: theme.palette.error.contrastText,
              fontWeight: 600,
            }}
          >
            {appState.searchError}
          </Alert>
        )}

        {/* Home Button */}
        <IconButton
          onClick={handleHomeClick}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.main,
            borderRadius: "8px",
            border: `2px solid ${theme.palette.primary.main}`,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <HomeIcon />
        </IconButton>

        {/* UI Scale Selector */}
        <ToggleButtonGroup
          value={appState.scaleFactor}
          exclusive
          onChange={handleScaleChange}
          orientation="vertical"
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: `${8 * appState.scaleFactor}px`,
            border: `2px solid ${theme.palette.primary.main}`,
            "& .MuiToggleButtonGroup-grouped": {
              margin: 0,
              border: "none",
              "&:not(:first-of-type)": {
                borderRadius: 0,
              },
              "&:first-of-type": {
                borderRadius: `${8 * appState.scaleFactor}px ${
                  8 * appState.scaleFactor
                }px 0 0`,
              },
              "&:last-of-type": {
                borderRadius: `0 0 ${8 * appState.scaleFactor}px ${
                  8 * appState.scaleFactor
                }px`,
              },
            },
            "& .MuiToggleButton-root": {
              width: `${40 * appState.scaleFactor}px`,
              height: `${40 * appState.scaleFactor}px`,
              padding: 0,
              color: theme.palette.primary.main,
              fontSize: `${0.7 * appState.scaleFactor}rem`,
              fontWeight: 600,
              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              "&:focus": {
                outline: "none",
              },
            },
          }}
        >
          {SCALE_FACTORS.map((scale) => (
            <ToggleButton key={scale} value={scale}>
              {scale === 0.75
                ? "S"
                : scale === 1
                ? "M"
                : scale === 1.25
                ? "L"
                : "XL"}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Theme Toggle Button */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.main,
            borderRadius: "8px",
            border: `2px solid ${theme.palette.primary.main}`,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
            "&:focus": {
              outline: "none",
            },
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
