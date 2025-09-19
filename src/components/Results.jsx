import React from 'react';
import WineCard from './WineCard';
import { motion } from 'framer-motion';

export default function Results({ t, results, restart, includeOOS, toggleIncludeOOS }) {
  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2>{t('suggestions')}</h2>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <label className="small">{t('includeOOS')}</label>
          <input type="checkbox" checked={includeOOS} onChange={toggleIncludeOOS} aria-label="Include out of stock" />
        </div>
      </div>

      <div className="grid grid-cols-3" style={{marginTop:8}}>
        {results.map(w => <WineCard key={w.id} wine={w} t={t} />)}
      </div>

      <div style={{marginTop:12,display:'flex',gap:8,justifyContent:'flex-end'}}>
        <button onClick={restart} className="btn btn-primary" style={{background:'var(--accent)'}}>{t('btnRestart')}</button>
      </div>
    </motion.div>
  );
}
