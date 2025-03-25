import React from "react";
import { useState } from "react";
import "../styles/Card.css";

const Card = ( ) => {
    const [health, setHealth] = useState(0);
    const [attack, setAttack] = useState(0);
    const [imageLink, setImageLink] = useState("/images/Zeus.png");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div className="card-container">
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