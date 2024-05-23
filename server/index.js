import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors"
import jwt from "jsonwebtoken"

const port = 3000;
const privateKey = "dfdfcsas"

const app = express();
app.use(cors())
const server = http.createServer(app); // Create HTTP server instance

const io = new Server(server ,{
    cors :{
        origin:"socket-io-chatcam-message.vercel.app",
        methods : ["GET" ,"POST"] ,
        credentials : true
    }
}); // Attach Socket.io to the HTTP server instance



// const user = true ;
// io.use((socket, next) => {
//   cookieParser()(socket.request, socket.request.res, (err) => {
//     if (err) return next(err);

//     const token = socket.request.cookies.token;
//     if (!token) return next(new Error("Authentication Error"));

//     const decoded = jwt.verify(token, privateKey);
//     next();
//   });
// });

app.get("/", (req, res) => {
  return res.send("hello im working");
});

// app.get("/login", (req, res) => {
//   const token = jwt.sign({ Id: 'bar' }, privateKey);

//   return res.cookie("token" , token , { httpOnly: true , secure : true ,sameSite :true }).json({message : "login success"})
// });

io.on("connection", (socket) => { 
  console.log("socket connected");
  console.log("id", socket.id);

   socket.on("message", ({room , message})=>{
    console.log({room , message});
    io.to(room).emit("receive-message" , message)
   }) 

   socket.on("room-name", (roomName)=>{
    
   socket.join(roomName)
   console.log(' user joined' ,roomName )
  }) 

  socket.emit("wellcome" , `wellcome praveen in socket world ${socket.id}`)
});

server.listen(port, () => {
  console.log(`running on port ${port}`);
});
