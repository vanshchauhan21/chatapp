import React, { useEffect, useState } from "react";
import { user } from "../Joined/Joined";
import socketIo from "socket.io-client";
import "./Chatt.css";
import messageincominggg from "../../image/messageincominggg.png";

import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom"
import closeIcon from "../../image/closeIcon.png"

let socket;

const ENDPOINT = "https://v-chat-rho.vercel.app/";

const Chatt = () => {
    const [id, setid] = useState("");
    const [messages, setmessages] = useState([])
   const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit('message', {message, id});
    document.getElementById("chatInput").value = "";
  }

  console.log(messages);

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("connected");
      setid(socket.id);
      
    })
    console.log(socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
        setmessages([...messages,data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
        setmessages([...messages,data]);
      console.log(data.user, data.message);
    });

    socket.on('leave', (data) => {
        setmessages([...messages,data]);
      console.log(data.user, data.message);
    });
    return () => {
     
socket.on("disconnect", () => {
    console.log("User has disconnected")


})
    };
  }, [])

  useEffect(() => {
    socket.on('sendMessage',(data)=>{
        setmessages([...messages,data]);
        console.log(data.user, data.message, data.id);
    })
  
    return () => {
   
    }
  }, [messages])
  

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">

        <img src={messageincominggg} className="image1" alt="" />
          <a href="/"><img src={closeIcon} className="image2" alt="close" /></a>  
        </div>
        <ReactScrollToBottom className="chatBox">
            {messages.map((item,i)=> <Message user={item.id===id? '' :item.user} message={item.message} classs={item.id===id?'right':'left'} />)}
           
        </ReactScrollToBottom>
        <div className="inputBox">
          <input  onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" spellcheck="false" placeholder="Type Message Here..." id="chatInput" />
          

          <button onClick={send} >
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
      </svg>
    </div>
  </div>
  
</button>


        </div>
      </div>
    </div>
  );
};

export default Chatt;
