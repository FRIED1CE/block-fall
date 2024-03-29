import "./Hold.css";

import React from "react";


import { buildBoard } from "../buisness/Board";
import { transferToBoard } from "../buisness/Tetrominoes";

import BoardCell from "./BoardCell";


const Hold = ({ hold }) => {
    
    const { shape, className } = hold;
   
    const board = buildBoard({ rows: 4, columns: 4 });


    // adds the tetrominoes to the render if there is shape
    // else an empty board is returned.
    board.rows = transferToBoard({
        className,
        IsOccupied: false,
        position: { row: 0, column: 0},
        rows: board.rows,
        shape
    });

    return (
        <div className="Hold" >
            <div className="hold-title">HOLD</div>
            <div className="Hold-board">
                {board.rows.map((row,y) => 
                    row.map((cell,x) => (
                        <BoardCell key={x * board.size.columns + x} cell={cell} />
                    ))
                )}
            </div>
        </div>
    );

};


export default React.memo(Hold);