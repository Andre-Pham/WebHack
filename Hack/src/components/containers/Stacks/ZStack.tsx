import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const ZStack: React.FC<Props> = ({ children, style }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [minHeight, setMinHeight] = useState(0);

    const updateDimensions = () => {
        if (containerRef.current) {
            let maxHeight = 0;
            const childNodes = containerRef.current.childNodes;
            childNodes.forEach((node) => {
                if (node instanceof HTMLElement) {
                    maxHeight = Math.max(maxHeight, node.offsetHeight);
                }
            });
            setMinHeight(maxHeight);
        }
    };

    useEffect(() => {
        // When the window is resized, re-update the dimensions
        window.addEventListener("resize", updateDimensions);
        // Initial update on component mount
        updateDimensions();
        // Cleanup the event listener on component unmount
        return () => window.removeEventListener("resize", updateDimensions);
    }, [children]);

    return (
        <ZStackDiv
            ref={containerRef}
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                ...style,
                minHeight: `${minHeight}px`,
            }}
        >
            {children}
        </ZStackDiv>
    );
};

const ZStackDiv = styled.div`
    > * {
        position: absolute;
    }
`;

export default ZStack;
