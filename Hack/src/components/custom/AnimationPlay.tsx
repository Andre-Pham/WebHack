import { useState, useEffect } from "react";
import HackImage from "../base/HackImage";

interface Props {
    frames: string[];
    frameSpeed?: number;
    width?: number | string;
    height?: number | string;
    style?: React.CSSProperties;
}

const AnimationPlay: React.FC<Props> = ({ frames, frameSpeed = 600, width = 100, height = 100, style }) => {
    const [frameIndex, setFrameIndex] = useState(0);
    //const frames = frames

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
        }, frameSpeed);

        return () => clearInterval(intervalId);
    }, [frameSpeed, frames.length]);

    return <HackImage fileName={frames[frameIndex]} width={width} height={height} style={style} />;
};

export default AnimationPlay;
