import { useState } from "react";
import { resetShape } from "../buisness/Tetrominoes"

const defaultGrid = {
    shape: [],
    className: ""
}

const buildHold = (player) => {
    let tetromino;
    let classname;
    if (player) {
        resetShape({player});
        tetromino = player.tetromino.shape;
        classname = player.tetromino.className;
        
        return {
            shape: tetromino,
            type: player.tetromino.type,
            className: classname,
            key: player.key
        };
    }

    else if (!player) {
        tetromino = defaultGrid.shape;
        classname = defaultGrid.className;
       
       return {
        shape: tetromino,
        className: classname
        };
    };

}

export const useHold = () => {
    const [ hold, setHold ] = useState(buildHold());
    const swapHold = (player) => {
        setHold(buildHold(player));
    };
    return { hold, setHold, swapHold };
}