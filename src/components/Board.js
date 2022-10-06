import BoardCell from "./BoardCell";
import "./Board.css";

const Board = ({ board }) => {
    
    const boardStyles = {
        gridTemplateRows: `repeat(${board.size.rows-2}, 1fr)`,
        gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
    };
    // let newBoard = board.rows.slice(2)

    // (newBoard)

    return (
        <div className="Board" style={boardStyles}>
            {board.rows.slice(2).map((row,y) => 
                row.map((cell,x) => (
                    <BoardCell key={x * board.size.columns + x} cell={cell} />
                ))
                )}
        </div>
    )
};

export default Board