import React, { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

export enum HackDragType {
    carrot = "carrot",
}

interface Props {
    type: HackDragType;
    disableTransition?: boolean;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const Draggable: React.FC<Props> = ({ type, disableTransition = false, children, style }) => {
    const dragRef = useRef(null);
    const id = useRef(uuidv4());
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: HackDragType.carrot,
        item: { id: id.current, type: type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const emptyImage = new Image();
    emptyImage.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    useEffect(() => {
        preview(emptyImage, { captureDraggingState: true });
    }, [preview]);

    drag(dragRef);

    return (
        <div
            ref={dragRef}
            style={{
                opacity: isDragging ? 0 : 1,
                cursor: isDragging ? "grabbing" : "grab",
                transition: `opacity ${isDragging || disableTransition ? 0.0 : 1.0}s`,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default Draggable;
