import { useEffect, useState } from "react";
import VStack from "../containers/Stacks/VStack";
import HackTypography from "../styling/HackTypography";
import Draggable, { HackDragType } from "../custom/Draggable";
import DropTarget from "../custom/DropTarget";
import HackButton from "../base/HackButton";
import HackColors from "../styling/HackColors";
import HackImage, { HackImageScale } from "../base/HackImage";
import HGap from "../containers/Spacing/HGap";
import StateManager from "../../state/publishers/StateManager";
import Session from "../../model/Session";
import HackText from "../base/HackText";
import VGap from "../containers/Spacing/VGap";
import AnimationFrames from "../../services/AnimationFrames";
import AnimationPlayer from "../custom/AnimationPlayer";
import HStack from "../containers/Stacks/HStack";

function AppScreen() {
    const [foodCount, setFoodCount] = useState(StateManager.foodRemaining.read());
    const [timeToLive, setTimeToLive] = useState<string | null>(StateManager.timeToLiveDescription.read());
    const [studySessionDuration, setStudySessionDuration] = useState<string | null>(
        StateManager.studySessionDurationDescription.read(),
    );
    const [animationFrames, setAnimationFrames] = useState(
        AnimationFrames.getSleepingFrames(Session.inst.getPetState()),
    );
    const [animationSpeed, setAnimationSpeed] = useState(AnimationFrames.sleepingSpeed);
    let animationQueueSize = 0;
    const [timeTravelOpacity, setTimeTravelOpacity] = useState(0);

    useEffect(() => {
        const loadAnimation = () => {
            const newState = StateManager.petState.read();
            const isResting = StateManager.studySessionDurationDescription.read() === null;
            if (isResting) {
                setAnimationFrames(AnimationFrames.getSleepingFrames(newState));
                setAnimationSpeed(AnimationFrames.sleepingSpeed);
            } else {
                setAnimationFrames(AnimationFrames.getStudyingFrames(newState));
                setAnimationSpeed(AnimationFrames.studyingSpeed);
            }
        };

        const foodUnsubscribe = StateManager.foodRemaining.subscribe(() => {
            setFoodCount(StateManager.foodRemaining.read());
        });
        const timeToLiveUnsubscribe = StateManager.timeToLiveDescription.subscribe(() => {
            setTimeToLive(StateManager.timeToLiveDescription.read());
        });
        const studyDurationUnsubscribe = StateManager.studySessionDurationDescription.subscribe(() => {
            setStudySessionDuration(StateManager.studySessionDurationDescription.read());
        });
        const petStateUnsubscribe = StateManager.petState.subscribe(() => {
            loadAnimation();
        });

        // Load animation on mount
        loadAnimation();
        document.body.style.backgroundColor = "#e9f5ff";

        return () => {
            foodUnsubscribe();
            timeToLiveUnsubscribe();
            studyDurationUnsubscribe();
            petStateUnsubscribe();
        };
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            Session.inst.refreshState();
        }, 500);

        return () => clearInterval(timer);
    }, []);

    const onFeedFood = () => {
        Session.inst.feedPet();
        playAnimation(1, AnimationFrames.eating, AnimationFrames.eatingSpeed);
    };

    const startStudySession = () => {
        Session.inst.startStudySession();
        playAnimation(
            null,
            AnimationFrames.getStudyingFrames(Session.inst.getPetState()),
            AnimationFrames.studyingSpeed,
        );
    };

    const endStudySession = () => {
        Session.inst.endStudySession();
        playAnimation(
            null,
            AnimationFrames.getSleepingFrames(Session.inst.getPetState()),
            AnimationFrames.sleepingSpeed,
        );
    };

    const playAnimation = (durationSeconds: number | null, frames: string[], speed: number) => {
        setAnimationFrames(frames);
        setAnimationSpeed(speed);
        animationQueueSize += 1;
        if (durationSeconds) {
            setTimeout(() => {
                animationQueueSize -= 1;
                if (animationQueueSize <= 0) {
                    // Safety
                    animationQueueSize = 0;
                    const isResting = StateManager.studySessionDurationDescription.read() === null;
                    const petState = Session.inst.getPetState();
                    if (isResting) {
                        setAnimationFrames(AnimationFrames.getSleepingFrames(petState));
                        setAnimationSpeed(AnimationFrames.sleepingSpeed);
                    } else {
                        setAnimationFrames(AnimationFrames.getStudyingFrames(petState));
                        setAnimationSpeed(AnimationFrames.studyingSpeed);
                    }
                }
            }, durationSeconds * 1000);
        }
    };

    return (
        <div
            style={{
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100vh",
                }}
            >
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
                        <div
                            style={{
                                width: 350,
                                height: 350,
                                position: "relative",
                            }}
                        >
                            <HackImage
                                fileName="shadow.png"
                                width={290}
                                height={120}
                                scale={HackImageScale.none}
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    bottom: 15,
                                    opacity: "22%",
                                }}
                            />

                            <DropTarget target={HackDragType.carrot} onDrop={onFeedFood}>
                                <AnimationPlayer
                                    frames={animationFrames}
                                    frameSpeed={animationSpeed}
                                    width={350}
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                    }}
                                />
                            </DropTarget>
                        </div>

                        <HGap size={150} />

                        <div
                            style={{
                                width: 350,
                                height: 350,
                                position: "relative",
                            }}
                        >
                            <HackImage
                                fileName="shadow.png"
                                width={230}
                                height={100}
                                scale={HackImageScale.none}
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    transform: "translateX(-61%)",
                                    bottom: 15,
                                    opacity: "22%",
                                }}
                            />

                            <HackImage
                                fileName="table.png"
                                width={350}
                                scale={HackImageScale.scaleToFit}
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                }}
                            />

                            {Array.from({ length: foodCount }, (_, index) => (
                                <Draggable
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        transform: "translateX(-80%)",
                                        bottom: 100 + index * 20,
                                        // right: -30,
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
                        <div
                            onMouseEnter={() => {
                                setTimeTravelOpacity(1);
                            }}
                            onMouseLeave={() => {
                                setTimeTravelOpacity(0);
                            }}
                        >
                            <HStack
                                spacing={20}
                                style={{
                                    opacity: timeTravelOpacity,
                                    transition: "opacity 2s",
                                }}
                            >
                                <HackButton
                                    label="+1 Day"
                                    typography={HackTypography.button}
                                    color={HackColors.accent}
                                    onPress={() => {
                                        Session.inst.timeTravel(1, 0, 0);
                                    }}
                                    wide={false}
                                />

                                <HackButton
                                    label="+1 Hour"
                                    typography={HackTypography.button}
                                    color={HackColors.accent}
                                    onPress={() => {
                                        Session.inst.timeTravel(0, 1, 0);
                                    }}
                                    wide={false}
                                />

                                <HackButton
                                    label="+5 Minutes"
                                    typography={HackTypography.button}
                                    color={HackColors.accent}
                                    onPress={() => {
                                        Session.inst.timeTravel(0, 0, 5);
                                    }}
                                    wide={false}
                                />

                                <HackButton
                                    label="Reset"
                                    typography={HackTypography.button}
                                    color={HackColors.accent}
                                    onPress={() => {
                                        Session.inst.resetStateAndPersistance();
                                    }}
                                    wide={false}
                                />
                            </HStack>
                        </div>

                        <VGap size={20} />

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
                        >{`Death Counter: ${timeToLive ?? "Loading..."}`}</HackText>
                    </VStack>
                </div>
            </div>
        </div>
    );
}

export default AppScreen;
