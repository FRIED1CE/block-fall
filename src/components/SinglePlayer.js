import "./UserInterface.css"

import { Link } from "react-router-dom";



import logo from "./images/blockfallLogo.png";
import Navbar from "./Navbar";
import LoginForm from "./loginFrom";


const SinglePlayer = ({isShowLogin, handleLoginClick, username}) => {
    
    return(
        <div className="UserInterface MainMenu">
            <Navbar handleLoginClick={handleLoginClick} username={username}/>
            <LoginForm isShowLogin={isShowLogin} handleLoginClick={handleLoginClick} />
            <img src={logo} className="logo" alt="error" />
            <div className="UserInterface-Bottom fade">
                <Link to="/SinglePlayer/Marathon"><div>Marathon</div></Link>
                <Link to="/SinglePlayer/2Minute"><div>2 Minute</div></Link>
                <Link to="/SinglePlayer/40Lines"><div>40 Lines</div></Link>
                <Link to="/SinglePlayer/Master"><div>Master</div></Link>
            </div>
        </div>
    )
}

export default SinglePlayer;