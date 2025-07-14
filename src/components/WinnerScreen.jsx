import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, Award } from "lucide-react";

export const WinnerScreen = ({ isVisible, onBackToHome }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
      {/* Celebration Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/95 via-green-800/95 to-blue-900/95" />
      
      <Card className="relative w-full max-w-lg mx-4 bg-gradient-to-b from-green-900 to-green-800 border-green-600 animate-scale-in">
        <CardContent className="p-8 text-center">
          {/* Victory Icon */}
          <div className="mb-6">
            <div className="text-6xl mb-3 animate-pulse">🏆</div>
            <div className="text-4xl text-yellow-400 font-bold mb-3 animate-[glow_2s_ease-in-out_infinite]">
              VICTORY!
            </div>
          </div>
          
          {/* Winner Message */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">
              Congratulations! You are the winner!
            </h2>
            <p className="text-lg text-green-200">
              You've successfully completed all challenges and mastered the private financial playbook!
            </p>
          </div>
          
          {/* Achievement Details */}
          <div className="mb-6 space-y-4">
            {/* Leaderboard Position */}
            <div className="p-4 bg-black/30 rounded-lg border border-yellow-600/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="text-white font-semibold">Leaderboard Position</span>
              </div>
              <span className="text-yellow-400 font-bold text-xl">#1</span>
            </div>
            
            {/* XP Gained */}
            <div className="p-4 bg-black/30 rounded-lg border border-blue-600/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-blue-500" />
                <span className="text-white font-semibold">XP Gained</span>
              </div>
              <span className="text-blue-400 font-bold text-xl">400 XP</span>
            </div>
            
            {/* Extra Rewards */}
            <div className="p-4 bg-black/30 rounded-lg border border-purple-600/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-purple-500" />
                <span className="text-white font-semibold">Extra Rewards</span>
              </div>
              <span className="text-purple-400 font-bold">Master Badge</span>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="space-y-3">
            <Button
              onClick={onBackToHome}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 w-full"
            >
              🏠 Back to Home
            </Button>
            
            <div className="text-sm text-gray-400 mt-3">
              Share your victory with others!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};