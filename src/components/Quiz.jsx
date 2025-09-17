import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  { key: 'type', text: 'Que tipo de vinho prefere?', options: ['Tinto', 'Branco', 'Rosé', 'Espumante', 'Indiferente'] },
  { key: 'sweetness', text: 'Qual o nível de doçura que prefere?', options: ['Seco', 'Meio Seco', 'Doce', 'Indiferente'] },
  { key: 'body', text: 'Qual a intensidade do corpo do vinho?', options: ['Leve', 'Médio', 'Encorpado', 'Indiferente'] },
  { key: 'priceRange', text: 'Qual a faixa de preço?', options: ['0-10', '10-25', '25-50', '50+', 'Indiferente'] },
  { key: 'origin', text: 'Tem preferência por alguma origem?', options: ['Portugal', 'França', 'Itália', 'Espanha', 'Indiferente'] },
  { key: 'occasion', text: 'É para uma ocasião especial ou consumo diário?', options: ['Especial', 'Diário', 'Indiferente'] }
];

export default function Quiz({ onFinish }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[step].key]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onFinish(newAnswers);
    }
  };

  return (
    <div className="p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-lg mb-4">{questions[step].text}</h2>
          <div className="flex flex-col gap-2">
            {questions[step].options.map(opt => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="p-3 bg-purple-600 text-white rounded-lg shadow"
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
