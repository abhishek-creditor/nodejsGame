import { useState } from 'react';

// Yard gain pattern for each correct answer
const getFieldPosition = (correctAnswers) => {
  const yardGains = [
    0,   // Start: 0 yards
    5,   // Q1: +5 yards
    10,  // Q2: +5 yards  
    15,  // Q3: +5 yards
    20,  // Q4: +5 yards (End Quarter 1)
    25,  // Q5: +5 yards
    30,  // Q6: +5 yards
    40,  // Q7: +10 yards
    50,  // Q8: +10 yards (End Quarter 2)
    60,  // Q9: +10 yards
    70,  // Q10: +10 yards
    75,  // Q11: +5 yards
    80,  // Q12: +5 yards (End Quarter 3)
    85,  // Q13: +5 yards
    90,  // Q14: +5 yards
    95,  // Q15: +5 yards
    100  // Q16: +5 yards (TOUCHDOWN - GAME COMPLETE)
  ];

  const yards = yardGains[correctAnswers] || 0;
  return Math.round(1 + (yards / 5)); // 5 yards = 1 position
};

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    currentQuarter: 1,
    currentQuestionInQuarter: 0,
    totalQuestionsAnswered: 0,
    totalXP: 0,
    avatarPosition: 1,
    isQuarterComplete: false,
    isGameComplete: false,
    attemptsLeft: 3
  });

  const updateGameState = (updates) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const resetGameState = () => {
    setGameState({
      currentQuarter: 1,
      currentQuestionInQuarter: 0,
      totalQuestionsAnswered: 0,
      totalXP: 0,
      avatarPosition: 1,
      isQuarterComplete: false,
      isGameComplete: false,
      attemptsLeft: 3
    });
  };

  const advanceAvatar = () => {
    const newTotalAnswered = gameState.totalQuestionsAnswered + 1;
    const newPosition = getFieldPosition(newTotalAnswered);

    updateGameState({
      totalXP: gameState.totalXP + 25,
      avatarPosition: newPosition,
      totalQuestionsAnswered: newTotalAnswered,
      currentQuestionInQuarter: gameState.currentQuestionInQuarter + 1
    });

    return newPosition;
  };

  const handleWrongAnswer = () => {
    updateGameState({
      attemptsLeft: gameState.attemptsLeft - 1
    });
  };

  const resetAttempts = () => {
    updateGameState({
      attemptsLeft: 3
    });
  };

  const completeQuarter = () => {
    if (gameState.currentQuarter >= 4) {
      updateGameState({ isGameComplete: true });
    } else {
      updateGameState({ isQuarterComplete: true });
    }
  };

  const startNextQuarter = () => {
    updateGameState({
      currentQuarter: gameState.currentQuarter + 1,
      currentQuestionInQuarter: 0,
      isQuarterComplete: false
    });
  };

  return {
    gameState,
    updateGameState,
    resetGameState,
    advanceAvatar,
    handleWrongAnswer,
    resetAttempts,
    completeQuarter,
    startNextQuarter
  };
};
