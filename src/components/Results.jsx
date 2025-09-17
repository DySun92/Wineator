import React from 'react';
import WineCard from './WineCard';

export default function Results({ results, restartQuiz }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Sugestões para si:</h2>
      <div className="grid grid-cols-1 gap-4">
        {results.map((wine, idx) => (
          <WineCard key={idx} wine={wine} />
        ))}
      </div>
      <button
        onClick={restartQuiz}
        className="mt-4 p-3 bg-purple-600 text-white rounded-lg shadow"
      >
        Reiniciar Teste
      </button>
    </div>
  );
}
