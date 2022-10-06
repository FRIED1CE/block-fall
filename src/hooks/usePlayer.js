import { useState, useCallback } from "react";

import { randomTetromino } from "../buisness/Tetrominoes"

const buildPlayer = (previous, count) => {
    
    let tetrominoes;
    if (previous) {
        tetrominoes = [...previous.tetrominoes];
        tetrominoes.unshift(randomTetromino());
        const key = previous.key + 1;
        return {
            collided: false,
            isFastDropping: false,
            position: { row: 0, column: 4 },
            tetrominoes,
            tetromino: tetrominoes.pop(),
            rotation: 0,
            key: key
        };
    } else {
        tetrominoes = Array(5)
        .fill(0)
        .map((_) => randomTetromino());

        return {
            collided: false,
            isFastDropping: false,
            position: { row: 0, column: 4 },
            tetrominoes,
            tetromino: tetrominoes.pop(),
            key: count,
            rotation: 0
        };
    }
    


};

export const usePlayer = () => {
    let count = 0

    const [player, setPlayer] = useState(buildPlayer(null, count));

    const resetPlayer = useCallback(() => {
        setPlayer((prev) => buildPlayer(prev));
    }, []);

    return [player, setPlayer, resetPlayer];
};