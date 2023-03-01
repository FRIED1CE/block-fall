import "./UserInterface.css";

import Navbar from "./Navbar";
import LoginForm from "./loginFrom";
import { useLocation } from "react-router-dom";
import { getDocs, doc, collection } from "firebase/firestore";
import { db } from "../firebase";
import React, { useState, useEffect } from "react";
import { async } from "@firebase/util";



const LeaderBoard = ({isShowLogin, handleLoginClick, username}) => {

    const [leaderBoardVal, setLeaderBoardVal] = useState(null) 
    const [isActive, setIsActive] = useState("Marathon")


    useEffect(() => { 
        let arr = [];
        const fetchData = async() => {
            const colRef = collection(db, isActive);
            const docsSnap = await getDocs(colRef);
            // go through each user entry and add it to array
            docsSnap.forEach(doc => {
                arr.push(doc.data())
            })
            // sort the array accoring to score
            arr.sort(function(a,b) {
                return b.score - a.score
            });
            // set the leaderboard value the created array
            setLeaderBoardVal(arr);
        }
        fetchData()
    }, [isActive])


    const getTimeRemaining = (totalTime) => {
        const total = totalTime * 1000;
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        
        return (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
       }

    return(
        <div className="scroll">
            <Navbar handleLoginClick={handleLoginClick} username={username}/>
            <LoginForm isShowLogin={isShowLogin} handleLoginClick={handleLoginClick} />
            <div className="Gamemode first">
                    <h1>Leaderboards</h1>
                    <div className="leaderboard-btn-container">
                        <div className={`${(isActive==="Marathon") ? "active" : ""} leaderboard-btn`} onClick={()=> {
                            setIsActive("Marathon")} }>Marathon</div>
                        <div className={`${(isActive==="40Lines") ? "active" : ""} leaderboard-btn`} onClick={()=> {
                            setIsActive("40Lines")} }>40 Lines</div>
                        <div className={`${(isActive==="2Minute") ? "active" : ""} leaderboard-btn`} onClick={()=> {
                            setIsActive("2Minute")} }>2 Minute</div>
                        <div className={`${(isActive==="Master") ? "active" : ""} leaderboard-btn`} onClick={()=> {
                            setIsActive("Master")} }>Master</div>
                    </div>
                </div>
                <div>
                    {leaderBoardVal ? (leaderBoardVal.map((entry, y) => (
                        <div className="leaderboard-entry" key={y}>
                            <div className="leaderboard-num">
                                <h1>{y + 1}</h1>
                            </div>
                            <div className="leaderboard-name">
                                <h1>{entry.username}</h1>
                                <p>{entry.date}, {entry.time}</p>
                            </div>
                            {(isActive === "40Lines") ? (
                                <div className="leaderboard-score2">
                                    <h1>{getTimeRemaining(entry.score)}</h1>
                                </div>
                            ) : (
                                <div className="leaderboard-score">
                                    <h1>{(entry.score)}</h1>
                                </div>
                            )}
                        </div>
                    ))) : (
                    <></>
                    )
                    }
                </div>

        </div>
    )
}

export default LeaderBoard;