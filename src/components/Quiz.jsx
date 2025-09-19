import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import initialWines from '../data/wines';

function toPriceRange(price){
  if(price <= 10) return '0-10';
  if(price <= 20) return '10-20';
  if(price <= 30) return '20-30';
  if(price <= 50) return '30-50';
  return '50+';
}

export default function Quiz({ lang, t, onFinish }) {
  // build options from catalog
  const catalog = initialWines;
  const types = useMemo(()=> Array.from(new Set(catalog.map(w=>w.type))).sort(), [catalog]);
  const sweetnesses = useMemo(()=> Array.from(new Set(catalog.map(w=>w.sweetness))).sort(), [catalog]);
  const bodies = useMemo(()=> Array.from(new Set(catalog.map(w=>w.body))).sort(), [catalog]);
  const origins = useMemo(()=> Array.from(new Set(catalog.map(w=>w.origin))).sort(), [catalog]);
  const occasions = useMemo(()=> {
    const s = new Set();
    catalog.forEach(w => w.occasion.forEach(o => s.add(o)));
    return Array.from(s).sort();
  }, [catalog]);
  const priceRanges = useMemo(()=> Array.from(new Set(catalog.map(w=>toPriceRange(w.price)))).sort((a,b)=>{
    const order = ['0-10','10-20','20-30','30-50','50+']; return order.indexOf(a)-order.indexOf(b);
  }), [catalog]);

  const QUESTIONS = [
    { key:'type', label: {pt:'Que tipo de vinho prefere?', en:'Which type of wine do you prefer?', es:'¿Qué tipo de vino prefieres?', fr:'Quel type de vin préférez-vous?'}, options: [...types,'Indiferente'] },
    { key:'sweetness', label: {pt:'Qual o nível de doçura?', en:'What sweetness level?', es:'¿Qué nivel de dulzura?', fr:'Quel niveau de douceur?'}, options: [...sweetnesses,'Indiferente'] },
    { key:'body', label: {pt:'Qual a intensidade do corpo?', en:'What body intensity?', es:'¿Qué intensidad de cuerpo?', fr:'Quelle intensité du corps?'}, options: [...bodies,'Indiferente'] },
    { key:'priceRange', label: {pt:'Qual a faixa de preço?', en:'Which price range?', es:'¿Qué rango de precio?', fr:'Quelle fourchette de prix?'}, options: [...priceRanges,'Indiferente'] },
    { key:'origin', label: {pt:'Tem preferência por alguma origem?', en:'Do you prefer an origin?', es:'¿Prefieres algún origen?', fr:'Préférez-vous une origine?'}, options: [...origins,'Indiferente'] },
    { key:'occasion', label: {pt:'É para ocasião especial ou consumo diário?', en:'Special occasion or daily use?', es:'¿Ocasión especial o uso diario?', fr:'Occasion spéciale ou usage quotidien?'}, options: [...occasions,'Indiferente'] }
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  function handleAnswer(value){
    const key = QUESTIONS[step].key;
    const v = value === 'Indiferente' ? null : value;
    const next = {...answers, [key]: v};
    setAnswers(next);
    if(step < QUESTIONS.length - 1) setStep(s=>s+1);
    else onFinish(next);
  }

  return (
    <div className="card">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:0.28}}>
          <div className="progress-text">{t('questionOf', {current: step+1, total: QUESTIONS.length})}</div>
          <h2 className="question-title">{QUESTIONS[step].label[lang]}</h2>

          <div className="grid cols-2" style={{marginTop:10}}>
            {QUESTIONS[step].options.map(opt => (
              <motion.button key={opt}
                whileTap={{scale:0.98}}
                whileHover={{scale:1.02}}
                onClick={()=>handleAnswer(opt)}
                className="btn btn-primary"
                style={{minHeight:48, width:'100%', background:'var(--accent)'}}
              >
                {opt}
              </motion.button>
            ))}
          </div>

          <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
            <button onClick={()=>setStep(s=>Math.max(0,s-1))} className="btn btn-ghost">{t('btnBack')}</button>
            <button onClick={()=>handleAnswer('Indiferente')} className="btn btn-muted">{t('btnIndifferent')}</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
