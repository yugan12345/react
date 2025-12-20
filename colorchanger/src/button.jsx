import React from "react";
function Button({color}){
    return(
        <button onClick={() => document.body.style.backgroundColor = color} style={{backgroundColor: color, color: 'white', padding: '10px',borderRadius: '5px', textAlign: 'center', border: '2px solid black', padding : '10px', cursor: 'pointer'}}>
            {color}
        </button>
    )
}
export default Button;