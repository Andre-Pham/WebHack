import React from "react";

interface Props {
    fileName: string;
    flexVertical: boolean;
    style?: React.CSSProperties;
}

const ResFlexImage: React.FC<Props> = ({ fileName, flexVertical, style }) => {
    return (
        <img
            src={`/images/${fileName}`}
            alt={fileName}
            style={{
                height: flexVertical ? "100%" : "auto",
                width: flexVertical ? "auto" : "100%",
                aspectRatio: "1",
                objectFit: "contain",
                ...style,
            }}
        />
    );
};

export default ResFlexImage;
