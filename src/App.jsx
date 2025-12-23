import { useRef, useState } from "react";
import "./App.css";
import "cesium/Build/Cesium/Widgets/widgets.css";

import CesiumContainer from "./CesiumContainer";
import Sidebar from "./Sidebar";
import { Grid } from "@mui/material";
function App() {
  const viewerRef = useRef(null);
  const [state, setState] = useState({
    viewerContainerId: null,
    searchQuery: "",
  });

  return (
    <>
      <Grid container>
        <Grid size={2}>
          <Sidebar viewerRef={viewerRef} state={state} setState={setState} />
        </Grid>
        <Grid size={10}>
          <CesiumContainer
            viewerRef={viewerRef}
            state={state}
            setState={setState}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
