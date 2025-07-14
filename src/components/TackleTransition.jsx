import { useState, useEffect } from "react";

export const TackleTransition = ({ isActive, onComplete, playerPosition }) => {
  const [phase, setPhase] = useState('impact');

  useEffect(() => {
    if (isActive) {
      console.log("🔥 Starting tackle transition sequence");
      setPhase('impact');
      
      // Phase 1: Instant transition to tackle image - NO DELAY
      const impactTimer = setTimeout(() => {
        setPhase('seamlessTransition');
        console.log("🔄 Instant seamless transition to tackle image");
      }, 0); // Zero delay for instant transition
      
      // Phase 2: Hold tackle image (2.5s) - Shorter hold time
      const holdTimer = setTimeout(() => {
        setPhase('complete');
        console.log("💀 Completing tackle sequence");
        onComplete();
      }, 2500); // 2.5s total hold time
      
      return () => {
        clearTimeout(impactTimer);
        clearTimeout(holdTimer);
      };
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  // Calculate the exact position percentage based on player position
  const positionPercentage = 6.25 + ((playerPosition - 1) * 5.625);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Tackle image appears INSTANTLY - no fade-in animation */}
      {(phase === 'impact' || phase === 'seamlessTransition' || phase === 'hold') && (
        <div className="absolute inset-0">
          {/* Instant semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Tackle image appears instantly at full opacity - NO ANIMATION */}
          <div 
            className="absolute bottom-[25%] z-10 opacity-100 scale-100"
            style={{
              left: `${positionPercentage}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <img 
              src="/lovable-uploads/b21e4304-1621-4e15-a395-203c9ce686fb.png" 
              alt="Tackle Impact"
              className="w-48 h-auto object-contain drop-shadow-2xl"
            />
          </div>
          
          {/* Instant atmospheric effects */}
          <div 
            className="absolute bottom-[25%] pointer-events-none z-5 opacity-100"
            style={{
              left: `${positionPercentage}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-orange-500/15 rounded-full blur-2xl animate-pulse" 
                 style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      )}
    </div>
  );
};