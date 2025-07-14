import { useState, useEffect } from "react";

export const OpponentAttackEffect = ({ isActive, onComplete }) => {
  const [phase, setPhase] = useState('tensionBuild');

  useEffect(() => {
    if (isActive) {
      setPhase('tensionBuild');
      console.log("🎵 All opponents begin moving toward player");
      
      // Phase 1: Tension Building + Start Movement (0.5s) - reduced from 1s
      const tensionTimer = setTimeout(() => {
        setPhase('converge');
        console.log("🏃 Opponents converging on player position");
      }, 500);
      
      // Phase 2: Opponents Converge (1s) - reduced from 2s
      const convergeTimer = setTimeout(() => {
        setPhase('impact');
        console.log("💥 Opponents reach player - triggering impact");
      }, 1500);
      
      // Phase 3: Impact triggers tackle transition (immediate)
      const impactTimer = setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 1600);
      
      return () => {
        clearTimeout(tensionTimer);
        clearTimeout(convergeTimer);
        clearTimeout(impactTimer);
      };
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      {/* Tension Building Effects */}
      {phase === 'tensionBuild' && (
        <div className="absolute inset-0">
          {/* Subtle darkening overlay */}
          <div className="absolute inset-0 bg-black/10 animate-fade-in" />
          
          {/* Rising tension particles */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-red-400/30 rounded-full animate-pulse"
                style={{
                  left: `${15 + i * 10}%`,
                  top: `${25 + (i % 4) * 15}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Convergence Phase */}
      {phase === 'converge' && (
        <div className="absolute inset-0">
          {/* Intensifying atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent animate-fade-in" />
          
          {/* Movement intensity indicators */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-6 bg-gradient-to-b from-red-400/40 to-transparent animate-pulse"
                style={{
                  left: `${20 + i * 6}%`,
                  top: `${30 + (i % 3) * 10}%`,
                  animationDelay: `${i * 0.1}s`,
                  transform: `rotate(${-15 + (i % 5) * 6}deg)`
                }}
              />
            ))}
          </div>
          
          {/* Converging energy */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-4 left-4 w-56 h-56 bg-red-500/15 rounded-full blur-2xl animate-pulse" 
                 style={{ animationDelay: '0.3s' }} />
          </div>
        </div>
      )}
      
      {/* Impact moment - brief flash before tackle transition */}
      {phase === 'impact' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-red-600/30 animate-[flash_0.1s_ease-out]" />
        </div>
      )}
    </div>
  );
};