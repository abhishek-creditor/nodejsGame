import { useState, useEffect } from "react";
import { useGameState } from "./useGameState";

export const useStadiumGameLogic = (userId) => {
  const {
    gameState,
    resetGameState,
    advanceAvatar,
    handleWrongAnswer,
    resetAttempts,
    completeQuarter,
    startNextQuarter
  } = useGameState();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [cameraOffset, setCameraOffset] = useState(0);
  const [showSubtleThreat, setShowSubtleThreat] = useState(false);
  const [isTouchdownCelebration, setIsTouchdownCelebration] = useState(false);
  const [showOpponentTaunt, setShowOpponentTaunt] = useState(false);
  const [currentTauntOpponent, setCurrentTauntOpponent] = useState(null);
  const [showAttemptsLeft, setShowAttemptsLeft] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`http://localhost:3000/quiz/current?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        // Map options to text array for each question, and set correctAnswer/question fields
        const questions = (data.questions || []).map(q => ({
          ...q,
          options: q.options.map(o => o.text),
          correctAnswer: q.answer,
          question: q.text,
        }));
        setQuestions(questions);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  const checkGameComplete = () => {
    return gameState.currentQuarter >= 4 && gameState.currentQuestionInQuarter > 4;
  };

  const checkQuarterComplete = () => {
    console.log(`🔍 Quarter check: currentQuestionInQuarter=${gameState.currentQuestionInQuarter}, quarter=${gameState.currentQuarter}`);
    return gameState.currentQuestionInQuarter >= 5;
  };

  const handleStartQuarter = (setPhase) => {
    setPhase('ready');
    console.log(`Starting Quarter ${gameState.currentQuarter}`);
  };

  const handleSnapBall = (setPhase) => {
    setPhase('snapping');
    console.log("🎵 Whistle + crowd hush sound");
  };

  const handleSnapComplete = (setPhase) => {
    setPhase('question');
    console.log("🗣️ Coach: Here comes the play!");
  };

  const handleAnswer = (selectedIndex, isCorrect, setPhase) => {
    if (isCorrect) {
      advanceAvatar();
      setCameraOffset(prev => prev - 10);
      console.log("🎵 XP sparkle + crowd cheer");

      setLastAnswer({ isCorrect, yards: 1 });
      setPhase('result');
      if (gameState.totalQuestionsAnswered + 1 >= 16) {
        console.log("🏆 GAME COMPLETE! Player finished all 16 questions!");

        const celebrationData = {
          timestamp: new Date().toISOString(),
          quarter: gameState.currentQuarter,
          totalXP: gameState.totalXP + 25,
          questionsAnswered: gameState.totalQuestionsAnswered + 1,
          celebrationImage: "/lovable-uploads/c625629c-7849-46dc-b7be-3348bebc54f5.png"
        };

        localStorage.setItem('touchdownCelebration', JSON.stringify(celebrationData));
        console.log("🎊 Celebration data stored:", celebrationData);

        setIsTouchdownCelebration(true);
      }
    } else {
      handleWrongAnswer();
      console.log("🎵 Aggressive footstep thud + low boom building tension");
      console.log(`Wrong answer! Attempts left: ${gameState.attemptsLeft - 1}`);

      setLastAnswer({ isCorrect, yards: 0 });
      if (gameState.attemptsLeft > 1) {
        if (gameState.attemptsLeft === 3 || gameState.attemptsLeft === 2) {
          console.log("🗣️ Showing Clerk Carla taunt - attempts left:", gameState.attemptsLeft - 1);
          setShowOpponentTaunt(true);
          setCurrentTauntOpponent(2);

          setTimeout(() => {
            console.log("🗣️ Hiding Clerk Carla taunt");
            setShowOpponentTaunt(false);
            setCurrentTauntOpponent(null);
          }, 3000);
        }

        const threateningOpponentId = gameState.attemptsLeft === 2 ? 4 : 1;

        setShowSubtleThreat(true);
        setPhase('ready');
        setTimeout(() => {
          setShowAttemptsLeft(true);
        }, 3500);
        setTimeout(() => {
          setShowAttemptsLeft(false);
        }, 6000);
        setTimeout(() => {
          setShowSubtleThreat(false);
        }, 7000);
      } else {
        console.log("💀 Final attempt failed - triggering full attack sequence");
        setPhase('opponentAttack');
      }
    }
  };

  const handleTouchdownCelebrationComplete = (setPhase) => {
    setIsTouchdownCelebration(false);
    console.log("🏆 Game completed! Showing winner screen");
    setPhase('winner');
  };

  const handleOpponentAttackComplete = (setPhase) => {
    console.log("🎵 Crowd fades to silence");
    setPhase('gameOver');
  };

  const handleGameRestart = (setPhase) => {
    resetGameState();
    setCurrentQuestionIndex(0);
    setCameraOffset(0);
    setLastAnswer(null);
    setShowSubtleThreat(false);
    setIsTouchdownCelebration(false);
    setShowOpponentTaunt(false);
    setCurrentTauntOpponent(null);
    setShowAttemptsLeft(false);
    setPhase('quarterIntro');
  };

  const handleWinnerScreenBackToHome = () => {
    window.location.reload();
  };

  const handleReturnHome = () => {
    window.location.reload();
  };

  const handleNextPlay = (setPhase) => {
    setCurrentQuestionIndex(prev => (prev + 1) % questions.length);
    setLastAnswer(null);
    if (checkQuarterComplete()) {
      completeQuarter();
      setPhase('quarterComplete');
    } else {
      setPhase('ready');
    }
  };

  const handleQuarterComplete = (setPhase) => {
    if (gameState.currentQuarter >= 4) {
      console.log("🎊 All 4 quarters completed! Game finished!");
      setPhase('winner');
    } else {
      startNextQuarter();
      setPhase('quarterIntro');
    }
  };

  return {
    loading,
    gameState,
    currentQuestionIndex,
    lastAnswer,
    cameraOffset,
    currentQuestion: questions[currentQuestionIndex],
    showSubtleThreat,
    showOpponentTaunt,
    currentTauntOpponent,
    showAttemptsLeft,
    isTouchdownCelebration,
    handlers: {
      handleStartQuarter,
      handleSnapBall,
      handleSnapComplete,
      handleAnswer,
      handleTouchdownCelebrationComplete,
      handleOpponentAttackComplete,
      handleGameRestart,
      handleReturnHome,
      handleNextPlay,
      handleQuarterComplete,
      handleWinnerScreenBackToHome
    }
  };
};
