import React from "react";
import HackTypographyConfig from "../styling/typography/HackTypographyConfig";
import { HackFontWeight } from "../styling/typography/HackFontWeight";

interface Props {
    // Text or other components to be embedded
    children: React.ReactNode;
    // The URL to open
    url: string;
    // Typography applied
    typography: HackTypographyConfig;
    // If the component should expand to take up available horizontal space
    wide?: boolean;
    // If the frame should exactly match the text
    verticalWrap?: boolean;
    // Custom styling
    style?: React.CSSProperties;
}

const HackHyperlink: React.FC<Props> = ({ children, url, typography, verticalWrap = false, wide = true, style }) => {
    let linkTypography = typography.withWeight(HackFontWeight.bold).withUnderline(true);
    return (
        // Span means the frame doesn't extend past the text (i.e. can be clicked past the text)
        <span>
            <a
                href={url}
                style={{
                    width: wide ? "100%" : undefined,
                    justifyItems: wide == undefined ? undefined : "center",
                    lineHeight: verticalWrap ? 1 : undefined,
                    ...linkTypography.getStylesheet(),
                    ...style,
                }}
                // Open the link in a new tab or window
                target="_blank"
                // Common practice to ensure that the link is opened securely
                rel="noopener noreferrer"
            >
                {children}
            </a>
        </span>
    );
};

export default HackHyperlink;
