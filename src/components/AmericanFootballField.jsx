export const AmericanFootballField = ({ cameraOffset }) => {
  return (
    <div 
      className="absolute bottom-0 left-0 right-0 h-1/2"
      style={{
        background: `
          repeating-linear-gradient(
            90deg,
            #16a34a 0%,
            #16a34a 3.33%,
            #15803d 3.33%,
            #15803d 6.66%
          ),
          radial-gradient(ellipse at center bottom, rgba(0,0,0,0.1) 0%, transparent 70%)
        `,
        boxShadow: 'inset 0 -20px 40px rgba(0,0,0,0.2)',
      }}
    >
      {/* Grass texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(22, 163, 74, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 60% 80%, rgba(34, 197, 94, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 80% 40%, rgba(22, 163, 74, 0.3) 0%, transparent 50%)
          `,
          backgroundSize: '80px 40px, 60px 30px, 70px 35px, 90px 45px'
        }}
      />

      {/* Vertical Yard Lines - 11 lines for 10 sections */}
      {Array.from({ length: 11 }).map((_, i) => (
        <div
          key={`yard-line-${i}`}
          className={`absolute h-full bg-white ${
            i === 0 || i === 10 ? 'w-1 opacity-100' : // Goal lines
            i === 5 ? 'w-2 opacity-100' : // 50-yard line (center)
            'w-0.5 opacity-80'
          }`}
          style={{
            left: `${6.25 + (i * 8.75)}%`,
            boxShadow: '0 0 4px rgba(255,255,255,0.5)'
          }}
        />
      ))}
      
      {/* Hash Marks */}
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={`hash-${i}`} className="absolute">
          <div 
            className="h-6 w-0.5 bg-white opacity-70" 
            style={{
              position: 'absolute',
              left: '45%',
              bottom: `${15 + (i * 7)}%`,
              boxShadow: '0 0 2px rgba(255,255,255,0.3)'
            }} 
          />
          <div 
            className="h-6 w-0.5 bg-white opacity-70" 
            style={{
              position: 'absolute',
              right: '45%',
              bottom: `${15 + (i * 7)}%`,
              boxShadow: '0 0 2px rgba(255,255,255,0.3)'
            }} 
          />
        </div>
      ))}

      {/* Yard Numbers - Left side */}
      {[10, 20, 30, 40].map((number, i) => (
        <div
          key={`yard-left-${i}`}
          className="absolute text-white text-4xl font-anton font-bold opacity-70"
          style={{
            left: `${15 + (i * 8.75)}%`,
            bottom: '30%',
            transform: 'translateX(-50%)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            letterSpacing: '0.1em'
          }}
        >
          {number}
        </div>
      ))}

      {/* 50 Yard Line Number */}
      <div
        className="absolute text-white text-4xl font-anton font-bold opacity-70"
        style={{
          left: '50%',
          bottom: '30%',
          transform: 'translateX(-50%)',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          letterSpacing: '0.1em'
        }}
      >
        5 0
      </div>

      {/* Yard Numbers - Right side */}
      {[40, 30, 20, 10].map((number, i) => (
        <div
          key={`yard-right-${i}`}
          className="absolute text-white text-4xl font-anton font-bold opacity-70"
          style={{
            left: `${58.75 + (i * 8.75)}%`,
            bottom: '30%',
            transform: 'translateX(-50%)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            letterSpacing: '0.1em'
          }}
        >
          {number}
        </div>
      ))}

      {/* End Zones */}
      <div 
        className="absolute left-0 top-0 w-[6.25%] h-full bg-black flex items-center justify-center"
        style={{ boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.5)' }}
      >
        <div className="transform -rotate-90">
          <span 
            className="text-white text-xl font-black tracking-wider"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              letterSpacing: '0.2em'
            }}
          >
            TOUCHDOWN
          </span>
        </div>
      </div>

      <div 
        className="absolute right-0 top-0 w-[6.25%] h-full bg-black flex items-center justify-center"
        style={{ boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.5)' }}
      >
        <div className="transform rotate-90">
          <span 
            className="text-white text-xl font-black tracking-wider"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              letterSpacing: '0.2em'
            }}
          >
            TOUCHDOWN
          </span>
        </div>
      </div>

      {/* Field edge shadows */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.3) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 20%)
          `
        }}
      />
    </div>
  );
};