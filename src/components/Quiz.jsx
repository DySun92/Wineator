import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  { key: 'type', text: { pt:'Que tipo de vinho prefere?', en:'Which type of wine do you prefer?', es:'¿Qué tipo de vino prefieres?', fr:'Quel type de vin préférez-vous?' }, options: ['Tinto','Branco','Rosé','Espumante','Indiferente'] },
  { key: 'sweetness', text: { pt:'Qual o nível de doçura que prefere?', en:'What sweetness level do you prefer?', es:'¿Qué nivel de dulzura prefieres?', fr:'Quel niveau de douceur préférez-vous?' }, options: ['Seco','Meio Seco','Doce','Indiferente'] },
  { key: 'body', text: { pt:'Qual a intensidade do corpo do vinho?', en:'What body intensity do you prefer?', es:'¿Qué intensidad de cuerpo prefieres?', fr:'Quelle intensité du corps préférez-vous?' }, options: ['Leve','Médio','Encorpado','Indiferente'] },
  { key: 'priceRange', text: { pt:'Qual a faixa de preço?', en:'Which price range?', es:'¿Qué rango de precio?', fr:'Quelle fourchette de prix?' }, options: ['0-10','10-20','20-30','30-50','50+','Indiferente'] },
  { key: 'origin', text: { pt:'Tem preferência por alguma origem?', en:'Do you prefer any origin?', es:'¿Prefieres algún origen?', fr:'Préférez-vous une origine particulière?' }, options: ['Portugal','França','Itália','Espanha','Indiferente'] },
  { key: 'occasion', text: { pt:'É para uma ocasião especial ou consumo diário?', en:'Is this for a special occasion or daily use?', es:'¿Es para una ocasión especial o uso diario?', fr:'C\'est pour une occasion spéciale ou un usage quotidien?' }, options: ['Especial','Diário','Indiferente'] }
];

export default function Quiz({ lang, t, onFinish }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  function handleAnswer(value){
    const key = QUESTIONS[step].key;
    const next = {...answers, [key]: value};
    setAnswers(next);
    if(step < QUESTIONS.length - 1) setStep(s => s + 1);
    else onFinish(next);
  }

  return (
    <div className="card">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:0.28}}>
          <div className="small" style={{marginBottom:8}}>{t('questionOf', { current: step + 1, total: QUESTIONS.length })}</div>
          <h2 style={{margin:'8px 0 16px'}}>{QUESTIONS[step].text[lang]}</h2>

          <div className="grid grid-cols-2" style={{gap:10}}>
            {QUESTIONS[step].options.map(opt => (
              <motion.button
                key={opt}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleAnswer(opt)}
                className="btn btn-primary"
                style={{ width: '100%', background: 'var(--accent)' }}
                aria-label={opt}
              >
                {opt}
              </motion.button>
            ))}
          </div>

          <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
            <button className="btn btn-ghost" onClick={() => setStep(s => Math.max(0, s - 1))}>{t('btnBack')}</button>
            <button className="btn btn-muted" onClick={() => handleAnswer('Indiferente')}>{t('btnIndifferent')}</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
