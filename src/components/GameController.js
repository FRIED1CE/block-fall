import { useEffect } from "react";

import "./GameController.css";

import { Action, actionForKey, actionIsDrop } from "../buisness/Input";
import { playerController, nextMove } from "../buisness/PlayerController";
 
import { useInterval } from "../hooks/useInterval";
import { useDropTime} from "../hooks/useDropTime";
import { useLockDelay, useNormalLockDelay } from "../hooks/useLockDelay";


const GameController = ({
    board,
    gameStats,
    player,
    setGameOver,
    setPlayer,
    resetPlayer,
    swapHold,
    hold
}) => {
    const [dropTime, pauseDropTime, resumeDropTime, resetDropTime] = useDropTime({
        gameStats
    });
    const [lockDelay, setLockDelay] = useLockDelay();
    const [normalLockDelay, setNormalLockDelay] = useNormalLockDelay();
    const {collided2} = nextMove({board, player});
    
    
    
    

    useInterval(() => {
         handleInput(Action.SlowDrop);
    }, dropTime);



    const handleUserKeyPressdown = event => {
        const { key, keyCode } = event;
        
        const action = actionForKey(keyCode);
        if (action === Action.Quit) {
            setGameOver(true);
            return; 
        } else if (action === Action.Pause) {
            if (dropTime) {
                pauseDropTime(); 
            } else{
                resumeDropTime();
            }
            return;
        } 
        if (actionIsDrop(action)) pauseDropTime();
        
        handleInput(action);
      };

      const handleUserKeyPressup = event => {
        const { key, keyCode } = event;
        
        const {collided} = nextMove({board, player});
        const action = actionForKey(keyCode);

        
        if (!collided && (lockDelay === true)){
            setLockDelay(false);
            resetDropTime();
        }

        if (actionIsDrop(action)) resumeDropTime();

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
            normalLockDelay
        });
    };

}

export default GameController;