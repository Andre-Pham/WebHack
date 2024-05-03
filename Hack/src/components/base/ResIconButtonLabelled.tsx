import React from "react";
import ResColor from "../styling/color/ResColor";
import VStack from "../containers/Stacks/VStack";
import ResIconButton from "./ResIconButton";
import ResText from "./ResText";
import ResTypography from "../styling/ResTypography";

interface Props {
    color: ResColor;
    iconPath?: string; // https://pictogrammers.com/library/mdi/
    iconColor?: ResColor;
    fileName?: string;
    label: string;
    size: number;
    style?: React.CSSProperties;
    onPress: () => void;
}

const ResIconButtonLabelled: React.FC<Props> = ({
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
            <ResIconButton
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
                <ResText typography={ResTypography.subscriptLabel} style={{ alignSelf: "center", textAlign: "center" }}>
                    {label}
                </ResText>
            </div>
        </VStack>
    );
};

export default ResIconButtonLabelled;
