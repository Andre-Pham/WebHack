import React, { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const FadingDragProxy: React.FC<Props> = ({ children, style }) => {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const timeout = setTimeout(() => setOpacity(0.5), 100);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return <div style={{ opacity, transition: "opacity 0.5s", ...style }}>{children}</div>;
};

export default FadingDragProxy;
