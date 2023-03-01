import { useState, useCallback } from "react"

export const useGameOver = () => {
    // useState hook to keep track of gameOver state
    const [gameOver, setGameOver] = useState(true);

    // useCallback to create reset function
    const resetGameOver = useCallback(() => {
        setGameOver(false)
    },[]);

    // return current gameOver state, setGameOver function, and resetGameOver function
    return[gameOver, setGameOver, resetGameOver]
}


