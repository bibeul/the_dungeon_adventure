import React from 'react';
import './character_cards.css';

const CharacterCard = ({ className, text }) => {
  return (
    <div className={ "small-card " + className}>
    <h3>Small Card</h3>
    <p>Top Left</p>
    <img src="https://via.placeholder.com/100" alt="placeholder" />
    <div className="mini-cards">
      <div className="mini-card">
        <img src="https://via.placeholder.com/50" alt="placeholder" />
      </div>
      <div className="mini-card">
        <img src="https://via.placeholder.com/50" alt="placeholder" />
      </div>
    </div>
  </div>
  );
};

export default CharacterCard;