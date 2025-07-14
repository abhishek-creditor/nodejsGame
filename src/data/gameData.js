export const quarters = [
  {
    id: 1,
    name: "Quarter 1",
    questionsPerQuarter: 4,
    xpPerQuestion: 25,
    movesPerCorrectAnswer: 1
  },
  {
    id: 2,
    name: "Quarter 2", 
    questionsPerQuarter: 4,
    xpPerQuestion: 25,
    movesPerCorrectAnswer: 1
  },
  {
    id: 3,
    name: "Quarter 3",
    questionsPerQuarter: 4,
    xpPerQuestion: 25,
    movesPerCorrectAnswer: 1
  },
  {
    id: 4,
    name: "Quarter 4",
    questionsPerQuarter: 4,
    xpPerQuestion: 25,
    movesPerCorrectAnswer: 1
  }
];

// Optional: default state structure for reference or use
export const initialGameState = {
  currentQuarter: 1,
  currentQuestionInQuarter: 0,
  totalQuestionsAnswered: 0,
  totalXP: 0,
  avatarPosition: 1, // 0-16 representing field position (starting at position 1 = 10-yard line)
  isQuarterComplete: false,
  isGameComplete: false,
  attemptsLeft: 3
};
