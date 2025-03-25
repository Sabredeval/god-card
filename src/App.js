import React, { useState } from 'react';
import './styles/App.css';
import Card from './components/Card';
import Deck from './components/Deck';
import Hand from './components/Hand';
import PlayingArea from './components/PlayingArea';

function App() {
  // Example state - you'll need to hook this up to your game logic
  const [playerDeck, setPlayerDeck] = useState([
    // Example cards would go here
  ]);
  
  const [playerHand, setPlayerHand] = useState([
    {
      id: 1,
      title: "Zeus",
      health: 5,
      attack: 4,
      imageLink: "/images/Zeus.png",
      description: "God of thunder and lightning"
    }
  ]);
  
  const [playerField, setPlayerField] = useState([]);
  const [opponentField, setOpponentField] = useState([]);

  // Game actions - these would connect to your game logic
  const handleDrawCard = () => {
    console.log("Drawing a card");
  };

  const handlePlayCard = (cardId) => {
    console.log(`Playing card ${cardId}`);
  };

  const handleCardSelect = (cardId, owner) => {
    console.log(`Selected card ${cardId} from ${owner}`);
  };

  return (
    <div className="App">
      <header className="game-header">
        <h1>Card Game</h1>
      </header>
      
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
            <Hand cards={playerHand} onPlayCard={handlePlayCard} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;