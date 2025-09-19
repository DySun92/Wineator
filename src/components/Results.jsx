import React from 'react';
import { motion } from 'framer-motion';
import wines from '../data/wines';
import WineCard from './WineCard';

/* weights for scoring */
const WEIGHTS = { type: 2.0, sweetness: 1.2, body: 1.6, priceRange: 1.2, origin: 0.8, occasion: 1.0 };

function priceToRange(price){
  if (!price) return '0-10';
  if (price <= 10) return '0-10';
  if (price <= 20) return '10-20';
  if (price <= 30) return '20-30';
  if (price <= 50) return '30-50';
  return '50+';
}

function scoreWine(wine, answers){
  let total = 0, matched = 0;
  for(const key in WEIGHTS){
    const w = WEIGHTS[key] || 1;
    total += w;
    const a = answers[key];
    if(!a){ matched += w * 0.5; continue; } // indifferent gives half credit
    if(key === 'priceRange'){
      const range = priceToRange(wine.price);
      if(range === a) matched += w;
      else {
        // near range gets partial credit
        const order = ['0-10','10-20','20-30','30-50','50+'];
        const di = Math.abs(order.indexOf(range) - order.indexOf(a));
        if(di === 1) matched += w * 0.6;
      }
    } else {
      if(String(wine[key]) === String(a)) matched += w;
    }
  }
  return Math.round((matched/total) * 100);
}

export default function Results({ answers, onRestart, t }) {
  // STRICT FILTER: try exact matches for all non-null answers (including priceRange)
  const requiredKeys = Object.keys(answers).filter(k => answers[k] !== null && answers[k] !== undefined);
  let strictMatches = wines.filter(w => {
    return requiredKeys.every(k => {
      if(k === 'priceRange'){
        return priceToRange(w.price) === answers[k];
      }
      if(k === 'occasion'){
        return w.occasion.includes(answers[k]);
      }
      return String(w[k]) === String(answers[k]);
    });
  });

  // If strictMatches empty, compute scored fallback
  let finalList = [];
  if(strictMatches.length >= 1){
    // sort strict matches by stock then price etc
    strictMatches.sort((a,b) => (b.stock - a.stock) || (a.price - b.price));
    finalList = strictMatches.slice(0,3);
  } else {
    // score all wines
    let scored = wines.map(w => ({...w, score: scoreWine(w, answers)}));
    // boost in-stock
    scored = scored.map(s => ({...s, score: s.score + (s.stock > 0 ? 5 : 0)}));
    scored.sort((a,b) => b.score - a.score);
    finalList = scored.slice(0, Math.min(3, scored.length));
  }

  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div>
          <h2>{t('suggestions')}</h2>
          <div className="small" style={{marginTop:4}}>{t('orderNote')}</div>
        </div>
      </div>

      <div className="grid cols-3" style={{gap:12, marginTop:8}}>
        {finalList.map(w => <WineCard key={w.id} wine={w} t={t} />)}
      </div>

      <div style={{marginTop:12,display:'flex',justifyContent:'flex-end',gap:8}}>
        <button onClick={onRestart} className="btn btn-primary" style={{background:'var(--accent)'}}>{t('btnRestart')}</button>
      </div>

      {strictMatches && strictMatches.length === 0 && (
        <div style={{marginTop:10}} className="small">
          {t('noResults')}
        </div>
      )}
    </motion.div>
  );
}
