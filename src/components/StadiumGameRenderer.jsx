import { GamePhase } from "./GamePhaseManager.jsx";
import { QuestionCard } from "./QuestionCard.jsx";
import { GameHUD } from "./GameHUD.jsx";
import { SnapAnimation } from "./SnapAnimation.jsx";
import { CoachReaction } from "./CoachReaction.jsx";
import { StadiumBackground } from "./StadiumBackground.jsx";
import { QuarterIntroModal } from "./QuarterIntroModal.jsx";
import { QuarterCompleteModal } from "./QuarterCompleteModal.jsx";
import { AvatarWithBall } from "./AvatarWithBall.jsx";
import { OpponentPlayers } from "./OpponentPlayers.jsx";
import { GameOverScreen } from "./GameOverScreen.jsx";
import { WinnerScreen } from "./WinnerScreen.jsx";
import { InterceptEffect } from "./InterceptEffect.jsx";
import { OpponentAttackEffect } from "./OpponentAttackEffect.jsx";
import { AmericanFootballField } from "./AmericanFootballField.jsx";
import { GameActionButtons } from "./GameActionButtons.jsx";
import { TouchdownCelebration } from "./TouchdownCelebration.jsx";
import { useGameTimer } from "../hooks/useGameTimer";
import { quarters } from "../data/gameData";
import { TackleTransition } from "./TackleTransition.jsx";
import { SubtleThreatEffect } from "./SubtleThreatEffect.jsx";
import { AttemptsLeftIndicator } from "./AttemptsLeftIndicator.jsx";

export const StadiumGameRenderer = ({
  gamePhase,
  setGamePhase,
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
}) => {
  const { timeLeft } = useGameTimer(gamePhase === 'ready');
  const currentQuarter = quarters[gameState.currentQuarter - 1];

  console.log('Current game phase:', gamePhase);
  console.log('Avatar position:', gameState.avatarPosition);
  console.log('Is touchdown celebration:', isTouchdownCelebration);

  const handleCoachReactionComplete = () => {
    // After coach reaction completes, proceed to next phase
    if (lastAnswer?.isCorrect && gameState.avatarPosition >= 21) {
      // Touchdown scenario
      setGamePhase('touchdownCelebration');
    } else if (lastAnswer?.isCorrect) {
      // Regular correct answer
      if (gameState.currentQuestionInQuarter >= 4) {
        setGamePhase('quarterComplete');
      } else {
        setGamePhase('nextPlay');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-slate-900 via-slate-800 to-green-900 overflow-hidden">
      <StadiumBackground />
      <AmericanFootballField cameraOffset={cameraOffset} />

      {/* Hide HUD during game over, tackle transition, touchdown celebration, and winner screen */}
      {gamePhase !== 'gameOver' && gamePhase !== 'tackleTransition' && gamePhase !== 'touchdownCelebration' && gamePhase !== 'winner' && (
        <GameHUD 
          quarter={gameState.currentQuarter}
          questionInQuarter={gameState.currentQuestionInQuarter}
          totalQuestions={4}
          xp={gameState.totalXP}
          maxXP={400}
          timeLeft={timeLeft}
          avatarPosition={gameState.avatarPosition}
          attemptsLeft={gameState.attemptsLeft}
        />
      )}

      <CoachReaction 
        isVisible={gamePhase === 'result'} 
        isCorrect={lastAnswer?.isCorrect || false}
        yards={lastAnswer?.yards}
        onComplete={handleCoachReactionComplete}
      />

      {/* Hide opponents during touchdown celebration and winner screen */}
      <OpponentPlayers 
        cameraOffset={cameraOffset}
        playerPosition={gameState.avatarPosition}
        isVisible={gamePhase !== 'quarterIntro' && gamePhase !== 'quarterComplete' && gamePhase !== 'gameOver' && gamePhase !== 'tackleTransition' && gamePhase !== 'touchdownCelebration' && gamePhase !== 'winner'}
        isAttacking={gamePhase === 'opponentAttack'}
        showSubtleThreat={showSubtleThreat}
        attemptsLeft={gameState.attemptsLeft}
        showTaunt={showOpponentTaunt}
      />

      {/* Hide avatar during game over, tackle transition, touchdown celebration, and winner screen */}
      <AvatarWithBall 
        position={gameState.avatarPosition}
        cameraOffset={cameraOffset}
        isGettingHit={gamePhase === 'opponentAttack'}
        isVisible={gamePhase !== 'tackleTransition' && gamePhase !== 'gameOver' && gamePhase !== 'touchdownCelebration' && gamePhase !== 'winner'}
      />

      <GameActionButtons
        gamePhase={gamePhase}
        onSnapBall={handlers.handleSnapBall}
        onNextPlay={handlers.handleNextPlay}
      />

      <QuarterIntroModal
        isOpen={gamePhase === 'quarterIntro'}
        quarter={gameState.currentQuarter}
        onStartQuarter={handlers.handleStartQuarter}
      />

      <QuarterCompleteModal
        isOpen={gamePhase === 'quarterComplete'}
        quarter={gameState.currentQuarter}
        xpEarned={gameState.currentQuestionInQuarter * 25}
        onContinue={handlers.handleQuarterComplete}
        isGameComplete={gameState.isGameComplete}
      />

      <SnapAnimation 
        isActive={gamePhase === 'snapping'} 
        onComplete={handlers.handleSnapComplete}
        playerPosition={gameState.avatarPosition}
      />

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        onAnswer={handlers.handleAnswer}
        isVisible={gamePhase === 'question'}
      />

      {/* Touchdown Celebration Component */}
      <TouchdownCelebration 
        isActive={gamePhase === 'touchdownCelebration'}
        onComplete={() => handlers.handleTouchdownCelebrationComplete()}
      />

      {/* Attempts Left Indicator - Center Screen */}
      <AttemptsLeftIndicator 
        isVisible={showAttemptsLeft}
        attemptsLeft={gameState.attemptsLeft}
        onComplete={() => {}} // Handled by useStadiumGameLogic timer
      />

      {/* Subtle Threat Effect */}
      <SubtleThreatEffect 
        isActive={showSubtleThreat}
        playerPosition={gameState.avatarPosition}
        attemptsLeft={gameState.attemptsLeft}
      />

      <OpponentAttackEffect 
        isActive={gamePhase === 'opponentAttack'} 
        onComplete={() => setGamePhase('tackleTransition')}
      />

      <TackleTransition 
        isActive={gamePhase === 'tackleTransition'} 
        onComplete={handlers.handleOpponentAttackComplete}
        playerPosition={gameState.avatarPosition}
      />

      <InterceptEffect 
        isActive={gamePhase === 'intercept'} 
        onComplete={handlers.handleOpponentAttackComplete}
      />

      <GameOverScreen 
        isVisible={gamePhase === 'gameOver'}
        onRestart={handlers.handleGameRestart}
        onReturnHome={handlers.handleReturnHome}
      />

      <WinnerScreen 
        isVisible={gamePhase === 'winner'}
        onBackToHome={handlers.handleWinnerScreenBackToHome}
      />

      {/* Atmospheric Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-yellow-300/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent" />
      </div>
    </div>
  );
};