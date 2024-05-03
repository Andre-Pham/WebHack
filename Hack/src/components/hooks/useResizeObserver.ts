import { useRef, useState, useEffect, RefObject } from "react";

interface Size {
    width: number;
    height: number;
}

function useResizeObserver(): [RefObject<HTMLDivElement>, Size] {
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                setSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            });
        });

        if (observeTarget) {
            resizeObserver.observe(observeTarget);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return [ref, size];
}

export default useResizeObserver;
