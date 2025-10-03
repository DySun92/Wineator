import React from 'react';
import { motion } from 'framer-motion';
import wines from '../data/wines';
import cocktails from '../data/cocktails';
import WineCard from './WineCard';
import CocktailCard from './CocktailCard';
import { getT } from '../i18n';

/** Pesos ajustados:
 *  - winePref agora é efetivamente “obrigatório” via filtragem do pool.
 *  - Ainda mantemos pontuação para ordenar dentro do tipo preferido.
 */
const W_WEIGHTS = { food: 3.0, winePref: 5.0, priceRange: 1.2, stockBonus: 5 };
const C_WEIGHTS = { food: 3.0, flavor: 2.2, base: 2.0, strength: 1.6 };

function priceRangeFor(price){
  if(price <= 20) return '13-20';
  if(price <= 30) return '21-30';
  if(price <= 50) return '31-50';
  return '50+';
}

function tagsFromItem(item){
  if(!item) return new Set();
  const k = item.keywords || [];
  const name = String(item.name || '').toLowerCase();
  const inf = [];
  if(name.includes('mexilh') || name.includes('ameijo') || name.includes('camar')) inf.push('marisco');
  if(name.includes('salmão') || name.includes('peixe')) inf.push('peixe');
  if(name.includes('cogumel')) inf.push('cogumelos');
  if(name.includes('alheira') || name.includes('kebab') || name.includes('burger') || name.includes('hamb')) inf.push('carne');
  if(name.includes('veg') || name.includes('bruschetta') || name.includes('guaca')) inf.push('vegetariano');
  if(name.includes('risotto')) inf.push('cremoso');
  if(name.includes('linguine') || name.includes('pasta')) inf.push('massas');
  return new Set([...k.map(x=>String(x).toLowerCase()), ...inf]);
}

/* ================= VINHOS ================= */

function scoreWine(wine, ans){
  let score = 0;
  const entrada = tagsFromItem(ans.entrada);
  const principal = tagsFromItem(ans.principal);
  const combined = new Set([...entrada, ...principal]);

  // pairing comida
  if(wine.food?.length){
    const lf = wine.food.map(f=>f.toLowerCase());
    const inter = Array.from(combined).filter(tag => lf.includes(tag));
    score += inter.length * W_WEIGHTS.food;
  }

  // preferência (ainda conte como ordenação dentro do tipo)
  if(ans.winePref){
    const same = String(wine.type).toLowerCase() === String(ans.winePref).toLowerCase();
    score += same ? W_WEIGHTS.winePref : -3.5;
  }

  // preço
  if(ans.priceRange){
    const wr = priceRangeFor(wine.price);
    if(wr === ans.priceRange) score += W_WEIGHTS.priceRange;
    else {
      const order = ['13-20','21-30','31-50','50+'];
      const di = Math.abs(order.indexOf(wr) - order.indexOf(ans.priceRange));
      if(di === 1) score += W_WEIGHTS.priceRange * 0.6;
      else score -= 0.6;
    }
  }

  if(wine.stock > 0) score += W_WEIGHTS.stockBonus;

  return Math.round(score);
}

/** Pool com preferência “hard”:
 *  1) Se há preferência (ex.: Tinto) e EXISTEM vinhos desse tipo → pool = só desse tipo.
 *  2) Se não existem vinhos desse tipo → pool = todos (para não ficar vazio).
 */
function getWinePool(ans){
  if(!ans.winePref) return wines;
  const typed = wines.filter(w => String(w.type).toLowerCase() === String(ans.winePref).toLowerCase());
  return typed.length ? typed : wines;
}

function recommendWines(ans){
  const pool = getWinePool(ans);

  // Strict por comida + (se existir) faixa de preço
  const mustTags = Array.from(tagsFromItem(ans.principal));
  const strict = pool.filter(w => {
    const lf = w.food.map(f=>f.toLowerCase());
    const okFood = mustTags.some(tag => lf.includes(tag));
    if(!okFood) return false;
    if(ans.priceRange && priceRangeFor(w.price) !== ans.priceRange) return false;
    return true;
  });

  if(strict.length){
    // ordenar por stock DESC e preço ASC (mais disponíveis e equilibrados primeiro)
    strict.sort((a,b)=> (b.stock - a.stock) || (a.price - b.price));
    return strict.slice(0,3);
  }

  // Fallback pontuado (dentro do pool já filtrado por tipo, se existir)
  return pool
    .map(w => ({...w, score: scoreWine(w, ans)}))
    .sort((a,b)=> b.score - a.score)
    .slice(0,3);
}

/* ================= COCKTAILS ================= */

function scoreCocktail(c, ans){
  let score = 0;

  // pairing comida (entrada + principal)
  const entrada = tagsFromItem(ans.entrada);
  const principal = tagsFromItem(ans.principal);
  const combined = new Set([...entrada, ...principal]);
  if(c.food?.length){
    const lf = c.food.map(f=>f.toLowerCase());
    const inter = Array.from(combined).filter(tag => lf.includes(tag));
    score += inter.length * C_WEIGHTS.food;
  }

  if(ans.cFlavor){
    score += (c.flavor || []).includes(ans.cFlavor) ? C_WEIGHTS.flavor : -0.8;
  }
  if(ans.cBase){
    score += (String(c.base).toLowerCase() === String(ans.cBase).toLowerCase()) ? C_WEIGHTS.base : -0.6;
  }
  if(ans.cStrength){
    score += (c.strength === ans.cStrength) ? C_WEIGHTS.strength : -0.4;
  }

  return Math.round(score);
}

function recommendCocktails(ans){
  const mustTags = Array.from(tagsFromItem(ans.principal));
  const strict = cocktails.filter(c => {
    const lf = (c.food || []).map(f=>f.toLowerCase());
    return mustTags.some(tag => lf.includes(tag));
  });

  if(strict.length){
    return strict.map(c => ({...c, score: scoreCocktail(c, ans)}))
                 .sort((a,b)=> b.score - a.score)
                 .slice(0,3);
  }

  return cocktails.map(c => ({...c, score: scoreCocktail(c, ans)}))
                  .sort((a,b)=> b.score - a.score)
                  .slice(0,3);
}

/* ================= UI ================= */

export default function Results({ answers, onRestart, language='pt' }) {
  const t = getT(language);

  const compact = {
    entrada: answers.entrada || null,
    principal: answers.principal || null,
    drinkType: answers.drinkType || 'Wine',
    winePref: answers.winePref || null,
    priceRange: answers.priceRange || null,
    cFlavor: answers.cFlavor || null,
    cBase: answers.cBase || null,
    cStrength: answers.cStrength || null
  };

  const isCocktail = compact.drinkType === 'Cocktail';
  const finalList = isCocktail ? recommendCocktails(compact) : recommendWines(compact);

  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="card" style={{minHeight:'56svh', display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div>
          <h2>{t('suggestions')}</h2>
          <div className="small" style={{marginTop:4}}>{t('orderNote')}</div>
        </div>
        <button onClick={onRestart} className="btn btn-ghost">{t('btnRestart')}</button>
      </div>

      <div className="grid adaptive-grid" style={{gap:12, marginTop:8}}>
        {finalList.map(item => isCocktail
          ? <CocktailCard key={item.id} cocktail={item} />
          : <WineCard key={item.id} wine={item} />)}
      </div>

      {finalList.length === 0 && (
        <div style={{marginTop:10}} className="small">{t('noResults')}</div>
      )}
    </motion.div>
  );
}
