import { useRef, useMemo } from "react";
import "./App.css";
import "cesium/Build/Cesium/Widgets/widgets.css";
import CesiumContainer from "./CesiumContainer";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { DARK_THEME, LIGHT_THEME } from "./utils/constants";
import { useAppState } from "./hooks/useAppState";

function App() {
  const viewerRef = useRef(null);
  const { appState, updateState, toggleTheme } = useAppState();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: appState.darkTheme ? DARK_THEME : LIGHT_THEME,
          primary: {
            main: "#90caf9",
          },
          secondary: {
            main: "#f48fb1",
          },
        },
      }),
    [appState.darkTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CesiumContainer
        viewerRef={viewerRef}
        appState={appState}
        updateState={updateState}
        toggleTheme={toggleTheme}
      />
    </ThemeProvider>
  );
}

export default App;
