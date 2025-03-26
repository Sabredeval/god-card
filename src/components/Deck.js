import React from 'react';
import '../styles/Deck.css';

const Deck = ({ cards = [], onDeckClick = () => {} }) => {
  const cardCount = cards.length;
  
  // Create visual stack of cards
  const renderCardStack = () => {
    const stackSize = Math.min(cardCount, 5);
    return Array.from({ length: stackSize }).map((_, index) => (
      <div 
        key={index}
        className="deck-card"
        style={{ 
          transform: `translateY(${index * -2}px) translateX(${index * 1}px)`,
          zIndex: 5 - index
        }}
      />
    ));
  };
  
  return (
    <div className="deck-container" onClick={onDeckClick}>
      <div className="deck-stack">
        {renderCardStack()}
        {cardCount === 0 && <div className="empty-deck">Empty</div>}
      </div>
      <div className="deck-count">{cardCount} cards</div>
    </div>
  );
};

export default Deck;