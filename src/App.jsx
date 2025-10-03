import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Results from './components/Results';
import LanguageSwitcher from './components/LanguageSwitcher';
import { getT } from './i18n';
import './index.css';

export default function App(){
  const [lang, setLang] = useState('pt');
  const t = getT(lang);
  const [answers, setAnswers] = useState(null);

  return (
    <div className="app-shell">
      <header className="header">
        <div className="brand">
          <img src="/wineator-logo.png" alt="Wineator" className="logo-img" />
          <div>
            <div className="title">Wineator</div>
            <div className="subtitle" style={{fontStyle:'italic'}}>Beber com personalidade</div>
          </div>
        </div>
        <div className="controls"><LanguageSwitcher lang={lang} setLang={setLang} /></div>
      </header>

      <main>
        {!answers ? (
          <Quiz language={lang} onFinish={setAnswers} />
        ) : (
          <Results language={lang} answers={answers} onRestart={()=>setAnswers(null)} />
        )}
      </main>

      <div className="social-cta">
        <p style={{marginBottom:8,fontWeight:700}}>{t('followUs')}</p>
        <a className="social-btn" href="https://instagram.com/" target="_blank" rel="noreferrer">
          Instagram
        </a>
      </div>

      <footer className="footer">
        <div>© {new Date().getFullYear()} Wineator</div>
        <div className="small">{t('tagline')}</div>
      </footer>
    </div>
  );
}
