import { IonGeocoderService, Cartesian3 } from "cesium";
import { LOCATIONS } from "./constants";

export const handleGeocoderSearch = async (viewer, query) => {
    if (!viewer || !query) {
        console.log("Viewer or query is not defined");
        return { success: false, error: "Invalid viewer or search query" };
    }

    try {
        const geoCoder = new IonGeocoderService({ scene: viewer.scene });
        const results = await geoCoder.geocode(query);
        if (results.length > 0) {
            const result = results[0];
            viewer.camera.flyTo({
                destination: result.destination,
                orientation: {
                    heading: result.heading,
                    pitch: result.pitch,
                    roll: result.roll,
                },
            });
            return { success: true, error: "" };
        } else {
            return { success: false, error: `No location found for "${query}"` };
        }
    } catch (error) {
        console.error("Geocoding error:", error);
        return { success: false, error: `Error searching for "${query}". Please try again.` };
    }
};

export const flyToLocation = (viewer, locationName) => {
    const location = LOCATIONS[locationName.toLowerCase()];
    if (location && viewer) {
        viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(
                location.longitude,
                location.latitude,
                location.altitude
            ),
            duration: 2,
        });
        return { success: true, error: "" };
    } else {
        return { success: false, error: `Location "${locationName}" not found` };
    }
};