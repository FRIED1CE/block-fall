import { hasCollision, isWithinBoard } from "./Board"; 
import { TETROMINOES, offset } from "./Tetrominoes";


const attemptRotation = ({ board, player, setPlayer, direction }) => {
    let shape;
    let rotation;
    if (player.tetromino.type === "O") return;

    if (direction === 1) {
        player.rotation + 1 === 4
        ? (rotation = 0)
        : (rotation = player.rotation + 1);
    } else if (direction === -1) {
        player.rotation - 1 === -1
        ? (rotation = 3)
        : (rotation = player.rotation - 1);
    }
    if (player.tetromino.type === "I") {
        for (let x = 0; x < 5; x++) {
            shape = TETROMINOES["I"][rotation].shape;
            const delta = {
                row: offset.I[rotation][x][1], 
                column: offset.I[rotation][x][0]
            };
            const {collided, position} = kick({
                delta, 
                position: player.position, 
                shape, 
                board
            })
            if (!collided) { 
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
    } else {
        for (let x = 0; x < 5; x++) {
            shape = TETROMINOES[player.tetromino.type][rotation].shape;
            const delta = {
                row: offset.A[rotation][x][1], 
                column: offset.A[rotation][x][0]
            };
            const {collided, position} = kick({
                delta, 
                position: player.position, 
                shape, 
                board
            })
            if (!collided) {
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
    };

const kick = ({delta, position, shape, board}) => {
    // Store the desired position after applying the delta to the current position
    const desiredNextPosition = {
        row: position.row + delta.row,
        column: position.column + delta.column
    };
    // Check if there's a collision with the desired position
    const collided = hasCollision({
        board,
        position: desiredNextPosition,
        shape
    });
    // Check if the desired position is within the board
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

    // Store the desired position after applying the delta to the current position
    const desiredNextPosition = {
        row: position.row + delta.row,
        column: position.column + delta.column
    };
    // Check if there's a collision with the desired position
    const collided = hasCollision({
        board,
        position: desiredNextPosition,
        shape
    });
    // Check if the desired position is within the board
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
    key, 
    player, 
    setPlayer, 
    setGameOver,
    setLockDelay,
    resetDropTime,
    lockDelay,
    collided2,
    setNormalLockDelay,
    normalLockDelay,
    controls
}) => {
    const delta = { row:0, column:0 };
    let isFastDropping = false;

    if (key === controls["fastDrop"]) {
        isFastDropping = true;
    } else if (key === controls["slowDrop"]) {
        delta.row += 1;
    } else if (key === controls["left"]) {
        delta.column -= 1;
    } else if (key === controls["right"]) {
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

    if (collided2 && !preventMove && ((key === controls["right"]) || (key === controls["left"]) || (key === controls["rotateRight"]) || (key === controls["rotateLeft"])) && (lockDelay === false)) {
        resetDropTime(3000);
        setLockDelay(true);
    } else if (collided2 && preventMove && ((key === controls["right"]) || (key === controls["left"]) || (key === controls["rotateRight"]) || (key === controls["rotateLeft"])) && (lockDelay === true)) {
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
    setPlayer,
    previousHold, 
    setPreviousHold
}) => {
    // store the current hold key
    const holdKey = hold.key
    // check if the previous hold is the current player
    if (previousHold === player.key){
        return
    }else {
        setPreviousHold(hold.key);
        // create a temporary palyer set to the current hold 
        const playerTetromino = hold;
        swapHold(player);
        // set the current player to the old hold Tetromino
        player.tetrominoes[4] = playerTetromino;
        player.key = holdKey
    }

    setPlayer({
        collided: false,
        isFastDropping: false,
        position: { row: 0, column: 4 },
        tetrominoes: player.tetrominoes,
        tetromino: player.tetrominoes.pop(),
        rotation: 0,
        key: holdKey
    });
}

export const playerController = ({
    key,
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
    normalLockDelay,
    previousHold, 
    setPreviousHold,
    controls
}) => {
    if (!key) {
        return
    };

    if (key === controls["rotateLeft"]) {
        let direction = -1;
        attemptRotation({ board, player, setPlayer, direction});

    } else if (key === controls["rotateRight"]) {
        let direction = 1;
        attemptRotation({ board, player, setPlayer, direction});
    }else if (key === controls["hold"]) {
        if (hold.shape.length === 0) {
            swapHold(player);
            resetPlayer();
            setPreviousHold(0)

        } else {
            AttemptHold({
                hold,
                swapHold,
                player,
                setPlayer,
                previousHold, 
                setPreviousHold

                
            });

        }
    } else {
        attemptMovement({ board, 
            player, 
            setPlayer, 
            key, 
            setGameOver, 
            setLockDelay, 
            resetDropTime, 
            pauseDropTime, 
            lockDelay, 
            collided2, 
            setNormalLockDelay, 
            normalLockDelay,
            controls });
    }
}