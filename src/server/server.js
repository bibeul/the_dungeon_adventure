const path = require('path')
const express = require('express');
const cors = require('cors')
const {events, EventType} = require('./events')
const Player = require('./player')
const GameManager = require('./gameManager')
const { characters, diceFace } = require('./character')
const http = require('http');
const { Server } = require('socket.io');


const dir = path.join(__dirname, 'public');
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

app.use(express.static(dir));
app.use(cors())

io.on('connection', (socket) => {
  console.log('a user connected');
  gameManager.addPlayer(socket.id, new Player(socket.id, characters.smith))
  updateEveryone(socket)


  socket.on('generateRandomNumber', () => {
    gameManager.players[socket.id].roll_dice()
    if(gameManager.hasEveryonePlayed() && gameManager.currentEvent.type == EventType.Combat){
      gameManager.enemyTurn()
    }
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

app.get('/dice_image', (req, res) => {
  res.send({
    0: 'str.png',
    1: 'dxt.png',
    2: 'wsd.png',
    3: 'db_wsd.png',
    4: 'db_str.png',
    5: 'db_dxt.png',
  })
})

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
