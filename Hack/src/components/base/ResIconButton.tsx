import React, { useState } from "react";
import ResColor from "../styling/color/ResColor";
import ResImage, { ResImageScale } from "./ResImage";
import ResIcon from "./ResIcon";
import ResCSS from "../styling/ResCSS";

interface Props {
    color: ResColor;
    iconPath?: string; // https://pictogrammers.com/library/mdi/
    iconColor?: ResColor;
    fileName?: string;
    size: number;
    onlyIcon?: boolean;
    style?: React.CSSProperties;
    onPress?: () => void;
}

const ResIconButton: React.FC<Props> = ({
    color,
    iconPath = undefined,
    iconColor = undefined,
    fileName = undefined,
    size,
    onlyIcon = false,
    style,
    onPress,
}) => {
    const [pressed, setPressed] = useState(false);
    const [touched, setTouched] = useState(false);

    const handleMouseDown = () => {
        setPressed(true);
    };

    const handleMouseExit = () => {
        setPressed(false);
    };

    const handleTouched = () => {
        setTouched(true);
    };

    const handleUntouched = () => {
        setTouched(false);
    };

    return (
        <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseExit}
            onMouseLeave={handleMouseExit}
            onTouchStart={handleTouched}
            onTouchEnd={handleUntouched}
            onTouchCancel={handleUntouched}
            onClick={onPress}
            style={{
                padding: 0,
                borderRadius: "50px",
                backgroundColor: color.getColor(),
                width: onlyIcon ? 0 : size,
                height: onlyIcon ? 0 : size,
                justifyContent: "center",
                display: "flex",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.1s",
                transform: pressed || touched ? "scale(0.95)" : "scale(1)",
                ...ResCSS.diableSelection,
                ...style,
            }}
        >
            {fileName != undefined ? (
                <ResImage
                    fileName={fileName}
                    width={(size * 1.8) / 3.0}
                    height={(size * 1.8) / 3.0}
                    scale={ResImageScale.scaleToFit}
                    style={{
                        alignSelf: "center",
                    }}
                />
            ) : undefined}

            {iconPath != undefined ? (
                <ResIcon
                    iconPath={iconPath}
                    size={(size * 2.2) / 3.0}
                    color={iconColor ?? new ResColor("#ffffff")}
                    style={{
                        alignSelf: "center",
                    }}
                />
            ) : undefined}
        </button>
    );
};

export default ResIconButton;
