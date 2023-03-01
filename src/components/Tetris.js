import "./Tetris.css";

import { useEffect, useState } from "react";

import Board from "./Board";
import GameStats from "./GameStats";
import Previews from "./Previews";
import Hold from "./Hold";
import GameController from "./GameController";
import PauseMenu from "./PauseMenu";
import Timer from "./Timer";

import { useBoard } from "../hooks/useBoard";
import { useGameStats} from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";
import { useHold } from "../hooks/useHold";
import { usePause } from "../hooks/usePause";
import { useDropTime } from "../hooks/useDropTime";


const Tetris = ({rows, columns, setGameOver, startLevel, rowLimit, maxTime, gameStats, addLinesCleared, time, setTime, highScore, controls, changeControls, resetControls, isSettings, setIsSettings }) => {

    const [pause, setPause, resetPause ] = usePause();
    const [player, setPlayer, resetPlayer] = usePlayer();
    const [board, setBoard] = useBoard({
         rows, 
         columns,
         player,
         resetPlayer,
         addLinesCleared,
         setGameOver,
         rowLimit,
         gameStats
    });

    const [dropTime, pauseDropTime, resumeDropTime, resetDropTime] = useDropTime({
        gameStats
    });


    const { hold, swapHold } = useHold();
    
    const [ gameTime, setGameTime ] = useState(1);

    useEffect(() => {
        if (!pause) setIsSettings(false);
    },[pause])

    return (
        <div className="Tetris">
            <Board board={board}/>
            <GameStats gameStats={gameStats} rowLimit={rowLimit} pause={pause} setGameOver={setGameOver} maxTime={maxTime} time={time} setTime={setTime} highScore={highScore} />
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
                setPause={setPause}
                pause={pause}
                pauseDropTime={pauseDropTime} 
                dropTime={dropTime} 
                resumeDropTime={resumeDropTime} 
                resetDropTime={resetDropTime}
                rowLimit={rowLimit}
                gameTime={gameTime} 
                setGameTime={setGameTime}
                controls={controls}

            />
            {pause ? (
               <PauseMenu setGameOver={setGameOver} setPause={setPause} resumeDropTime={resumeDropTime} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} pause={pause} />
           ) : (
            <></>
           )} 
        </div>
        
    )
}

export default Tetris;
