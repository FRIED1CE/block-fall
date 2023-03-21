import "./UserInterface.css";
import { useEffect, useState } from "react";

import backArrow from "./images/Backarrow.png"


const Settings = ({ controls, changeControls, resetControls, isSettings, setIsSettings, gameOver}) => {

    const keys = Object.keys(controls[1])

    const [buttonClicked, setButtonClicked] = useState(false);
    const [active, setActive] = useState("")

    useEffect(() => {
        if (buttonClicked) {
          const handleKeyPress = (event) => {
            setButtonClicked(false)
            const val = changeControls(event.key, active);
            if (!val) alert("Input given already in use.");
          };
      
          document.addEventListener("keydown", handleKeyPress);
          return () => {
            document.removeEventListener("keydown", handleKeyPress);
          };
        }
      }, [buttonClicked]);

      

    return (
        <div className={`${isSettings ? "" : "active"} settings`}>
            <div className="pause-top">Controls</div>
            <img src={backArrow} className="backArrow" alt="error" onClick={()=> setIsSettings(false)}/>
            <div className="pause-bottom">
                {keys.map((key, i) => (
                    <div className={`${(buttonClicked && active === key) ? "clicked" : ""} controls`} key={i}>
                        <p>{key}</p>
                        <button onClick={() => {
                            setActive(key)
                            setButtonClicked(true)
                        }}>{(controls[1][key] === " ") ? ("space"): (controls[1][key])}</button>
                    </div>
                ))}
                <div onClick={()=> resetControls()}className="reset">Reset controls</div>
            </div>
        </div>
    )
}

export default Settings;