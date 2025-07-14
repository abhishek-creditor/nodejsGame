import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const GameOverScreen = ({ isVisible, onRestart, onReturnHome }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
      {/* Dimmed Stadium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-green-900/95" />
      
      <Card className="relative w-full max-w-lg mx-4 bg-gradient-to-b from-red-900 to-red-800 border-red-600 animate-scale-in">
        <CardContent className="p-8 text-center">
          {/* Main Impact Icon */}
          <div className="mb-6">
            <div className="text-6xl mb-3 animate-pulse">💥</div>
            <div className="text-4xl text-red-400 font-bold mb-3 animate-[glow_2s_ease-in-out_infinite]">
              INTERCEPTED!
            </div>
          </div>
          
          {/* Game Over Message */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">
              You've been tackled by the system.
            </h2>
            <p className="text-lg text-red-200">
              You must protect your private side. Try again to win this quarter.
            </p>
          </div>
          
          {/* Motivational Section */}
          <div className="mb-6 p-4 bg-black/30 rounded-lg border border-red-600/30">
            <p className="text-base text-gray-300">
              Every champion faces setbacks on the field.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Study the defense and come back stronger!
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onRestart}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 w-full"
            >
              🔁 Restart Quarter 1
            </Button>
            
            {onReturnHome && (
              <Button
                onClick={onReturnHome}
                variant="outline"
                size="lg"
                className="border-gray-400 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-4 text-lg font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-105 w-full"
              >
                🏠 Back to Start
              </Button>
            )}
            
            <div className="text-sm text-gray-400 mt-3">
              Choose your next move carefully
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};