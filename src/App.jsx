import { useRef, useMemo } from "react";
import "./App.css";
import "cesium/Build/Cesium/Widgets/widgets.css";
import CesiumContainer from "./CesiumContainer";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  DARK_THEME,
  LIGHT_THEME,
  OUTDOOR_LIGHT_COLORS,
  OUTDOOR_DARK_COLORS,
} from "./utils/constants";
import { useAppState } from "./hooks/useAppState";
import { ScaleProvider } from "./contexts/ScaleContext";

function App() {
  const viewerRef = useRef(null);
  const { appState, updateState, toggleTheme, setScaleFactor } = useAppState();

  // Create theme with scale-aware spacing and typography
  // Using outdoor-optimized colors for high visibility in bright sunlight
  const theme = useMemo(() => {
    const scale = appState.scaleFactor;
    const isDark = appState.darkTheme;
    
    // Base spacing unit (8px * scale)
    const baseSpacing = 8 * scale;

    // Select outdoor-optimized color palette based on theme mode
    const colorPalette = isDark ? OUTDOOR_DARK_COLORS : OUTDOOR_LIGHT_COLORS;

    return createTheme({
      palette: {
        mode: isDark ? DARK_THEME : LIGHT_THEME,
        ...colorPalette,
      },
      spacing: (factor) => `${baseSpacing * factor}px`,
      typography: {
        fontSize: 14 * scale,
        fontWeightMedium: 600, // Slightly bolder for outdoor readability
        button: {
          fontSize: 14 * scale,
          fontWeight: 600, // Bolder buttons for visibility
        },
        h6: {
          fontSize: 20 * scale,
          fontWeight: 600,
        },
        body1: {
          fontSize: 14 * scale,
          lineHeight: 1.5,
          fontWeight: 500, // Slightly bolder body text
        },
        body2: {
          fontSize: 12 * scale,
          lineHeight: 1.43,
          fontWeight: 500,
        },
        caption: {
          fontSize: 12 * scale,
          fontWeight: 500,
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              padding: `${6 * scale}px ${16 * scale}px`,
              minHeight: `${36 * scale}px`,
              fontWeight: 600,
              // Enhanced border for better visibility
              border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.15)",
            },
            contained: {
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)", // Stronger shadow for outdoor visibility
            },
            sizeSmall: {
              padding: `${4 * scale}px ${12 * scale}px`,
              minHeight: `${32 * scale}px`,
            },
            sizeLarge: {
              padding: `${8 * scale}px ${22 * scale}px`,
              minHeight: `${44 * scale}px`,
            },
          },
        },
        MuiTextField: {
          defaultProps: {
            size: "small",
          },
          styleOverrides: {
            root: {
              "& .MuiInputBase-root": {
                fontSize: `${14 * scale}px`,
                padding: `${4 * scale}px`,
                // Stronger borders for outdoor visibility
                "& fieldset": {
                  borderWidth: "2px",
                },
              },
              "& .MuiOutlinedInput-input": {
                padding: `${8 * scale}px ${12 * scale}px`,
                fontWeight: 500,
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              padding: `${8 * scale}px`,
              fontSize: `${24 * scale}px`,
              // Enhanced background for better visibility
              backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
              "&:hover": {
                backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
              },
            },
            sizeSmall: {
              padding: `${4 * scale}px`,
              fontSize: `${18 * scale}px`,
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              fontSize: `${12 * scale}px`,
              height: `${32 * scale}px`,
              padding: `${0} ${8 * scale}px`,
              fontWeight: 600,
              // Stronger border for visibility
              border: isDark ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(0,0,0,0.2)",
            },
          },
        },
        MuiAlert: {
          styleOverrides: {
            root: {
              fontSize: `${14 * scale}px`,
              padding: `${12 * scale}px ${16 * scale}px`,
              fontWeight: 600,
              // Stronger background for outdoor visibility
              border: "2px solid currentColor",
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              fontSize: `${14 * scale}px`,
              minHeight: `${36 * scale}px`,
              padding: `${8 * scale}px ${16 * scale}px`,
              fontWeight: 500,
            },
          },
        },
        MuiSelect: {
          styleOverrides: {
            root: {
              fontSize: `${14 * scale}px`,
              fontWeight: 500,
              "& fieldset": {
                borderWidth: "2px", // Thicker borders for visibility
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              // Enhanced shadow for better depth perception outdoors
              boxShadow: isDark
                ? "0 4px 12px rgba(0,0,0,0.5)"
                : "0 4px 12px rgba(0,0,0,0.2)",
            },
          },
        },
        MuiToggleButton: {
          styleOverrides: {
            root: {
              fontWeight: 600,
              border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.15)",
              "&.Mui-selected": {
                fontWeight: 700,
                border: isDark ? "2px solid rgba(255,255,255,0.4)" : "2px solid rgba(0,0,0,0.3)",
              },
            },
          },
        },
      },
    });
  }, [appState.darkTheme, appState.scaleFactor]);

  return (
    <ScaleProvider scaleFactor={appState.scaleFactor} onScaleChange={setScaleFactor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CesiumContainer
          viewerRef={viewerRef}
          appState={appState}
          updateState={updateState}
          toggleTheme={toggleTheme}
        />
      </ThemeProvider>
    </ScaleProvider>
  );
}

export default App;
