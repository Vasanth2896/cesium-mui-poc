import { Button, TextField } from "@mui/material";
import { handleGeocoderSearch } from "./utils/cesiumController";

const Sidebar = ({ viewerRef, state, setState }) => {
  const handleSearchChange = (e) => {
    setState((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleClick = () => {
    if (state.searchQuery.trim().length > 0) {
      setState((prev) => ({ ...prev, searchError: false }));
      handleGeocoderSearch(viewerRef.current, state.searchQuery);
    } else {
      setState((prev) => ({ ...prev, searchQuery: "", searchError: true }));
    }
  };
  
  return (
    <div
      style={{ backgroundColor: "#ffffff", height: "100vh", padding: "10px" }}
    >
      <TextField
        id="outlined-basic"
        label="location-search"
        variant="outlined"
        value={state.searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: 20 }}
      />
      <Button variant="contained" onClick={handleClick}>
        search
      </Button>
      {state.searchError && (
        <p style={{ color: "red" }}>Please enter a valid search query.</p>
      )}
    </div>
  );
};

export default Sidebar;
