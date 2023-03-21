import { Route, Routes } from "react-router-dom"; 
import { useState, useEffect } from "react";

import { useGameOver } from "../hooks/useGameOver";
import { useControls } from "../hooks/useControls";

import HomePage from "./HomePage";
import SinglePlayer from "./SinglePlayer";
import Marathon from "./Marathon";
import LeaderBoard from "./LeaderBoard";
import FortyLines from "./ForyLines";
import TwoMinute from "./TwoMinute";
import Master from "./Master";
import Multiplayer from "./Multiplayer";


const MainRoutes = ({ username }) => {    

    const [isMenu, setIsMenu] = useState(false);
    const [isSettings, setIsSettings] = useState(false)
    const [isShowLogin, setIsShowLogin] = useState(true);
    const [gameOver, setGameOver, resetGameOver] = useGameOver()
    const [controls, changeControls, resetControls, multiplayerControls] = useControls();

    const handleLoginClick = () => {
        setIsShowLogin((isShowLogin) => !isShowLogin);
    };


    const start = () => { 
        resetGameOver() 
    };

    return(
    <Routes>
        <Route path="/" element={<HomePage isMenu={isMenu} setIsMenu={setIsMenu} isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} handleLoginClick={handleLoginClick} username={username} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} gameOver={gameOver}/>}/>
        <Route path="/SinglePlayer">
            <Route index element={<SinglePlayer isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} handleLoginClick={handleLoginClick} username={username} />}/>
            <Route path="Marathon" element={<Marathon isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} handleLoginClick={handleLoginClick} username={username} rows={22} columns={10} gameOver={gameOver} setGameOver={setGameOver} start={start} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} playerNumber={1} />}/>
            <Route path="2Minute" element={<TwoMinute isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} handleLoginClick={handleLoginClick} username={username} rows={22} columns={10} maxTime={120} gameOver={gameOver} setGameOver={setGameOver} start={start} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} playerNumber={1} />}/>
            <Route path="40Lines" element={<FortyLines isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} handleLoginClick={handleLoginClick} username={username} rows={22} columns={10} rowLimit={40} gameOver={gameOver} setGameOver={setGameOver} start={start} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} playerNumber={1}/>}/>
            <Route path="Master" element={<Master isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} handleLoginClick={handleLoginClick} username={username} rows={22} columns={10} startLevel={10} gameOver={gameOver} setGameOver={setGameOver} start={start} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} playerNumber={1} />}/>
        </Route>
        <Route path="/Multiplayer" element={<Multiplayer isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} handleLoginClick={handleLoginClick} username={username} rows={22} columns={10} gameOver={gameOver} setGameOver={setGameOver} start={start} controls={controls} changeControls={changeControls} resetControls={resetControls} isSettings={isSettings} setIsSettings={setIsSettings} multiplayerControls={multiplayerControls} />}/>
        <Route path="/LeaderBoard" element={<LeaderBoard isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} handleLoginClick={handleLoginClick} username={username} />}/>
    </Routes>
    )
}

export default MainRoutes;