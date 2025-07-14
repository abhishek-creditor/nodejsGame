import { useState, useEffect } from "react";

export const SnapAnimation = ({ isActive, onComplete, playerPosition }) => {
  const [showBall, setShowBall] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });

  // Calculate player's position percentage on the field
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

  useEffect(() => {
    if (isActive) {
      setShowBall(true);
      
      // Animate ball flying back with spin
      setTimeout(() => {
        setBallPosition({ x: -200, y: -100 });
      }, 100);
      
      // Complete animation
      setTimeout(() => {
        setShowBall(false);
        setBallPosition({ x: 0, y: 0 });
        onComplete();
      }, 1500);
    }
  }, [isActive, onComplete]);

  if (!showBall) return null;

  // Calculate the player's field position and position ball further ahead
  const playerPositionPercentage = getPositionPercentage(playerPosition);
  const ballStartLeft = `${playerPositionPercentage + 5}%`; // 5% ahead of player (increased from 2%)
  
  console.log(`Ball positioned at ${ballStartLeft} for player position ${playerPosition}`);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Football with enhanced spinning animation - positioned relative to player */}
      <div 
        className="absolute bottom-1/4 w-16 h-10 transition-all duration-1000 ease-out"
        style={{
          left: ballStartLeft,
          transform: `translate(-50%, ${ballPosition.y}px) translateX(${ballPosition.x}px) rotate(${ballPosition.x * 4}deg)`,
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
        }}
      >
        <img 
          src="/lovable-uploads/68132319-18a5-4e90-814d-4ae9946ef047.png" 
          alt="Football"
          className="w-full h-full object-contain animate-spin"
          style={{
            animationDuration: '0.3s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear'
          }}
        />
        
        {/* Motion blur trail effect */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(139, 69, 19, 0.3), transparent)`,
            transform: `scaleX(${Math.abs(ballPosition.x) / 50 + 1})`,
            filter: 'blur(2px)'
          }}
        />
      </div>
      
      {/* Field Dim Effect */}
      <div className="absolute inset-0 bg-black/30 animate-fade-in" />
    </div>
  );
};