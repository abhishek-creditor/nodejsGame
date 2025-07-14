export const StadiumBackground = () => {
  return (
    <div className="absolute inset-0">
      {/* Upper Stadium Bowl with Realistic Crowd Image */}
      <div className="absolute top-0 left-0 right-0 h-1/2">
        <div className="relative h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 opacity-95">
          {/* Realistic Crowd Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
            style={{
              backgroundImage: "url('/lovable-uploads/0e6a4b9f-de1f-4956-b356-f0541a2a771d.png')",
              backgroundPosition: 'center center',
              filter: 'brightness(0.8) contrast(1.1)'
            }}
          />
          
          {/* Stadium Lights */}
          <div className="absolute top-4 left-1/4 w-16 h-10 bg-yellow-200 rounded-lg blur-lg animate-pulse opacity-80" />
          <div className="absolute top-4 right-1/4 w-16 h-10 bg-yellow-200 rounded-lg blur-lg animate-pulse opacity-80" />
          <div className="absolute top-8 left-1/3 w-12 h-8 bg-amber-100 rounded-lg blur-md animate-pulse opacity-60" />
          <div className="absolute top-8 right-1/3 w-12 h-8 bg-amber-100 rounded-lg blur-md animate-pulse opacity-60" />
          
          {/* Additional Stadium Lights */}
          <div className="absolute top-12 left-1/6 w-8 h-6 bg-yellow-300 rounded-lg blur-sm animate-pulse opacity-70" />
          <div className="absolute top-12 right-1/6 w-8 h-6 bg-yellow-300 rounded-lg blur-sm animate-pulse opacity-70" />

          {/* Light Beams */}
          <div className="absolute top-0 left-1/4 w-4 h-1/2 bg-gradient-to-b from-yellow-200/40 to-transparent blur-sm" />
          <div className="absolute top-0 right-1/4 w-4 h-1/2 bg-gradient-to-b from-yellow-200/40 to-transparent blur-sm" />
          <div className="absolute top-0 left-1/3 w-3 h-1/3 bg-gradient-to-b from-amber-100/30 to-transparent blur-sm" />
          <div className="absolute top-0 right-1/3 w-3 h-1/3 bg-gradient-to-b from-amber-100/30 to-transparent blur-sm" />

          {/* Stadium Atmosphere Effects */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`flash-${i}`}
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${30 + Math.random() * 50}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${0.5 + Math.random() * 1}s`
              }}
            />
          ))}

          {/* Stadium Atmosphere Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/15 via-orange-900/8 to-transparent" />
          
          {/* Depth and Motion Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/5 to-slate-900/15" />
        </div>
      </div>

      {/* Football Field */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-green-600 to-green-700">
        {/* Field Lines */}
        {[...Array(11)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-0.5 bg-white opacity-60"
            style={{
              bottom: `${i * 9}%`
            }}
          />
        ))}
        
        {/* 50 Yard Line */}
        <div className="absolute w-full h-1 bg-white bottom-1/2 opacity-100" />
        
        {/* Hash Marks */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute">
            <div className="w-6 h-0.5 bg-white opacity-50" style={{
              position: 'absolute',
              bottom: `${i * 4.5}%`,
              left: '47%'
            }} />
            <div className="w-6 h-0.5 bg-white opacity-50" style={{
              position: 'absolute',
              bottom: `${i * 4.5}%`,
              right: '47%'
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};