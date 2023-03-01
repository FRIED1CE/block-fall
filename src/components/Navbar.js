import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import logoutIcon from "./images/logoutIcon.png";

import { logout } from "../firebase";

const Navbar = ({ handleLoginClick, username }) => {

  const [open, setOpen] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  const pageName = ((location.pathname).split("/")).pop();
  

  const handleClick = () => {
    handleLoginClick();
  };
  return (
    <div className="navbar">
      <div>
        {pageName === "" ? (
          <></>
        ): (
        <div className="back fade " onClick={() => navigate(-1)}>back</div>
        )}
        <p className="Page-name">{pageName ? (pageName) : ("Home")}</p>
          {username ? (
            <span className="Username" onClick={()=> open ? (setOpen(false)) : (setOpen(true))}>
              {username}
            </span>
          ) 
          : (
            <span onClick={handleClick} className="loginicon">
            Sign In
            </span>
          )}
        <div className={`dropdown-menu ${open? "active" : "inactive"}` }>
          <ul>
            <li className="dropdown-item" onClick={()=> {
              setOpen(false);
              logout()
            }}>
              <img src={logoutIcon} className="logout" alt="error" />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
