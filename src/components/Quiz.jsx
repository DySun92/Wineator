import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import wines from '../data/wines';
import { getT, getOptionLabel } from '../i18n';

// helper price range
function priceToRange(value){
  if (value <= 10) return '0-10';
  if (value <= 20) return '13-20' /* adapt to catalogue presence */;
  if (value <= 30) return '21-30';
  if (value <= 50) return '31-50';
  return '50+';
}

// We'll map according to catalog values: 13-20,21-30,31-50,50+
function priceRangeFor(price){
  if(price <= 20) return '13-20';
  if(price <= 30) return '21-30';
  if(price <= 50) return '31-50';
  return '50+';
}

export default function Quiz({ lang, onFinish }) {
  const t = getT(lang);

  // build sets from catalog (only options that exist)
  const types = useMemo(()=> Array.from(new Set(wines.map(w => w.type))), []);
  const priceRanges = useMemo(()=> {
    const set = new Set(wines.map(w => priceRangeFor(w.price)));
    // keep only ranges present and order them
    const order = ['13-20','21-30','31-50','50+'];
    return Array.from(set).sort((a,b)=>order.indexOf(a)-order.indexOf(b));
  }, []);
  // harmonization options fixed but show only items if present in any wine
  const hasMeat = useMemo(()=> wines.some(w => w.food && w.food.includes('carne')), []);
  const hasFish = useMemo(()=> wines.some(w => w.food && w.food.includes('peixe')), []);
  // occasions present in catalog
  const occasions = useMemo(()=> Array.from(new Set(wines.flatMap(w => w.occasion))).sort(), []);
  const origins = useMemo(()=> Array.from(new Set(wines.map(w => w.origin))).sort(), []);

  // questions array (5 questions)
  const QUESTIONS = [
    { key:'type', label: { pt:'Que tipo de vinho prefere?', en:'Which type of wine do you prefer?', es:'¿Qué tipo de vino prefieres?', fr:'Quel type de vin préférez-vous ?' }, options: [...types] },
    { key:'priceRange', label: { pt:'Qual a faixa de preço?', en:'Which price range?', es:'¿Qué rango de precio?', fr:'Quelle fourchette de prix ?' }, options: [...priceRanges] },
    { key:'harmonization', label: { pt:'O vinho vai acompanhar carne ou peixe?', en:'Will the wine accompany meat or fish?', es:'¿El vino acompañará carne o pescado?', fr:'Le vin accompagnera-t-il de la viande ou du poisson ?' }, options: (() => {
        const arr = [];
        if(hasMeat) arr.push('Carne');
        if(hasFish) arr.push('Peixe');
        arr.push('SemPreferencia');
        return arr;
      })()
    },
    { key:'occasion', label: { pt:'Qual a ocasião?', en:'What\'s the occasion?', es:'¿Cuál es la ocasión?', fr:'Quelle est l\'occasion ?' }, options: [...occasions] },
    { key:'origin', label: { pt:'Prefere alguma região?', en:'Do you prefer a region?', es:'¿Prefieres alguna región?', fr:'Préférez-vous une région ?' }, options: [...origins] }
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  function handleAnswer(value){
    const key = QUESTIONS[step].key;
    const v = value === 'SemPreferencia' ? null : value;
    const next = {...answers, [key]: v};
    setAnswers(next);
    if(step < QUESTIONS.length - 1) setStep(s => s + 1);
    else onFinish(next);
  }

  return (
    <div className="card">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:0.28}}>
          <div className="progress-text">{t('questionOf', { current: step+1, total: QUESTIONS.length })}</div>
          <h2 className="question-title">{QUESTIONS[step].label[lang]}</h2>

          <div className="grid cols-2" style={{marginTop:10, gap:10}}>
            {QUESTIONS[step].options.map(opt => {
              let display = opt;
              if(QUESTIONS[step].key === 'priceRange') display = getOptionLabel(lang, 'priceRange', opt);
              if(QUESTIONS[step].key === 'type') display = getOptionLabel(lang, 'type', opt);
              if(QUESTIONS[step].key === 'harmonization') display = getOptionLabel(lang, 'harmonization', opt);
              if(QUESTIONS[step].key === 'occasion') display = getOptionLabel(lang, 'occasion', opt) || opt;
              if(QUESTIONS[step].key === 'origin') display = opt;
              return (
                <motion.button key={opt}
                  whileTap={{scale:0.98}}
                  whileHover={{scale:1.02}}
                  onClick={()=>handleAnswer(opt)}
                  className="btn btn-primary"
                  style={{minHeight:48, width:'100%', background:'var(--accent)'}}
                  aria-label={display}
                >
                  {display}
                </motion.button>
              );
            })}
          </div>

          <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
            <button onClick={() => setStep(s => Math.max(0, s - 1))} className="btn btn-ghost">{t('btnBack')}</button>
            <button onClick={() => handleAnswer('SemPreferencia')} className="btn btn-muted">{t('btnIndifferent')}</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
