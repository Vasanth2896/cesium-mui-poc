import { Viewer, Ion, Terrain } from "cesium";
import { useEffect, useRef } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { CESIUM_TOKEN } from "./config/config";
import { refDestroy } from "./utils/ref";

const CesiumContainer = ({ viewerRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current) return;
    Ion.defaultAccessToken = CESIUM_TOKEN;

    viewerRef.current = new Viewer(containerRef.current, {
      animation: false,
      timeline: false,
      geocoder: false,
      terrain: Terrain.fromWorldTerrain(),
    });

    console.log("viewer ref created:", viewerRef.current);

    return () => {
      refDestroy(viewerRef);
      console.log("viewer ref destroyed");
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="cesiumContainer"
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
};

export default CesiumContainer;
