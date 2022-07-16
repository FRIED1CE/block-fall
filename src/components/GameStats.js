import React from "react";

import "./GameStats.css";

const GameStats = ({ gameStats }) => {
    const { level, points, linesCompleted, linesPerLevel} = gameStats;
    const linesTolevel = linesPerLevel - linesCompleted;

    return (
        <ul className="GameStats GameStats__right">
            <li>Level</li>
            <li className="value">{level}</li>
            <li>LInes to level</li>
            <li className="value">{linesTolevel}</li>
            <li>Points</li>
            <li className="value">{points}</li>
        </ul>
    );
};

export default React.memo(GameStats);