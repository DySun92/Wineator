import React, { useMemo, useState } from 'react';
import LanguageSwitcher from './components/LanguageSwitcher';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { getT } from './i18n';
import wines from './data/wines';

export default function App(){
  const [lang, setLang] = useState('pt');
  const t = useMemo(()=> getT(lang), [lang]);
  const [answers, setAnswers] = useState(null);

  function onFinish(finalAnswers){
    setAnswers(finalAnswers);
  }

  function restart(){
    setAnswers(null);
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
        {!answers ? (
          <Quiz lang={lang} t={t} onFinish={onFinish} />
        ) : (
          <Results answers={answers} onRestart={restart} t={t} />
        )}
      </main>

      <footer className="footer">
        <div>© {new Date().getFullYear()} Wineator</div>
        <div className="social">
          <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label={t('instagramAlt')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="#6b1f3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" stroke="#6b1f3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.5 6.5h.01" stroke="#6b1f3a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
