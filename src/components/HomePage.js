import "./UserInterface.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "./images/blockfallLogo.png";
import Navbar from "./Navbar";
import LoginForm from "./loginFrom";
import Settings from "./Settings";

const HomePage = ({isMenu, setIsMenu,isShowLogin, handleLoginClick, username, controls, changeControls, resetControls, isSettings, setIsSettings, gameOver}) => {
    const handleUserKeyPressdown = event => {
        setIsMenu(true)
    }

    useEffect(() => {
        if (!isMenu){
            window.addEventListener("keydown", handleUserKeyPressdown)
            return () => {
                window.removeEventListener('keydown', handleUserKeyPressdown);
              };
        }
    },[])


    return (
        <div>
            {isMenu ? (
            <div className="UserInterface MainMenu"> 
                <Navbar handleLoginClick={handleLoginClick} username={username} />
                <LoginForm isShowLogin={isShowLogin} handleLoginClick={handleLoginClick} />
                <img src={logo} className="logo" alt="error" />
                <div className="UserInterface-Bottom fade">
                    <Link to="/SinglePlayer"><div>SinglePlayer</div></Link>
                    <Link to="/Multiplayer"><div>Multiplayer</div></Link>
                    <Link to="/Leaderboard"><div>Leaderboard</div></Link>
                    <div onClick={() => setIsSettings(true)}>Settings</div>
                </div>
                {isSettings ? ( <Settings username={username} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} gameOver={gameOver} />) : (<></>)}
            </div>
            ) : (
                <div>
                    <img src={logo} className="logo" alt="error" />
                    <p className="pulsate">press any button</p>
                </div>
            )}
        </div>

    )
}

export default HomePage;