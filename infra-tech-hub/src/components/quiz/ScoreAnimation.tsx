"use client";
import { useEffect, useState } from 'react';

type ScoreAnimationProps = {
  score: number;
  total: number;
  onComplete?: () => void;
};

export default function ScoreAnimation({ score, total, onComplete }: ScoreAnimationProps) {
  const [currentScore, setCurrentScore] = useState(0);
  
  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScore(score);
      onComplete?.();
    }, 500);

    return () => clearTimeout(timer);
  }, [score, onComplete]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline justify-center gap-2 mb-2">
        <div className={`text-6xl font-bold transition-all duration-300 ${
          percentage >= 80 ? 'text-green-400' : 
          percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
        }`}>
          {currentScore}
        </div>
        <div className="text-3xl text-slate-400">
          / {total}
        </div>
      </div>
      
      <div className={`text-2xl font-bold text-center ${
        percentage >= 80 ? 'text-green-400' : 
        percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
      }`}>
        {percentage}%
      </div>

      {percentage >= 90 && (
        <div className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white font-bold">
          Perfect Score!
        </div>
      )}
      {percentage >= 80 && percentage < 90 && (
        <div className="mt-4 px-6 py-2 bg-blue-600 rounded-full text-white font-bold">
          Excellent!
        </div>
      )}
      {percentage >= 60 && percentage < 80 && (
        <div className="mt-4 px-6 py-2 bg-yellow-600 rounded-full text-white font-bold">
          Good Job!
        </div>
      )}
    </div>
  );
}