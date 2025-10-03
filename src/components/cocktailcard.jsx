import React from 'react';

export default function CocktailCard({ cocktail }) {
  return (
    <article className="wine-card" role="article" aria-label={cocktail.name}>
      <div className="wine-img-wrap">
        <img src={cocktail.image} alt={cocktail.name} onError={(e)=>e.target.src='/wines/fallback.png'} className="wine-img" />
      </div>
      <div className="wine-body">
        <div style={{textAlign:'left'}}>
          <div className="wine-name">{cocktail.name}</div>
          <div className="small">{cocktail.base} • {cocktail.strength}</div>
          <div className="small">Preço: {cocktail.price}€</div>
        </div>
      </div>
    </article>
  );
}
