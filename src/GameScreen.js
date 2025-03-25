import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/App.css';
import Card from './components/Card';
import Deck from './components/Deck';
import Hand from './components/Hand';
import PlayingArea from './components/PlayingArea';

function GameScreen() {
  const [playerDeck, setPlayerDeck] = useState([
    // Example cards would go here
    {
      id: 2,
      title: "Poseidon",
      health: 4,
      attack: 5,
      imageLink: "/images/poseidon.png",
      description: "God of the sea"
    },
    {
      id: 3,
      title: "Athena",
      health: 3,
      attack: 3,
      imageLink: "/images/athena.png",
      description: "Goddess of wisdom"
    }
  ]);
  
  const [playerHand, setPlayerHand] = useState([
    {
      id: 1,
      title: "Zeus",
      health: 5,
      attack: 4,
      imageLink: "/images/zeus.png",
      description: "God of thunder and lightning"
    }
  ]);
  
  const [playerField, setPlayerField] = useState([]);
  const [opponentField, setOpponentField] = useState([]);

  // Game actions
  const handleDrawCard = () => {
    if (playerDeck.length > 0) {
      const drawnCard = playerDeck[0];
      const newDeck = playerDeck.slice(1);
      setPlayerHand([...playerHand, drawnCard]);
      setPlayerDeck(newDeck);
    }
  };

  const handlePlayCard = (cardId) => {
    const cardIndex = playerHand.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) {
      const card = playerHand[cardIndex];
      const newHand = [...playerHand];
      newHand.splice(cardIndex, 1);
      setPlayerField([...playerField, card]);
      setPlayerHand(newHand);
    }
  };

  const handleCardSelect = (cardId, owner) => {
    console.log(`Selected card ${cardId} from ${owner}`);
  };

  return (
    <div className="App">
      <div className="game-container">
        <div className="sidebar">
          <Deck cards={playerDeck} onDrawCard={handleDrawCard} />
        </div>
        <div className="main-area">
          <PlayingArea 
            playerCards={playerField}
            opponentCards={opponentField}
            onCardSelect={handleCardSelect}
          />
          <div className="player-hand-area">
            <Hand cards={playerHand} onCardClick={handlePlayCard} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameScreen;