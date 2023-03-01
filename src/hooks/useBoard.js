import { useState, useEffect } from "react";



import { buildBoard, nextBoard } from "../buisness/Board";

export const useBoard = ({ 
    rows, 
    columns, 
    player, 
    resetPlayer, 
    addLinesCleared,
    setGameOver,
    rowLimit,
    gameStats
}) => {
    // useState hook to keep track of the current game board
    const [board, setBoard] = useState(buildBoard({ rows, columns }));


    // useEffect hook to update the board state with the nextBoard function
    useEffect(() => {
        // setBoard updates the board state with the 
        // new board returned by the nextBoard function
        setBoard((previousBoard) =>
            nextBoard({
                board: previousBoard,
                player,
                resetPlayer,
                addLinesCleared,
                setGameOver,
                rowLimit,
                gameStats
            })
        );
        // dependecies that should trigger the effect
    }, [player, resetPlayer, addLinesCleared, setGameOver]);

    return [board];
}