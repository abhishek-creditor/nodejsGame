import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const CoachIntroModal = ({ isOpen, onComplete }) => {
  const [showSpeech, setShowSpeech] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowSpeech(true);
    }
  }, [isOpen]);

  const handleContinue = () => {
    setShowSpeech(false);
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-4xl min-h-[80vh] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-none text-white flex items-center justify-center">
        <div className="text-center space-y-6">
          {showSpeech && (
            <div className="animate-fade-in">
              {/* Coach Avatar/Icon */}
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-b from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-6xl">
                  🏈
                </div>
                <h2 className="text-2xl font-bold mt-4 text-cyan-300">Coach Paulmicheal</h2>
              </div>

              {/* Speech Bubble */}
              <div className="relative bg-slate-800 rounded-2xl p-8 mx-auto max-w-2xl border-2 border-cyan-400">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-slate-800"></div>
                </div>
                
                <p className="text-2xl font-bold text-white leading-relaxed">
                  "This is more than a game — it's your path to freedom. Let's kick it off!"
                </p>
                
                {/* Subtitle */}
                <div className="mt-4 p-3 bg-slate-900 rounded-lg">
                  <p className="text-lg text-cyan-300 italic">
                    This is more than a game — it's your path to freedom. Let's kick it off!
                  </p>
                </div>
              </div>

              {/* Continue Button */}
              <div className="mt-8">
                <Button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8 py-3 text-xl font-bold"
                >
                  LET'S GO! 🚀
                </Button>
              </div>
            </div>
          )}
          
          {/* Motivational background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-70"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-50"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-60"></div>
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-40"></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};