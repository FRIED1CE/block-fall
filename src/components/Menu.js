import "./Menu.css"
import React from 'react'

const Menu = ({ onClick }) => {
  return (
    <div className="Menu">
       <button className="Button" onClick={onClick}>
           Play BlockFall
        </button> 
    </div>
  )
}

export default Menu