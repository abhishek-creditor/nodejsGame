import { useEffect } from "react";

export const AttemptsLeftIndicator = ({ isVisible, attemptsLeft, onComplete }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const getMessage = () => {
    if (attemptsLeft === 0) return "💀 Game Over! No attempts left.";
    if (attemptsLeft === 1) return "❗ Final Attempt Remaining";
    return `⚠️ ${attemptsLeft} Attempts Left`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none animate-fade-in">
      <div className="bg-black/95 backdrop-blur-sm rounded-2xl px-8 py-6 border-2 border-yellow-500/60 shadow-2xl max-w-md mx-4">
        <div className={`text-2xl font-bold text-center ${
          attemptsLeft <= 1 
            ? 'text-red-400 [text-shadow:_0_0_15px_rgb(248_113_113_/_0.8)] animate-pulse' 
            : 'text-yellow-400 [text-shadow:_0_0_10px_rgb(251_191_36_/_0.6)]'
        }`}>
          {getMessage()}
        </div>
      </div>
    </div>
  );
};