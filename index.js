const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5500', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
});

app.use(cors({
  origin: 'http://localhost:5500', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['my-custom-header'],
  credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5500'); // Update this with the origin of your front-end app
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

io.on("connection",function(socket){
    socket.on("newUser",function(username){
        socket.broadcast.emit("update", username + " joined the conversation");
    })
    socket.on("exituser",function(username){
        socket.broadcast.emit("update", username + " left the conversation");
    });
    socket.on("chat",function(message){
        socket.broadcast.emit("chat",message);
    })
})

server.listen(3080,()=>{
    console.log("app is running");
})