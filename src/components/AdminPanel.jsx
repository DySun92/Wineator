import React from 'react';
import WineCard from './WineCard';

export default function AdminPanel({ wines }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Painel de Administração</h2>
      <p className="mb-4 text-gray-600">Aqui podes visualizar todos os vinhos do catálogo.</p>
      <div className="grid grid-cols-1 gap-4">
        {wines.map((wine, idx) => (
          <WineCard key={idx} wine={wine} />
        ))}
      </div>
    </div>
  );
}
