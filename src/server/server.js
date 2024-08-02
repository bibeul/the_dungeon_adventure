const express = require('express');
const events = require('./events')
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const characters = {
    smith: {
        text: 'yes yes yes'
    },
    priest: {
        text: 'yes yes yes'
    },
    mailman: {
        text: 'yes yes yes'
    },
    noble: {
        text: 'yes yes yes'
    },
}

const currentPlayer = {}
let currentEvent = events[0]
let eventNumber = 0

function getCurrentGameStatus(currentP){
  console.log({
    numberOfPlayer: Object.keys(currentP).length,
    currentEvent,
    ...currentPlayer,
  })
    return {
        numberOfPlayer: Object.keys(currentP).length,
        currentEvent,
        ...currentPlayer,
    }
}

io.on('connection', (socket) => {
  console.log('a user connected');
  currentPlayer[socket.id] = characters.smith
  console.log(`adding ${socket.id}`);
  console.log(currentPlayer)  

  socket.broadcast.emit('update', getCurrentGameStatus(currentPlayer))
  socket.emit('update', getCurrentGameStatus(currentPlayer))


  socket.on('generateRandomNumber', () => {
    const number = Math.floor(Math.random() * 6) + 1;
    socket.broadcast.emit('randomNumber', number);
    socket.emit('randomNumber', number);
  });

  socket.on('disconnect', () => {
    delete currentPlayer[socket.id]
    console.log(`removing ${socket.id}`);
    console.log('user disconnected');
    socket.broadcast.emit('update', getCurrentGameStatus(currentPlayer))
  });

  socket.on('next', () => {
    currentEvent = events[eventNumber]
    socket.broadcast.emit('update', getCurrentGameStatus(currentPlayer))
  })

  socket.on('start', () => {
    currentEvent = events[eventNumber]
    socket.broadcast.emit('update', getCurrentGameStatus(currentPlayer))
  })
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
