import { useEffect } from "react";

import "./GameController.css";

import { Action, actionForKey, actionIsDrop } from "../buisness/Input";
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
    resetDropTime
}) => {
    const [lockDelay, setLockDelay] = useLockDelay();
    const [normalLockDelay, setNormalLockDelay] = useNormalLockDelay();
    const [ lockCount, setLockCount ] = useLockCount();
    const {collided2} = nextMove({board, player, setGameOver});

    useInterval(() => {
         handleInput(Action.SlowDrop);
    }, dropTime);



    const handleUserKeyPressdown = event => {
        const { key, keyCode } = event;
        
        const action = actionForKey(keyCode);

        if (pause === true && action !== Action.Pause){
            return;
        }
        if (action === Action.Quit) {
            setGameOver(true);
            return; 
        } else if (action === Action.Pause) {
            if (dropTime) {
                pauseDropTime();
                setPause(true);
                
            } else{
                setPause(false)
                resumeDropTime();

            }
            return;
        } 
        
        if ((actionIsDrop(action)) && pause !== true) pauseDropTime();
        
        handleInput(action);
      };

      const handleUserKeyPressup = event => {
        const { key, keyCode } = event;
        
        const {collided} = nextMove({board, player, setGameOver});
        const action = actionForKey(keyCode);

        
        if (!collided && (lockDelay === true)){
            setLockDelay(false);
            resetDropTime();
        }

        if ((actionIsDrop(action)) && pause !== true){

            resumeDropTime();
        }   

      };

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
    

 
    const handleInput = (action) => {
        playerController({
            action,
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
            setLockCount
        });
    };

}

export default GameController;