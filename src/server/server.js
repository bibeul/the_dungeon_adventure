const express = require('express');
const events = require('./events')
const Player = require('./player')
const characters = require('./character')
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const players = {}
let currentEvent = events[0]
let eventNumber = 0

function getCurrentGameStatus(){
  console.log({
    numberOfPlayer: Object.keys(players).length,
    currentEvent,
    players: Object.values(players),
  })
    return {
        numberOfPlayer: Object.keys(players).length,
        currentEvent,
        players: Object.values(players),
    }
}

function updateEveryone(currentSocket){
  currentSocket.broadcast.emit('update', getCurrentGameStatus())
  currentSocket.emit('update', getCurrentGameStatus())
}

io.on('connection', (socket) => {
  console.log('a user connected');
  players[socket.id] = new Player(socket.id, characters.smith)
  console.log(`adding ${socket.id}`);
  console.log(players)  

  updateEveryone(socket)


  socket.on('generateRandomNumber', () => {
    players[socket.id].roll_dice()
    updateEveryone(socket)
  });

  socket.on('disconnect', () => {
    delete players[socket.id]
    console.log(`removing ${socket.id}`);
    console.log('user disconnected');
    socket.broadcast.emit('update', getCurrentGameStatus())
  });

  socket.on('next', () => {
    eventNumber++;
    if(eventNumber > 1) eventNumber = 0
    currentEvent = events[eventNumber]
    updateEveryone(socket)
  })

  socket.on('start', () => {
    currentEvent = events[eventNumber]
    updateEveryone(socket)
  })
});

app.get('/test', (req, res) => {
  res.send('ok')
})

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
