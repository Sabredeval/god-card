// Add these imports and update your component
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/App.css';
import Card from './components/Card';
import Deck from './components/Deck';
import Hand from './components/Hand';
import allCards from './data/cards.json';

function GameScreen() {
  const navigate = useNavigate();
  
  /* use states */
  const [worshipers, setWorshipers] = useState(0);
  const [turn, setTurn] = useState(1);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [playerDeck, setPlayerDeck] = useState(allCards);
  const [playerHand, setPlayerHand] = useState([]);
  const [opponentHand, setOpponentHand] = useState([
    { id: 'o1' }, { id: 'o2' }, { id: 'o3' }, { id: 'o4' }
  ]);
  const [playerBackRow, setPlayerBackRow] = useState([]);
  const [playerFrontRow, setPlayerFrontRow] = useState([]);
  const [opponentFrontRow, setOpponentFrontRow] = useState([
    {
      id: 'of1',
      title: "Opponent Creature",
      health: 3,
      attack: 2,
      type: "beast"
    }
  ]);
  const [opponentBackRow, setOpponentBackRow] = useState([]);
  const [selectedRow, setSelectedRow] = useState('front');

  /* handle functions */
  const handleDrawCard = () => {
    if (playerDeck.length > 0) {
      const drawnCard = playerDeck[0];
      const newDeck = playerDeck.slice(1);
      setPlayerHand([...playerHand, drawnCard]);
      setPlayerDeck(newDeck);
    }
  };

  const getCardClasses = (cards) => {
    if (!cards || !cards.length) return { rowClass: '', cardClass: '' };
    
    if (cards.length > 12) {
      return { 
        rowClass: 'cards-many', 
        cardClass: 'scale-smallest' 
      };
    } else if (cards.length > 8) {
      return { 
        rowClass: 'cards-many', 
        cardClass: 'scale-smaller' 
      };
    } else if (cards.length > 5) {
      return { 
        rowClass: 'cards-medium', 
        cardClass: 'scale-small' 
      };
    }
    
    return { rowClass: '', cardClass: '' };
  };

  const handlePlayCard = (cardId, targetRow = selectedRow) => {
    const cardIndex = playerHand.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) {
      const card = playerHand[cardIndex];
      
      if (card.type === "god") {
        if (worshipers < (card.worshipCost || 5)) {
          alert(`You need ${card.worshipCost || 5} worshipers to play ${card.title}!`);
          return;
        }
        
        setWorshipers(worshipers - (card.worshipCost || 5));
      }
      
      const targetRowCards = targetRow === 'front' ? playerFrontRow : playerBackRow;
      if (targetRowCards.length >= 15) {
        alert('This row is full (maximum 15 cards)');
        return;
      }
      
      const newHand = [...playerHand];
      newHand.splice(cardIndex, 1);
      setPlayerHand(newHand);
      
      if (targetRow === 'front') {
        setPlayerFrontRow([...playerFrontRow, card]);
      } else {
        setPlayerBackRow([...playerBackRow, card]);
      }
    }
  };
    
  const handleCardSelect = (cardId, row) => {
    console.log(`Selected card ${cardId} from ${row}`);
  };

  const endTurn = () => {
    setIsPlayerTurn(false);
    
    setTimeout(() => {
      setIsPlayerTurn(true);
      setTurn(turn + 1);
      setWorshipers(worshipers + 1);
      handleDrawCard();
    }, 1000);
  };

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      handleDrawCard();
    }
  }, []);

  const isCardPlayable = (card) => {
    if (!isPlayerTurn) return false;
    
    // Check if it's a god card and player has enough worshipers
    if (card.type === "god" && worshipers < (card.worshipCost || 5)) {
      return false;
    }
    
    return true;
  };

  // Add these event handlers for drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    if (e.currentTarget.classList.contains('field-row')) {
      e.currentTarget.classList.add('droppable-hover');
    }
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('droppable-hover');
  };

  const handleDrop = (e, targetRow) => {
    e.preventDefault();
    e.currentTarget.classList.remove('droppable-hover');
    
    try {
      const cardDataString = e.dataTransfer.getData("cardData");
      if (!cardDataString) return;
      
      const cardData = JSON.parse(cardDataString);
      
      handlePlayCard(cardData.id, targetRow);
    } catch (error) {
      console.error("Error processing drag and drop:", error);
    }
  };

  // Set drag and drop active class when dragging starts
  useEffect(() => {
    const handleDragStart = () => {
      if (isPlayerTurn) {
        document.querySelector('.player-front-row').classList.add('droppable');
        document.querySelector('.player-back-row').classList.add('droppable');
      }
    };
    
    const handleDragEnd = () => {
      document.querySelector('.player-front-row').classList.remove('droppable');
      document.querySelector('.player-front-row').classList.remove('droppable-hover');
      document.querySelector('.player-back-row').classList.remove('droppable');
      document.querySelector('.player-back-row').classList.remove('droppable-hover');
    };
    
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('dragend', handleDragEnd);
    
    return () => {
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('dragend', handleDragEnd);
    };
  }, [isPlayerTurn]);

  return (
    <div className="game-grid">
      
      {/* Opponent hand */}
      <div className="opponent-hand-area">
        <div className="opponent-cards">
          {opponentHand.map(card => (
            <div key={card.id} className="opponent-card-back"></div>
          ))}
        </div>
      </div>
      
      {/* Battle field */}
      <div className="battlefield">
        {/* Opponent back row */}
        <div className="field-row opponent-back-row">
          <div className="row-label">Back Row</div>
          <div className="row-cards">
            {opponentBackRow.map(card => (
              <div key={card.id} className="field-card" onClick={() => handleCardSelect(card.id, 'opponent-back')}>
                <Card
                  id={card.id}
                  health={card.health}
                  attack={card.attack}
                  imageLink={card.imageLink}
                  title={card.title}
                  type={card.type}
                  worshipCost={card.type === "god" ? card.worshipCost : 0}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Opponent front row */}
        <div className="field-row opponent-front-row">
          <div className="row-label">Front Row</div>
          <div className="row-cards">
            {opponentFrontRow.map(card => (
              <div key={card.id} className="field-card" onClick={() => handleCardSelect(card.id, 'opponent-front')}>
                <Card
                  id={card.id}
                  health={card.health}
                  attack={card.attack}
                  imageLink={card.imageLink}
                  title={card.title}
                  type={card.type}
                  worshipCost={card.type === "god" ? card.worshipCost : 0}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Player front row */}
        <div 
          className="field-row player-front-row"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'front')}
        >
          <div className="row-cards">
            {playerFrontRow.map(card => (
              <div key={card.id} className="field-card" onClick={() => handleCardSelect(card.id, 'player-front')}>
                <Card
                  id={card.id}
                  health={card.health}
                  attack={card.attack}
                  imageLink={card.imageLink}
                  title={card.title}
                  type={card.type}
                  worshipCost={card.type === "god" ? card.worshipCost : 0}
                />
              </div>
            ))}
          </div>
          <div className="row-label">Front Row</div>
          <div className="row-buttons">
          </div>
        </div>
        
        {/* Player back row - Add drag and drop handlers */}
        <div 
          className="field-row player-back-row"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'back')}
        >
          <div className="row-cards">
            {playerBackRow.map(card => (
              <div key={card.id} className="field-card" onClick={() => handleCardSelect(card.id, 'player-back')}>
                <Card
                  id={card.id}
                  health={card.health}
                  attack={card.attack}
                  imageLink={card.imageLink}
                  title={card.title}
                  type={card.type}
                  worshipCost={card.type === "god" ? card.worshipCost : 0}
                />
              </div>
            ))}
          </div>
          <div className="row-label">Back Row</div>
          <div className="row-buttons">
          </div>
        </div>
      </div>
      
      {/* Player hand */}
      <div className="player-hand-area">
        <Hand 
          cards={playerHand} 
          onCardClick={(cardId) => handlePlayCard(cardId)}
          availableWorshipers={worshipers}
          cardPlayable={isCardPlayable}
        />
      </div>
      
      {/* Game sidebar */}
      <div className="game-sidebar">
        <div className="deck-display">
          <Deck cards={playerDeck} onDeckClick={handleDrawCard} />
        </div>
        
        <div className="worshiper-display">
          <div className="worshiper-count">
            <div className="count-label">Worshipers</div>
            <div className="count-value">{worshipers}</div>
          </div>
        </div>

        <button className="btn-end-turn" onClick={endTurn} disabled={!isPlayerTurn}>
          {isPlayerTurn ? "End Turn" : "Opponent's Turn..."}
        </button>

      </div>
    </div>
  );
}

export default GameScreen;