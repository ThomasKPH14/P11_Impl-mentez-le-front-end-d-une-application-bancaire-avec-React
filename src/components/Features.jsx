import React from 'react';

// Importation du fichier JSON qui récupère les informations de la page d'accueil
import FeaturesData from "../app/features.json"

function Features() {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            <>
                {FeaturesData.map(({ picture, title, content }, index) => (
                    <React.Fragment key={index}>
                        <div className="feature-item">
                            <img src={picture} alt="Chat Icon" className="feature-icon" />
                            <h3 className="feature-item-title">{title}</h3>
                            <p>{content}</p>
                        </div>
                    </React.Fragment>
                ))}
            </>
        </section>
    )
}

export default Features;