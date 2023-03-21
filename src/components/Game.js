import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { useGameStats } from "../hooks/useGameStats";

import { db, auth } from "../firebase";

import { doc, getDoc } from "firebase/firestore";

import Menu from "./Menu"
import Tetris from "./Tetris"

const Game = ({ rows, columns, maxTime, startLevel, rowLimit, gameOver, setGameOver, isBeforeGame, setIsBeforeGame, handleLoginClick, username, isShowLogin, start, controls, changeControls, resetControls, isSettings, setIsSettings, multiplayerControls, playerNumber }) => {

    const [gameStats, resetGameStats, addLinesCleared] = useGameStats(startLevel);

    const isMaxTime = (maxTime) => {
        if (maxTime) return maxTime;
        else return 0
    }

    const [time, setTime] = useState(isMaxTime(maxTime))

    const [highScore, setHighScore] = useState("")

    const location = useLocation();

    const pageName = ((location.pathname).split("/")).pop();

    if (username & pageName != "Multiplayer") {

        getDoc(doc(db, pageName, auth.currentUser.uid)).then(docSnap => {
            if (docSnap.exists()) {

                setHighScore(docSnap.data()["score"])
            }
        })
    };


    return (
        <div className="Game">
           {gameOver ? (
               <Menu gameStats={gameStats} handleLoginClick={handleLoginClick} username= {username} isShowLogin={isShowLogin} setGameOver={setGameOver} time={time} pageName={pageName} highScore={highScore} start={start} setTime={setTime} startLevel={startLevel} resetGameStats={resetGameStats} maxTime={maxTime} rowLimit={rowLimit} />
           ) : (
            <Tetris rows={rows} columns={columns} setGameOver={setGameOver} startLevel={startLevel} maxTime={maxTime} rowLimit={rowLimit} gameStats={gameStats} addLinesCleared={addLinesCleared} time={time} setTime={setTime} highScore={highScore} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} multiplayerControls={multiplayerControls} playerNumber={playerNumber}/>
           )} 
            
        </div>
    );
};

export default Game;
