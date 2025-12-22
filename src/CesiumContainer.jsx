import { Viewer, Ion, Terrain } from "cesium";
import { useEffect, useRef } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { CESIUM_TOKEN } from "./config/config";
import { refDestroy } from "./utils/ref";

const CesiumContainer = ({ viewerRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    Ion.defaultAccessToken = CESIUM_TOKEN;
   
    viewerRef.current = new Viewer(containerRef.current, {
      animation: false,
      timeline: false,
      terrain: Terrain.fromWorldTerrain(),
    });

    return () => {
      refDestroy(viewerRef);
    };
  }, []);


  return (
    <div ref={containerRef} style={{ width: "100%", height: "100vh" }}>
        <span>This is dummy text;</span>
    </div>
  );
};

export default CesiumContainer;
