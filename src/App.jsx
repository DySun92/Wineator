import React, { useEffect, useMemo, useState } from 'react';
import LanguageSwitcher from './components/LanguageSwitcher';
import Quiz from './components/Quiz';
import Results from './components/Results';
import initialWines from './data/wines';
import { getT, LANGS } from './i18n';

/* CONFIG */
const MIN_RESULTS = 3;
const WEIGHTS = { type: 2.0, sweetness: 1.5, body: 1.8, priceRange: 1.2, origin: 0.8, occasion: 1.0 };

/* Helpers */
function priceToRange(price) {
  if (price <= 10) return '0-10';
  if (price <= 20) return '10-20';
  if (price <= 30) return '20-30';
  if (price <= 50) return '30-50';
  return '50+';
}

function scoreWine(wine, answers) {
  let total = 0, matched = 0;
  for (const k of Object.keys(WEIGHTS)) {
    const w = WEIGHTS[k] || 1;
    total += w;
    const a = answers[k];
    if (!a || a === 'Indiferente') { matched += w * 0.5; continue; }
    if (k === 'priceRange') {
      const wineRange = priceToRange(wine.price ?? wine.priceRange ?? 0);
      if (wineRange === a) matched += w;
      else {
        // adjacent range gives half match
        const order = ['0-10','10-20','20-30','30-50','50+'];
        const di = Math.abs(order.indexOf(wineRange) - order.indexOf(a));
        if (di === 1) matched += w * 0.6;
      }
    } else {
      if (String(wine[k]) === String(a)) matched += w;
    }
  }
  // result 0..100
  return Math.round((matched / total) * 100);
}

export default function App() {
  const [lang, setLang] = useState('pt');
  const t = useMemo(() => getT(lang), [lang]);
  const [catalog, setCatalog] = useState(() => initialWines);
  const [results, setResults] = useState([]);
  const [answers, setAnswers] = useState({});
  const [includeOOS, setIncludeOOS] = useState(false);

  useEffect(() => {
    // ensure images load quickly by preloading first 3 images
    catalog.slice(0,3).forEach(w => {
      const img = new Image(); img.src = w.image;
    });
  }, [catalog]);

  function computeResults(finalAnswers, includeOut=false) {
    // score
    let scored = catalog.map(w => ({ ...w, score: scoreWine(w, finalAnswers) }));
    // small boost for in-stock
    scored = scored.map(s => ({ ...s, score: s.score + (s.stock > 0 ? 6 : 0) }));
    scored.sort((a,b) => b.score - a.score);

    // filter out of stock if not included
    let filtered = includeOut ? scored : scored.filter(s => s.stock > 0);
    if (filtered.length < MIN_RESULTS) {
      const need = Math.min(MIN_RESULTS - filtered.length, scored.length - filtered.length);
      const extras = scored.filter(s => !filtered.includes(s)).slice(0, need);
      filtered = filtered.concat(extras);
    }

    // fallback: if still empty (catalog < MIN_RESULTS) use the top ones
    if (filtered.length === 0) filtered = scored.slice(0, Math.min(MIN_RESULTS, scored.length));

    setResults(filtered.slice(0, Math.min(MIN_RESULTS, filtered.length)));
  }

  function onFinishQuiz(finalAnswers) {
    setAnswers(finalAnswers);
    computeResults(finalAnswers, includeOOS);
  }

  function restart() {
    setAnswers({});
    setResults([]);
    setIncludeOOS(false);
  }

  function toggleIncludeOOS() {
    const val = !includeOOS;
    setIncludeOOS(val);
    if (Object.keys(answers).length) computeResults(answers, val);
  }

  return (
    <div className="app-shell">
      <header className="header">
        <div className="brand">
          <div className="logo">W</div>
          <div>
            <div className="title">{t('appTitle')}</div>
            <div className="subtitle">{t('tagline')}</div>
          </div>
        </div>

        <div className="controls">
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>
      </header>

      <main>
        {!results.length ? (
          <div className="grid">
            <Quiz lang={lang} t={t} onFinish={onFinishQuiz} />
          </div>
        ) : (
          <Results t={t} results={results} restart={restart} includeOOS={includeOOS} toggleIncludeOOS={toggleIncludeOOS} />
        )}
      </main>

      <footer className="footer">© {new Date().getFullYear()} Wineator — {t('tagline')}</footer>
    </div>
  );
}
