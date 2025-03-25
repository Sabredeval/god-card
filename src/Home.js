import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [decks, setDecks] = useState([]);
    const [newDeckName, setNewDeckName] = useState('');
    const [editingDeck, setEditingDeck] = useState(null);
    const [showDeckForm, setShowDeckForm] = useState(false);
    
    const [playerData, setPlayerData] = useState({
        username: "Player01",
        rank: "Bronze",
        wins: 0,
        losses: 0,
        gold: 100,
        collection: {
            total: 50,
            collected: 0,
            common: 0,
            uncommon: 0,
            rare: 0,
            legendary: 0
        }
    });

    // Daily quests (placeholder data)
    const [dailyQuests, setDailyQuests] = useState([
    ]);

    useEffect(() => {
        const savedDecks = localStorage.getItem('sonOfCardDecks');
        if (savedDecks) {
            setDecks(JSON.parse(savedDecks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('sonOfCardDecks', JSON.stringify(decks));
    }, [decks]);

    const handleCreateDeck = () => {
        if (!newDeckName.trim()) return;
        
        const newDeck = {
            id: Date.now(),
            name: newDeckName,
            cards: [],
            dateCreated: new Date().toISOString()
        };
        
        const updatedDecks = [...decks, newDeck];
        setDecks(updatedDecks);
        setNewDeckName('');
        setShowDeckForm(false);

        navigate(`/deck-builder/${newDeck.id}`);
    };

    const handleEditDeck = (deck) => {
        navigate(`/deck-builder/${deck.id}`);
    };

    const handleUpdateDeck = () => {
        if (!newDeckName.trim() || !editingDeck) return;
        
        const updatedDecks = decks.map(deck => 
            deck.id === editingDeck.id ? { ...deck, name: newDeckName } : deck
        );
        
        setDecks(updatedDecks);
        setNewDeckName('');
        setEditingDeck(null);
        setShowDeckForm(false);
    };

    const handleDeleteDeck = (deckId) => {
        if (window.confirm('Are you sure you want to delete this deck?')) {
            const updatedDecks = decks.filter(deck => deck.id !== deckId);
            setDecks(updatedDecks);
        }
    };

    const handlePlayGame = (mode) => {
        navigate('/game', { state: { mode } });
    };

    const cancelForm = () => {
        setNewDeckName('');
        setEditingDeck(null);
        setShowDeckForm(false);
    };

    // Calculate collection percentages for progress bars
    const collectionPercentages = {
        common: (playerData.collection.common / 20) * 100,
        uncommon: (playerData.collection.uncommon / 15) * 100,
        rare: (playerData.collection.rare / 10) * 100,
        legendary: (playerData.collection.legendary / 5) * 100
    };

    return (
        <div className="home-container">
            <div className="home-content">
                {/* Left Column */}
                <div className="home-column left-column">
                    {/* Player Profile Section */}
                    <div className="profile-section section-card">
                        <h2>Player Profile</h2>
                        <div className="player-info">
                            <div className="player-avatar"></div>
                            <div className="player-stats">
                                <h3>{playerData.username}</h3>
                                <div className="player-rank">Rank: {playerData.rank}</div>
                                <div className="player-record">
                                    <span>Wins: {playerData.wins}</span>
                                    <span>Losses: {playerData.losses}</span>
                                </div>
                                <div className="player-gold">
                                    <span className="gold-icon">🪙</span> {playerData.gold}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Daily Quests Section */}
                    <div className="daily-section section-card">
                        <h2>Daily Quests</h2>
                        <div className="quests-list">
                            {dailyQuests.map(quest => (
                                <div key={quest.id} className="quest-item">
                                    <div className="quest-info">
                                        <h3>{quest.title}</h3>
                                        <div className="progress-container">
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress" 
                                                    style={{width: `${(quest.progress / quest.target) * 100}%`}}
                                                ></div>
                                            </div>
                                            <span>{quest.progress}/{quest.target}</span>
                                        </div>
                                    </div>
                                    <div className="quest-reward">{quest.reward}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card Collection Summary */}
                    <div className="collection-summary section-card">
                        <h2>Collection Progress</h2>
                        <div className="collection-stats">
                            <div className="stat-item">
                                <div className="stat-label">Cards Collected</div>
                                <div className="stat-value">{playerData.collection.collected}/{playerData.collection.total}</div>
                            </div>
                            <div className="collection-bars">
                                <div className="rarity-item">
                                    <div className="rarity-label">Common</div>
                                    <div className="rarity-progress">
                                        <div className="rarity-bar common" style={{width: `${collectionPercentages.common}%`}}></div>
                                    </div>
                                </div>
                                <div className="rarity-item">
                                    <div className="rarity-label">Uncommon</div>
                                    <div className="rarity-progress">
                                        <div className="rarity-bar uncommon" style={{width: `${collectionPercentages.uncommon}%`}}></div>
                                    </div>
                                </div>
                                <div className="rarity-item">
                                    <div className="rarity-label">Rare</div>
                                    <div className="rarity-progress">
                                        <div className="rarity-bar rare" style={{width: `${collectionPercentages.rare}%`}}></div>
                                    </div>
                                </div>
                                <div className="rarity-item">
                                    <div className="rarity-label">Legendary</div>
                                    <div className="rarity-progress">
                                        <div className="rarity-bar legendary" style={{width: `${collectionPercentages.legendary}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-collection">View Collection</button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="home-column right-column">
                    {/* Game Modes Section */}
                    <div className="game-modes-section section-card">
                        <h2>Play Mode</h2>
                        <div className="game-modes">
                            <div className="game-mode" onClick={() => handlePlayGame('quick')}>
                                <div className="mode-icon quick-icon">⚡</div>
                                <div className="mode-details">
                                    <h3>Quick Match</h3>
                                    <p>Battle an opponent instantly</p>
                                </div>
                            </div>
                            <div className="game-mode" onClick={() => handlePlayGame('practice')}>
                                <div className="mode-icon practice-icon">✒️</div>
                                <div className="mode-details">
                                    <h3>Story</h3>
                                    <p>Go through story and unlock new cards</p>
                                </div>
                            </div>
                            <div className="game-mode" onClick={() => handlePlayGame('tournament')}>
                                <div className="mode-icon tournament-icon">🏰</div>
                                <div className="mode-details">
                                    <h3>Tournament</h3>
                                    <p>Special event battles</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decks Section */}
                    <div className="decks-section section-card">
                        <div className="section-header">
                            <h2>My Decks</h2>
                            <button 
                                className="btn btn-add"
                                onClick={() => setShowDeckForm(true)}
                                disabled={showDeckForm}
                            >
                                + New Deck
                            </button>
                        </div>

                        {showDeckForm && (
                            <div className="deck-form">
                                <input
                                    type="text"
                                    placeholder="Deck name"
                                    value={newDeckName}
                                    onChange={(e) => setNewDeckName(e.target.value)}
                                />
                                <div className="form-buttons">
                                    <button 
                                        className="btn btn-save"
                                        onClick={handleCreateDeck}
                                    >
                                        Create
                                    </button>
                                    <button 
                                        className="btn btn-cancel"
                                        onClick={cancelForm}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="decks-list">
                            {decks.length === 0 ? (
                                <div className="empty-state">
                                    <p>You don't have any decks yet. Create one to get started!</p>
                                </div>
                            ) : (
                                decks.map(deck => (
                                    <div key={deck.id} className="deck-card">
                                        <div className="deck-info">
                                            <h3>{deck.name}</h3>
                                            <p>{deck.cards.length} cards</p>
                                        </div>
                                        <div className="deck-actions">
                                            <button 
                                                className="btn btn-edit"
                                                onClick={() => handleEditDeck(deck)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="btn btn-delete"
                                                onClick={() => handleDeleteDeck(deck.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;