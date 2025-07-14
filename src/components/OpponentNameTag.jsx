export const OpponentNameTag = ({ name, role, icon, isAttacking }) => {
  return (
    <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
      isAttacking ? 'opacity-90' : 'opacity-100'
    }`}>
      <div className="bg-slate-900/90 border-2 border-white/80 rounded-lg px-3 py-1.5 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-2 text-white font-bold text-sm whitespace-nowrap">
          <span className="text-base">{icon}</span>
          <div className="text-center">
            <div className="text-white font-bold">{name}</div>
            <div className="text-gray-300 text-xs font-medium">{role}</div>
          </div>
        </div>
      </div>
      {/* Tag pointer */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/80"></div>
    </div>
  );
};