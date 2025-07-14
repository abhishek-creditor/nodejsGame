export const useOpponentData = (basePositionPercentage) => {
  return [
    {
      id: 1,
      name: "Agent Rex",
      role: "IRS Agent",
      icon: "💼",
      image: "/lovable-uploads/357d883f-96b4-4cf2-b8d2-1e6e25bddb0a.png",
      alt: "Opponent Player 1 - Left Side",
      originalLeft: `${Math.max(5, basePositionPercentage - 10)}%`,
      originalBottom: '30%',
      threatenLeft: `${Math.max(5, basePositionPercentage - 6)}%`,
      threatenBottom: '34%',
      size: 'w-24',
      animationDelay: "0s",
      taunt: "Tax is law, citizen. You can't dodge this!"
    },
    {
      id: 2,
      name: "Clerk Carla",
      role: "Court Clerk",
      icon: "📋",
      image: "/lovable-uploads/41fbfcdf-42fb-42ff-8be6-be2e1fa41c0b.png",
      alt: "Opponent Player 2 - Right Side",
      originalLeft: `${Math.min(90, basePositionPercentage + 10)}%`,
      originalBottom: '30%',
      threatenLeft: `${Math.min(88, basePositionPercentage + 6)}%`,
      threatenBottom: '34%',
      size: 'w-24',
      animationDelay: "0.2s",
      taunt: "Where's your code citation? I'll wait."
    },
    {
      id: 3,
      name: "Bar-Bob",
      role: "Bar Attorney",
      icon: "⚖️",
      image: "/lovable-uploads/d1a05f5a-c0b7-4741-a243-6153f244fbb7.png",
      alt: "Opponent Player 3 - Front Defense",
      originalLeft: `${basePositionPercentage}%`,
      originalBottom: '40%',
      threatenLeft: `${basePositionPercentage}%`,
      threatenBottom: '36%',
      size: 'w-20',
      animationDelay: "0.4s",
      taunt: "Slipping on your own strawman, huh?"
    },
    {
      id: 4,
      name: "Banker Vinny",
      role: "Banker",
      icon: "🏦",
      image: "/lovable-uploads/8438b377-ddf4-4941-9c67-ec45593834af.png",
      alt: "Opponent Player 4 - Back-Right Flanker",
      originalLeft: `${Math.max(5, basePositionPercentage - 8)}%`,
      originalBottom: '5%',
      threatenLeft: `${Math.max(5, basePositionPercentage - 4)}%`,
      threatenBottom: '12%',
      size: 'w-24',
      animationDelay: "0.6s",
      taunt: "Your trust ain't private now, buddy."
    }
  ];
};

export const getThreateningOpponent = (attemptsLeft) => {
  if (attemptsLeft === 2) return 4;
  if (attemptsLeft === 1) return 1;
  return null;
};
