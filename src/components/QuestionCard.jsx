import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const QuestionCard = ({ question, questionNumber, onAnswer, isVisible }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (!isVisible) return;

    setSelectedAnswer(null);
    setTimeLeft(15);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (selectedAnswer === null) handleAnswer(-1); // timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const isCorrect = index === question.correctAnswer;

    setTimeout(() => {
      onAnswer(index, isCorrect);
    }, isCorrect ? 3000 : 2000);
  };

  const getOptionStyle = (index) => {
    if (selectedAnswer === null) {
      return "bg-slate-700 border-slate-600 hover:bg-slate-600 text-white";
    }

    if (index === question.correctAnswer) {
      return "bg-green-600 border-green-400 text-white";
    }

    if (index === selectedAnswer) {
      return "bg-red-600 border-red-400 text-white";
    }

    return "bg-slate-700 border-slate-600 text-gray-400 opacity-60";
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-4xl mx-4 bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700">
        <CardContent className="p-8">
          {/* Timer */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-cyan-300 font-bold">Time Remaining</span>
              <span className="text-white font-bold text-xl">{timeLeft}s</span>
            </div>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft <= 5 ? "bg-red-500" : timeLeft <= 10 ? "bg-yellow-500" : "bg-green-500"
                }`}
                style={{ width: `${(timeLeft / 15) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
              QUESTION {questionNumber}
            </h2>
            <p className="text-xl text-white">{question.question}</p>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-6 text-left justify-start h-auto transition-all duration-300 border-2 ${getOptionStyle(index)}`}
              >
                <span className="font-bold mr-3 text-lg">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="text-lg">{option}</span>
              </Button>
            ))}
          </div>

          {/* Feedback */}
          {selectedAnswer !== null && (
            <div className="text-center mt-6 bg-slate-800/60 p-4 rounded-md">
              {selectedAnswer === question.correctAnswer ? (
                <>
                  <p className="text-green-400 text-lg font-bold mb-2">✅ Correct!</p>
                </>
              ) : (
                <>
                  <p className="text-red-400 text-lg font-bold mb-2">❌ Wrong</p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};