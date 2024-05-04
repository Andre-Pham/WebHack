import { useState, useEffect } from "react";
import HackDimensions from "../styling/HackDimensions";
import VStack from "../containers/Stacks/VStack";
import HackButton from "../base/HackButton";
import HackImage from "../base/HackImage";
import AnimationPlay from "../custom/AnimationPlay";
import { TIMEOUT } from "dns";

function AppScreen() {
    const [activeAnimation, setActiveAnimation] = useState(1);

    // Function to handle switching animations
    const handleAnimationSwitch = () => {
        setActiveAnimation(2); // Switch to the second animation
    };

    useEffect(() => {
        let timer;
        if (activeAnimation === 2) {
            timer = setTimeout(() => {
                setActiveAnimation(1);
            }, 5000); // assigns the time
        }

        return () => clearTimeout(timer);
    }, [activeAnimation]);

    return (
        <div>
            {activeAnimation === 1 ? (

                // Change onClick to a different user move
                <div onClick={handleAnimationSwitch}>
                    {/* Animation 1 */}
                    <p>
                        <AnimationPlay frames={["andre.png", "yonder.png", "square.png"]} />
                    </p>
                </div>
            ) : (
                <div>
                    {/* Animation 2 */}
                    <p>
                        <AnimationPlay frames={["download.png", "images.jpg", "tree.jpg"]} />
                    </p>
                </div>
            )}
        </div>
    );
}

export default AppScreen;
