import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export const GameActionButtons = ({ gamePhase, onSnapBall, onNextPlay }) => {
  if (gamePhase === 'ready') {
    return (
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30">
        <Button
          onClick={onSnapBall}
          size="lg"
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-16 py-8 text-2xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-red-500/25 group"
        >
          <Play className="w-8 h-8 mr-4 group-hover:scale-110 transition-transform" />
          SNAP THE BALL
        </Button>
      </div>
    );
  }

  if (gamePhase === 'nextPlay') {
    return (
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30">
        <Button
          onClick={onNextPlay}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-16 py-8 text-2xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
        >
          ▶️ NEXT SNAP
        </Button>
      </div>
    );
  }

  return null;
};