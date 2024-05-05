import React from "react";
import HackColor from "../styling/color/HackColor";
import VStack from "../containers/Stacks/VStack";
import HackIconButton from "./HackIconButton";
import HackText from "./HackText";
import HackTypography from "../styling/HackTypography";

interface Props {
    color: HackColor;
    iconPath?: string; // https://pictogrammers.com/library/mdi/
    iconColor?: HackColor;
    fileName?: string;
    label: string;
    size: number;
    style?: React.CSSProperties;
    onPress: () => void;
}

const HackIconButtonLabelled: React.FC<Props> = ({
    color,
    iconPath = undefined,
    iconColor = undefined,
    fileName = undefined,
    label,
    size,
    style,
    onPress,
}) => {
    return (
        <VStack
            spacing={5}
            style={{
                alignItems: "center",
                alignSelf: "flex-start",
                // Adjsuts frame to match label (positioned aboslute)
                // Tested - it does scale (both the padding and the absolute positioning)
                paddingBottom: 16,
                ...style,
            }}
        >
            <HackIconButton
                iconPath={iconPath}
                iconColor={iconColor}
                fileName={fileName}
                color={color}
                size={size}
                onPress={onPress}
            />

            <div
                style={{
                    position: "absolute",
                    marginTop: size + 2,
                    flex: 1,
                    textAlign: "center",
                }}
            >
                <HackText typography={HackTypography.subscript} style={{ alignSelf: "center", textAlign: "center" }}>
                    {label}
                </HackText>
            </div>
        </VStack>
    );
};

export default HackIconButtonLabelled;
