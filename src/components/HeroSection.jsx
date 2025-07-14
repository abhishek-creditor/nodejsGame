import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export const HeroSection = ({ onPlayClick }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image without blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/lovable-uploads/eec59edb-7a4c-4d99-b9b4-ec5cbaa82eb5.png')"
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Logo in Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <img 
          src="/lovable-uploads/0adc526a-15dc-4c40-a000-7481aa053a44.png" 
          alt="Creditor Academy" 
          className="h-16 w-auto"
        />
      </div>
      
      {/* Main Content - Left Aligned */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-4 pl-8 md:pl-16">
        <div className="max-w-4xl">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight text-left">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              CREDITOR
            </span>
            <br />
            <span className="text-white">
              FOOTBALL
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-cyan-200 font-semibold mb-8 tracking-wide text-left">
            Learn the Game. Win Your Freedom.
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl leading-relaxed text-left">
            Play your way through the basics of personal and business finance in an NFL-style game. 
            Answer right, gain yards. Win courses. Level up.
          </p>
          
          {/* Play Button */}
          <div className="text-left">
            <Button
              onClick={onPlayClick}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 group"
            >
              <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              PLAY NOW
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  );
};