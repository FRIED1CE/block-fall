import BoardCell from "./BoardCell";
import "./Board.css";

const Board = ({ board }) => {
    
// create an object to hold the grid-template-rows 
// and grid-template-columns CSS styles for the board
    const boardStyles = {
        gridTemplateRows: `repeat(${board.size.rows-2}, 1fr)`,
        gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
    };

// render the board as a div with a className of 
// "Board" and the calculated styles
    return (
        <div className="board-container">
            <div className="Board" style={boardStyles}>
                {board.rows.slice(2).map((row,y) => 
                    row.map((cell,x) => (
    // render each cell of the board as a BoardCell 
    // component, passing the cell data as a prop
                        <BoardCell key={x * board.size.columns + x} cell={cell} />
                    ))
                    )}
            </div>
            <div className="barrier"><></></div>
        </div>
    )
};

export default Board

