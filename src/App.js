import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import CharacterCard from './components/character_card'
import EventCard from './components/event_card';

const socket = io('http://localhost:3001'); // Adresse du serveur

function App() {
  const [numberOfPlayer, setNumberOfPlayer] = useState(0)
  const [gameStatus, setGameStatus] = useState({
    currentEvent: {
      title: 'oui',
      description: 'no',
      actions: []
    }
  })

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('randomNumber', (number) => {
      console.log(number)
    });

    socket.on('update', (updateData) => {
      console.log(updateData);
      setNumberOfPlayer(updateData.numberOfPlayer);
      setGameStatus(updateData);
    });

    return () => {
      socket.off('connect');
      socket.off('randomNumber');
      socket.off('update');
    };
  }, []);

  const generateRandomNumber = () => {
    socket.emit('generateRandomNumber');
  };

  const actionSelected = () => {
    socket.emit('next');
  };

  return (
    <div className="App">
      <button className="start-button">Start</button>
      <EventCard event={gameStatus.currentEvent}/>
      <div className="buttons-container">
        {gameStatus.currentEvent.actions.map((data) => {
          return (<button className="card-button" onClick={actionSelected}>{data.title}</button>)
        })
        }
      </div>
      {numberOfPlayer > 0 ? (<>
      <CharacterCard className="small-card top-left" player={gameStatus.players[0]}/>
      </>) : null}
      {numberOfPlayer > 1 ? (
      <CharacterCard className="small-card top-right" player={gameStatus.players[1]} />) : null}
      {numberOfPlayer > 2 ? (
      <CharacterCard className="small-card bottom-left" player={gameStatus.players[2]} />) : null}
      {numberOfPlayer > 3 ? (
      <CharacterCard className="small-card bottom-right" player={gameStatus.players[3]} />) : null}
      <button className="random-button" onClick={generateRandomNumber}>
        Generate Random Number
      </button>
    </div>
  );
}

export default App;
