import React from 'react'
import './buttongroup.css'

function Buttongroup({text,color,onClick,textColor}) {
    const buttongroupStyle = {
        backgroundColor: color,
        color: textColor,
    };
  return (
    <button className="commonbutton" style={buttongroupStyle} onClick={onClick}>
            {text}
        </button> 
  )
}

export default Buttongroup;