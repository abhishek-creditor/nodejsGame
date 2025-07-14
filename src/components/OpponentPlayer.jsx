import { OpponentNameTag } from "./OpponentNameTag.jsx";
import { OpponentSpeechBubble } from "./OpponentSpeechBubble.jsx";
import { useOpponentData } from "../hooks/useOpponentData";

export const OpponentPlayer = ({ 
  opponent, 
  basePositionPercentage, 
  isAttacking, 
  isThreateningOpponent,
  showTaunt = false
}) => {
  // Calculate position based on current state
  let currentPosition;
  if (isAttacking) {
    // Full attack mode - all converge aggressively
    currentPosition = {
      left: `${basePositionPercentage - 2 + (opponent.id % 2 === 0 ? 2 : -2)}%`,
      bottom: '28%',
      transform: 'translateX(-50%) scale(1.1)'
    };
  } else if (isThreateningOpponent) {
    // Aggressive threat - forceful step forward with shoulder drop
    currentPosition = {
      left: opponent.threatenLeft,
      bottom: opponent.threatenBottom,
      transform: 'translateX(-50%) scale(1.15) rotate(-2deg)'
    };
  } else {
    // Normal position
    currentPosition = {
      left: opponent.originalLeft,
      bottom: opponent.originalBottom,
      transform: 'translateX(-50%)'
    };
  }

  console.log(`Rendering opponent ${opponent.id} at ${currentPosition.left}, bottom: ${currentPosition.bottom}, attacking: ${isAttacking}, threatening: ${isThreateningOpponent}, showTaunt: ${showTaunt}`);

  return (
    <div
      className={`absolute transition-all ease-out ${
        isAttacking 
          ? 'duration-2000 z-20'
          : isThreateningOpponent
          ? 'duration-500 z-16'
          : 'duration-1000 z-15'
      }`}
      style={{
        bottom: currentPosition.bottom,
        left: currentPosition.left,
        transform: currentPosition.transform,
        animationDelay: isAttacking ? opponent.animationDelay : '0s'
      }}
    >
      <div className="relative">
        {/* Speech Bubble - Only for Clerk Carla when taunting */}
        {opponent.id === 2 && showTaunt && (
          <OpponentSpeechBubble 
            taunt={opponent.taunt}
            isVisible={showTaunt}
          />
        )}

        {/* Name Tag */}
        <OpponentNameTag 
          name={opponent.name}
          role={opponent.role}
          icon={opponent.icon}
          isAttacking={isAttacking}
        />

        {/* Opponent Player */}
        <img 
          src={opponent.image}
          alt={opponent.alt}
          className={`${opponent.size} h-auto drop-shadow-2xl transition-all duration-500 ${
            isAttacking 
              ? 'brightness-90 contrast-110 saturate-75 animate-[run_0.6s_ease-in-out_infinite]' 
              : isThreateningOpponent
              ? 'brightness-85 contrast-120 saturate-80 animate-[aggressiveStep_0.8s_ease-out]'
              : 'animate-[breathe_4s_ease-in-out_infinite]'
          }`}
          style={{
            animationDelay: opponent.animationDelay,
            transform: opponent.id === 3 ? 'scaleX(-1)' : 'none',
            filter: isAttacking 
              ? 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.3))' 
              : isThreateningOpponent
              ? 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.4)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6))'
              : 'none'
          }}
          onError={(e) => {
            console.error(`Failed to load opponent image: ${opponent.image}`);
            e.currentTarget.src = `https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=300&fit=crop`;
          }}
          onLoad={() => console.log(`Opponent ${opponent.id} image loaded successfully`)}
        />
        
        {/* Enhanced Shadow with threat effect */}
        <div 
          className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${
            opponent.id === 3 ? 'w-10 h-2' : 'w-12 h-3'
          } rounded-full blur-sm transition-all duration-500 ${
            isAttacking 
              ? 'bg-red-800/60 shadow-[0_0_20px_rgba(239,68,68,0.4)] w-16 h-4' 
              : isThreateningOpponent
              ? 'bg-red-800/50 shadow-[0_0_25px_rgba(239,68,68,0.5)] w-18 h-4 animate-pulse'
              : 'bg-green-900/40'
          }`} 
        />
        
        {/* Aggressive threat indicator with impact effect */}
        {isThreateningOpponent && (
          <>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-3 h-3 bg-red-500/80 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
            </div>
            
            {/* Ground impact effect */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-red-500/30 rounded-full animate-pulse" />
          </>
        )}
      </div>
    </div>
  );
};