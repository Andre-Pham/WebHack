import { useEffect, useRef, useState } from "react";
import HackDimensions from "../styling/HackDimensions";
import VStack from "../containers/Stacks/VStack";
import HackButton from "../base/HackButton";
import HackText from "../base/HackText";
import HackTypography from "../styling/HackTypography";
import HackColors from "../styling/HackColors";
import HackImage from "../base/HackImage";
import VGap from "../containers/Spacing/VGap";
import { useDrag, DragPreviewImage, useDrop } from "react-dnd";

enum DragTypes {
    carrot = "carrot",
}

const emptyImage = new Image();
emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

function AppScreen() {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const targetRef = useRef(null);
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: DragTypes.carrot,
        item: {id: 'unique_carrot_id', type: 'carrot'},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop(() => ({
        accept: 'carrot',
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                // Increment count only if dropped on this specific target
                setCount((prevCount) => prevCount + 1);
            }
        },
    }));

    useEffect(() => {
        preview(emptyImage, { captureDraggingState: true });
    }, [preview]);

    drag(ref);
    drop(targetRef);
    return (
        <div style={{ padding: HackDimensions.screenPadding }}>
            <VStack>
                <HackText typography={HackTypography.header}>{`Hello World ${count}`}</HackText>

                <div ref={ref} style={{ opacity: isDragging ? 0 : 1, cursor: isDragging ? "grabbing" : "grab", transition: `opacity ${isDragging ? 0.0 : 1.0}s`, }}>
                    Hello World
                </div>

                <VGap size={200} />

                <div ref={targetRef} style={{ width: 200, height: 100, backgroundColor: 'lightgrey', textAlign: 'center', lineHeight: '100px' }}>
                    Drop target
                </div>
            </VStack>
        </div>
    );
}

export default AppScreen;
