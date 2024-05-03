import React from "react";
import ResTypographyConfig from "../styling/typography/ResTypographyConfig";

interface Props {
    // Text or other components to be embedded
    children: React.ReactNode;
    // Typography applied
    typography: ResTypographyConfig;
    // If the component should expand to take up available horizontal space
    wide?: boolean;
    // If the frame should exactly match the text
    verticalWrap?: boolean;
    // Number of lines (predefined)
    numberOfLines?: number;
    // Custom styling
    style?: React.CSSProperties;
}

const ResText: React.FC<Props> = ({
    children,
    typography,
    verticalWrap = false,
    wide = true,
    numberOfLines,
    style,
}) => {
    let computedStyle: React.CSSProperties = {
        width: wide ? "100%" : undefined,
        justifyItems: wide == undefined ? undefined : "center",
        lineHeight: verticalWrap ? 1 : undefined,
        overflowWrap: "break-word",
        ...typography.getStylesheet(),
        ...style,
    };
    // Trucate at number of lines
    if (numberOfLines) {
        computedStyle.overflow = "hidden";
        computedStyle.display = "-webkit-box";
        computedStyle.WebkitBoxOrient = "vertical";
        computedStyle.WebkitLineClamp = numberOfLines;
        computedStyle.textOverflow = "ellipsis";
    }
    return <span style={computedStyle}>{children}</span>;
};

export default ResText;
