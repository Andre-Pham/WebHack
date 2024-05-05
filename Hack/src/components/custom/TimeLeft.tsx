import React, { useState, useEffect } from 'react';

// Define a type for the props
type TimeLeftProps = {
    SessionLength: number; // Assuming session length is in seconds
    breakLength: number; // Assuming break length is also in seconds
    formatTime: (timeLeft: number) => string; // formatTime function that converts time to a readable format
};

const TimeLeft: React.FC<TimeLeftProps> = ({
    SessionLength,
    breakLength,
    formatTime
}) => {
    const [currentSessionType, setCurrentSessionType] = useState<'Session' | 'Break'>('Session'); // Use a union type for specific string values
    const [timeLeft, setTimeLeft] = useState<number>(SessionLength);
    const [timerRunning, setTimerRunning] = useState<boolean>(false);
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
    const [sessionCount, setSessionCount] = useState<number>(0);

    useEffect(() => {
        setTimeLeft(currentSessionType === 'Session' ? SessionLength : breakLength);
    }, [SessionLength, breakLength, currentSessionType]);

    const handleStartStopClick = () => {
        if (!timerRunning) {
            const newInterval = setInterval(() => {
                setTimeLeft((prevTimeLeft) => {
                    if (prevTimeLeft > 0) {
                        return prevTimeLeft - 1;
                    } else {
                        clearInterval(newInterval); // Stop the interval when time reaches zero
                        setTimerRunning(false);    
                        return switchSessionType(); // Call a function to switch the type and set the new time
                    }
                });
            }, 10); // Changed to 1000 for 1 second decrement as per realistic use
            setTimerInterval(newInterval);
            setTimerRunning(true);
        } else {
            if (timerInterval) clearInterval(timerInterval);
            setTimerRunning(false);
        }
    };

    const switchSessionType = (): number => {
        if (currentSessionType === 'Session') {
            setCurrentSessionType('Break');

            return breakLength;
        } else {
            setCurrentSessionType('Session');
            return SessionLength;
        }
    };

    useEffect(() => {
        // Cleanup the interval on component unmount
        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [timerInterval]);

    return (
        <div>
            <div>Session Count: {sessionCount}</div>
            {formatTime(timeLeft)}
            <p id="timer-label">{currentSessionType}</p>
            <button onClick={handleStartStopClick}>
                {timerRunning ? 'Stop' : 'Start'}
            </button>
        </div>
    );
};

export default TimeLeft;
