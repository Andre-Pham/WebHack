import React from 'react';

type SessionProps = {
    SessionLength: number;
    decreaseByOneMin: () => void;
    increaseByOneMin: () => void;
};

const Session: React.FC<SessionProps> = ({
    SessionLength,
    decreaseByOneMin,
    increaseByOneMin,
}) => {
    return (
        <div>
            <p id="Session-label">Session</p>
            <p id="Session-length">{SessionLength / 60}</p>
            <button id="Session-decrease" onClick={decreaseByOneMin}>-</button>
            <button id="Session-increase" onClick={increaseByOneMin}>+</button>
        </div>
    );
};

export default Session;
