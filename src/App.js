import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import CharacterCard from './components/character_card'
import EventCard from './components/event_card';

const socket = io('http://localhost:3001'); // Adresse du serveur

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [characters, setCharacters] = useState([]);
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
      setRandomNumber(number);
    });

    socket.on('update', (updateData) => {
      console.log(updateData);
      setNumberOfPlayer(updateData.numberOfPlayer);
      setGameStatus(updateData);
      setRandomNumber(updateData.randomnumber);
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

  return (
    <div className="App">
      <button className="start-button">Start</button>
      <EventCard event={gameStatus.currentEvent}/>
      <div className="buttons-container">
        {gameStatus.currentEvent.actions.map((data) => {
          return (<button className="card-button">{data}</button>)
        })
        }
      </div>
      {numberOfPlayer > 0 ? (
      <CharacterCard className="small-card top-left"/>) : null}
      {numberOfPlayer > 1 ? (
      <CharacterCard className="small-card top-right"/>) : null}
      {numberOfPlayer > 2 ? (
      <CharacterCard className="small-card bottom-left"/>) : null}
      {numberOfPlayer > 3 ? (
      <CharacterCard className="small-card bottom-right"/>) : null}
      {randomNumber !== null && <h3 className="random-number">Random Number: {randomNumber}</h3>}
      <button className="random-button" onClick={generateRandomNumber}>
        Generate Random Number
      </button>
    </div>
  );
}

export default App;