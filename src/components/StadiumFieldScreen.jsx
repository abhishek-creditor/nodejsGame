import { GamePhaseManager } from "./GamePhaseManager";
import { StadiumGameRenderer } from "./StadiumGameRenderer.jsx";
import { useStadiumGameLogic } from "../hooks/useStadiumGameLogic";

// Accept userId as a prop
export const StadiumFieldScreen = ({ isVisible, onSnapBall, userId }) => {
  const {
    loading,
    gameState,
    currentQuestion,
    lastAnswer,
    cameraOffset,
    showSubtleThreat,
    showOpponentTaunt,
    currentTauntOpponent,
    showAttemptsLeft,
    isTouchdownCelebration,
    handlers
  } = useStadiumGameLogic(userId);

  if (!isVisible) return null;
  if (loading) return <div className="flex items-center justify-center h-full text-white text-2xl">Loading questions...</div>;

  return (
    <GamePhaseManager>
      {(gamePhase, setGamePhase) => {
        // Create wrapped handlers that include setGamePhase
        const wrappedHandlers = {
          handleSnapBall: () => handlers.handleSnapBall(setGamePhase),
          handleNextPlay: () => handlers.handleNextPlay(setGamePhase),
          handleStartQuarter: () => handlers.handleStartQuarter(setGamePhase),
          handleQuarterComplete: () => handlers.handleQuarterComplete(setGamePhase),
          handleAnswer: (selectedIndex, isCorrect) => 
            handlers.handleAnswer(selectedIndex, isCorrect, setGamePhase),
          handleTouchdownCelebrationComplete: () => handlers.handleTouchdownCelebrationComplete(setGamePhase),
          handleOpponentAttackComplete: () => handlers.handleOpponentAttackComplete(setGamePhase),
          handleGameRestart: () => handlers.handleGameRestart(setGamePhase),
          handleReturnHome: handlers.handleReturnHome,
          handleSnapComplete: () => handlers.handleSnapComplete(setGamePhase),
          handleWinnerScreenBackToHome: handlers.handleWinnerScreenBackToHome,
        };

        return (
          <StadiumGameRenderer
            gamePhase={gamePhase}
            setGamePhase={setGamePhase}
            gameState={gameState}
            currentQuestion={currentQuestion}
            lastAnswer={lastAnswer}
            cameraOffset={cameraOffset}
            showSubtleThreat={showSubtleThreat}
            showOpponentTaunt={showOpponentTaunt}
            currentTauntOpponent={currentTauntOpponent}
            showAttemptsLeft={showAttemptsLeft}
            isTouchdownCelebration={isTouchdownCelebration}
            handlers={wrappedHandlers}
          />
        );
      }}
    </GamePhaseManager>
  );
};