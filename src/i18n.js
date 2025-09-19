// i18n.js
export const LANGS = ['pt','en','es','fr'];

export const TRANSLATIONS = {
  pt: {
    appTitle: "Wineator",
    tagline: "Beber com personalidade",
    questionOf: "Pergunta {current} / {total}",
    btnIndifferent: "Indiferente",
    btnBack: "Voltar",
    btnRestart: "Reiniciar Teste",
    suggestions: "Sugestões para si",
    orderNote: "Ordem: do mais recomendado → menos recomendado.",
    noResults: "Nenhuma correspondência perfeita — aqui estão alternativas.",
    followUs: "Siga-nos nas nossas redes sociais",
    instagramAlt: "Instagram",

    // option labels (canonical -> translated)
    options: {
      type: { 'Tinto':'Tinto','Branco':'Branco','Rosé':'Rosé','Espumante':'Espumante' },
      priceRange: { '13-20':'13€ - 20€','21-30':'21€ - 30€','31-50':'31€ - 50€','50+':'Mais de 50€' },
      harmonization: { 'Carne':'Carne','Peixe':'Peixe','SemPreferencia':'Sem preferência' },
      occasion: { 'Casual':'Casual','Jantar especial':'Jantar especial','Presentear alguém':'Presentear alguém' },
      origin: { 'Portugal':'Portugal' }
    }
  },

  en: {
    appTitle: "Wineator",
    tagline: "Beber com personalidade",
    questionOf: "Question {current} / {total}",
    btnIndifferent: "Indifferent",
    btnBack: "Back",
    btnRestart: "Restart Quiz",
    suggestions: "Suggestions for you",
    orderNote: "Order: most recommended → least recommended.",
    noResults: "No perfect match — here are alternatives.",
    followUs: "Follow us on our social channels",
    instagramAlt: "Instagram",

    options: {
      type: { 'Tinto':'Red','Branco':'White','Rosé':'Rosé','Espumante':'Sparkling' },
      priceRange: { '13-20':'€13 - €20','21-30':'€21 - €30','31-50':'€31 - €50','50+':'Over €50' },
      harmonization: { 'Carne':'Meat','Peixe':'Fish','SemPreferencia':'No preference' },
      occasion: { 'Casual':'Casual','Jantar especial':'Special dinner','Presentear alguém':'Gift' },
      origin: { 'Portugal':'Portugal' }
    }
  },

  es: {
    appTitle: "Wineator",
    tagline: "Beber com personalidad",
    questionOf: "Pregunta {current} / {total}",
    btnIndifferent: "Indiferente",
    btnBack: "Atrás",
    btnRestart: "Reiniciar Test",
    suggestions: "Sugerencias para ti",
    orderNote: "Orden: más recomendado → menos recomendado.",
    noResults: "Ninguna coincidencia perfecta — aquí tienes alternativas.",
    followUs: "Síguenos en nuestras redes sociales",
    instagramAlt: "Instagram",

    options: {
      type: { 'Tinto':'Tinto','Branco':'Blanco','Rosé':'Rosado','Espumante':'Espumoso' },
      priceRange: { '13-20':'13€ - 20€','21-30':'21€ - 30€','31-50':'31€ - 50€','50+':'Más de 50€' },
      harmonization: { 'Carne':'Carne','Peixe':'Pescado','SemPreferencia':'Sin preferencia' },
      occasion: { 'Casual':'Casual','Jantar especial':'Cena especial','Presentear alguém':'Regalo' },
      origin: { 'Portugal':'Portugal' }
    }
  },

  fr: {
    appTitle: "Wineator",
    tagline: "Beber com personalidade",
    questionOf: "Question {current} / {total}",
    btnIndifferent: "Indifférent",
    btnBack: "Retour",
    btnRestart: "Recommencer",
    suggestions: "Suggestions pour vous",
    orderNote: "Ordre: le plus recommandé → le moins recommandé.",
    noResults: "Pas de correspondance parfaite — voici des alternatives.",
    followUs: "Suivez-nous sur nos réseaux sociaux",
    instagramAlt: "Instagram",

    options: {
      type: { 'Tinto':'Rouge','Branco':'Blanc','Rosé':'Rosé','Espumante':'Pétillant' },
      priceRange: { '13-20':'13€ - 20€','21-30':'21€ - 30€','31-50':'31€ - 50€','50+':'Plus de 50€' },
      harmonization: { 'Carne':'Viande','Peixe':'Poisson','SemPreferencia':'Pas de préférence' },
      occasion: { 'Casual':'Décontracté','Jantar especial':'Dîner spécial','Presentear alguém':'Offrir' },
      origin: { 'Portugal':'Portugal' }
    }
  }
};

export function getT(lang='pt'){
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  return (key, vars) => {
    let s = dict[key] ?? key;
    if(vars) Object.keys(vars).forEach(k => s = s.replace(`{${k}}`, vars[k]));
    return s;
  };
}

// helper to get option label (translated)
export function getOptionLabel(lang='pt', group='type', value){
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  const grp = dict.options?.[group] || {};
  return grp[value] ?? value;
}
