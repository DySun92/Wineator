import React from 'react';
import { motion } from 'framer-motion';
import wines from '../data/wines';
import WineCard from './WineCard';
import { getT } from '../i18n';

/* weights */
const WEIGHTS = { type: 2.0, priceRange: 1.4, harmonization: 2.0, occasion: 1.0, origin: 0.6 };

/* price range helper (same as used in Quiz) */
function priceRangeFor(price){
  if(price <= 20) return '13-20';
  if(price <= 30) return '21-30';
  if(price <= 50) return '31-50';
  return '50+';
}

function scoreWine(wine, answers){
  let total = 0, matched = 0;
  for(const key in WEIGHTS){
    const w = WEIGHTS[key] || 1;
    total += w;
    const a = answers[key];
    if(!a){ matched += w * 0.5; continue; }
    if(key === 'priceRange'){
      const pr = priceRangeFor(wine.price);
      if(pr === a) matched += w;
      else {
        const order = ['13-20','21-30','31-50','50+'];
        const di = Math.abs(order.indexOf(pr) - order.indexOf(a));
        if(di === 1) matched += w * 0.6;
      }
    } else if(key === 'harmonization'){
      // a is 'Carne' or 'Peixe'
      if(a === 'Carne' && wine.food && wine.food.includes('carne')) matched += w;
      else if(a === 'Peixe' && wine.food && wine.food.includes('peixe')) matched += w;
    } else if(key === 'occasion'){
      if(Array.isArray(wine.occasion) && wine.occasion.includes(a)) matched += w;
    } else if(key === 'origin'){
      if(String(wine.origin) === String(a)) matched += w;
    } else {
      if(String(wine[key]) === String(a)) matched += w;
    }
  }
  return Math.round((matched / total) * 100);
}

export default function Results({ answers, onRestart, lang }) {
  const t = getT(lang);

  // required keys (non-null)
  const required = Object.keys(answers).filter(k => answers[k] !== null && answers[k] !== undefined);

  // Strict matches: all answers must be satisfied
  const strictMatches = wines.filter(w => {
    return required.every(k => {
      if(k === 'priceRange') return priceRangeFor(w.price) === answers[k];
      if(k === 'harmonization'){
        if(answers[k] === 'Carne') return w.food && w.food.includes('carne');
        if(answers[k] === 'Peixe') return w.food && w.food.includes('peixe');
        return true;
      }
      if(k === 'occasion') return Array.isArray(w.occasion) && w.occasion.includes(answers[k]);
      if(k === 'origin') return String(w.origin) === String(answers[k]);
      return String(w[k]) === String(answers[k]);
    });
  });

  let finalList = [];
  if(strictMatches.length >= 1){
    strictMatches.sort((a,b) => (b.stock - a.stock) || (a.price - b.price));
    finalList = strictMatches.slice(0,3);
  } else {
    // fallback scored list
    let scored = wines.map(w => ({...w, score: scoreWine(w, answers)}));
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
        {finalList.map(w => <WineCard key={w.id} wine={w} t={ (k)=>{ /* not used here */ } } />)}
      </div>

      <div style={{marginTop:12,display:'flex',justifyContent:'flex-end',gap:8}}>
        <button onClick={onRestart} className="btn btn-primary" style={{background:'var(--accent)'}}>{t('btnRestart')}</button>
      </div>

      {strictMatches.length === 0 && (
        <div style={{marginTop:10}} className="small">{t('noResults')}</div>
      )}
    </motion.div>
  );
}
