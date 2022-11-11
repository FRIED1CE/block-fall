import "./UserInterface.css"

import { Link } from "react-router-dom";

const SinglePlayer = () => {
    return(
        <div className="UserInterface">
            <div className="UserInterface-Top">
                <div className="BackButton">Back</div>
                <h1 className="Title">BlockFall</h1>
            </div>   
            <div className="UserInterface-Bottom">
                <Link to="/SinglePlayer/Marathon"><div>Marathon</div></Link>
                <Link to="/SinglePlayer/2Minute"><div>2 Minute</div></Link>
                <Link to="/SinglePlayer/40Row"><div>40 row</div></Link>
                <Link to="/SinglePlayer/Master"><div>Master</div></Link>
                <Link to="/SinglePlayer/Custom"><div>Custom</div></Link>
            </div>
        </div>
    )
}

export default SinglePlayer;