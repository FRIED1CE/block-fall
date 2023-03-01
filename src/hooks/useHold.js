import { useState } from "react";
import { resetShape } from "../buisness/Tetrominoes"

const buildHold = (player) => {
    let tetromino;
    let classname;
    // if there player reset the player and give the hold
    // tetrmoino the players attributes
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
    // if there isn't a player make the hold value be empty
    else if (!player) {
       return {
        shape: [],
        className: ""
        };
    };

}

export const useHold = () => {
    const [ hold, setHold ] = useState(buildHold());
    const swapHold = (player) => {
        setHold(buildHold(player));
    };
    return { hold, swapHold };
}