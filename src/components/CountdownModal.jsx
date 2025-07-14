import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const CountdownModal = ({ isOpen, onComplete }) => {
  const [count, setCount] = useState(5);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCount(5);
      setIsActive(true);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval;

    if (isActive && count > 0) {
      interval = setInterval(() => {
        setCount(count => count - 1);
      }, 1000);
    } else if (count === 0) {
      setIsActive(false);
      setTimeout(onComplete, 500);
    }

    return () => clearInterval(interval);
  }, [isActive, count, onComplete]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-4xl min-h-[80vh] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-none text-white flex items-center justify-center">
        <div className="text-center">
          {count > 0 ? (
            <>
              <h2 className="text-4xl font-bold mb-8 text-cyan-300">
                Game Starting In:
              </h2>
              <div className={`text-9xl font-black mb-8 transition-all duration-300 ${
                count <= 3 ? 'text-red-400 animate-pulse' : 'text-white'
              }`}>
                {count}
              </div>
              <div className="text-xl text-gray-400">
                Get ready to kickoff your financial journey!
              </div>
            </>
          ) : (
            <div className="text-center animate-fade-in">
              <div className="text-6xl font-black text-green-400 mb-4">
                KICKOFF!
              </div>
              <div className="text-2xl text-white">
                Let's play Financial Football!
              </div>
            </div>
          )}
          
          {/* Stadium atmosphere background effect */}
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