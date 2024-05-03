import { useEffect } from "react";
import ResDimensions from "../styling/ResDimensions";

function usePortraitRendering(callback: (shouldRenderPortrait: boolean) => void) {
    useEffect(() => {
        const handleResize = () => {
            const shouldRenderPortrait = window.innerWidth <= ResDimensions.screenWidthToRenderPortrait;
            callback(shouldRenderPortrait);
        };
        handleResize();
        // When the window is resized, re-update
        window.addEventListener("resize", handleResize);
        // Cleanup the event listener on component unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);
}

export default usePortraitRendering;
