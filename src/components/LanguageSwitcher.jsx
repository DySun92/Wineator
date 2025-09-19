import React from 'react';

export default function LanguageSwitcher({ lang, setLang }) {
  return (
    <select className="lang-select" value={lang} onChange={e=>setLang(e.target.value)} aria-label="Language">
      <option value="pt">Português</option>
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  );
}
