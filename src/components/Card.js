import React from "react";
import "../styles/Card.css";

const Card = ({ 
    id,
    health = 0, 
    attack = 0, 
    imageLink = "/images/card-default.png", 
    title = "", 
    description = "",
    type = "",
    worshipCost = 0,
    effect = "",
    row = "",
    onCardClick = () => {},
    draggable = false
}) => {
    const isGod = type === "god";
    
    const handleDragStart = (e) => {
        // Store card data in the drag event
        const cardData = {
            id,
            health,
            attack,
            imageLink,
            title,
            type,
            worshipCost: isGod ? worshipCost : 0
        };
        e.dataTransfer.setData("cardData", JSON.stringify(cardData));
        // Set a custom drag image (optional)
        const dragImage = e.target.cloneNode(true);
        dragImage.style.transform = "scale(0.7)";
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 70, 100);
        setTimeout(() => {
            document.body.removeChild(dragImage);
        }, 0);
        
        // Add dragging class for visual feedback
        e.target.classList.add("dragging");
    };
    
    const handleDragEnd = (e) => {
        e.target.classList.remove("dragging");
    };
    
    return (
        <div 
            className={`card-container ${isGod ? 'card-god' : ''}`} 
            onClick={() => onCardClick(id)}
            draggable={draggable}
            onDragStart={draggable ? handleDragStart : null}
            onDragEnd={draggable ? handleDragEnd : null}
        >
            <div className="card-stats">
                <div className="card-attack">{attack}</div>
                <div className="card-health">{health}</div>
            </div>
            <div className="card-image">
                <img src={imageLink} alt={title} />
            </div>
            <div className="card-title">{title || "Unnamed Card"}</div>
            <div className="card-description">
                {description || "No description available."}
            </div>
            {isGod && worshipCost > 0 && (
                <div className="card-worship-cost">
                    {worshipCost} ✨
                </div>
            )}
            {type && (
                <div className="card-type">{type}</div>
            )}
        </div>
    );
}

export default Card;