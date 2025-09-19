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
    comingSoon: "Em Construção",
    price: "Preço",
    origin: "Origem",
    occasion: "Ocasião",
    noResults: "Nenhuma sugestão encontrada (aqui estão alternativas)",
    addToCart: "Adicionar",
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
    comingSoon: "Coming Soon",
    price: "Price",
    origin: "Origin",
    occasion: "Occasion",
    noResults: "No perfect match — here are alternatives",
    addToCart: "Add",
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
    comingSoon: "En Construcción",
    price: "Precio",
    origin: "Origen",
    occasion: "Ocasión",
    noResults: "Ninguna coincidencia perfecta — aquí tienes alternativas",
    addToCart: "Añadir",
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
    comingSoon: "En Construction",
    price: "Prix",
    origin: "Origine",
    occasion: "Occasion",
    noResults: "Pas de correspondance parfaite — voici des alternatives",
    addToCart: "Ajouter",
  }
};

export function getT(lang = 'pt'){
  const d = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  return (key, vars) => {
    let s = d[key] ?? key;
    if(vars){
      Object.keys(vars).forEach(k => { s = s.replace(`{${k}}`, vars[k]); });
    }
    return s;
  };
}
