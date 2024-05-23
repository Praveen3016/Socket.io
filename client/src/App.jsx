import React, { useEffect, useMemo, useState } from "react"
import {io} from "socket.io-client"
// import {Container, TextField, Typography ,Button} from "@mui/material"

function App() {

  const [message , setMessage] = useState("");
  const [room , setRoom] = useState("");
  const [SocketId , setSocketId] = useState("");
  const [messages , setMassages] = useState([]);
  const [roomName , setRoomName] = useState("");






  const socket = useMemo(()=> io("http://localhost:3000"),[]);

  useEffect(()=>{
    socket.on("connect" , () =>{
      console.log("socket conneted" , socket.id )
      setSocketId(socket.id)
    })

    socket.on("wellcome" , (message) =>{
      // console.log(message)
    })

    socket.on("receive-message" ,(data)=>{
      console.log(data)
      setMassages((prew) => [...prew , data])
    })
  } , [])

  function handleSubmit(e)
  {
e.preventDefault();
socket.emit("message" ,{message , room});
setMessage("")
  }

  function handleRoom(e){
    e.preventDefault();
    socket.emit("room-name" , roomName);
    setRoomName("")
  }

  return (
   <div>
    <h3>{SocketId}</h3>
    <form onSubmit={handleRoom}>
      <h5>Join Room</h5>
      <input onChange={(e) => setRoomName(e.target.value)} value={roomName} type="text"  /><br />
      <button type="submit">join</button>
    </form>

    <form onSubmit={handleSubmit}>
      <label htmlFor="">message</label>
      <input onChange={(e) => setMessage(e.target.value)} value={message} type="text"  /><br />
      <label htmlFor="">socket Id</label>
      <input onChange={(e) => setRoom(e.target.value)} value={room} type="text"  /><br />

      <button type="submit">send</button>

      <div>
        {
  messages.map((elem , index)=>{
   return <p key={index}>{elem}</p>
  })
        }
      </div>
    </form>
   </div>
  )
} 

export default App
