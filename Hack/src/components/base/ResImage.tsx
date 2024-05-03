import React, { useEffect, useState } from "react";
import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";

export enum ResImageScale {
    none,
    scaleToFit,
    scaleToFill,
    scaleToFillCrop,
}

interface Props {
    fileName: string;
    width?: number | string;
    height?: number | string;
    scale?: ResImageScale;
    style?: React.CSSProperties;
}

const ResImage: React.FC<Props> = ({
    fileName,
    width = "auto",
    height = "auto",
    scale = ResImageScale.none,
    style,
}) => {
    const [size, setSize] = useState<{ width?: number | string; height?: number | string }>({
        width: width,
        height: height,
    });
    const [resizeMode, setResizeMode] = useState<"fill" | "contain" | "cover" | "none" | "scale-down" | undefined>(
        undefined,
    );

    const handleImageLoaded = (event: any) => {
        if (scale == ResImageScale.scaleToFill && typeof width == "number" && typeof height == "number") {
            if (width > height) {
                setSize({ width: width, height: undefined });
            } else {
                setSize({
                    width: (event.target.naturalWidth * height) / event.target.naturalHeight,
                    height: undefined,
                });
            }
        }
    };

    // NOTE: Don't assign these values to the enum, since there are duplicates
    useEffect(() => {
        switch (scale) {
            case ResImageScale.none:
                setResizeMode("fill");
                break;
            case ResImageScale.scaleToFit:
                setResizeMode("contain");
                break;
            case ResImageScale.scaleToFill:
                setResizeMode("cover");
                break;
            case ResImageScale.scaleToFillCrop:
                setResizeMode("cover");
                break;
            default:
                throw new UnreachableCaseError(scale);
        }
    }, []);

    return (
        <img
            src={`/images/${fileName}`}
            alt={fileName}
            onLoad={handleImageLoaded}
            style={{
                objectFit: resizeMode,
                width: size.width,
                height: size.height,
                ...style,
            }}
        />
    );
};

export default ResImage;
