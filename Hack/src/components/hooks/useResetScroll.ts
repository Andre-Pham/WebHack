import { useEffect } from "react";

function useResetScroll() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
}

export default useResetScroll;
