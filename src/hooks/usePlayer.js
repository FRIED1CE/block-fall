import { useState, useCallback } from "react";

import { randomTetromino } from "../buisness/Tetrominoes"

const buildPlayer = (previous, count, setCount) => {
    let tetrominoes;

    // if this isn't the first render (previous values found)
    if (previous) {
        // store the previous tetrominoes.
        tetrominoes = [...previous.tetrominoes];
        // adds a random tetromino to the beginning of the array
        tetrominoes.unshift(randomTetromino());
        // increment count of total Tetrominoes
        setCount(count + 1)

        return {
            collided: false,
            isFastDropping: false,
            // start in the middle of the board
            position: { row: 0, column: 4 },
            tetrominoes,
            // remove the last Tetromino and use it as the player tetromino
            tetromino: tetrominoes.pop(),
            rotation: 0,
            key: count
        };
    // if its the first render (no previous values)
    } else {
        // created an array filled with random tetrominoes ( multiple for previews )
        tetrominoes = Array(5)
        .fill(0)
        .map((_) => randomTetromino());

        return {
            collided: false,
            isFastDropping: false,
            // start in the middle of the board
            position: { row: 0, column: 4 },
            tetrominoes,
            // remove the last Tetromino and use it as the player tetromino
            tetromino: tetrominoes.pop(),
            key: 0,
            rotation: 0
        };
    }
    


};

export const usePlayer = () => {
    const [count, setCount] = useState(0)

    const [player, setPlayer] = useState(buildPlayer(null, count));

    const resetPlayer = useCallback(() => {
        setPlayer((prev) => buildPlayer(prev, count, setCount));
    }, [count, setCount]);

    return [player, setPlayer, resetPlayer];
};


