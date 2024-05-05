import React from "react";

interface Props {
    size: number;
    style?: React.CSSProperties;
}

const HGap: React.FC<Props> = ({ size, style }) => {
    return <div style={{ width: size, ...style }} />;
};

export default HGap;
