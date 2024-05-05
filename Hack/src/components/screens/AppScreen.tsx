import { useState, useEffect } from "react";
import HackDimensions from "../styling/HackDimensions";
import VStack from "../containers/Stacks/VStack";
import HackButton from "../base/HackButton";
import HackImage from "../base/HackImage";
import AnimationPlay from "../custom/AnimationPlay";
import { TIMEOUT } from "dns";
import Break from "../custom/Break";
import Session from "../custom/Session";
import TimeLeft from "../custom/TimeLeft";
import formatTime from "../custom/formatTime";


interface TimeProps {
    breakLength: string;
    SessionLength: number;
    decreaseByOneMin: () => void;
    increaseByOneMin: () => void;
    decreaseBreakByOneMin: () => void;
    increaseBreakByOneMin: () => void;
    formatTime: (time: number) => string;
  }

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





// App component

    // Break length state with initial value and setter
    const [breakLength, setBreakLength] = useState<number>(300);
  
    // Function to decrease break length
    const decreaseBreakByOneMin = (): void => {
      const newBreakLength = breakLength - 60;
      setBreakLength(newBreakLength < 0 ? 0 : newBreakLength);
    };
  
    // Function to increase break length
    const increaseBreakByOneMin = (): void => {
      setBreakLength(breakLength + 60);
    };
  
  
    // Session length state with initial value and setter
    const [sessionLength, setSessionLength] = useState<number>(300);
  
    // Function to decrease session length
    const decreaseByOneMin = (): void => {
      const newSessionLength = sessionLength - 60;
      setSessionLength(newSessionLength < 0 ? 0 : newSessionLength);
    };
  
    // Function to increase session length
    const increaseByOneMin = (): void => {
      setSessionLength(sessionLength + 60);
    };
  
  
  
  



    
    return (
        <> 
        <div className="AppScreen">
        <Break
          breakLength = {formatTime(breakLength)}
          decreaseBreakByOneMin = {decreaseBreakByOneMin}
          increaseBreakByOneMin={increaseBreakByOneMin}
        />
        <TimeLeft
          SessionLength={sessionLength}
          breakLength={breakLength}
          formatTime={formatTime}
        />
        <Session
          SessionLength={sessionLength}
          decreaseByOneMin={decreaseByOneMin}
          increaseByOneMin={increaseByOneMin}
        />
      </div>




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
        </>
    );
}


export default AppScreen;
