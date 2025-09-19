import React from 'react';

export default function WineCard({ wine, t }) {
  return (
    <div className="card" role="article" aria-label={wine.name}>
      <img src={wine.image} alt={wine.name} className="wine-img" />
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
        <div>
          <div style={{fontWeight:700}}>{wine.name}</div>
          <div className="small">{wine.type} • {wine.body} • {wine.sweetness}</div>
          <div className="small">{t('price')}: {wine.price}€ • {t('origin')}: {wine.origin}</div>
          <div className="small">{t('occasion')}: {wine.occasion}</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontWeight:700}}>{wine.stock > 0 ? `${wine.stock}` : '—'}</div>
          <div className="small">{wine.stock > 0 ? `${t('price')}` : <span style={{color:'#bb1f3a'}}>Sem stock</span>}</div>
        </div>
      </div>
    </div>
  );
}
