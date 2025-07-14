import { useState, useEffect } from "react";

export const InterceptEffect = ({ isActive, onComplete }) => {
  const [phase, setPhase] = useState('warning');

  useEffect(() => {
    if (isActive) {
      setPhase('warning');
      
      // Warning phase - red spotlight and crowd gasp
      const warningTimer = setTimeout(() => {
        setPhase('boom');
        console.log("🎵 Crowd gasp + warning sound");
      }, 1500);
      
      // Boom phase - flash effect
      const boomTimer = setTimeout(() => {
        setPhase('complete');
        console.log("🎵 Boom sound + tackle sound");
        onComplete();
      }, 3000);
      
      return () => {
        clearTimeout(warningTimer);
        clearTimeout(boomTimer);
      };
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Red Warning Spotlight */}
      {phase === 'warning' && (
        <div className="absolute inset-0 animate-pulse">
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-red-600/30 rounded-full blur-3xl animate-ping"
            style={{
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)'
            }}
          />
          <div className="absolute inset-0 bg-red-900/20 animate-pulse" />
        </div>
      )}
      
      {/* Boom Flash Effect */}
      {phase === 'boom' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white animate-ping opacity-80" />
          <div className="absolute inset-0 bg-red-600 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl animate-bounce">
            💥
          </div>
        </div>
      )}
      
      {/* Stadium Crowd Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
};