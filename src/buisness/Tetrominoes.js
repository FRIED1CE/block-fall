const className = "tetromino";

export const TETROMINOES = {
  I: [
    {
      shape: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      className: `${className} ${className}__i`,
      type : "I"
    }, 
    {
      shape: [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ],
      className: `${className} ${className}__i`,
      type : "I"
    },
    {
      shape: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
      ],
      className: `${className} ${className}__i`,
      type : "I"
    },  
    {
        shape: [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0]
        ],
        className: `${className} ${className}__i`,
        type : "I"
      }
      
  ],

  J: [
    {
      shape: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
      ],
      className: `${className} ${className}__j`,
      type : "J"
    },
    {
      shape: [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
      ],
      className: `${className} ${className}__j`,
      type : "J"
    },
    {
      shape: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
      ],
      className: `${className} ${className}__j`,
      type : "J"
    },
    {
      shape: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
      ],
      className: `${className} ${className}__j`,
      type : "J"
    }
],
  L: [
    {
      shape: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
      ],
      className: `${className} ${className}__l`,
      type : "L"
    },
    {
      shape: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
      ],
      className: `${className} ${className}__l`,
      type : "L"
    },
    {
      shape: [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
      ],
      className: `${className} ${className}__l`,
      type : "L"
    },
    {
      shape: [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
      ],
      className: `${className} ${className}__l`,
      type : "L"
    }
  ],
  O: [
    {
      shape: [
        [1, 1],
        [1, 1]
      ],
      className: `${className} ${className}__o`,
      type : "O"
    },
  ],
  S: [
    {
      shape: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ],
      className: `${className} ${className}__s`,
      type : "S"
    },
    {
      shape: [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
      ],
      className: `${className} ${className}__s`,
      type : "S"
    },
    {
      shape: [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
      ],
      className: `${className} ${className}__s`,
      type : "S"
    },
    {
      shape: [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
      ],
      className: `${className} ${className}__s`,
      type : "S"
    },
  ],
  T:[ 
    {
      shape: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
      ],
      className: `${className} ${className}__t`,
      type : "T"
    },
    {
      shape: [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
      ],
      className: `${className} ${className}__t`,
      type : "T"
    },
    {
      shape: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ],
      className: `${className} ${className}__t`,
      type : "T"
    },
    {
      shape: [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
      ],
      className: `${className} ${className}__t`,
      type : "T"
    }
  ],

  Z: [
    {
      shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ],
      className: `${className} ${className}__z`,
      type : "Z"
    },
    {
      shape: [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
      ],
      className: `${className} ${className}__z`,
      type : "Z"
    },
    {
      shape: [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
      ],
      className: `${className} ${className}__z`,
      type : "Z"
    },
    {
      shape: [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
      ],
      className: `${className} ${className}__z`,
      type : "Z"
    },
  ]
};


export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  
  return TETROMINOES[key][0];
}

export const offset = {
  A: {
    one: [
      [0,0],[-1,0],[-1,1],[0,-2],[-1,-2]
    ],
    
    two: [
      [0,0],[1,0],[1,-1],[0,2],[1,2]
    ],

    three: [
      [0,0],[1,0],[1,1],[0,-2],[1,-2]
    ],

    four: [
      [0,0],[-1,0],[-1,-1],[0,2],[-1,2]
    ]
  },
  
  I: {
    one: [
      [0,0],[-1,0],[-1,1],[0,-2],[-1,-2]
    ],
    
    two: [
      [0,0],[-1,0],[2,0],[-1,2],[2,-1]
    ],

    three: [
      [0,0],[1,0],[1,1],[0,-2],[1,-2]
    ],

    four: [
      [0,0],[1,0],[-2,0],[1,-2],[-2,1]
    ]
  }
  
}





export const resetShape = ({player}) => {
  if (player.tetromino.className.includes("__i")) {
    player.tetromino.shape = TETROMINOES.I[0].shape;
  }else if (player.tetromino.className.includes("__j")) {
    player.tetromino.shape = TETROMINOES.J[0].shape;
  }else if (player.tetromino.className.includes("__l")) {
    player.tetromino.shape = TETROMINOES.L[0].shape;
  }else if (player.tetromino.className.includes("__o")) {
    player.tetromino.shape = TETROMINOES.O[0].shape;
  }else if (player.tetromino.className.includes("__s")) {
    player.tetromino.shape = TETROMINOES.S[0].shape;
  }else if (player.tetromino.className.includes("__t")) {
    player.tetromino.shape = TETROMINOES.T[0].shape;
  }else if (player.tetromino.className.includes("__z")) {
    player.tetromino.shape = TETROMINOES.Z[0].shape;
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
