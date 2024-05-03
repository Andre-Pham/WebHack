import React from "react";

interface Props {
    children: React.ReactNode;
    spacing?: number;
    verticalSpacing?: number;
    style?: React.CSSProperties;
}

const HStack: React.FC<Props> = ({ children, spacing = 0, verticalSpacing, style }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                columnGap: spacing + "px",
                rowGap: verticalSpacing !== undefined ? verticalSpacing + "px" : spacing + "px",
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default HStack;
