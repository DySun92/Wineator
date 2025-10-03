// src/data/cocktails.js
// Nota: campos usados pelo algoritmo
// - base: "Gin" | "Vodka" | "Rum" | "Tequila" | "Whiskey" | outros (ex.: "Porto", "Espumante", "Cachaça", "Amaretto")
// - strength: "light" | "medium" | "strong"
// - flavor: array com: "fresh" | "fruity" | "bitter" | "sweet" | "spiced" | (opcional "coffee")
// - food: tags gastronómicas que combinam com entradas/pratos (marisco, peixe, carne, vegetariano, cremoso, massas, bbq, bacon, intenso, salmão, fumado, picante, bruschetta, etc.)

const cocktails = [
  {
    id: 101,
    name: 'Aperol Spritz',
    base: 'Espumante',
    strength: 'light',
    sweetness: 'medium',
    price: 8,
    image: '/cocktails/aperol-spritz.jpg',
    flavor: ['bitter', 'citrus', 'fruity'],
    food: ['marisco', 'vegetariano', 'entradas', 'bruschetta', 'fresco']
  },

  {
    id: 102,
    name: 'Porto Tónico',
    base: 'Porto',
    strength: 'light',
    sweetness: 'medium',
    price: 8,
    image: '/cocktails/porto-tonico.jpg',
    flavor: ['fresh', 'citrus'],
    food: ['marisco', 'mexilhão', 'ameijoas', 'fresco', 'vegetariano']
  },

  {
    id: 103,
    name: 'Porto Passione',
    base: 'Porto',
    strength: 'light',
    sweetness: 'sweet',
    price: 9,
    image: '/cocktails/porto-passione.jpg',
    flavor: ['fruity', 'sweet', 'citrus'],
    food: ['fruta', 'sobremesa', 'vegetariano', 'fresco'] // também funciona como aperitivo frutado
  },

  {
    id: 104,
    name: 'Mojito',
    base: 'Rum',
    strength: 'medium',
    sweetness: 'medium',
    price: 8,
    image: '/cocktails/mojito.jpg',
    flavor: ['fresh', 'citrus', 'herbal', 'sweet'],
    food: ['marisco', 'peixe', 'fresco', 'vegetariano']
  },

  {
    id: 105,
    name: 'Caipirinha',
    base: 'Cachaça',
    strength: 'medium',
    sweetness: 'medium',
    price: 8,
    image: '/cocktails/caipirinha.jpg',
    flavor: ['fresh', 'citrus', 'sweet'],
    food: ['marisco', 'picante', 'carne'] // vai bem com pratos mais intensos também
  },

  {
    id: 106,
    name: 'Gin Tónico',
    base: 'Gin',
    strength: 'light',
    sweetness: 'dry',
    price: 9,
    image: '/cocktails/gin-tonic.jpg',
    flavor: ['fresh', 'citrus'],
    food: ['salmão', 'fumado', 'peixe', 'vegetariano', 'fresco']
  },

  {
    id: 107,
    name: 'Gin Puerto de Indias (Morango)',
    base: 'Gin',
    strength: 'light',
    sweetness: 'medium',
    price: 9,
    image: '/cocktails/gin-puerto-indias.jpg',
    flavor: ['fruity', 'sweet', 'fresh'],
    food: ['vegetariano', 'entradas', 'fruta', 'fresco'] // versátil e frutado
  },

  {
    id: 108,
    name: 'Gin Black Pig',
    base: 'Gin',
    strength: 'medium',
    sweetness: 'dry',
    price: 10,
    image: '/cocktails/gin-black-pig.jpg',
    flavor: ['fresh', 'citrus', 'spiced'],
    food: ['carne', 'alheira', 'intenso', 'salmão', 'peixe'] // cítrico-especiado: vai bem com carne e também peixe gordo
  },

  {
    id: 109,
    name: 'Mimosa',
    base: 'Espumante',
    strength: 'light',
    sweetness: 'medium',
    price: 8,
    image: '/cocktails/mimosa.jpg',
    flavor: ['citrus', 'sweet', 'fresh'],
    food: ['entradas', 'fresco', 'marisco', 'vegetariano']
  },

  {
    id: 110,
    name: 'Espresso Martini',
    base: 'Vodka',
    strength: 'medium',
    sweetness: 'sweet',
    price: 10,
    image: '/cocktails/espresso-martini.jpg',
    flavor: ['sweet', 'coffee'],
    food: ['sobremesa', 'chocolate'] // pairing clássico
  },

  {
    id: 111,
    name: 'Cuba Libre',
    base: 'Rum',
    strength: 'medium',
    sweetness: 'sweet',
    price: 9,
    image: '/cocktails/cuba-libre.jpg',
    flavor: ['sweet', 'citrus'],
    food: ['carne', 'bbq', 'bacon', 'intenso', 'hamburguer'] // ótimo com hambúrguer/BBQ
  },

  {
    id: 112,
    name: 'Amaretto Sour',
    base: 'Amaretto',
    strength: 'light',
    sweetness: 'sweet',
    price: 9,
    image: '/cocktails/amaretto-sour.jpg',
    flavor: ['sweet', 'citrus'],
    food: ['sobremesa', 'queijo', 'fruta'] // digestivo/doce, vai bem com queijos/fruit
  },

  {
    id: 113,
    name: 'Whiskey Logan (on the rocks)',
    base: 'Whiskey',
    strength: 'strong',
    sweetness: 'dry',
    price: 10,
    image: '/cocktails/whiskey-logan.jpg',
    flavor: ['spiced'],
    food: ['carne', 'bbq', 'bacon', 'intenso', 'alheira'] // digestivo/after-dinner e carnes fortes
  }
];

export default cocktails;
