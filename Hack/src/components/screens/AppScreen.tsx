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

function AppScreen() {
    const [carrotCount, setCarrotCount] = useState(0);

    const renderCarrots = () => {
        return Array.from({ length: carrotCount }, (_, index) => (
            <Draggable
                style={{
                    marginBottom: 100 + index*30,
                    marginRight: 50,
                }}
                disableTransition={!(carrotCount == 1 && index == 0)}
                type={HackDragType.carrot}
            >
                <div style={{ backgroundColor: "orange", width: 100, height: 30, border: "5px solid red" }} />
            </Draggable>
        ));
    };

    return (
        <div style={{}}>
            <VStack>
                <ZStack
                    style={{
                        position: "fixed",
                        left: 0,
                        bottom: 0,
                        width: "100%",
                    }}
                >
                    <div style={{ backgroundColor: "red", height: 100, width: "100%", bottom: 0 }} />

                    <HStack style={{ width: "100%" }}>
                        <DropTarget
                            target={HackDragType.carrot}
                            onDrop={() => {
                                setCarrotCount((prevCount) => Math.max(prevCount - 1, 0));
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "blue",
                                    height: 200,
                                    width: 300,
                                    marginBottom: 50,
                                    marginLeft: 50,
                                }}
                            />
                        </DropTarget>

                        <Spacer />

                        <ZStack>
                            <div
                                style={{
                                    backgroundColor: "blue",
                                    height: 100,
                                    width: 300,
                                    marginBottom: 100,
                                    marginRight: 50,
                                }}
                            />

                            {renderCarrots()}
                        </ZStack>
                    </HStack>
                </ZStack>

                <HackText typography={HackTypography.header}>{`Carrots: ${carrotCount}`}</HackText>

                <HackButton 
                    label="More Carrots!"
                    typography={HackTypography.button}
                    color={HackColors.accent}
                    onPress={() => {
                        setCarrotCount(carrotCount + 1)
                    }}
                />
            </VStack>
        </div>
    );
}

export default AppScreen;
