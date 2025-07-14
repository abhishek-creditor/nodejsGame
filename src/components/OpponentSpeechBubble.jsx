export const OpponentSpeechBubble = ({ taunt, isVisible }) => {
  console.log('OpponentSpeechBubble render:', { taunt, isVisible });
  
  if (!isVisible) return null;

  return (
    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-40 animate-fade-in">
      <div className="relative bg-red-500/20 border border-red-700/40 rounded-2xl px-4 py-3 shadow-xl backdrop-blur-sm max-w-[200px] min-w-[150px]">
        <div className="text-white text-sm font-bold text-center leading-tight">
          {taunt}
        </div>
        {/* Speech bubble tail pointing down */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-transparent border-t-red-500/20"></div>
        {/* Outer border for tail */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-2px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[12px] border-transparent border-t-red-700/40"></div>
      </div>
    </div>
  );
};