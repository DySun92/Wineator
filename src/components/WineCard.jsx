import React from 'react';

export default function WineCard({ wine, t }) {
  return (
    <article className="wine-card">
      <div className="wine-img-wrap">
        <img src={wine.image} alt={wine.name} onError={(e)=>e.target.src='/wines/fallback.png'} className="wine-img" />
      </div>
      <div className="wine-body">
        <div>
          <div className="wine-name">{wine.name}</div>
          <div className="small">{wine.type} • {wine.body} • {wine.sweetness}</div>
          <div className="small">{t('price')}: {wine.price}€ • {t('origin')}: {wine.origin}</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontWeight:800}}>{wine.stock > 0 ? `x${wine.stock}` : '—'}</div>
          <div className="small" style={{marginTop:6}}>{wine.stock > 0 ? 'Disponível' : 'Sem stock'}</div>
        </div>
      </div>
    </article>
  );
}
