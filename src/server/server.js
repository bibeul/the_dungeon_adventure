const express = require('express');
const {events} = require('./events')
const Player = require('./player')
const GameManager = require('./gameManager')
const { characters, diceFace } = require('./character')
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const gameManager = new GameManager(events[0], events)

function updateEveryone(currentSocket){
  currentSocket.broadcast.emit('update', gameManager.getCurrentGameStatus())
  currentSocket.emit('update', gameManager.getCurrentGameStatus())
}

io.on('connection', (socket) => {
  console.log('a user connected');
  gameManager.addPlayer(socket.id, new Player(socket.id, characters.smith))
  updateEveryone(socket)


  socket.on('generateRandomNumber', () => {
    gameManager.players[socket.id].roll_dice()
    updateEveryone(socket)
  });

  socket.on('disconnect', () => {
    gameManager.removePlayer(socket.id)
    console.log('user disconnected');
    socket.broadcast.emit('update', gameManager.getCurrentGameStatus())
  });

  socket.on('next', () => {
    gameManager.nextEvent() 
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
