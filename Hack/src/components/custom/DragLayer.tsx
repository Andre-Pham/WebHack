import React from "react";
import { useDragLayer, XYCoord, DragLayerMonitor } from "react-dnd";
import FadingDragProxy from "./FadingDragProxy";
import { HackDragType } from "./Draggable";

interface DragItem {
    type: HackDragType;
}

interface Props {
    // None
}

const DragProxyLayer: React.FC<Props> = ({}) => {
    const { item, isDragging, currentOffset } = useDragLayer((monitor: DragLayerMonitor) => ({
        item: monitor.getItem() as DragItem,
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset(),
    }));
    return (
        <div
            style={{
                position: "fixed",
                pointerEvents: "none",
                zIndex: 1000,
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
            }}
        >
            <div style={getItemStyles(currentOffset)}>
                {item?.type === HackDragType.carrot && <div><div style={{ backgroundColor: "orange", width: 100, height: 30, border: "5px solid red" }} /></div>}

                {item?.type !== HackDragType.carrot && <FadingDragProxy><div style={{ backgroundColor: "orange", width: 100, height: 30, border: "5px solid red" }} /></FadingDragProxy>}
            </div>
        </div>
    );
};

const getItemStyles = (currentOffset: XYCoord | null): React.CSSProperties => {
    if (!currentOffset) {
        const transform = `translate3d(${currentOffset}px, ${currentOffset}px, 0) scale(1.25)`;
        return {
            transformOrigin: "left",
            transform,
            WebkitTransform: transform,
            opacity: 0,
            transition: "opacity 0.5s",
        };
    }
    // Use translate3d for better performance on browsers
    const transform = `translate3d(${currentOffset.x}px, ${currentOffset.y}px, 0) scale(1.25)`;
    return {
        transformOrigin: "left",
        transform,
        WebkitTransform: transform,
    };
};

export default DragProxyLayer;
