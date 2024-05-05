import { useState, useEffect } from "react";
import HackImage, { HackImageScale } from "../base/HackImage";

interface Props {
    frames: string[];
    frameSpeed?: number;
    width?: number | string;
    height?: number | string;
    scale?: HackImageScale;
    style?: React.CSSProperties;
}

const AnimationPlayer: React.FC<Props> = ({
    frames,
    frameSpeed = 600,
    width = undefined,
    height = undefined,
    scale = HackImageScale.scaleToFit,
    style,
}) => {
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
        }, frameSpeed);

        return () => clearInterval(intervalId);
    }, [frameSpeed, frames.length]);

    return (
        <HackImage
            fileName={frames.length === 1 ? frames[0] : frames[frameIndex]}
            width={width}
            height={height}
            style={style}
            scale={scale}
        />
    );
};

export default AnimationPlayer;
