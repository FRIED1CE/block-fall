import "./UserInterface.css";

import Navbar from "./Navbar";
import LoginForm from "./loginFrom";
import Game from "./Game";
import LinkIcon from "./images/Link-Icon.png";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import { db, auth } from "../firebase";
import { getDoc, doc} from "firebase/firestore";
import { useEffect } from "react";



const Multiplayer = ({isShowLogin, handleLoginClick, username, rows, columns, gameOver, setGameOver, start, controls, changeControls, resetControls, isSettings, setIsSettings, multiplayerControls}) => {

    const [isBeforeGame, setIsBeforeGame] = useState(true)

    useEffect(() => {
        multiplayerControls();
    },[])
    // if the user is logged in

    return(
        isBeforeGame ? (     
        <div>
            <Navbar handleLoginClick={handleLoginClick} username={username}/>
            <LoginForm isShowLogin={isShowLogin} handleLoginClick={handleLoginClick} />
                <div className="Gamemode first">
                    <h1>Marathon</h1>
                    <p>Go for the most lines and the hightest score!</p>
                    <p>Send junk to your opponent to make them lose!</p>
                    <Link to="/LeaderBoard"><div className="Leaderboard"><img src={LinkIcon} alt="error" />LEADERBOARD</div></Link>
                </div>
                <div className="start-btn" onClick={()=> {
                    setIsBeforeGame(false);
                    start()
                }}>start</div>
        </div>
        ) : (
            <div className="Multiplayer">
                <Game rows={rows} columns={columns} gameOver={gameOver} setGameOver={setGameOver} isBeforeGame={isBeforeGame} setIsBeforeGame={setIsBeforeGame} handleLoginClick={handleLoginClick} username= {username} isShowLogin={isShowLogin} start={start} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} multiplayerControls={multiplayerControls} playerNumber={1}/>
                <Game rows={rows} columns={columns} gameOver={gameOver} setGameOver={setGameOver} isBeforeGame={isBeforeGame} setIsBeforeGame={setIsBeforeGame} handleLoginClick={handleLoginClick} username= {username} isShowLogin={isShowLogin} start={start} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} multiplayerControls={multiplayerControls} playerNumber={2}/>
            </div>
        )
    )
}

export default Multiplayer;