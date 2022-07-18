import { useState } from "react";

const defaultGrid = {
    shape: [],
    className: ""
}

const buildHold = (player) => {
    let tetromino;
    let classname;
    
    if (player) {
        tetromino = player.shape;
        classname = player.className;
    }

    else if (!player) {
       tetromino = defaultGrid.shape;
       classname = defaultGrid.className;
    };

    return {
        shape: tetromino,
        className: classname
    };
    
}

export const useHold = () => {
    const [ hold, setHold ] = useState(buildHold());
    const swapHold = (player) => {
        setHold(buildHold(player));
    };

    return { hold, setHold, swapHold };
}