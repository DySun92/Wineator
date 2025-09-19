import React from 'react';

export default function LanguageSwitcher({ lang, setLang }) {
  return (
    <select aria-label="Language" value={lang} onChange={e=>setLang(e.target.value)} style={{padding:8,borderRadius:8,border:'1px solid #eee',background:'white'}}>
      <option value="pt">Português</option>
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  );
}
