import { useRef, useMemo } from "react";
import "./App.css";
import "cesium/Build/Cesium/Widgets/widgets.css";
import CesiumContainer from "./CesiumContainer";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { DARK_THEME, LIGHT_THEME } from "./utils/constants";
import { useAppState } from "./hooks/useAppState";
import { ScaleProvider } from "./contexts/ScaleContext";

function App() {
  const viewerRef = useRef(null);
  const { appState, updateState, toggleTheme, setScaleFactor } = useAppState();

  // Create theme with scale-aware spacing and typography
  const theme = useMemo(() => {
    const scale = appState.scaleFactor;
    
    // Base spacing unit (8px * scale)
    const baseSpacing = 8 * scale;

    return createTheme({
      palette: {
        mode: appState.darkTheme ? DARK_THEME : LIGHT_THEME,
        primary: {
          main: "#90caf9",
        },
        secondary: {
          main: "#f48fb1",
        },
      },
      spacing: (factor) => `${baseSpacing * factor}px`,
      typography: {
        fontSize: 14 * scale,
        button: {
          fontSize: 14 * scale,
          fontWeight: 500,
        },
        h6: {
          fontSize: 20 * scale,
          fontWeight: 500,
        },
        body1: {
          fontSize: 14 * scale,
          lineHeight: 1.5,
        },
        body2: {
          fontSize: 12 * scale,
          lineHeight: 1.43,
        },
        caption: {
          fontSize: 12 * scale,
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              padding: `${6 * scale}px ${16 * scale}px`,
              minHeight: `${36 * scale}px`,
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
              },
              "& .MuiOutlinedInput-input": {
                padding: `${8 * scale}px ${12 * scale}px`,
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              padding: `${8 * scale}px`,
              fontSize: `${24 * scale}px`,
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
            },
          },
        },
        MuiAlert: {
          styleOverrides: {
            root: {
              fontSize: `${14 * scale}px`,
              padding: `${12 * scale}px ${16 * scale}px`,
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              fontSize: `${14 * scale}px`,
              minHeight: `${36 * scale}px`,
              padding: `${8 * scale}px ${16 * scale}px`,
            },
          },
        },
        MuiSelect: {
          styleOverrides: {
            root: {
              fontSize: `${14 * scale}px`,
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
