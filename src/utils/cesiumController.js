import { IonGeocoderService } from "cesium";

export const handleGeocoderSearch = async (viewer, query) => {
    if (!viewer || !query) {
        console.log("Viewer or query is not defined");
        return;
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
        } else {
            console.log("No results found");
        }
    } catch (error) {
        console.error("Geocoding error:", error);
    }
};