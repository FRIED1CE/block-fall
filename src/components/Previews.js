import "./Preview.css";

import React from "react";


import Preview from "./Preview";

const Previews = ({ tetrominoes }) => {
    // remove the last Tetromino (the player)
    const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();

    return ( 
        <div className="preview-container">
            <div className="preview-title">NEXT</div>
            {previewTetrominoes.map((tetromino, index) => (
                <Preview tetromino={tetromino} index={index} key={index} />
        ))}
        </div>
    );
};

export default React.memo(Previews);