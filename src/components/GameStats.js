import React, { useEffect, useState } from "react";

import "./GameStats.css";

import Timer from "./Timer";

const GameStats = ({ gameStats, rowLimit, startLevel, pause, setGameOver, maxTime, time, setTime, highScore }) => {

    const getTimeRemaining = (totalTime) => {
        const total = totalTime * 1000;
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        
        return (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
       }

    const { level, points, linesCompleted, linesPerLevel} = gameStats;
// work out the lines to the next level
    const linesTolevel = linesPerLevel - linesCompleted;

    useEffect(() => {
        highScore > points ? (console.log(highScore)) : (console.log(points))
    },[points])
// render each stats in "gameStats" as a list
    return (
        <div>
            <ul className="GameStats GameStats__right">
                <li>LEVEL</li>
                <li className="value">{level}</li>
                <li>LINES</li>
                {rowLimit ? (
                <li className="value">{linesCompleted}/{rowLimit}</li>
                ) : (
                <li className="value">{linesCompleted}</li>
                )}
                <li>TIME</li>
                <li><Timer pause={pause} setGameOver={setGameOver} maxTime={maxTime} time={time} setTime={setTime} /></li>
            </ul>
            <ul className="GameStats GameStats__left">
                <li>SCORE</li>
                <li className="value">{points.toLocaleString()}</li>
                <li>HIGH SCORE</li>
                <li className="value">{highScore ? ( rowLimit ? (getTimeRemaining(highScore)) : (highScore > points ? (highScore.toLocaleString()) : (points.toLocaleString()))) : (points)}</li>
            </ul>
        </div>
    );
}

export default React.memo(GameStats);