import React from "react";

interface Props {
    children: React.ReactNode;
    spacing?: number;
    horizontalSpacing?: number;
    style?: React.CSSProperties;
}

const VStack: React.FC<Props> = ({ children, spacing = 0, horizontalSpacing, style }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                columnGap: horizontalSpacing !== undefined ? horizontalSpacing + "px" : spacing + "px",
                rowGap: spacing + "px",
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default VStack;
