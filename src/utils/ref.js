export const refDestroy = (ref) => {
    try {
        ref.current?.destroy();
        ref.current = null;
    } catch (error) {
        console.error("Error destroying ref:", error);
    }
}