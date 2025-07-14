export const GameHUD = ({ 
  quarter, 
  questionInQuarter, 
  totalQuestions, 
  xp,   
  maxXP, 
  timeLeft, 
  avatarPosition,
  attemptsLeft 
}) => {
  // Calculate field position based on avatar position (1 = 10-yard line, 2 = 20-yard line, etc.)
  const getFieldPosition = (position) => {
    if (position <= 1) return "10 YD LINE";
    if (position <= 2) return "20 YD LINE";
    if (position <= 3) return "30 YD LINE";
    if (position <= 4) return "40 YD LINE";
    if (position <= 5) return "50 YD LINE";
    if (position <= 6) return "40 YD LINE";
    if (position <= 7) return "30 YD LINE";
    if (position <= 8) return "20 YD LINE";
    if (position >= 9) return "10 YD LINE (OPPONENT)";
    return `${position * 10} YD LINE`;
  };

  return (
    <div className="absolute top-8 right-8 z-30 lg:top-12 lg:right-12">
      <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-600 min-w-[400px]">
        <div className="text-white">
          {/* Top Row - Quarter and Question Info */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                QUARTER {quarter}
              </div>
              <div className="text-sm text-yellow-400">
                Question {questionInQuarter} of {totalQuestions}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xl font-bold text-green-400">
                {getFieldPosition(avatarPosition)}
              </div>
              <div className="text-xs text-gray-300">
                Position: {avatarPosition}/16
              </div>
            </div>
          </div>
          
          {/* Middle Row - XP and Attempts */}
          <div className="flex items-center justify-between mb-4 space-x-6">
            {/* XP Progress */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-cyan-300 font-bold text-xs">Total XP</span>
                <span className="text-white text-xs">{xp}/{maxXP}</span>
              </div>
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500" 
                  style={{ width: `${(xp / maxXP) * 100}%` }}
                />
              </div>
            </div>

            {/* Enhanced Attempts Left */}
            <div className="text-center">
              <div className="text-orange-300 font-bold text-xs mb-1">Attempts</div>
              <div className={`text-3xl font-bold transition-all duration-300 ${
                attemptsLeft <= 1 
                  ? 'text-red-400 animate-pulse [text-shadow:_0_0_15px_rgb(248_113_113_/_0.8),_0_0_30px_rgb(248_113_113_/_0.6)] scale-110' 
                  : attemptsLeft === 2 
                    ? 'text-yellow-400 [text-shadow:_0_0_10px_rgb(251_191_36_/_0.6)] scale-105' 
                    : 'text-green-400 [text-shadow:_0_0_8px_rgb(74_222_128_/_0.5)]'
              }`}>
                {attemptsLeft}
              </div>
              {attemptsLeft <= 1 && (
                <div className="text-red-300 text-xs font-bold animate-pulse mt-1">
                  CRITICAL!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};