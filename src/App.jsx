import { useRef, useMemo ,useEffect } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// Internal Imports
import CesiumContainer from "./CesiumContainer";
import { useAppState } from "./hooks/useAppState";
import { ScaleProvider } from "./contexts/ScaleContext";
import { buildTheme } from "./theme/theme"; // Import the separated logic

function App() {
  const viewerRef = useRef(null);
  const { appState, updateState, toggleTheme, setScaleFactor } = useAppState();

  useEffect(() => {
    document.documentElement.style.fontSize = `${12 * appState.scaleFactor}px`;
  }, [appState.scaleFactor]);

  // The theme is recalculated only when scale or mode changes
  // useMemo ensures we don't recreate the theme object on every render
  const theme = useMemo(
    () => buildTheme(appState.scaleFactor, appState.darkTheme),
    [appState.darkTheme, appState.scaleFactor]
  );


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