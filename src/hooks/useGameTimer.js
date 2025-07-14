import { useState, useEffect } from 'react';

export const useGameTimer = (isActive, initialTime = 15) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (isActive) {
      setTimeLeft(initialTime);
      const timer = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive, initialTime]);

  const resetTimer = () => {
    setTimeLeft(initialTime);
  };

  return { timeLeft, resetTimer };
};
