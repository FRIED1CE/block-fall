import "./UserInterface.css";

import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div className="UserInterface">
            <div className="UserInterface-Top">
                <Link to="/" className="title">
                    BlockFall
                </Link>
            </div>
            <div className="UserInterface-Bottom">
                <Link to="/SinglePlayer"><div>Single player</div></Link>
                <Link to="/Multiplayer"><div>Multiplayer</div></Link>
                <Link to="/Campaign"><div>Campaign</div></Link>
                <Link to="/LeaderBoard"><div>Leaderboard</div></Link>
            </div>
        </div>
    )
}



export default HomePage;