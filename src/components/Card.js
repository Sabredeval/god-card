import React from "react";
import "../styles/Card.css";

const Card = ({ 
    id,
    health = 0, 
    attack = 0, 
    imageLink = "/images/Zeus.png", 
    title = "", 
    description = "",
    type = "",
    worshipCost = 0, // property for gods only
    onCardClick = () => {}
}) => {
    const isGod = type === "god";
    
    return (
        <div className={`card-container ${isGod ? 'card-god' : ''}`} onClick={() => onCardClick(id)}>
            <div className="card-stats">
                <div className="card-attack">
                    {attack}
                </div>
                <div className="card-health">
                    {health}
                </div>
            </div>
            <div className="card-image">
                <img src={imageLink} alt={title} />
            </div>
            <div className="card-title">
                {title || "Unnamed Card"}
            </div>
            <div className="card-description">
                {description || "No description available."}
            </div>
            {isGod && worshipCost > 0 && (
                <div className="card-worship-cost">
                    {worshipCost} ✨
                </div>
            )}
        </div>
    );
}

export default Card;