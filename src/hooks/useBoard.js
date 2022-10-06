import { useState, useEffect } from "react";



import { buildBoard, nextBoard } from "../buisness/Board";

export const useBoard = ({ 
    rows, 
    columns, 
    player, 
    resetPlayer, 
    addLinesCleared,
    setGameOver
}) => {
    const [board, setBoard] = useState(buildBoard({ rows, columns }));

    useEffect(() => {
        
        setBoard((previousBoard) =>
            nextBoard({
                board: previousBoard,
                player,
                resetPlayer,
                addLinesCleared,
                setGameOver
            })
        );
    }, [player, resetPlayer, addLinesCleared, setGameOver]);

    return [board];
}