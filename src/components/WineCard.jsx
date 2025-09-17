import React from 'react';

export default function WineCard({ wine }) {
  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <img src={wine.image} alt={wine.name} className="mb-2 rounded h-48 w-full object-cover" />
      <h3 className="font-bold text-lg">{wine.name}</h3>
      <p>{wine.type} | {wine.sweetness} | {wine.body}</p>
      <p>Preço: {wine.priceRange}€</p>
      <p>Origem: {wine.origin}</p>
      <p>Ocasião: {wine.occasion}</p>
    </div>
  );
}
