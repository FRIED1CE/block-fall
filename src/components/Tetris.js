import "./Tetris.css";

import Board from "./Board";
import GameStats from "./GameStats";
import Previews from "./Previews";
import Hold from "./Hold";
import GameController from "./GameController";

import { useBoard } from "../hooks/useBoard";
import { useGameStats} from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";
import { useHold } from "../hooks/useHold";

const Tetris = ({rows, columns, setGameOver}) => {


    
    const [gameStats, addLinesCleared] = useGameStats();
    const [player, setPlayer, resetPlayer] = usePlayer();
    const [board, setBoard] = useBoard({
         rows, 
         columns,
         player,
         resetPlayer,
         addLinesCleared,
         setGameOver
    });

    const { hold, setHold, swapHold } = useHold();

    return (
        <div className="Tetris">
            <Board board={board}/>
            <GameStats gameStats={gameStats} />
            <Previews tetrominoes={player.tetrominoes} />
            <Hold 
                hold={hold}
            />
            <GameController
                board={board}
                gameStats={gameStats}
                player={player}
                setGameOver={setGameOver}
                setPlayer={setPlayer}
                resetPlayer={resetPlayer}
                swapHold={swapHold}
                hold={hold}
            />
        </div>
    )
}

export default Tetris;
