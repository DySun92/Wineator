import React from "react";

export default function CocktailCard({ cocktail }) {
  return (
    <div className="wine-card">
      <div className="wine-img-wrap">
        <img
          src={cocktail.image || "/fallback.png"}
          alt={cocktail.name}
          className="wine-img"
        />
      </div>
      <div className="wine-body">
        <div>
          <div className="wine-name">{cocktail.name}</div>
          <div className="small">
            {cocktail.base} • {cocktail.strength}
          </div>
        </div>
        <div>{cocktail.price}€</div>
      </div>
    </div>
  );
}
