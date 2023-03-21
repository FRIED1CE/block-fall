import React, { useEffect } from "react"

import "./GameStats.css";

const GameStatsRight = ({ gameStats, rowLimit, startLevel, pause, setGameOver, maxTime, time, setTime, highScore }) => {

    const getTimeRemaining = (totalTime) => {
        const total = totalTime * 1000;
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        
        return (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
       }

    const { level, points, linesCompleted, linesPerLevel} = gameStats;

    return ( 
        <ul className="GameStats GameStats__right">
            <li>SCORE</li>
            <li className="value">{points.toLocaleString()}</li>
            <li>HIGH SCORE</li>
            <li className="value">{highScore ? ( rowLimit ? (getTimeRemaining(highScore)) : (highScore > points ? (highScore.toLocaleString()) : (points.toLocaleString()))) : (points)}</li>
        </ul>
    )
}

export default React.memo(GameStatsRight)