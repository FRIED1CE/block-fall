import "./UserInterface.css";

import Navbar from "./Navbar";
import LoginForm from "./loginFrom";
import Game from "./Game";
import LinkIcon from "./images/Link-Icon.png";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import { db, auth } from "../firebase";
import { getDoc, doc} from "firebase/firestore";


const FortyLines = ({isShowLogin, handleLoginClick, username, rows, columns, rowLimit, gameOver, setGameOver, start, controls, changeControls, resetControls, isSettings, setIsSettings, playerNumber}) => {
    const [isBeforeGame, setIsBeforeGame] = useState(true)
    
    const [highScore, setHighScore] = useState("")

    const location = useLocation();

    const pageName = ((location.pathname).split("/")).pop();

    if (username) {

        getDoc(doc(db, pageName, auth.currentUser.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setHighScore(docSnap.data()["score"])
            }
        })
    };
    const getTimeRemaining = (totalTime) => {
        const total = totalTime * 1000;
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        
        return (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
       }

    return(
        isBeforeGame ? (     
        <div>
            <Navbar handleLoginClick={handleLoginClick} username={username}/>
            <LoginForm isShowLogin={isShowLogin} handleLoginClick={handleLoginClick} />
                <div className="Gamemode first">
                    <h1>40 Lines</h1>
                    <p>Clear 40 lines in the shortest amount of time possible!</p>
                    <p>Score doesn't matter here, so just focus on clearing lines!</p>
                    <br></br>
                    <p><b>PERSONAL BEST : {getTimeRemaining(highScore)}</b></p>
                    <Link to="/LeaderBoard"><div className="Leaderboard"><img src={LinkIcon} alt="error" />LEADERBOARD</div></Link>
                </div>
                <div className="start-btn" onClick={()=> {
                    setIsBeforeGame(false);
                    start()
                }}>start</div>
        </div>
        ) : (
            <Game rows={rows} columns={columns} rowLimit={rowLimit} gameOver={gameOver} setGameOver={setGameOver} isBeforeGame={isBeforeGame} setIsBeforeGame={setIsBeforeGame} handleLoginClick={handleLoginClick} username= {username} isShowLogin={isShowLogin} start={start} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} playerNumber={playerNumber} />
        )
    )
}

export default FortyLines;