import "./UserInterface.css";

import React, { useEffect } from "react";
import Settings from "./Settings";


const PauseMenu = ({ setPause, setGameOver, resumeDropTime, controls, changeControls, resetControls, isSettings, setIsSettings, pause }) =>{

    const Continue = () => {
        setPause(false);
        resumeDropTime();
    }
    const Quit = () => {
        setGameOver(true);
    }

    return (
        <div>
            {isSettings ? (
            <Settings controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} />
            ) : (
                <div className="pauseMenu">
                    <div className="pause-top">Paused</div>
                    <div className="pause-bottom">
                        <button onClick={Continue}>Continue</button>
                        <button onClick={() => setIsSettings(true)}>Controls</button>
                        <button onClick={Quit}>Quit</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PauseMenu;