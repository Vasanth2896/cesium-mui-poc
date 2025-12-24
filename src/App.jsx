import { useRef, useState, useMemo, useEffect } from "react";
import "./App.css";
import "cesium/Build/Cesium/Widgets/widgets.css";
import CesiumContainer from "./CesiumContainer";
import Sidebar from "./Sidebar";
import { createTheme, CssBaseline, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  DARK_THEME,
  LIGHT_THEME,
  LOCAL_STORAGE_THEME_KEY,
} from "./utils/constants";

function App() {
  const viewerRef = useRef(null);
  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    return savedTheme === DARK_THEME;
  });
  const [state, setState] = useState({
    viewerContainerId: null,
    searchQuery: "",
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkTheme ? DARK_THEME : LIGHT_THEME,
          primary: {
            main: "#90caf9",
          },
          secondary: {
            main: "#f48fb1",
          },
        },
      }),
    [darkTheme]
  );

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_THEME_KEY,
      darkTheme ? DARK_THEME : LIGHT_THEME
    );
  }, [darkTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <Grid size={2}>
          <Sidebar
            viewerRef={viewerRef}
            state={state}
            setState={setState}
            darkTheme={darkTheme}
            setDarkTheme={setDarkTheme}
          />
        </Grid>
        <Grid size={10}>
          <CesiumContainer
            viewerRef={viewerRef}
            state={state}
            setState={setState}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
