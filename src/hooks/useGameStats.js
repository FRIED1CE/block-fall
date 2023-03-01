import { useState, useCallback } from "react";

// build an inital dictionary of gameStats
const buildGameStats = (startLevel) => ({
    level: startLevel ? 10 : 1,
    linesCompleted: 0,
    linesInLevel: 0,
    linesPerLevel: 10,
    points: 0
});

export const useGameStats = (startLevel) => {
// store gameStats as as state, using the "buildGameStats" function
    const [gameStats, setGameStats] = useState(buildGameStats(startLevel));

    const addLinesCleared = useCallback((lines) => {
        setGameStats((previous) => {
            // calculate the number of points earned
            const points = previous.points + lines * 100;
            //destructure previous game stats
            const { linesPerLevel } = previous;

            // calculate new total number of lines cleared
            const newLinesInLevel = previous.linesInLevel + lines

            const linesCompleted = previous.linesCompleted + lines
          
            // determine if a level has been completed
            const level = 
            newLinesInLevel >= linesPerLevel
            ? previous.level + 1
            : previous.level;
            // calculate the number of lines completed in the current level
            const linesInLevel = newLinesInLevel % linesPerLevel;
    
            // update and return the game stats
            return {
                level,
                linesCompleted,
                linesInLevel,
                linesPerLevel,
                points
            };  
        }, []);
    }, []);

    const resetGameStats = (startLevel) => {
        setGameStats(buildGameStats(startLevel))
    }
    
    // return the current game stats and the
    
    return [gameStats, resetGameStats, addLinesCleared];
}