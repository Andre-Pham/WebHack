import React from 'react';

type BreakProps = {
    breakLength: string;
    decreaseBreakByOneMin: () => void;
    increaseBreakByOneMin: () => void;
};

const Break: React.FC<BreakProps> = ({
    breakLength,
    decreaseBreakByOneMin,
    increaseBreakByOneMin,
}) => {
    return (
        <div>
            <p id="break-label">Break</p>
            <p id="break-length">{breakLength}</p>
            <button id="break-decrease" onClick={decreaseBreakByOneMin}>-</button>
            <button id="break-increase" onClick={increaseBreakByOneMin}>+</button>
        </div>
    );
};

export default Break;
