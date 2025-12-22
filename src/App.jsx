import { useRef } from "react";
import "./App.css";
import "cesium/Build/Cesium/Widgets/widgets.css";

import CesiumContainer from "./CesiumContainer";
import Sidebar from "./Sidebar";
import { Grid } from "@mui/material";
function App() {
  const viewerRef = useRef(null);

  return (
    <>
      <Grid container>
        <Grid size={2}>
          <Sidebar />
        </Grid>
        <Grid size={10}>
          <CesiumContainer viewerRef={viewerRef} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
