import React from "react";
import Card from "./Card";
import "../styles/PlayingArea.css";

const PlayingArea = ({
  playerCards = [],
  opponentCards = [],
  onCardSelect = () => {}
}) => {
  return (
    <div className="playing-area-container">
      <div className="opponent-area">
        <div className="area-label">Opponent's Area</div>
        <div className="cards-row">
          {opponentCards.map((card) => (
            <div key={card.id} className="card-slot opponent-card-slot">
              <Card
                id={card.id}
                health={card.health}
                attack={card.attack}
                imageLink={card.imageLink}
                title={card.title}
                description={card.description}
                onCardClick={() => onCardSelect(card.id, 'opponent')}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="middle-area">
        <div className="divider"></div>
      </div>
      
      <div className="player-area">
        <div className="cards-row">
          {playerCards.map((card) => (
            <div key={card.id} className="card-slot player-card-slot">
              <Card
                id={card.id}
                health={card.health}
                attack={card.attack}
                imageLink={card.imageLink}
                title={card.title}
                description={card.description}
                onCardClick={() => onCardSelect(card.id, 'player')}
              />
            </div>
          ))}
        </div>
        <div className="area-label">Your Area</div>
      </div>
    </div>
  );
};

export default PlayingArea;