import { useEffect, useState } from "react";
import VStack from "../containers/Stacks/VStack";
import HackTypography from "../styling/HackTypography";
import Draggable, { HackDragType } from "../custom/Draggable";
import DropTarget from "../custom/DropTarget";
import HStack from "../containers/Stacks/HStack";
import HackButton from "../base/HackButton";
import HackColors from "../styling/HackColors";
import HackImage, { HackImageScale } from "../base/HackImage";
import HGap from "../containers/Spacing/HGap";
import StateManager from "../../state/publishers/StateManager";
import Session from "../../model/Session";
import HackText from "../base/HackText";
import HackFlexImage from "../base/HackFlexImage";
import VGap from "../containers/Spacing/VGap";

function AppScreen() {
    const [foodCount, setFoodCount] = useState(StateManager.foodRemaining.read());
    const [timeToLive, setTimeToLive] = useState<string | null>(StateManager.timeToLiveDescription.read());
    const [studySessionDuration, setStudySessionDuration] = useState<string | null>(
        StateManager.studySessionDurationDescription.read(),
    );

    useEffect(() => {
        const foodUnsubscribe = StateManager.foodRemaining.subscribe(() => {
            setFoodCount(StateManager.foodRemaining.read());
        });
        const timeToLiveUnsubscribe = StateManager.timeToLiveDescription.subscribe(() => {
            setTimeToLive(StateManager.timeToLiveDescription.read());
        });
        const studyDurationUnsubscribe = StateManager.studySessionDurationDescription.subscribe(() => {
            setStudySessionDuration(StateManager.studySessionDurationDescription.read());
        });

        document.body.style.backgroundColor = "#e9f5ff";

        return () => {
            foodUnsubscribe();
            timeToLiveUnsubscribe();
            studyDurationUnsubscribe();
        };
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            Session.inst.refreshState();
            console.log("refreshed");
        }, 500);

        return () => clearInterval(timer);
    }, []);

    const onFeedFood = () => {
        Session.inst.feedPet();
    };

    const startStudySession = () => {
        Session.inst.startStudySession();
    };

    const endStudySession = () => {
        Session.inst.endStudySession();
    };

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
                    {/* <div
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#e9f5ff",
                        }}
                    /> */}
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
                        bottom: 0,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <HackImage
                        fileName="background-wide.png"
                        scale={HackImageScale.scaleToFit}
                        style={{
                            height: 800,
                            position: "relative",
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
                        }}
                    >
                        <DropTarget target={HackDragType.carrot} onDrop={onFeedFood}>
                            <HackImage
                                fileName="study-1.png"
                                width={400}
                                scale={HackImageScale.scaleToFit}
                                style={{}}
                            />
                        </DropTarget>

                        <HGap size={200} />

                        <div
                            style={{
                                width: "200px",
                                height: "100px",
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

                            {Array.from({ length: foodCount }, (_, index) => (
                                <Draggable
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        bottom: 20 + index * 20,
                                    }}
                                    disableTransition={!(foodCount == 1 && index == 0)}
                                    type={HackDragType.carrot}
                                    key={index}
                                >
                                    <HackImage
                                        fileName="carrot.png"
                                        width={125}
                                        scale={HackImageScale.scaleToFit}
                                        style={{}}
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
                        bottom: 500,
                    }}
                >
                    <VStack
                        spacing={0}
                        style={{
                            alignItems: "center",
                        }}
                    >
                        {studySessionDuration === null ? (
                            <>
                                <HackButton
                                    label="Start Study Session"
                                    typography={HackTypography.button}
                                    color={HackColors.accent}
                                    onPress={startStudySession}
                                    wide={false}
                                />
                            </>
                        ) : (
                            <>
                                <HackText typography={HackTypography.timerSubscript} wide={false} verticalWrap={true}>
                                    STUDY SESSION
                                </HackText>

                                <HackText typography={HackTypography.timer} wide={false} verticalWrap={true}>
                                    {studySessionDuration}
                                </HackText>

                                <VGap size={20} />

                                <HackButton
                                    label="End Study Session"
                                    typography={HackTypography.button}
                                    color={HackColors.accent}
                                    onPress={endStudySession}
                                    wide={false}
                                />
                            </>
                        )}

                        <VGap size={20} />

                        <HackText
                            typography={HackTypography.body}
                            wide={false}
                        >{`Death Counter: ${timeToLive}`}</HackText>
                    </VStack>
                </div>
            </div>
        </div>
    );
}

export default AppScreen;
