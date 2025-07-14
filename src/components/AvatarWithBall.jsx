export const AvatarWithBall = ({ 
  position, 
  cameraOffset, 
  isGettingHit = false,
  isVisible = true 
}) => {
  // Calculate position percentage based on field progression
  const getPositionPercentage = (pos) => {
    const percentages = [
      6.25,    // Position 1: Left touchdown
      12.625,  // Position 2: Middle of section 1
      17,      // Position 3: End of section 1

      22.375,  // Position 4: Middle of section 2
      25.75,   // Position 5: End of section 2

      30.125,  // Position 6: Middle of section 3
      35.5,    // Position 7: End of section 3

      39.25,   // Position 9: End of section 4 (for helping)
      43.625,  // Position 10: Middle of section 5 (on the 40-yard line)
      50,      // Position 11: End of section 5 (for helping)
      53.375,  // Position 12: Middle of section 6 (on the 50-yard line)
      57.75,   // Position 13: End of section 6 (for helping)
      62.125,  // Position 14: Middle of section 7(on the 40-yard line)
      67.5,    // Position 15: End of section 7 (for helping)
      70.175,  // Position 16: Middle of section 8(on the 30-yard line)
      75.25,   // Position 17: middle of section 8
      79.225,  // Position 18: end of section 8
      83.5,    // Position 19: middle of section 9
      87.375,  // Position 20: end of section 9
      91.25,   // Position 21: middle of section 10
      95.75    // Position 21: End of section 10/Right touchdown
    ];
    
    return percentages[pos - 1] || 6.25;
  };
  
  const positionPercentage = getPositionPercentage(position);
  
  // Don't render if not visible (during tackle transition)
  if (!isVisible) {
    return null;
  }
  
  return (
    <div 
      className="absolute z-20 transition-all duration-1000 ease-in-out"
      style={{
        bottom: '25%',
        left: `${positionPercentage}%`,
        transform: 'translateX(-50%)'
      }}
    >
      <div className="relative">
        {/* Avatar with hit animation */}
        <img 
          src="/lovable-uploads/09e4659f-12b0-4383-a431-a0d138d43069.png" 
          alt="Private Player" 
          className={`w-48 h-auto drop-shadow-2xl transition-all duration-300 ${
            isGettingHit 
              ? 'animate-[hit-knockback_0.6s_ease-out] brightness-75 contrast-125' 
              : ''
          }`}
        />
        
        {/* Hit impact effect */}
        {isGettingHit && (
          <>
            {/* Impact flash around player */}
            <div className="absolute inset-0 bg-white/40 rounded-full blur-md animate-[flash_0.2s_ease-out_2]" />
            
            {/* Hit sparks */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                style={{
                  left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 30}%`,
                  top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 30}%`,
                  animationDelay: `${i * 0.05}s`,
                  animationDuration: '0.4s'
                }}
              />
            ))}
            
            {/* Defensive posture indicator */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-blue-400 animate-pulse">
              <span className="text-2xl">🛡️</span>
            </div>
          </>
        )}
        
        {/* Enhanced shadow with hit effect */}
        <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 ${
          isGettingHit ? 'w-32 h-8 bg-red-900/70' : 'w-24 h-6 bg-green-900/60'
        } rounded-full blur-lg transition-all duration-300`} />
      </div>
    </div>
  );
};