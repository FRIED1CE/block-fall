import { useState, useCallback } from "react"

// initial controls
const initialControls = () => ({
    "rotateRight": "ArrowUp",
    "rotateLeft": "x",
    "slowDrop": "ArrowDown",
    "left": "ArrowLeft",
    "right": "ArrowRight",
    "quit": "q",
    "pause": "p",
    "fastDrop": " ",
    "hold": "c"
});


export const useControls = () => {
    const [controls, setControls] = useState(initialControls());

    const changeControls = (input, control) => {
        // check if input is already used
        if (Object.values(controls).includes(input) ) {
            return false  
        }

        // set new input for control
        setControls({
            ...controls,
            [control]: input
        })
        
        return true
    }

    const resetControls = () => {
        setControls(initialControls);
    }

    return [controls, changeControls, resetControls]
}

