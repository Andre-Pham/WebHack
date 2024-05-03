import React from "react";

interface Props {
    size: number;
}

const VGap: React.FC<Props> = ({ size }) => {
    return <div style={{ height: size }} />;
};

export default VGap;
