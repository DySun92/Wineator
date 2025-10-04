import React from "react";

export default function CocktailCard({ cocktail }) {
  return (
    <article className="wine-card" role="article" aria-label={cocktail.name}>
      <div className="wine-img-wrap">
        <img
          src={cocktail.image || "/wines/fallback.png"}
          alt={cocktail.name}
          className="wine-img"
          onError={(e) => (e.currentTarget.src = "/wines/fallback.png")}
        />
      </div>
      <div className="wine-body">
        <div style={{ textAlign: "left" }}>
          <div className="wine-name">{cocktail.name}</div>
          <div className="small">
            {cocktail.base} • {cocktail.strength}
          </div>
        </div>
        <div className="small" aria-label="Preço">{cocktail.price}€</div>
      </div>
    </article>
  );
}
