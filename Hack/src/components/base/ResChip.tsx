import { useState } from "react";
import ResColor from "../styling/color/ResColor";
import ResCSS from "../styling/ResCSS";

interface Props {
    color: ResColor;
    onPress?: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const ResChip: React.FC<Props> = ({ color, onPress, children, style }) => {
    const [pressed, setPressed] = useState(false);
    const [touched, setTouched] = useState(false);

    const handleMouseDown = () => {
        setPressed(true);
    };

    const handleMouseUp = () => {
        onPress && onPress();
        setPressed(false);
    };

    const handleMouseLeave = () => {
        setPressed(false);
    };

    const handleTouched = () => {
        setTouched(true);
    };

    const handleTouchEnd = () => {
        onPress && onPress();
        setTouched(false);
    };

    const handleTouchCancel = () => {
        setTouched(false);
    };

    return onPress ? (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouched}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            style={{
                borderRadius: "50px",
                padding: "4px 12px",
                alignSelf: "flex-start",
                backgroundColor: color.getColor(),
                cursor: "pointer",
                transition: "transform 0.1s",
                transform: pressed || touched ? "scale(0.95)" : "scale(1)",
                ...ResCSS.diableSelection,
                ...style,
            }}
        >
            {children}
        </div>
    ) : (
        <div
            style={{
                borderRadius: "50px",
                padding: "4px 12px",
                alignSelf: "flex-start",
                backgroundColor: color.getColor(),
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default ResChip;
