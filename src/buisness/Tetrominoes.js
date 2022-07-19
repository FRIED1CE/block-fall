const className = "tetromino";

export const TETROMINOES = {
    I: {
      shape: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ],
      className: `${className} ${className}__i`
    },
    J: {
      shape: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
      ],
      className: `${className} ${className}__j`
    },
    L: {
      shape: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
      ],
      className: `${className} ${className}__l`
    },
    O: {
      shape: [
        [1, 1],
        [1, 1]
      ],
      className: `${className} ${className}__o`
    },
    S: {
      shape: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ],
      className: `${className} ${className}__s`
    },
    T: {
      shape: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
      ],
      className: `${className} ${className}__t`
    },
    Z: {
      shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ],
      className: `${className} ${className}__z`
    }
};

export const randomTetromino = () => {
    const keys = Object.keys(TETROMINOES);
    const index = Math.floor(Math.random() * keys.length);
    const key = keys[index];


    return TETROMINOES[key];

}

export const rotate = ({ piece, direction}) => {
    //transpose rows and columns
    const newPiece = piece.map((_, index) => 
        piece.map((column) => column[index])
    );

    //reverse rows to get rotated matrix
    if (direction > 0) return newPiece.map((row) => row.reverse());
    
    return newPiece.reverse();
}

export const resetShape = ({player}) => {
  if (player.tetromino.className.includes("__i")) {
    player.tetromino.shape = TETROMINOES.I.shape;
  }else if (player.tetromino.className.includes("__j")) {
    player.tetromino.shape = TETROMINOES.J.shape;
  }else if (player.tetromino.className.includes("__l")) {
    player.tetromino.shape = TETROMINOES.L.shape;
  }else if (player.tetromino.className.includes("__o")) {
    player.tetromino.shape = TETROMINOES.O.shape;
  }else if (player.tetromino.className.includes("__s")) {
    player.tetromino.shape = TETROMINOES.S.shape;
  }else if (player.tetromino.className.includes("__t")) {
    player.tetromino.shape = TETROMINOES.T.shape;
  }else if (player.tetromino.className.includes("__z")) {
    player.tetromino.shape = TETROMINOES.Z.shape;
  }
}

export const transferToBoard = ({
    className,
    isOccupied,
    position,
    rows,
    shape
}) => {
  shape.forEach((row,y) => {
        row.forEach((cell, x) => {
            if (cell) {
                const occupied = isOccupied;
                const _y = y + position.row;
                const _x = x + position.column;
                rows[_y][_x] = { occupied, className};
            };
        });
    });
    return rows;
};
