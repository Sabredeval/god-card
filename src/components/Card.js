import React from "react";
import "../styles/Card.css";

const Card = ({ 
    id,
    health = 0, 
    attack = 0, 
    imageLink = "/images/Zeus.png", 
    title = "", 
    description = "",
    onCardClick = () => {}
}) => {
    return (
        <div className="card-container" onClick={() => onCardClick(id)}>
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
        </div>
    );
}

export default Card;