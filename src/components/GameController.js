import { useEffect, useRef, useState } from "react";

import "./GameController.css";

import { playerController, nextMove } from "../buisness/PlayerController";
 
import { useInterval } from "../hooks/useInterval";
import { useLockDelay, useNormalLockDelay, useLockCount } from "../hooks/useLockDelay";


const GameController = ({
    board,
    gameStats,
    player,
    setGameOver,
    setPlayer,
    resetPlayer,
    swapHold,
    hold,
    setPause,
    pause,
    dropTime,
    pauseDropTime,
    resumeDropTime,
    resetDropTime,
    master,
    rowLimit,
    time, 
    gameTime, 
    setGameTime,
    controls
}) => {
    const [lockDelay, setLockDelay] = useLockDelay();
    const [normalLockDelay, setNormalLockDelay] = useNormalLockDelay();
    const [ lockCount, setLockCount ] = useLockCount();
    const {collided2} = nextMove({board, player, setGameOver});

    const [previousHold, setPreviousHold] = useState(null);

    useInterval(() => {
         handleInput(controls["slowDrop"]);
    }, dropTime);

    useEffect(() => {
        if (gameStats.linesCompleted >= rowLimit)setGameOver(true);
    },[gameStats.linesCompleted])

    const handleUserKeyPressdown = event => {
        const { key } = event;
        if (pause === true && key !== controls["pause"]){
            return;
        }
        if (key === controls["rotateLeft"] || key === controls["rotateRight"] || key === controls["pause"]) {
            return; 
        } else if (key === controls["quit"]) {
            setGameOver(true);
            return;
        }
        
        if (key === controls["fastDrop"] || key === controls["slowDrop"]) {
            pauseDropTime()
            handleInput(key)
        } else {
            handleInput(key)
        }
        
      };

      const handleUserKeyPressup = event => {
        const { key } = event;
        
        const { collided } = nextMove({board, player, setGameOver});

        if (pause === true && key !== controls["pause"]){
            return;
        }
        
        if (!collided && (lockDelay === true)){
            setLockDelay(false);
            resetDropTime();
        }

        if (key === controls["fastDrop"] || key === controls["slowDrop"]){
            resumeDropTime();
        } else if (key === controls["rotateLeft"] || key === controls["rotateRight"]){
            handleInput(key)
        } else if (key === controls["pause"]) {
            if (dropTime) {
                pauseDropTime();
                setPause(true);
                
            } else{
                setPause(false)
                resumeDropTime();

            }
            return;
        } 

      };

    // listening for key press
    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPressdown)

        return () => {
            window.removeEventListener('keydown', handleUserKeyPressdown);
          };
    })
    useEffect(() => {
        window.addEventListener("keyup", handleUserKeyPressup)

        return () => {
            window.removeEventListener('keyup', handleUserKeyPressup);
          };
    })
     
        
      

    
    

 
    const handleInput = (key) => {
        playerController({
            key,
            board,
            player,
            setPlayer,
            setGameOver,
            resetPlayer,
            swapHold,
            hold,
            setLockDelay,
            resetDropTime,
            lockDelay,
            collided2,
            setNormalLockDelay,
            normalLockDelay,
            lockCount,
            setLockCount,
            previousHold,
            setPreviousHold,
            controls
            
        });
    };

}

export default GameController;