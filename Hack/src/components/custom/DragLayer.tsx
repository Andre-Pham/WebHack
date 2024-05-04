import React, { useEffect, useState } from 'react';
import { useDragLayer, XYCoord, DragLayerMonitor } from 'react-dnd';

interface DragItem {
    type: string;
    // Any other properties that your draggable items might have
}

interface CustomDragLayerProps {
    // You can add props if needed
}

const layerStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 1000,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

const getItemStyles = (currentOffset: XYCoord | null): React.CSSProperties => {
    // if (!currentOffset) {
    //     // return { opacity: 0 }
    //     // return { display: "none" }
    //     console.log("dead")
    //     const transform = `translate3d(${currentOffset}px, ${currentOffset}px, 0) scale(1.2)`;
    //     return {
    //         // display: 'none'
    //         // transform,
    //         // WebkitTransform: transform,
    //         transition: 'transform 0.06s'
    //     };
    // }

    const [opacity, setOpacity] = useState(1);
    const [timeoutComplete, setTimeoutComplete] = useState(false);
  
    // useEffect(() => {
      
        
  
    //   return () => {
    //     clearTimeout(transformTimeout);
        
    //   };
    // }, []);

    if (!currentOffset) {
        // setOpacity(0)

        // setTimeout(() => {
        //     // setTransform(undefined);
        //     console.log(timeoutComplete)
        //     setTimeoutComplete(true);
        //   }, 500);

        console.log("ENDED")
        const transform = timeoutComplete ? undefined : `translate3d(${currentOffset}px, ${currentOffset}px, 0) scale(1.2)`;
        console.log(currentOffset)
        return {
            transform,
            WebkitTransform: transform,
            opacity: 0, transition: 'opacity 0.5s'
        }
    }

    // Use translate3d for better performance on browsers
    const transform = `translate3d(${currentOffset.x}px, ${currentOffset.y}px, 0) scale(1.2)`;
    return {
        transform,
        WebkitTransform: transform,
        // transition: 'transform 0.06s'
    };
};

const CustomDragLayer: React.FC<CustomDragLayerProps> = (props) => {
    const {
        item,
        isDragging,
        currentOffset,
        // startingPositon,
    } = useDragLayer((monitor: DragLayerMonitor) => ({
        item: monitor.getItem() as DragItem,
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset(),
        // startingPositon: (monitor.getSourceClientOffset()?.x ?? 0) - (monitor.getDifferenceFromInitialOffset()?.y ?? 0)
    }));

    // console.log(startingPositon)

    const transform = `translate3d(${currentOffset?.x}px, ${currentOffset?.y}px, 0) scale(1.2)`;
    let itemStyle: React.CSSProperties = {
        transform,
        WebkitTransform: transform,
        
        // transition: 'transform 0.06s'
    };

    // if (!currentOffset) {
    //     transform,
    //     WebkitTransform: transform,
    //     opacity, transition: 'opacity 0.5s'
    // }

    return (
        <div style={layerStyles}>
            <div style={getItemStyles(currentOffset)}>
                {/* Render your custom preview component based on the item type */}
                {item?.type === 'carrot' && <div>Custom Drag Preview for Carrot</div>}

                {/* {<div>Persistant Preview for Carrot</div>} */}

                {item?.type !== 'carrot' && <FadeAnimation item={item} tramsform={transform} />}
            </div>
        </div>
    );
};

interface FadeProps {
    item: DragItem;
    tramsform: string;
}

const FadeAnimation: React.FC<FadeProps> = ({ item, tramsform }) => {
    const [opacity, setOpacity] = useState(1);
    const [style, setStyle] = useState<React.CSSProperties>({});
  
    useEffect(() => {
      
      // Stay visible for a duration and then fade out
      const timeout = setTimeout(() => setOpacity(0.5), 100); // Adjust time as needed
  
      return () => {
      
        clearTimeout(timeout);
      };
    }, []); // Empty dependency array to run only once
  
    return (
        <div style={{ opacity, transition: 'opacity 0.5s', ...style }}>Custom Drag Preview for Carrot</div> // Adjust timing as needed
      );
  }
  

export default CustomDragLayer;
