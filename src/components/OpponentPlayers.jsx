import { OpponentPlayer } from "./OpponentPlayer.jsx";
import { useOpponentData, getThreateningOpponent } from "../hooks/useOpponentData";

export const OpponentPlayers = ({ 
  cameraOffset, 
  playerPosition, 
  isVisible, 
  isAttacking = false,
  showSubtleThreat = false,
  attemptsLeft = 3,
  showTaunt = false
}) => {
  console.log('OpponentPlayers render:', { cameraOffset, playerPosition, isVisible, isAttacking, showSubtleThreat, showTaunt });
  
  if (!isVisible) {
    console.log('OpponentPlayers not visible');
    return null;
  }

  // Calculate the main player's position percentage (same as avatar)
  const getPositionPercentage = (pos) => {
    const percentages = [
      6.25,    // Position 1: Left touchdown
      10.625,  // Position 2: Middle of section 1
      15,      // Position 3: End of section 1
      19.375,  // Position 4: Middle of section 2
      23.75,   // Position 5: End of section 2
      28.125,  // Position 6: Middle of section 3
      32.5,    // Position 7: End of section 3
      37.375,  // Position 8: Middle of section 4
      41.25,   // Position 9: End of section 4
      45.625,  // Position 10: Middle of section 5
      50,      // Position 11: End of section 5 (50-yard line)
      54.375,  // Position 12: Middle of section 6
      58.75,   // Position 13: End of section 6
      63.125,  // Position 14: Middle of section 7
      67.5,    // Position 15: End of section 7
      71.875,  // Position 16: Middle of section 8
      76.25,   // Position 17: End of section 8
      80.625,  // Position 18: Middle of section 9
      85,      // Position 19: End of section 9
      89.375,  // Position 20: Middle of section 10
      93.75    // Position 21: End of section 10/Right touchdown
    ];
    
    return percentages[pos - 1] || 6.25;
  };
  
  const basePositionPercentage = getPositionPercentage(playerPosition);
  console.log('Base position percentage:', basePositionPercentage);

  const threateningOpponentId = showSubtleThreat ? getThreateningOpponent(attemptsLeft) : null;
  const opponents = useOpponentData(basePositionPercentage);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {opponents.map((opponent) => {
        const isThreateningOpponent = threateningOpponentId === opponent.id;
        // Only show taunt for Clerk Carla (opponent ID 2)
        const shouldShowTaunt = showTaunt && opponent.id === 2;
        
        console.log(`Opponent ${opponent.id} (${opponent.name}): showTaunt=${showTaunt}, shouldShowTaunt=${shouldShowTaunt}`);
        
        return (
          <OpponentPlayer
            key={opponent.id}
            opponent={opponent}
            basePositionPercentage={basePositionPercentage}
            isAttacking={isAttacking}
            isThreateningOpponent={isThreateningOpponent}
            showTaunt={shouldShowTaunt}
          />
        );
      })}
      
      {/* Add custom keyframes for aggressive step animation */}
      <style>
        {`
          @keyframes aggressiveStep {
            0% {
              transform: scale(1) rotate(0deg);
            }
            30% {
              transform: scale(1.05) rotate(-1deg) translateY(-2px);
            }
            60% {
              transform: scale(1.12) rotate(-3deg) translateY(-1px);
            }
            100% {
              transform: scale(1.15) rotate(-2deg);
            }
          }
        `}
      </style>
    </div>
  );
};