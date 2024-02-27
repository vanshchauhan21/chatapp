import React from "react";
import "./Joined.css";
import messageincoming from "../../image/messageincoming.png";
import { Link } from "react-router-dom";
 import { useState } from "react";
let user;

const sendUser =()=>{
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value="";
}

const Joined = () => {
    const [name , setname] = useState("");
    
  return (

    
    <div className='joinpage'>
    <div className="joinContainer">
     <img src={messageincoming} alt="" />
    
     <input onKeyPress={(event) => event.key === 'Enter' ? sendUser() : null} onChange={(e)=> setname(e.target.value)}  spellcheck="false" placeholder='enter your name' type='text' id='joinInput'/>
   <Link onClick={(event)=>!name?event.preventDefault():null} to="/chatt" >
    
     <button onClick={sendUser} className="btn" type="button">
  <strong>Login In</strong>
  <div id="container-stars">
    <div id="stars"></div>
  </div>

  <div id="glow">
    <div className="circle"></div>
    <div className="circle"></div>
  </div>
</button></Link>


    </div>
    
 </div>

 
  )
}

export default Joined
export {user}