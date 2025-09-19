export const LANGS = ['pt','en','es','fr'];

export const TRANSLATIONS = {
  pt: {
    appTitle: "Wineator",
    tagline: "Descubra o vinho ideal",
    questionOf: "Pergunta {current} / {total}",
    btnIndifferent: "Indiferente",
    btnBack: "Voltar",
    btnRestart: "Reiniciar Teste",
    includeOOS: "Incluir sem stock",
    suggestions: "Sugestões para si",
    noResults: "Nenhuma correspondência perfeita — aqui estão alternativas.",
    orderNote: "Ordem: do mais recomendado ao menos recomendado.",
    instagramAlt: "Instagram",
  },
  en: {
    appTitle: "Wineator",
    tagline: "Find your perfect wine",
    questionOf: "Question {current} / {total}",
    btnIndifferent: "Indifferent",
    btnBack: "Back",
    btnRestart: "Restart Quiz",
    includeOOS: "Include out-of-stock",
    suggestions: "Suggestions for you",
    noResults: "No perfect match — here are alternatives.",
    orderNote: "Order: most recommended → least recommended.",
    instagramAlt: "Instagram",
  },
  es: {
    appTitle: "Wineator",
    tagline: "Encuentra tu vino ideal",
    questionOf: "Pregunta {current} / {total}",
    btnIndifferent: "Indiferente",
    btnBack: "Atrás",
    btnRestart: "Reiniciar Test",
    includeOOS: "Incluir sin stock",
    suggestions: "Sugerencias para ti",
    noResults: "Ninguna coincidencia perfecta — aquí tienes alternativas.",
    orderNote: "Orden: más recomendado → menos recomendado.",
    instagramAlt: "Instagram",
  },
  fr: {
    appTitle: "Wineator",
    tagline: "Trouvez votre vin idéal",
    questionOf: "Question {current} / {total}",
    btnIndifferent: "Indifférent",
    btnBack: "Retour",
    btnRestart: "Recommencer",
    includeOOS: "Inclure hors stock",
    suggestions: "Suggestions pour vous",
    noResults: "Pas de correspondance parfaite — voici des alternatives.",
    orderNote: "Ordre: le plus recommandé → le moins recommandé.",
    instagramAlt: "Instagram",
  }
};

export function getT(lang='pt'){
  const d = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  return (key, vars) => {
    let s = d[key] ?? key;
    if(vars) Object.keys(vars).forEach(k => { s = s.replace(`{${k}}`, vars[k]); });
    return s;
  };
}
