import React from 'react';
import './character_cards.css';

const CharacterCard = ({ className, player }) => {
  return (
    <div className={ "small-card " + className}>
    <h3>{player.id}</h3>
    <p>{player.dice}</p>
    <img src="https://via.placeholder.com/100" alt="placeholder" />
    <div className="mini-cards">
      <div className="mini-card">
        <img src="https://via.placeholder.com/50" alt="placeholder" />
      </div>
      <div className="mini-card">
        <img src="https://via.placeholder.com/50" alt="placeholder" />
      </div>
      <p>{player.hp}</p>
    </div>
  </div>
  );
};

export default CharacterCard;