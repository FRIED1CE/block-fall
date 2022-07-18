import { rotate } from "./Tetrominoes"
import { Action } from "./Input";
import { hasCollision, isWithinBoard } from "./Board"; 

const attemptRotation = ({ board, player, setPlayer }) => {
    const shape = rotate({
        piece: player.tetromino.shape,
        direction: 1
    });   

    const position = player.position;
    const isValidRotation = 
        isWithinBoard({ board, position, shape }) &&
        !hasCollision({ board, position, shape});

    if (isValidRotation) {
        setPlayer({
            ...player,
            tetromino: {
                ...player.tetromino,
                shape
            }
        });
    } else {
        return false;
    }

};

export const movePlayer = ({ delta, position, shape, board}) => {

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

    return { collided: isHit, nextPostion };
};

const attemptMovement = ({ 
    board, 
    action, 
    player, 
    setPlayer, 
    setGameOver 
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
    const { collided, nextPostion } = movePlayer({
        delta,
        position: player.position,
        shape: player.tetromino.shape,
        board
    });


    //collided immediately? game over.
    const isGameOver = collided && player.position.row === 0;
    if (isGameOver) {
        setGameOver(isGameOver);
    }

    setPlayer({
        ...player,
        collided,
        isFastDropping,
        position: nextPostion
    });
};


export const playerController = ({
    action,
    board,
    player,
    setPlayer,
    setGameOver,
    hold,
    swapHold,
    resetPlayer
}) => {
    if (!action) {
        return
    };

    if (action === Action.Rotate) {
        attemptRotation({ board, player, setPlayer });

    } else if (action === Action.Hold) {
        if (hold.shape.length === 0) {
            swapHold(player.tetromino);
            resetPlayer();
        } else {
            const playerTetromino = hold;
            swapHold(player.tetromino);
            player.tetrominoes[4] = playerTetromino;

            setPlayer({
                collided: false,
                isFastDropping: false,
                position: { row: 0, column: 4 },
                tetrominoes: player.tetrominoes,
                tetromino: player.tetrominoes.pop()
            });
        }
    } else {
        attemptMovement({ board, player, setPlayer, action, setGameOver });
    }
}