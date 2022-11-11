import { Route, Routes } from "react-router-dom"; 

import HomePage from "./HomePage";
import SinglePlayer from "./SinglePlayer";
import Multiplayer from "./Multiplayer";
import Campaign from "./Campaign";
import LeaderBoard from "./LeaderBoard";
import Game from "./Game";

const MainRoutes = () => {    
    return(
    <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/SinglePlayer">
            <Route index element={<SinglePlayer/>}/>
            <Route path="Marathon" element={<Game rows={22} columns={10} />} />
            <Route path="2Minute" element={<Game rows={22} columns={10} />} />
            <Route path="40Row" element={<Game rows={22} columns={10} />} />
            <Route path="Master" element={<Game rows={22} columns={10} />} />
            <Route path="Custom" element={<Game rows={22} columns={10} />} />
        </Route>
        <Route path="/Multiplayer" element={<Multiplayer />}/>
        <Route path="/Campaign" element={<Campaign />}/>
        <Route path="/LeaderBoard" element={<LeaderBoard />}/>
    </Routes>
    )
}

export default MainRoutes;