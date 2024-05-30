import React from 'react';
import './button.css';

function Button({text,color,onClick,applyShadow}) {
    const buttonStyle = {
        backgroundColor: color,
        boxShadow: applyShadow ? '0px 0px 50px 0px #0019FF3D' : 'none',
    };

    return (
        <>
        <button className="button" style={buttonStyle} onClick={onClick}>
            {text}
        </button>
        
        </>
    );
}

export default Button;