import { useState } from "react";
import { HeroSection } from "../components/HeroSection.jsx";
import { ChallengeSection } from "../components/ChallengeSection.jsx";
import { LoginModal } from "../components/LoginModal.jsx";
import { GameStartModal } from "../components/GameStartModal.jsx";
import { CoachIntroModal } from "../components/CoachIntroModal.jsx";
import { CountdownModal } from "../components/CountdownModal.jsx";
import { StadiumFieldScreen } from "../components/StadiumFieldScreen.jsx";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showGameStart, setShowGameStart] = useState(false);
  const [showCoachIntro, setShowCoachIntro] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showStadiumField, setShowStadiumField] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [gameConfig, setGameConfig] = useState({
    topic: "",
    mode: "",
    difficulty: "",
    avatar: "",
    teamColor: ""
  });

  const handlePlayClick = () => {
    setShowLogin(true);
  };

  const handleLogin = (loginData) => {
    setUserData(loginData);
    setShowLogin(false);
    setShowGameStart(true);
  };

  const handleGameStart = (config) => {
    setGameConfig(config);
    setShowGameStart(false);
    setShowCoachIntro(true);
  };

  const handleCoachIntroComplete = () => {
    setShowCoachIntro(false);
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setShowStadiumField(true);
    console.log("Game starting with config:", gameConfig);
    console.log("Player data:", userData);
  };

  const handleSnapBall = () => {
    console.log("Snapping the ball! Starting first question...");
  };

  return (
    <div className="min-h-screen">
      <HeroSection onPlayClick={handlePlayClick} />
      <ChallengeSection />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />

      <GameStartModal
        isOpen={showGameStart}
        onClose={() => setShowGameStart(false)}
        onGameStart={handleGameStart}
      />

      <CoachIntroModal
        isOpen={showCoachIntro}
        onComplete={handleCoachIntroComplete}
      />

      <CountdownModal
        isOpen={showCountdown}
        onComplete={handleCountdownComplete}
      />

      <StadiumFieldScreen
        isVisible={showStadiumField}
        onSnapBall={handleSnapBall}
        userId={userData.id || userData._id || userData.email}
      />
    </div>
  );
};

export default Index;
