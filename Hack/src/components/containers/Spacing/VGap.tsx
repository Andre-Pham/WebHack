import React from "react";

interface Props {
    size: number;
    style?: React.CSSProperties;
}

const VGap: React.FC<Props> = ({ size, style }) => {
    return <div style={{ height: size, ...style }} />;
};

export default VGap;
