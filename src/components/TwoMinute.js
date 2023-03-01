import "./UserInterface.css";

import Navbar from "./Navbar";
import LoginForm from "./loginFrom";
import Game from "./Game";
import LinkIcon from "./images/Link-Icon.png";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import { db, auth } from "../firebase";
import { getDoc, doc} from "firebase/firestore";



const TwoMinute = ({isShowLogin, handleLoginClick, username, rows, columns, maxTime, gameOver, setGameOver, start, controls, changeControls, resetControls, isSettings, setIsSettings}) => {
    const [isBeforeGame, setIsBeforeGame] = useState(true)
    const [highScore, setHighScore] = useState("")

    const location = useLocation();

    const pageName = ((location.pathname).split("/")).pop();

    if (username) {

        getDoc(doc(db, pageName, auth.currentUser.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setHighScore(docSnap.data()["score"].toLocaleString())
            }
        })
    };

    return(
        isBeforeGame ? (     
        <div>
            <Navbar handleLoginClick={handleLoginClick} username={username}/>
            <LoginForm isShowLogin={isShowLogin} handleLoginClick={handleLoginClick} />
                <div className="Gamemode first">
                    <h1>2 Minute</h1>
                    <p>Get as many points as possbile within 2 minutes!</p>
                    <p>Clear lines to level up and gain more points and speed!</p>
                    <br></br>
                    <p><b>PERSONAL BEST : {highScore}</b></p>
                    <Link to="/LeaderBoard"><div className="Leaderboard"><img src={LinkIcon} alt="error" />LEADERBOARD</div></Link>
                </div>
                <div className="start-btn" onClick={()=> {
                    setIsBeforeGame(false);
                    start()
                }}>start</div>
        </div>
        ) : (
            <Game rows={rows} columns={columns} maxTime={maxTime} gameOver={gameOver} setGameOver={setGameOver} isBeforeGame={isBeforeGame} setIsBeforeGame={setIsBeforeGame} handleLoginClick={handleLoginClick} username= {username} isShowLogin={isShowLogin} start={start} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings}/>
        )
    )
}

export default TwoMinute;