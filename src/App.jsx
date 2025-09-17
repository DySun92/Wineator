import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Results from './components/Results';
import AdminPanel from './components/AdminPanel';
import { winesCatalog } from './data/wines';

export default function App() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleFinish = (finalAnswers) => {
    let scoredWines = winesCatalog.map(wine => {
      let score = 0;
      Object.keys(finalAnswers).forEach(key => {
        if (finalAnswers[key] !== 'Indiferente' && wine[key] === finalAnswers[key]) score++;
      });
      return { ...wine, score };
    });
    scoredWines.sort((a, b) => b.score - a.score);
    setResults(scoredWines.slice(0, 3)); // mostra sempre 3 vinhos
    setAnswers(finalAnswers);
  };

  const restartQuiz = () => {
    setAnswers({});
    setResults([]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🍷 Wineator</h1>

      <button
        onClick={() => setShowAdmin(!showAdmin)}
        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg shadow"
      >
        {showAdmin ? 'Fechar Admin' : 'Admin Panel'}
      </button>

      {showAdmin ? (
        <AdminPanel wines={winesCatalog} />
      ) : results.length > 0 ? (
        <Results results={results} restartQuiz={restartQuiz} />
      ) : (
        <Quiz onFinish={handleFinish} />
      )}
    </div>
  );
}
