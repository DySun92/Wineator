import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import menu from '../data/menu';
import { getT, labelCategory, labelDish } from '../i18n';

export default function Quiz({ language='pt', onFinish }) {
  const t = getT(language);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({
    entradaCat: null,
    entradaItem: null,
    mainCat: null,
    mainItem: null,
    drinkType: null,     // 'Wine' | 'Cocktail'
    winePref: null,
    cFlavor: null,       // 'fresh' | 'fruity' | 'bitter' | 'sweet' | 'spiced'
    cBase: null,         // 'Gin' | 'Vodka' | 'Rum' | 'Tequila' | 'Whiskey'
    cStrength: null      // 'light' | 'medium' | 'strong'
  });

  const steps = useMemo(()=> {
    const common = [
      { key: 'entradaCat', type:'cat',   title: t('chooseStarterCat'), data: Object.keys(menu.entradas) },
      { key: 'entradaItem', type:'item', title: t('chooseStarterItem'), data: () => menu.entradas[answers.entradaCat] || [] },

      { key: 'mainCat',     type:'cat',  title: t('chooseMainCat'), data: Object.keys(menu.principais) },
      { key: 'mainItem',    type:'item', title: t('chooseMainItem'), data: () => menu.principais[answers.mainCat] || [] },

      { key: 'drinkType', type:'options', title: t('chooseDrinkType'), data: [
        { id:'d1', name: t('drinkTypes').wine, value: 'Wine' },
        { id:'d2', name: t('drinkTypes').cocktail, value: 'Cocktail' }
      ]},
    ];

    if(answers.drinkType === 'Wine'){
      common.push({
        key: 'winePref', type:'options', title: t('winePrefQ'), data: [
          { id:'w0', name: t('wineTypes').indifferent, value: null },
          { id:'w1', name: t('wineTypes').Tinto, value: 'Tinto' },
          { id:'w2', name: t('wineTypes').Branco, value: 'Branco' },
          { id:'w3', name: t('wineTypes').Rosé, value: 'Rosé' },
          { id:'w4', name: t('wineTypes').Espumante, value: 'Espumante' },
        ]
      });
    } else if(answers.drinkType === 'Cocktail'){
      common.push(
        { key:'cFlavor', type:'options', title: t('cocktailFlavorQ'), data: [
          {id:'cf0', name:t('cocktailFlavor').indifferent, value:null},
          {id:'cf1', name:t('cocktailFlavor').fresh, value:'fresh'},
          {id:'cf2', name:t('cocktailFlavor').fruity, value:'fruity'},
          {id:'cf3', name:t('cocktailFlavor').bitter, value:'bitter'},
          {id:'cf4', name:t('cocktailFlavor').sweet, value:'sweet'},
          {id:'cf5', name:t('cocktailFlavor').spiced, value:'spiced'},
        ]},
        { key:'cBase', type:'options', title: t('cocktailBaseQ'), data: [
          {id:'cb0', name:t('cocktailBase').indifferent, value:null},
          {id:'cb1', name:t('cocktailBase').gin, value:'Gin'},
          {id:'cb2', name:t('cocktailBase').vodka, value:'Vodka'},
          {id:'cb3', name:t('cocktailBase').rum, value:'Rum'},
          {id:'cb4', name:t('cocktailBase').tequila, value:'Tequila'},
          {id:'cb5', name:t('cocktailBase').whiskey, value:'Whiskey'},
        ]},
        { key:'cStrength', type:'options', title: t('cocktailStrengthQ'), data: [
          {id:'cs0', name:t('cocktailStrength').indifferent, value:null},
          {id:'cs1', name:t('cocktailStrength').light, value:'light'},
          {id:'cs2', name:t('cocktailStrength').medium, value:'medium'},
          {id:'cs3', name:t('cocktailStrength').strong, value:'strong'},
        ]}
      );
    }

    return common;
  }, [language, answers.entradaCat, answers.mainCat, answers.drinkType]);

  const current = steps[stepIndex];
  const items = typeof current.data === 'function' ? current.data() : current.data;

  function onSelect(it){
    const key = current.key;
    let value = it;
    if(key === 'drinkType' || key === 'winePref' || key.startsWith('c')) value = it.value ?? null;

    setAnswers(prev => ({...prev, [key]: value}));

    const next = stepIndex + 1;

    // ⚙️ FIX: Se escolher "drinkType", nunca finalizar já — avançar para o novo passo (winePref ou cFlavor)
    if(key === 'drinkType'){
      setStepIndex(next);
      return;
    }

    // Se ainda há passos, avança; caso contrário, finalizar
    if(next < steps.length){
      setStepIndex(next);
    } else {
      const final = {
        entrada: answers.entradaItem,
        principal: answers.mainItem,
        drinkType: answers.drinkType ?? (key === 'drinkType' ? value : null),
        winePref: key==='winePref' ? value : answers.winePref,
        cFlavor: answers.cFlavor ?? (key==='cFlavor' ? value : null),
        cBase: answers.cBase ?? (key==='cBase' ? value : null),
        cStrength: answers.cStrength ?? (key==='cStrength' ? value : null)
      };
      if(final.principal?.price){
        const p = Number(final.principal.price);
        final.priceRange = p <= 20 ? '13-20' : p <= 30 ? '21-30' : p <= 50 ? '31-50' : '50+';
      }
      onFinish(final);
    }
  }

  function goBack(){ setStepIndex(i => Math.max(0, i-1)); }

  // NOVO: 1–3 opções => coluna vertical elegante; 4+ => grelha
  const fewOptions = items.length <= 3;
  const containerClass = fewOptions ? 'stack few' : 'grid cols-2';

  const renderLabel = (it) => {
    if(current.type === 'cat'){
      return labelCategory(current.key.includes('entrada') ? 'entradas' : 'principais', it, language);
    }
    if(current.type === 'item'){
      return `${labelDish(it.id, it.name, language)}${it.price ? ` • ${it.price}€` : ''}`;
    }
    return it.name; // options
  };

  return (
    <div className="card" style={{minHeight:'56svh', display:'flex', flexDirection:'column'}}>
      <AnimatePresence mode="wait">
        <motion.div key={stepIndex} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:0.25}} style={{display:'flex', flexDirection:'column', flex:1}}>
          <div className="progress-text">{t('questionOf', {current: stepIndex+1, total: steps.length})}</div>
          <h2 className="question-title" style={{marginBottom:12}}>{current.title}</h2>

          <div className={containerClass} style={{marginTop:4, flex:1}}>
            {items.map((it) => (
              <motion.button key={it.id || it}
                whileTap={{scale:0.98}} whileHover={{scale:1.02}}
                onClick={() => onSelect(it)}
                className="btn btn-primary option-btn"
              >
                {renderLabel(it)}
              </motion.button>
            ))}
          </div>

          <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
            <button onClick={goBack} className="btn btn-ghost">{t('btnBack')}</button>
            <button onClick={()=>{
              const next = stepIndex + 1;
              if(next < steps.length) setStepIndex(next);
              else {
                const final = {
                  entrada: answers.entradaItem,
                  principal: answers.mainItem,
                  drinkType: answers.drinkType ?? null,
                  winePref: answers.winePref ?? null,
                  cFlavor: answers.cFlavor ?? null,
                  cBase: answers.cBase ?? null,
                  cStrength: answers.cStrength ?? null,
                  priceRange: answers.mainItem?.price
                    ? (answers.mainItem.price <= 20 ? '13-20' : answers.mainItem.price <= 30 ? '21-30' : answers.mainItem.price <= 50 ? '31-50' : '50+')
                    : null
                };
                onFinish(final);
              }
            }} className="btn btn-muted">{t('skip')}</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
