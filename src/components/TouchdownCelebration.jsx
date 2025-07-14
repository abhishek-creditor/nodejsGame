import { useEffect } from 'react';

export const TouchdownCelebration = ({ isActive, onComplete }) => {
  useEffect(() => {
    if (isActive && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 15000); // 15 seconds

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      {/* Celebrating Player - moved further down to avoid text overlap */}
      <div className="absolute left-1/2 bottom-16 transform -translate-x-1/2 animate-scale-in">
        <div className="relative">
          <img 
            src="/lovable-uploads/c625629c-7849-46dc-b7be-3348bebc54f5.png" 
            alt="Celebrating Player - Touchdown!" 
            className="w-48 h-auto drop-shadow-2xl animate-bounce"
          />
          
          {/* Victory glow effect */}
          <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" />
          
          {/* Touchdown text - moved above player */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <div className="text-6xl font-black text-yellow-400 animate-bounce [text-shadow:_0_0_30px_rgb(251_191_36_/_0.8)]">
              TOUCHDOWN!
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Confetti/Sprinkles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`confetti-${i}`}
          className="absolute w-3 h-3 rounded-full animate-[fall_3s_ease-out_forwards]"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${-10 + Math.random() * 20}%`,
            backgroundColor: [
              '#FFD700', '#FF6B35', '#F7931E', '#00FF00', '#FF1493', '#00BFFF', '#FF4500'
            ][Math.floor(Math.random() * 7)],
            animationDelay: `${Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}

      {/* Fireworks effect */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`firework-${i}`}
          className="absolute w-4 h-4 rounded-full animate-ping"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 40}%`,
            backgroundColor: '#FFD700',
            animationDelay: `${i * 0.3}s`,
            animationDuration: '1.5s'
          }}
        />
      ))}

      {/* Victory rays */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-400/20 via-transparent to-transparent animate-pulse" />
      
      {/* Celebration text effects - moved to top area */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-4xl font-bold text-green-400 animate-fade-in mb-4">
          🏆 VICTORY! 🏆
        </div>
        <div className="text-2xl text-white animate-fade-in [animation-delay:0.5s]">
          You've conquered the field!
        </div>
      </div>

      {/* Custom keyframes for falling confetti */}
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};