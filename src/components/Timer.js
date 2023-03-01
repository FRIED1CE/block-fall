import "./Timer.css";

import { useState, useEffect } from "react";

const Timer = ({pause, setGameOver, maxTime, time, setTime}) => {

    // The state to keep track of time
    

    // The state of the clock
    const [timer, setTimer] = useState('00:00:00');

    // calculation for the time remaining of the total time
    const getTimeRemaining = (totalTime) => {
        const total = totalTime * 1000;
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
  
  
    const startTimer = (totalTime) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(totalTime);
        if (total >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
  
  // at first render checks if there is a max time
  // then sets the timer to that time
    useEffect(() => {
        if (maxTime){
            let { total, hours, minutes, seconds } 
                = getTimeRemaining(maxTime);
    
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
            
        }
    },[]);


    // at first render checks if there is a max time
    // then sets the timer to that time
    useEffect(() => {
        // check if game time has reached 0 and it's a timed game
        if(time === 0 && maxTime){
            setGameOver(true);
        }
        if (!pause){
            if (maxTime){
                 // if it's a timed game, decrement 
                 // the time by 1 and start the timer
                setTimeout(()=>setTime(time-1),1000)
                startTimer(time)
            }else{
                // if it's not a timed game, increment  
                // the time by 1 and start the time
                setTimeout(()=>setTime(time + 1),1000)
                startTimer(time)
            }
        }
    }, [time, pause]);

    return (
        <div className="Timer">
            <p className="timer-value">{timer}</p>
        </div>
    )
}


export default Timer
