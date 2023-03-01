import { defaultCell} from "./Cell";
import { transferToBoard } from "./Tetrominoes";
import { movePlayer } from "./PlayerController";

export const buildBoard = ({ rows, columns }) => {
    // Create game board with rows and columns filled with defaultCell
    const builtRows = Array.from({ length: rows }, () => 
        Array.from({ length: columns }, () => ({ ...defaultCell }))
    );
    // Return board and its size
    return {
        rows: builtRows,
        size: { rows, columns }
    };
};

const findDropPosistion = ({ board, position, shape }) => {
    let max = board.size.rows - position.row + 1;
    let row = 0;

    for (let i =0; i < max; i++) {
        const delta = {row: i, column: 0};
        const result = movePlayer({ delta, position, shape, board });
        const { collided } = result;

        if (collided) {
            break;
        }

        row = position.row + i;
    }
    return { ...position, row };
}

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared, setGameOver, rowLimit, gameStats }) => {
    const { tetromino, position } = player;
    
    // copy and clear spaces used by pieces that
    // havent collided and occupied spaces permantly
    let rows = board.rows.map((row) => 
        row.map((cell) => (cell.occupied ? cell: { ...defaultCell}))
    );

    const dropPostition = findDropPosistion({
        board,
        position,
        shape: tetromino.shape
    });

    const className = `${tetromino.className} ${
        player.isFastDropping ? "" : "ghost"
    }`;

    // transfer player to the blank board
    rows = transferToBoard({
        className,
        isOccupied: player.isFastDropping,
        position: dropPostition,
        rows,
        shape: tetromino.shape
    });
    
    if (!player.isFastDropping) {
        rows = transferToBoard({
            className: tetromino.className,
            isOccupied: player.collided,
            position,
            rows,
            shape: tetromino.shape
        });
    
    }
    
    //check for cleared lines.
    const blankRow  = rows[0].map((_) => ({ ...defaultCell }));
    
    let linesCleared = 0;
    // Use the reduce method to find full rows and remove them.
    rows = rows.reduce((acc, row) => {
        // Check if every cell in the row is occupied
        if (row.every((column) => column.occupied)) {
            // If every cell is occupied, increase the count of cleared lines
            linesCleared++;
            // Add a new blank row to the beginning of the `acc` array
            acc.unshift([...blankRow]);
        } else {
            //If not all cells are occupied, add the row to the end of the `acc` array
            acc.push(row);
        }
        return acc;
    }, []);

    if (linesCleared > 0) {
        addLinesCleared(linesCleared);
    }

    // checking if the game could possibly end
    const isGameOver = (player.collided || player.isFastDropping) && player.position.row < 4;

    if (isGameOver) {
        const shape = player.tetromino.shape
        let position;
        if (player.isFastDropping){
            position = dropPostition;
        }else{
            position = player.position
        }
        

        // go through each part of the shape
        for (let y = 0; y < shape.length; y++) {
            const row = y + position.row;

            for (let x = 0; x < shape[y].length; x++) {
                // if the position is occupied and it is past the top
                if (shape[y][x] && row <= 1){
                    setGameOver(true)
                }
            }
        }
        resetPlayer();

    } else if (player.collided || player.isFastDropping) {
        resetPlayer()
    }
    

    //return the next board
    return {
        rows,
        size: { ...board.size }
    };
}

export const hasCollision = ({ board, position, shape }) => {
    for (let y = 0; y < shape.length; y++) {
        const row = y + position.row;
        // loop through the columns in the shape
        for (let x = 0; x < shape[y].length; x++) {
            // if the cell is not empty
            if (shape[y][x]) {
                const column = x + position.column;
                // check if the current cell on the board 
                // is occupied and within the board
                if (
                    board.rows[row] &&
                    board.rows[row][column] &&
                    board.rows[row][column].occupied
                ) {
                    // return true if there is a collision
                    return true;
                }
            }
        }
    }
    // return false if there is no collision
    return false;
}


export const isWithinBoard = ({ board, position, shape }) => {
    for (let y = 0; y < shape.length; y++) {
        // get the row index on the board
        const row = y + position.row;
         // loop through the columns in the shape
        for (let x = 0; x < shape[y].length; x++) {
            // if the cell is not empty
            if (shape[y][x]) {
                const column = x + position.column;
                 // check if the current cell is within the board
                const isValidPosition = board.rows[row] && board.rows[row][column];
                // return false if the cell is outside the board
                if (!isValidPosition ) return false;


            }
        }
    }
    // return true if the shape is within the board
    return true;
}


