import React, { useEffect, useState } from "react";
import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";

interface Props {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const Draggable: React.FC<Props> = ({ children, style }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [relPosition, setRelPosition] = useState({ x: 0, y: 0 });

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setRelPosition({
            x: e.pageX - position.x,
            y: e.pageY - position.y,
        });
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.pageX - relPosition.x,
                y: e.pageY - relPosition.y,
            });
        }
    };

    const onMouseUp = () => {
        setIsDragging(false);
        // Check if the component is dropped on the target here
        // Trigger animation or fade away
    };

    return (
        <div
            style={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? "grabbing" : "grab",
                boxShadow: isDragging ? "5px 5px 10px rgba(0,0,0,0.2)" : "none",
                ...style,
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
        >
            {children}
        </div>
    );
};

export default Draggable;
