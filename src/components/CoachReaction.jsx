import { useEffect } from 'react';

export const CoachReaction = ({ isVisible, isCorrect, yards, onComplete }) => {
  useEffect(() => {
    if (isVisible && isCorrect) {
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 4000); // 4 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, isCorrect, onComplete]);

  if (!isVisible) return null;

  const messages = {
    correct: [
      `${yards} Yards — that's the Private Power move!`,
      "Excellent! You're mastering your freedom!",
      "That's how we play in the private side!",
      "Knowledge is power — and yards!"
    ],
    incorrect: [
      "Oof — don't fumble your freedom!",
      "Study harder — your liberty depends on it!",
      "That's a penalty in the private league!",
      "Back to the playbook, champion!"
    ]
  };

  const messageList = isCorrect ? messages.correct : messages.incorrect;
  const message = messageList[Math.floor(Math.random() * messageList.length)];

  return (
    <div className="absolute top-8 left-8 z-30 max-w-lg animate-fade-in lg:top-12 lg:left-12 flex items-center space-x-4">
      {/* Coach Image positioned to the left */}
      <div className="flex-shrink-0">
        <img 
          src="/lovable-uploads/b06aa387-7aa1-442f-92a2-2e3366e9b7b5.png"
          alt="Coach Paulmicheal - Referee"
          className="w-32 h-32 object-contain drop-shadow-lg"
        />
      </div>

      {/* Speech Dialog Box */}
      <div className={`backdrop-blur-sm rounded-2xl p-6 border flex-1 ${
        isCorrect 
          ? 'bg-gradient-to-r from-green-900/95 to-emerald-900/95 border-green-300/30' 
          : 'bg-gradient-to-r from-red-900/95 to-rose-900/95 border-red-300/30'
      }`}>
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
            isCorrect ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-red-500 to-rose-400'
          }`}>
            CP
          </div>
          <div>
            <div className={`font-bold text-lg mb-2 ${
              isCorrect ? 'text-green-300' : 'text-red-300'
            }`}>Coach Paulmicheal</div>
            <p className="text-white text-base leading-relaxed">
              "{message}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};