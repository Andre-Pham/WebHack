import React from "react";

interface Props {
    style?: React.CSSProperties;
}

const Spacer: React.FC<Props> = ({ style }) => {
    return <div style={{ flex: 1, ...style }} />;
};

export default Spacer;
