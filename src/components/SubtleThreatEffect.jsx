import { useState, useEffect } from "react";

export const SubtleThreatEffect = ({ isActive, playerPosition, attemptsLeft }) => {
  const [phase, setPhase] = useState('fadeIn');

  useEffect(() => {
    if (isActive) {
      console.log("🔥 Starting aggressive threat sequence");
      setPhase('fadeIn');
      
      // Quick fade in for aggressive effect
      const fadeTimer = setTimeout(() => {
        setPhase('hold');
        console.log("🔴 Aggressive red lighting building intense pressure");
      }, 400); // Faster fade-in
      
      // Hold the effect longer for more intimidation
      const holdTimer = setTimeout(() => {
        setPhase('complete');
        console.log("⚠️ Aggressive threat sequence complete");
      }, 4000); // Extended from 3000ms to 4000ms
      
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(holdTimer);
      };
    }
  }, [isActive]);

  if (!isActive) return null;

  // Calculate player position for lighting focus
  const basePositionPercentage = 6.25 + ((playerPosition - 1) * 4.375);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Aggressive Red Lighting - More intense and dramatic */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          phase === 'fadeIn' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Main aggressive red spotlight around player area */}
        <div 
          className="absolute top-0 w-[500px] h-[500px] bg-red-600/35 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${basePositionPercentage}%`,
            transform: 'translateX(-50%)'
          }}
        />
        
        {/* Secondary spotlight for more intensity */}
        <div 
          className="absolute top-1/4 w-96 h-96 bg-red-500/25 rounded-full blur-2xl"
          style={{
            left: `${basePositionPercentage}%`,
            transform: 'translateX(-50%)'
          }}
        />
        
        {/* Stronger ambient red overlay */}
        <div className="absolute inset-0 bg-red-900/20 animate-pulse" />
        
        {/* More dramatic gradient from top */}
        <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-red-800/25 to-transparent" />
        
        {/* Side gradients for tunnel effect */}
        <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-red-900/20 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-red-900/20 to-transparent" />
      </div>
      
      {/* Sound effect trigger indicator */}
      {phase === 'fadeIn' && (
        <div className="absolute bottom-4 right-4 text-red-400 text-sm opacity-50 animate-fade-in">
          🎵 Footstep thud + low boom
        </div>
      )}
    </div>
  );
};