import { useState } from "react";
import HackDimensions from "../styling/HackDimensions";
import VStack from "../containers/Stacks/VStack";
import HackText from "../base/HackText";
import HackTypography from "../styling/HackTypography";
import Draggable, { HackDragType } from "../custom/Draggable";
import DropTarget from "../custom/DropTarget";
import HackImage from "../base/HackImage";

function AppScreen() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ padding: HackDimensions.screenPadding }}>
            <VStack spacing={50}>
                <HackText typography={HackTypography.header}>{`Hello World ${count}`}</HackText>

                <DropTarget
                    target={HackDragType.carrot}
                    onDrop={() => {
                        console.log("hello");
                        setCount((prevCount) => prevCount + 1);
                    }}
                    style={{
                        width: 200,
                        height: 100,
                        backgroundColor: "lightgrey",
                        textAlign: "center",
                        lineHeight: "100px",
                    }}
                >
                    Drop target
                </DropTarget>

                <Draggable type={HackDragType.carrot}>Draggable 1</Draggable>

                <Draggable type={HackDragType.carrot}>Draggable 1</Draggable>

                <Draggable type={HackDragType.carrot}>
                    <HackImage fileName="andre.png" width={100} height={100} />
                </Draggable>
            </VStack>
        </div>
    );
}

export default AppScreen;
