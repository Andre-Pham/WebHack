import { useState } from "react";
import VStack from "../containers/Stacks/VStack";
import HackText from "../base/HackText";
import HackTypography from "../styling/HackTypography";
import Draggable, { HackDragType } from "../custom/Draggable";
import DropTarget from "../custom/DropTarget";
import HStack from "../containers/Stacks/HStack";
import Spacer from "../containers/Spacing/Spacer";
import ZStack from "../containers/Stacks/ZStack";
import HackButton from "../base/HackButton";
import HackColors from "../styling/HackColors";
import HackImage, { HackImageScale } from "../base/HackImage";
import HGap from "../containers/Spacing/HGap";

function AppScreen() {
    const [carrotCount, setCarrotCount] = useState(10);

    return (
        <div style={{}}>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100vh",
                }}
            >
                {/* Sky */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "lightBlue",
                        }}
                    />
                </div>

                {/* Grass */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "160px",
                            backgroundColor: "lightGreen",
                        }}
                    />
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "end",
                            width: "100%",
                            border: "1px solid black",
                        }}
                    >
                        <DropTarget
                            target={HackDragType.carrot}
                            onDrop={() => {
                                console.log("DROPPED");
                                setCarrotCount((prevCount) => Math.max(prevCount - 1, 0));
                            }}
                        >
                            <HackImage
                                fileName="study-1.png"
                                width={300}
                                scale={HackImageScale.scaleToFit}
                                style={{
                                    border: "1px solid black",
                                }}
                            />
                        </DropTarget>

                        <HGap size={100} />

                        <div
                            style={{
                                width: "200px",
                                height: "100px",
                                border: "1px solid black",
                                position: "relative",
                                bottom: "50px",
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "purple",
                                    width: "150px",
                                    height: "100px",
                                    position: "absolute",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                }}
                            ></div>

                            {Array.from({ length: carrotCount }, (_, index) => (
                                <Draggable
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        bottom: 20 + index * 20,
                                    }}
                                    disableTransition={!(carrotCount == 1 && index == 0)}
                                    type={HackDragType.carrot}
                                    key={index}
                                >
                                    <HackImage
                                        fileName="carrot.png"
                                        width={100}
                                        scale={HackImageScale.scaleToFit}
                                        style={{
                                            border: "1px solid black",
                                        }}
                                    />
                                </Draggable>
                            ))}
                        </div>
                    </div>
                </div>

                {/* UI */}
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                    }}
                >
                    <VStack>
                        <HStack>
                            <HackButton
                                label="More Carrots!"
                                typography={HackTypography.button}
                                color={HackColors.accent}
                                onPress={() => {
                                    setCarrotCount(carrotCount + 1);
                                }}
                            />
                        </HStack>
                    </VStack>
                </div>
            </div>
        </div>
    );
}

export default AppScreen;

interface CloudProps {
    left: string;
    top: string;
    width: string;
    height: string;
}

const Cloud: React.FC<CloudProps> = ({ left, top, width, height }) => (
    <div
        style={{
            position: "absolute",
            left,
            top,
            width,
            height,
            backgroundColor: "white",
            borderRadius: "50%",
        }}
    />
);

interface BunnyProps {
    left: string;
    bottom: string;
    size: string;
}

const Bunny: React.FC<BunnyProps> = ({ left, bottom, size }) => (
    <div
        style={{
            position: "absolute",
            left,
            bottom,
            width: size,
            height: size,
            backgroundColor: "brown",
        }}
    />
);
