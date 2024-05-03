import React, { useState } from "react";
import HackTypographyConfig from "../styling/typography/HackTypographyConfig";
import HackText from "./HackText";
import HackColor from "../styling/color/HackColor";
import Icon from "@mdi/react";
import HackCSS from "../styling/HackCSS";

interface Props {
    label: string;
    typography: HackTypographyConfig;
    color: HackColor;
    iconPath?: string; // https://pictogrammers.com/library/mdi/
    disabled?: boolean;
    wide?: boolean;
    style?: React.CSSProperties;
    onPress: () => void;
}

const HackCompactButton: React.FC<Props> = ({
    label,
    typography,
    color,
    iconPath = undefined,
    disabled = false,
    wide = true,
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
            onClick={!disabled ? onPress : undefined}
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "6px 14px",
                borderRadius: "50px",
                backgroundColor: color.getColor(),
                opacity: disabled ? 0.5 : 1,
                width: wide ? "100%" : undefined,
                alignSelf: wide ? undefined : "center",
                border: "none",
                cursor: disabled ? "default" : "pointer",
                transition: "transform 0.1s",
                transform: pressed || touched ? "scale(0.95)" : "scale(1)",
                ...HackCSS.diableSelection,
                ...style,
            }}
            disabled={disabled}
        >
            {iconPath && (
                <Icon
                    path={iconPath}
                    color={typography.color}
                    size={0.8}
                    style={{ paddingRight: "6px", marginTop: -2, marginBottom: -2 }}
                />
            )}

            <HackText typography={typography} wide={false}>
                {label}
            </HackText>
        </button>
    );
};

export default HackCompactButton;
