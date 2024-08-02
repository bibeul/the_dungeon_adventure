import React from 'react';
import './event_card.css';

const EventCard = ({event}) => {
  return (
    <div className="large-card">
    <h2>{event.title}</h2>
    <p>{event.description}</p>
    <img src="https://via.placeholder.com/300" alt="placeholder" />
    <button className="next-button">Suivant</button>
  </div>
  );
};

export default EventCard;