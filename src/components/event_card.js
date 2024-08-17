import React from 'react';
import './event_card.css';

const EventCard = ({event, diceImages}) => {
  return (
    <div className="large-card">
    <h2>{event.title}</h2>
    <p>{event.description}</p>
    <img src="https://via.placeholder.com/300" alt="placeholder" />
    {event.enemy && event.enemy.diceHp.map(dice => <img src={"http://localhost:3001/" + diceImages[dice]} />)}
    <button className="next-button">Suivant</button>
  </div>
  );
};

export default EventCard;