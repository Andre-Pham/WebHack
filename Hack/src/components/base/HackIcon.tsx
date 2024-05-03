import React from "react";
import HackColor from "../styling/color/HackColor";
import Icon from "@mdi/react";

interface Props {
    // Icon path (https://pictogrammers.com/library/mdi/)
    iconPath: string;
    // Icon fill color
    color?: HackColor;
    // Icon size
    size: number;
    // Custom style
    style?: React.CSSProperties;
}

const HackIcon: React.FC<Props> = ({ iconPath, color, size, style }) => {
    return <Icon path={iconPath} color={color?.getColor()} style={{ width: size, height: size, ...style }} />;
};

export default HackIcon;
