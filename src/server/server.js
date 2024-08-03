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

const currentPlayer = {}
let currentEvent = events[0]
let eventNumber = 0

function getCurrentGameStatus(currentP){
  console.log({
    numberOfPlayer: Object.keys(currentP).length,
    currentEvent,
    currentPlayer: Object.values(currentPlayer),
  })
    return {
        numberOfPlayer: Object.keys(currentP).length,
        currentEvent,
        currentPlayer: Object.values(currentPlayer),
    }
}

function updateEveryone(currentSocket){
  currentSocket.broadcast.emit('update', getCurrentGameStatus(currentPlayer))
  currentSocket.emit('update', getCurrentGameStatus(currentPlayer))
}

io.on('connection', (socket) => {
  console.log('a user connected');
  currentPlayer[socket.id] = new Player(socket.id, characters.smith)
  console.log(`adding ${socket.id}`);
  console.log(currentPlayer)  

  updateEveryone(socket)


  socket.on('generateRandomNumber', () => {
    currentPlayer[socket.id].roll_dice()
    updateEveryone(socket)
  });

  socket.on('disconnect', () => {
    delete currentPlayer[socket.id]
    console.log(`removing ${socket.id}`);
    console.log('user disconnected');
    socket.broadcast.emit('update', getCurrentGameStatus(currentPlayer))
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

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
