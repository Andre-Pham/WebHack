import React, { useRef } from "react";
import { HackDragType } from "./Draggable";
import { useDrop } from "react-dnd";

interface Props {
    target: HackDragType;
    onDrop: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const DropTarget: React.FC<Props> = ({ target, onDrop, children, style }) => {
    const targetRef = useRef(null);

    const [, drop] = useDrop(() => ({
        accept: target,
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                onDrop();
            }
        },
    }));

    drop(targetRef);

    return (
        <div ref={targetRef} style={style}>
            {children}
        </div>
    );
};

export default DropTarget;
