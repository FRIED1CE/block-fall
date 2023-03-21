import "./Tetris.css";

import { useEffect, useState } from "react";

import Board from "./Board";
import GameStatsRight from "./GameStatsLeft";
import GameStatsLeft from "./GameStatsRight"; 
import Previews from "./Previews";
import Hold from "./Hold";
import GameController from "./GameController";
import PauseMenu from "./PauseMenu";

import { useBoard } from "../hooks/useBoard";
import { useGameStats} from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";
import { useHold } from "../hooks/useHold";
import { usePause } from "../hooks/usePause";
import { useDropTime } from "../hooks/useDropTime";
import { useLocation } from "react-router-dom";


const Tetris = ({rows, columns, setGameOver, startLevel, rowLimit, maxTime, gameStats, addLinesCleared, time, setTime, highScore, controls, changeControls, resetControls, isSettings, setIsSettings, multiplayerControls, playerNumber }) => {

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

    const location = useLocation();

    const pageName = ((location.pathname).split("/")).pop();

    useEffect(() => {
        if (!pause) setIsSettings(false);
    },[pause])

    // useEffect(() => {
    //     if (pageName == "Multiplayer") setControls(...controls)
    // },[])



    return (

        <div className="Tetris">
            <Board board={board}/>
            <GameStatsLeft gameStats={gameStats} rowLimit={rowLimit} pause={pause} setGameOver={setGameOver} maxTime={maxTime} time={time} setTime={setTime} highScore={highScore} />
            <GameStatsRight gameStats={gameStats} rowLimit={rowLimit} pause={pause} setGameOver={setGameOver} maxTime={maxTime} time={time} setTime={setTime} highScore={highScore} />
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
                pageName={pageName}
                multiplayerControls={multiplayerControls}
                playerNumber={playerNumber}

            />
            {pause ? (
               <PauseMenu setGameOver={setGameOver} setPause={setPause} resumeDropTime={resumeDropTime} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} pause={pause} />
           ) : (
            <></>
           )} 
           {/* <FPSStats top={"85vh"} right={"48vw"} left={"auto"} /> */}
        </div>
        
    )
}

export default Tetris;
