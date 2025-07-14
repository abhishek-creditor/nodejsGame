import { useEffect } from "react";
import { useOpponentData } from "../hooks/useOpponentData";

export const OpponentTaunt = ({ isVisible, opponentId, onComplete }) => {
  const opponents = useOpponentData(50); // Use center position for data
  
  useEffect(() => {
    if (isVisible && opponentId) {
      const timer = setTimeout(() => {
        onComplete();
      }, 6000); // 4 seconds to match the fade timing
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, opponentId, onComplete]);

  if (!isVisible || !opponentId) return null;

  const opponent = opponents.find(opp => opp.id === opponentId);
  if (!opponent) return null;

  return (
    <div 
      className={`fixed top-8 left-8 z-50 lg:top-12 lg:left-12 transition-all duration-500 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0 translate-y-0 animate-fade-in' 
          : 'opacity-0 translate-x-8 -translate-y-4'
      }`}
    >
      <div className="bg-red-500/15 border border-red-700/60 rounded-lg px-3 py-2 shadow-lg backdrop-blur-sm max-w-xs">
        <div className="flex items-center gap-2">
          <span className="text-lg">{opponent.icon}</span>
          <div className="flex-1">
            <div className="text-white text-sm font-medium mb-1">{opponent.name}</div>
            <div className="text-white/90 text-sm leading-tight">
              "{opponent.taunt}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};