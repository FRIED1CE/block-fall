import React, { useEffect, useState } from "react";

import "./GameStats.css";

import Timer from "./Timer";

const GameStatsLeft = ({ gameStats, rowLimit, startLevel, pause, setGameOver, maxTime, time, setTime, highScore }) => {

    const { level, points, linesCompleted, linesPerLevel} = gameStats;

// render each stats in "gameStats" as a list
    return (
        <ul className="GameStats GameStats__left">
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
    );
}

export default React.memo(GameStatsLeft);