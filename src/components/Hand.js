import React from "react";
import Card from "./Card";
import "../styles/Hand.css";

const Hand = ({ cards = [], onCardClick = () => {}, availableWorshipers = 0, cardPlayable = () => true }) => {
  return (
    <div className="hand-container">
      {availableWorshipers > 0 && (
        <div className="worshiper-counter">
          <span className="worshiper-icon">✨</span>
          <span className="worshiper-number">{availableWorshipers}</span>
        </div>
      )}
      <div className="hand-cards">
        {cards.map((card, index) => (
          <div 
            key={`${card.id}-${index}`} 
            className="hand-card-slot"
          >
            <Card
              id={card.id}
              health={card.health}
              attack={card.attack}
              imageLink={card.imageLink}
              title={card.title}
              description={card.description}
              type={card.type}
              worshipCost={card.type === "god" ? (card.worshipCost || 5) : 0}
              onCardClick={() => onCardClick(card.id)}
              draggable={cardPlayable(card)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hand;