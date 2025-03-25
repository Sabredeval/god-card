import React, { useState } from 'react';
import './styles/App.css';
import Card from './components/Card';
import Deck from './components/Deck';
import Hand from './components/Hand';
import PlayingArea from './components/PlayingArea';

function App() {
  const [playerDeck, setPlayerDeck] = useState([
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


  return (
    <div className="App">
      <div className="game-container">
        <div className="sidebar">
          <Deck cards={playerDeck} onDrawCard={console.log} />
        </div>
        
        <div className="main-area">
          <PlayingArea 
            playerCards={playerField}
            opponentCards={opponentField}
            // onCardSelect={handleCardSelect}
          />
          
          <div className="player-hand-area">
            <Hand cards={playerHand} onCardClick={console.log} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;