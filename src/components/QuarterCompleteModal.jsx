import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Star, ArrowRight } from "lucide-react";

export const QuarterCompleteModal = ({ 
  isOpen, 
  quarter, 
  xpEarned, 
  onContinue, 
  isGameComplete = false 
}) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-none text-white flex items-center justify-center overflow-y-auto">
        <div className="text-center space-y-6 p-4">
          <div className="space-y-3">
            <div className="flex justify-center">
              <Trophy className="w-16 h-16 text-yellow-400 mb-3 animate-bounce" />
            </div>
            <h1 className="text-4xl font-black text-green-400 mb-3">
              {isGameComplete ? "GAME COMPLETE!" : `QUARTER ${quarter} COMPLETE!`}
            </h1>
            <div className="text-xl text-white mb-6">
              {isGameComplete ? "🏆 Congratulations! You've mastered all quarters!" : "🎉 Outstanding performance!"}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 rounded-2xl p-6 border border-yellow-400/30 mb-6">
            <Star className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-yellow-300 mb-3">XP Earned</h3>
            <p className="text-4xl font-black text-white mb-2">+{xpEarned}</p>
            <p className="text-base text-gray-300">Experience Points</p>
          </div>

          {!isGameComplete && (
            <div className="text-lg text-cyan-300 mb-6">
              Ready for the next challenge?
            </div>
          )}

          <Button
            onClick={onContinue}
            size="lg"
            className={`${
              isGameComplete 
                ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800" 
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            } text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group`}
          >
            {isGameComplete ? (
              <>
                🎊 PLAY AGAIN
              </>
            ) : (
              <>
                CONTINUE TO QUARTER {quarter + 1}
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </Button>

          {/* Celebration Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={`celebration-${i}`}
                className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};