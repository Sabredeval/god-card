import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from './components/Card';
import './styles/DeckBuilder.css';

const DeckBuilder = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    
    // State for all cards and deck
    const [allCards, setAllCards] = useState([]);
    const [deck, setDeck] = useState({ id: null, name: '', cards: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterRarity, setFilterRarity] = useState('');

    // Load all cards and deck data
    useEffect(() => {
        // Load all cards
        fetch('/cards.json')
            .then(response => response.json())
            .then(data => {
                setAllCards(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error loading cards:', error);
                setIsLoading(false);
            });

        // Load specific deck if deckId is provided
        if (deckId) {
            const savedDecks = JSON.parse(localStorage.getItem('sonOfCardDecks') || '[]');
            const currentDeck = savedDecks.find(d => d.id.toString() === deckId);
            
            if (currentDeck) {
                setDeck(currentDeck);
            } else {
                // Deck not found, redirect to home
                navigate('/');
            }
        }
    }, [deckId, navigate]);

    // Save deck to localStorage when it changes
    useEffect(() => {
        if (deck.id) {
            const savedDecks = JSON.parse(localStorage.getItem('sonOfCardDecks') || '[]');
            const updatedDecks = savedDecks.map(d => 
                d.id === deck.id ? deck : d
            );
            localStorage.setItem('sonOfCardDecks', JSON.stringify(updatedDecks));
        }
    }, [deck]);

    // Add card to deck
    const addCardToDeck = (card) => {
        // Check if we already have 3 copies of this card
        const cardCount = deck.cards.filter(c => c.id === card.id).length;
        if (cardCount >= 3) {
            alert('You can only have 3 copies of the same card in your deck.');
            return;
        }

        // Check deck size limit (30 cards)
        if (deck.cards.length >= 30) {
            alert('Your deck is already full (30 cards maximum).');
            return;
        }

        setDeck({
            ...deck,
            cards: [...deck.cards, card]
        });
    };

    // Remove card from deck
    const removeCardFromDeck = (index) => {
        const newCards = [...deck.cards];
        newCards.splice(index, 1);
        setDeck({
            ...deck,
            cards: newCards
        });
    };

    // Handle deck name change
    const handleDeckNameChange = (e) => {
        setDeck({
            ...deck,
            name: e.target.value
        });
    };

    // Save deck and return to home
    const saveDeck = () => {
        if (!deck.name.trim()) {
            alert('Please give your deck a name.');
            return;
        }

        if (deck.cards.length < 20) {
            alert('Your deck must have at least 20 cards.');
            return;
        }

        navigate('/');
    };

    // Filter cards based on search term, type, and rarity
    const filteredCards = allCards.filter(card => {
        const matchesSearch = card.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              card.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType ? card.type === filterType : true;
        const matchesRarity = filterRarity ? card.rarity === filterRarity : true;
        
        return matchesSearch && matchesType && matchesRarity;
    });

    // Get unique card types and rarities for filters
    const cardTypes = [...new Set(allCards.map(card => card.type))].filter(Boolean);
    const cardRarities = [...new Set(allCards.map(card => card.rarity))].filter(Boolean);

    // Group deck cards by title for display
    const groupedDeckCards = deck.cards.reduce((acc, card) => {
        const existingCard = acc.find(c => c.id === card.id);
        if (existingCard) {
            existingCard.count += 1;
        } else {
            acc.push({ ...card, count: 1 });
        }
        return acc;
    }, []);

    return (
        <div className="deck-builder-container">
            <div className="deck-side">
                <div className="deck-header">
                    <h2>Deck Builder</h2>
                    <input 
                        type="text" 
                        value={deck.name} 
                        onChange={handleDeckNameChange} 
                        placeholder="Deck Name" 
                        className="deck-name-input"
                    />
                </div>
                
                <div className="deck-stats">
                    <span>Cards: {deck.cards.length}/30</span>
                </div>
                
                <div className="deck-list">
                    {groupedDeckCards.map((card, index) => (
                        <div key={`${card.id}-${index}`} className="deck-card-item">
                            <div className="deck-card-info">
                                <span className="deck-card-title">{card.title}</span>
                                <span className="deck-card-count">x{card.count}</span>
                            </div>
                            <div className="deck-card-stats">
                                <span className="deck-card-attack">{card.attack}</span>
                                <span className="deck-card-health">{card.health}</span>
                            </div>
                            <button 
                                className="remove-card-btn"
                                onClick={() => removeCardFromDeck(deck.cards.findIndex(c => c.id === card.id))}
                            >
                                -
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className="deck-actions">
                    <button className="save-deck-btn" onClick={saveDeck}>
                        Save Deck
                    </button>
                    <button className="cancel-btn" onClick={() => navigate('/')}>
                        Cancel
                    </button>
                </div>
            </div>
            
            <div className="cards-collection-side">
                <div className="collection-filters">
                    <input
                        type="text"
                        placeholder="Search cards..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    
                    <div className="filter-selects">
                        <select 
                            value={filterType} 
                            onChange={(e) => setFilterType(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">All Types</option>
                            {cardTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        
                        <select 
                            value={filterRarity} 
                            onChange={(e) => setFilterRarity(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">All Rarities</option>
                            {cardRarities.map(rarity => (
                                <option key={rarity} value={rarity}>{rarity}</option>
                            ))}
                        </select>
                        
                        <button 
                            className="clear-filters-btn" 
                            onClick={() => {
                                setSearchTerm('');
                                setFilterType('');
                                setFilterRarity('');
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
                
                {isLoading ? (
                    <div className="loading">Loading cards...</div>
                ) : (
                    <div className="cards-grid">
                        {filteredCards.map(card => (
                            <div key={card.id} className="card-item" onClick={() => addCardToDeck(card)}>
                                <Card
                                    id={card.id}
                                    health={card.health}
                                    attack={card.attack}
                                    imageLink={card.imageLink}
                                    title={card.title}
                                    description={card.description}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeckBuilder;