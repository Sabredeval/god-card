import React from "react";
import "../styles/Deck.css";

const Deck = ({
    cards = [],
    onDeckClick = () => {}
}) => {

    return (
        <div className="deck-container">
            <div className="deck-cards" onClick={onDeckClick}>
                <div className="deck-count">{cards.length}</div>
            </div>
            <div className="deck-label">Deck</div>
        </div>
    );
}

export default Deck;