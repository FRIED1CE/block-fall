import "./Menu.css"
import React, { useEffect } from 'react'
import Navbar from "./Navbar"
import LoginForm from "./loginFrom"

import { addLeaderboardEntry } from "../firebase"
import { limit } from "firebase/firestore"


const Menu = ({gameStats, handleLoginClick, username, isShowLogin, setGameOver, time, pageName, highScore, start, setTime, startLevel, resetGameStats, maxTime, rowLimit }) => {

  let timer;

  const getTimeRemaining = (totalTime) => {
    const total = totalTime * 1000;
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    
    timer = (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
   }
  
   getTimeRemaining(time);

   var today = new Date(),
            date = (today.getDate() > 9 ? today.getDate() : '0' + today.getDate()) + '/' +
            ((today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1)) + '/'
            + (today.getFullYear() > 9 ? today.getFullYear() : '0' + today.getFullYear()),    
            currentTime = (today.getHours() > 9 ? today.getHours() : '0' + today.getHours()) + ':' +
            (today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes()) + ':'
            + (today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds())

   if (!rowLimit && (!highScore || highScore < gameStats.points) ) {
      addLeaderboardEntry(username, pageName, gameStats.points, date, currentTime);
    } else if ((rowLimit && gameStats.linesCompleted >= rowLimit) && (!highScore || highScore < time)) {
      addLeaderboardEntry(username, pageName, time, date, currentTime);
    }
 
  return (
    <div>
      <Navbar handleLoginClick={handleLoginClick} username={username}/>
      <LoginForm isShowLogin={isShowLogin} handleLoginClick={handleLoginClick} />
      <div className="Gamemode first menu">
        <h1>Final score</h1>
        <div className="points">
          {(pageName === "40Lines") ? (
              (gameStats.linesCompleted >= rowLimit) ? (
                timer
              ) : (
                <p>{rowLimit} lines not acheived</p>
              ) 
            ) : (
              (gameStats.points).toLocaleString("en-US")
            )}
        </div>
      </div>
      <div className="start-btn" onClick={() => {
        start()
        resetGameStats(startLevel);
        maxTime ? (setTime(maxTime)) : (setTime(0))
        }}>Play again</div>
    </div>
  )
}

export default Menu;