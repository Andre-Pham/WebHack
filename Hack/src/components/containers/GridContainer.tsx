import React from "react";

interface Props {
    columns: number;
    spacing: number;
    // Rule options:
    // - 1fr: Flexible fraction
    // - 100px: Columns are 100px each
    // - 50%: Columns take up 50% each
    // - minmax(100px, 1fr): Minimum width of 100 pixels and a maximum width of whatever fraction remains
    columnSizeRule?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const GridContainer: React.FC<Props> = ({ columns, spacing, columnSizeRule = "1fr", children, style }) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, ${columnSizeRule})`,
                gap: spacing,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default GridContainer;
