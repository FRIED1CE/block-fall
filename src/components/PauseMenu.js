import "./UserInterface.css";

import React from "react";


const PauseMenu = ({ setPause, setGameOver, resumeDropTime }) =>{

    const Continue = () => {
        setPause(false);
        resumeDropTime();
    }
    const Quit = () => {
        setGameOver(true);
    }

    return (
        <div className="pauseMenu">
            <div className="pause-top">Paused</div>
            <div className="pause-bottom">
                <button onClick={Continue}>Continue</button>
                <button >Controls</button>
                <button onClick={Quit}>Quit</button>
            </div>
        </div>
    )
}

export default PauseMenu;