import { useState } from 'react';

export const GamePhaseManager = ({ children }) => {
  const [gamePhase, setGamePhase] = useState('quarterIntro');

  return <>{children(gamePhase, setGamePhase)}</>;
};

// Export gamePhase as a constant if needed
export const GamePhase = {
  QUARTER_INTRO: 'quarterIntro',
  // Add other phases as needed
};