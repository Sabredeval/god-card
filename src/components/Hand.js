import React from "react";
import Card from "./Card";
import "../styles/Hand.css";

const Hand = ({ 
  cards = [], 
  onCardClick = () => {} 
}) => {
  return (
    <div className="hand-container">
      <div className="hand-cards">
        {cards.map((card) => (
          <div key={card.id} className="hand-card-slot">
            <Card
              id={card.id}
              health={card.health}
              attack={card.attack}
              imageLink={card.imageLink}
              title={card.title}
              description={card.description}
              onCardClick={() => onCardClick(card.id)}
            />
          </div>
        ))}
      </div>
      <div className="hand-label">Your Hand</div>
    </div>
  );
};

export default Hand;