import {useEffect, useState} from "react";

import { Action } from "./Input";
import { hasCollision, isWithinBoard } from "./Board"; 
import { TETROMINOES, offset } from "./Tetrominoes";


const attemptRotation = ({ board, player, setPlayer }) => {
    let shape;
    let rotation;
    if (player.tetromino.type === "O"){
        return;
    }
    if (player.tetromino.type === "I") {
        if (player.rotation === 0){
            for (let x = 0; x < 5; x++) {
                shape = TETROMINOES[player.tetromino.type][1].shape;
                const delta = {row: offset.I.one[x][1], column: offset.I.one[x][0]};
                const {collided, position} = kick({
                    delta, 
                    position: player.position, 
                    shape, 
                    board
                })
                if (!collided) { 
                    rotation = player.rotation + 1; 
                    setPlayer({
                        ...player,
                        rotation,
                        position,
                        tetromino: {
                            ...player.tetromino,
                            shape
                        }
                    });
                    return;
                }
            }
        }else if (player.rotation === 1){
            for (let x = 0; x < 5; x++) {
                shape = TETROMINOES[player.tetromino.type][2].shape;
                const delta = {row: offset.I.two[x][1], column: offset.I.two[x][0]};
                const {collided, position} = kick({
                    delta, 
                    position:player.position, 
                    shape, 
                    board
                })
                if (!collided) {  
                    rotation = player.rotation + 1;
                    setPlayer({
                        ...player,
                        rotation,
                        position,
                        tetromino: {
                            ...player.tetromino,
                            shape
                        }
                    });
                    return;
                }
            }
        }else if (player.rotation === 2){
            for (let x = 0; x < 5; x++) {
                shape = TETROMINOES[player.tetromino.type][3].shape;
                const delta = {row: offset.I.three[x][1], column: offset.I.three[x][0]};
                const {collided, position} = kick({
                    delta, 
                    position:player.position, 
                    shape, 
                    board
                })
                if (!collided) {  
                    rotation = player.rotation + 1;
                    setPlayer({
                        ...player,
                        rotation,
                        position,
                        tetromino: {
                            ...player.tetromino,
                            shape
                        }
                    });
                    return;
                }
            }
        }else if (player.rotation === 3){
            for (let x = 0; x < 5; x++) {
                shape = TETROMINOES[player.tetromino.type][0].shape;
                const delta = {row: offset.I.four[x][1], column: offset.I.four[x][0]};
                const {collided, position} = kick({
                    delta, 
                    position: player.position, 
                    shape, 
                    board
                })
                if (!collided) {  
                    rotation = 0;
                    setPlayer({
                        ...player,
                        rotation,
                        position,
                        tetromino: {
                            ...player.tetromino,
                            shape
                        }
                    });
                    return;
                }
            }
        }
    }else {
        if (player.rotation === 0){
            for (let x = 0; x < 5; x++) {
                shape = TETROMINOES[player.tetromino.type][1].shape;
                const delta = {row: offset.A.one[x][1], column: offset.A.one[x][0]};
                const {collided, position} = kick({
                    delta, 
                    position:player.position, 
                    shape, 
                    board
                })
                if (!collided) { 
                    rotation = player.rotation + 1; 
                    setPlayer({
                        ...player,
                        rotation,
                        position,
                        tetromino: {
                            ...player.tetromino,
                            shape
                        }
                    });
                    return;
                }
            }
        }else if (player.rotation === 1){
            for (let x = 0; x < 5; x++) {
                shape = TETROMINOES[player.tetromino.type][2].shape;
                const delta = {row: offset.A.two[x][1], column: offset.A.two[x][0]};
                const {collided, position} = kick({
                    delta, 
                    position:player.position, 
                    shape, 
                    board
                })
                if (!collided) {  
                    rotation = player.rotation + 1;
                    setPlayer({
                        ...player,
                        rotation,
                        position,
                        tetromino: {
                            ...player.tetromino,
                            shape
                        }
                    });
                    return;
                }
            }
        }else if (player.rotation === 2){
            for (let x = 0; x < 5; x++) {
                shape = TETROMINOES[player.tetromino.type][3].shape;
                const delta = {row: offset.A.three[x][1], column: offset.A.three[x][0]};
                const {collided, position} = kick({
                    delta, 
                    position:player.position, 
                    shape, 
                    board
                })
                if (!collided) {  
                    rotation = player.rotation + 1;
                    setPlayer({
                        ...player,
                        rotation,
                        position,
                        tetromino: {
                            ...player.tetromino,
                            shape
                        }
                    });
                    return;
                }
            }
        }else if (player.rotation === 3){
            for (let x = 0; x < 5; x++) {
                shape = TETROMINOES[player.tetromino.type][0].shape;
                const delta = {row: offset.A.four[x][1], column: offset.A.four[x][0]};
                const {collided, position} = kick({
                    delta, 
                    position: player.position, 
                    shape, 
                    board
                })
                if (!collided) {  
                    rotation = 0;
                    setPlayer({
                        ...player,
                        rotation,
                        position,
                        tetromino: {
                            ...player.tetromino,
                            shape
                        }
                    });
                    return;
                }
            }
        }
    }
    


    return false;
};

