import { createContext, useContext, useMemo } from "react";
import { SCALE_FACTORS } from "../utils/constants";

const ScaleContext = createContext(undefined);

export const ScaleProvider = ({ children, scaleFactor = 1, onScaleChange }) => {
  const value = useMemo(
    () => ({
      scaleFactor,
      availableScales: SCALE_FACTORS,
      onScaleChange,
    }),
    [scaleFactor, onScaleChange]
  );

  return (
    <ScaleContext.Provider value={value}>{children}</ScaleContext.Provider>
  );
};

export const useScale = () => {
  const context = useContext(ScaleContext);
  if (context === undefined) {
    throw new Error("useScale must be used within a ScaleProvider");
  }
  return context;
};
