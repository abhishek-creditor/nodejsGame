import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Zap } from "lucide-react";

export const QuarterIntroModal = ({ isOpen, quarter, onStartQuarter }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-4xl min-h-[80vh] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-none text-white flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Trophy className="w-20 h-20 text-yellow-400 mb-4" />
            </div>
            <h1 className="text-6xl font-black text-cyan-300 mb-4">
              QUARTER {quarter}
            </h1>
            <div className="text-2xl text-white mb-8">
              Get ready for the next challenge!
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gradient-to-b from-blue-900/50 to-blue-800/50 rounded-xl p-6 border border-blue-400/30">
              <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-300 mb-2">Questions</h3>
              <p className="text-3xl font-black text-white">4</p>
              <p className="text-sm text-gray-300">challenges ahead</p>
            </div>

            <div className="bg-gradient-to-b from-yellow-900/50 to-yellow-800/50 rounded-xl p-6 border border-yellow-400/30">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-yellow-300 mb-2">XP Per Question</h3>
              <p className="text-3xl font-black text-white">25</p>
              <p className="text-sm text-gray-300">experience points</p>
            </div>

            <div className="bg-gradient-to-b from-green-900/50 to-green-800/50 rounded-xl p-6 border border-green-400/30">
              <Trophy className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-300 mb-2">Progress</h3>
              <p className="text-3xl font-black text-white">1</p>
              <p className="text-sm text-gray-300">step per correct answer</p>
            </div>
          </div>

          <Button
            onClick={onStartQuarter}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-16 py-8 text-2xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
          >
            🏈 START QUARTER {quarter}
          </Button>

          {/* Atmospheric Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-70"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-50"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-60"></div>
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};