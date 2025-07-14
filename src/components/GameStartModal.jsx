import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Image1 from "../assets/image1ava.png";
import Image1Yellow from "../assets/image1avaY.png";
import Image1Black from "../assets/image1avaB.png";
import Image2 from "../assets/image2ava.png";
import Image2Yellow from "../assets/Image2avaY.png";
import Image2Black from "../assets/image2avaB.png";

export const GameStartModal = ({ isOpen, onClose, onGameStart }) => {
  const [step, setStep] = useState(1);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [selectedTeamColor, setSelectedTeamColor] = useState("blue");

  useEffect(() => {
    const savedAvatar = localStorage.getItem('gameAvatar');
    const savedTeamColor = localStorage.getItem('gameTeamColor');
    if (savedAvatar) setSelectedAvatar(savedAvatar);
    if (savedTeamColor) setSelectedTeamColor(savedTeamColor);
  }, []);

  useEffect(() => {
    if (selectedAvatar) localStorage.setItem('gameAvatar', selectedAvatar);
  }, [selectedAvatar]);

  useEffect(() => {
    if (selectedTeamColor) localStorage.setItem('gameTeamColor', selectedTeamColor);
  }, [selectedTeamColor]);

  const avatars = [
    { id: "powerback", name: "Powerback", base: Image1, yellow: Image1Yellow, black: Image1Black },
    { id: "quartermind", name: "Quartermind", base: Image2, yellow: Image2Yellow, black: Image2Black }
  ];

  const teamColors = [
    { id: "blue", name: "Blue", color: "bg-blue-600", hoverColor: "hover:bg-blue-700" },
    { id: "gold", name: "Gold", color: "bg-yellow-500", hoverColor: "hover:bg-yellow-600" },
    { id: "black", name: "Black", color: "bg-gray-900", hoverColor: "hover:bg-gray-800" }
  ];

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onGameStart({
        topic: "personal",
        mode: "practice",
        difficulty: "rookie",
        avatar: selectedAvatar,
        teamColor: selectedTeamColor
      });
      setStep(1);
    }
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const canProceed = () => {
    if (step === 1) return selectedAvatar !== "";
    if (step === 2) return selectedTeamColor !== "";
    return false;
  };

  const getStepTitle = () => {
    if (step === 1) return "🧍‍♂️ Choose Your Avatar";
    if (step === 2) return "🎨 Select Team Color";
    return "";
  };

  const getAvatarImage = (avatar) => {
    if (selectedTeamColor === "gold") return avatar.yellow;
    if (selectedTeamColor === "black") return avatar.black;
    return avatar.base; // blue or default
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-cyan-300">
            🏁 Start Game
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          {step === 1 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-center">{getStepTitle()}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
                {avatars.map((avatar) => (
                  <Card
                    key={avatar.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 relative ${
                      selectedAvatar === avatar.id
                        ? "bg-slate-700 border-yellow-400 shadow-lg shadow-yellow-500/25 ring-2 ring-yellow-400"
                        : "bg-slate-700 border-slate-600 hover:bg-slate-600"
                    }`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="mb-4">
                        <img
                          src={getAvatarImage(avatar)}
                          alt={avatar.name}
                          className="w-48 h-48 mx-auto object-contain"
                        />
                      </div>
                      {selectedAvatar === avatar.id && (
                        <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                          Selected
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-center">{getStepTitle()}</h3>

              {selectedAvatar && (
                <div className="mb-8 text-center">
                  <div className="inline-block p-6 bg-slate-800 rounded-lg">
                    <img
                      src={getAvatarImage(avatars.find(a => a.id === selectedAvatar))}
                      alt="Selected Avatar"
                      className="w-32 h-32 mx-auto object-contain mb-3"
                    />
                    <p className="text-lg text-gray-400">Your Avatar</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {teamColors.map((color) => (
                  <div
                    key={color.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedTeamColor === color.id ? "ring-4 ring-white" : ""
                    }`}
                    onClick={() => setSelectedTeamColor(color.id)}
                  >
                    <div className="text-center">
                      <div
                        className={`w-20 h-20 rounded-full mx-auto mb-3 ${color.color} ${color.hoverColor} transition-colors duration-200`}
                      />
                      <p className="text-white font-medium text-lg">{color.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-6">
            <div className="text-lg text-gray-400">Step {step} of 2</div>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 text-lg font-semibold"
            >
              {step === 2 ? "CONTINUE" : "NEXT"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
