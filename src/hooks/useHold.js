import { useState } from "react";

const defaultGrid = {
    shape: [
      [0, 0],
      [0, 0],
    ],
    className: ""
}

const buildHold = (previous) => {
    let tetromino;
    
    if (!previous) {
        tetromino = Array(1).fill(0).map((_) => defaultGrid);
    };
    
    return tetromino.pop();
}

export const useHold = () => {
    const [ hold, setHold ] = useState(buildHold());

    return { hold, setHold };
}