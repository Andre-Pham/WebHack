import React from "react";

interface Props {
    size: number;
}

const HGap: React.FC<Props> = ({ size }) => {
    return <div style={{ width: size }} />;
};

export default HGap;