const kick = ({delta, position, shape, board}) => {
    const desiredNextPosition = {
        row: position.row + delta.row,
        column: position.column + delta.column
    };
    const collided = hasCollision({
        board,
        position: desiredNextPosition,
        shape
    });

    const isOnBoard = isWithinBoard({
        board,
        position: desiredNextPosition,
        shape
    });


    const preventMove = !isOnBoard || (isOnBoard && collided);
    const nextPostion = preventMove ? position: desiredNextPosition;

    return {collided: preventMove, position: nextPostion};
}

export const movePlayer = ({ delta, position, shape, board, setGameOver}) => {

    const desiredNextPosition = {
        row: position.row + delta.row,
        column: position.column + delta.column
    };

    const collided = hasCollision({
        board,
        position: desiredNextPosition,
        shape
    });

    const isOnBoard = isWithinBoard({
        board,
        position: desiredNextPosition,
        shape
    });

    const preventMove = !isOnBoard || (isOnBoard && collided);
    const nextPostion = preventMove ? position: desiredNextPosition;

    const isMovingDown = delta.row > 0;
    const isHit = isMovingDown && (collided || !isOnBoard)

    return { collided: isHit, nextPostion, preventMove};
};



export const nextMove = ({
    board, 
    player,
    setGameOver
}) => {
    const delta = {row: 1, column: 0}
    const { collided, nextPostion } = movePlayer({
        delta,
        position: player.position,
        shape: player.tetromino.shape,
        board
    });
    const collided2 = collided;
    return {collided, collided2}
}

const attemptMovement = ({ 
    board, 
    action, 
    player, 
    setPlayer, 
    setGameOver,
    setLockDelay,
    resetDropTime,
    lockDelay,
    collided2,
    setNormalLockDelay,
    normalLockDelay
}) => {
    const delta = { row:0, column:0 };
    let isFastDropping = false;

    if (action === Action.FastDrop) {
        isFastDropping = true;
    } else if (action === Action.SlowDrop) {
        delta.row += 1;
    } else if (action === Action.Left) {
        delta.column -= 1;
    } else if (action === Action.Right) {
        delta.column += 1;
    }
    const { collided, nextPostion, preventMove } = movePlayer({
        delta,
        position: player.position,
        shape: player.tetromino.shape,
        board
    });


    //collided immediately? game over.
    const isGameOver = collided && player.position.row < 4;


    if(isGameOver){

        const shape = player.tetromino.shape
        const position = player.position
        for (let y = 0; y < shape.length; y++) {
            const row = y + position.row;
    
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    if (row === 0){
                        setGameOver(true)
                    }
                }
            }
        }
    }
    if (collided) {
        setLockDelay(false);
        setNormalLockDelay(false);
        resetDropTime();
    }

    if (collided2 && (normalLockDelay === false)) {
        resetDropTime(500);
        setNormalLockDelay(true);

        return;
    }

    if (collided2 && !preventMove && ((action === Action.Right) || (action === Action.Left) || (action === Action.Rotate)) && (lockDelay === false)) {
        resetDropTime(3000);
        setLockDelay(true);
    } else if (collided2 && preventMove && ((action === Action.Right) || (action === Action.Left) || (action === Action.Rotate)) && (lockDelay === true)) {
        setLockDelay(false);
        resetDropTime();
    }

    setPlayer({
        ...player,
        collided,
        isFastDropping,
        position: nextPostion
    });
};


const AttemptHold = ({
    hold,
    swapHold,
    player,
    setPlayer
}) => {
    let previousHold;

    if (previousHold === player.key){
        return
    }else {
        previousHold = hold.key;
        const playerTetromino = hold;
        swapHold(player);
        player.tetrominoes[4] = playerTetromino;
    }

    setPlayer({
        collided: false,
        isFastDropping: false,
        position: { row: 0, column: 4 },
        tetrominoes: player.tetrominoes,
        tetromino: player.tetrominoes.pop(),
        rotation: 0
    });
}

export const playerController = ({
    action,
    board,
    player,
    setPlayer,
    setGameOver,
    hold,
    swapHold,
    resetPlayer,
    setLockDelay,
    resetDropTime,
    pauseDropTime,
    lockDelay,
    collided2,
    setNormalLockDelay,
    normalLockDelay
}) => {
    
    if (!action) {
        return
    };

    if (action === Action.Rotate) {
        attemptRotation({ board, player, setPlayer });

    } else if (action === Action.Hold) {
        if (hold.shape.length === 0) {
            swapHold(player);
            resetPlayer();

        } else {
            AttemptHold({
                hold,
                swapHold,
                player,
                setPlayer,
            });

        }
    } else {
        attemptMovement({ board, player, setPlayer, action, setGameOver, setLockDelay, resetDropTime, pauseDropTime, lockDelay, collided2, setNormalLockDelay, normalLockDelay });
    }
}