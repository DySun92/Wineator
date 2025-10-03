// src/data/menu.js
const menu = {
  entradas: {
    marisco: [
      { id: 'e1', name: 'Mexilhões gourmet', price: 15.0, keywords: ['marisco','mexilhoes','fresco'] },
      { id: 'e2', name: 'Amêijoas à Bulhão', price: 12.0, keywords: ['marisco','ameijoas','alho','coentros'] }
    ],
    vegetarianas: [
      { id: 'e3', name: 'Cogumelos gourmet', price: 10.0, keywords: ['cogumelos','umami','vegetariano'] },
      { id: 'e4', name: 'Bruschetta', price: 8.0, keywords: ['pao','tomate','azeite','vegetariano'] },
      { id: 'e5', name: 'Guacamole', price: 8.0, keywords: ['abacate','fresco','vegetariano'] }
    ],
    carnes: [
      { id: 'e6', name: 'Alheira e mel', price: 9.0, keywords: ['alheira','carne','intenso'] }
    ],
    acompanhamentos: [
      { id: 'e7', name: 'Batata rústica', price: 5.0, keywords: ['batata','frito'] }
    ]
  },

  principais: {
    "Hambúrguer": [
      { id:'p-h1', name:'Elite Burger',   price:18.0, keywords:['carne','queijo','suculento'] },
      { id:'p-h2', name:'Janette Burger', price:18.0, keywords:['carne','bacon','bbq','intenso','queijo'] },
      { id:'p-h3', name:'Chicken Burger', price:15.0, keywords:['frango','cheddar','leve'] },
      { id:'p-h4', name:'Veggie Burger',  price:15.0, keywords:['vegetariano','hummus','cogumelos','espinafres'] },
    ],
    "Bagel": [
      { id:'p-b1', name:'Bagel Kebab',    price:15.0, keywords:['carne','kebab','picante','intenso'] },
      { id:'p-b2', name:'Bagel Salmão',   price:15.0, keywords:['salmão','fumado','fresco'] },
      { id:'p-b3', name:'Bagel Camarão',  price:15.0, keywords:['camarão','marisco','fresco'] },
      { id:'p-b4', name:'Bagel Alheira',  price:15.0, keywords:['alheira','carne','intenso'] },
    ],
    "Risotto": [
      { id:'p-r1', name:'Risotto de Camarão',   price:19.0, keywords:['camarão','marisco','cremoso'] },
      { id:'p-r2', name:'Risotto de Cogumelos', price:17.0, keywords:['cogumelos','umami','cremoso','vegetariano'] },
    ],
    "Massa": [
      { id:'p-p1', name:'Linguine de Salmão',   price:18.0, keywords:['salmão','fumado','natas'] },
      { id:'p-p2', name:"Veggie's Pasta",       price:14.0, keywords:['vegetariano','queijo','cogumelos'] },
      { id:'p-p3', name:'Linguine de Camarão',  price:18.0, keywords:['camarão','marisco','exotico'] },
    ]
  }
};

export default menu;
