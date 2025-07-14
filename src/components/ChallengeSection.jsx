import { Trophy, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ChallengeSection = () => {
  const [visiblePlayers, setVisiblePlayers] = useState(5);
  
  // Mock leaderboard data with more players
  const allLeaderboardData = [
    { rank: 1, name: "Alex Rodriguez", score: 400 },
    { rank: 2, name: "Sarah Chen", score: 375 },
    { rank: 3, name: "Marcus Johnson", score: 350 },
    { rank: 4, name: "Emma Davis", score: 325 },
    { rank: 5, name: "Jordan Kim", score: 300 },
    { rank: 6, name: "Taylor Swift", score: 275 },
    { rank: 7, name: "Michael Brown", score: 250 },
    { rank: 8, name: "Lisa Wang", score: 225 },
    { rank: 9, name: "David Lee", score: 200 },
    { rank: 10, name: "Rachel Green", score: 175 },
    { rank: 11, name: "John Smith", score: 150 },
    { rank: 12, name: "Maria Garcia", score: 125 },
    { rank: 13, name: "James Wilson", score: 100 },
    { rank: 14, name: "Anna Miller", score: 75 },
    { rank: 15, name: "Chris Evans", score: 50 },
  ];

  const displayedPlayers = allLeaderboardData.slice(0, visiblePlayers);
  const hasMorePlayers = visiblePlayers < allLeaderboardData.length;

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-amber-600" />;
    return <Star className="w-5 h-5 text-blue-500" />;
  };

  const loadMorePlayers = () => {
    setVisiblePlayers(prev => Math.min(prev + 5, allLeaderboardData.length));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Challenge Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
              Are you up<br />
              for the<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                challenge?
              </span>
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                <strong className="text-white">Creditor Football: Private Edition</strong> is a fast-paced, 
                interactive game designed to teach powerful financial concepts in an engaging, strategic way. 
                Developed by Creditor Academy, this game helps you unlock five foundational lessons every 
                student of the private must master:
              </p>
              
              <ul className="space-y-2 text-lg">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  Become Private
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  Operate in the Private
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  Build in Credit
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  Protect the Entity
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  Script for Power Moves
                </li>
              </ul>
              
              <p className="text-lg leading-relaxed pt-4">
                This isn't just a game — it's your <strong className="text-cyan-300">private financial playbook</strong> to 
                transition from public dependency to private power. Are you ready to level up your financial game?
              </p>
            </div>
            
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="/lovable-uploads/a4e9e0a4-63f8-44a9-a8b9-11d8b6348635.png" 
                alt="Football team celebrating" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
        
        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              Leaderboard
            </h3>
            <p className="text-gray-400 text-lg">Top players mastering private financial concepts</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-4 border-b border-gray-700">
              <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                <div>Rank</div>
                <div>Player</div>
                <div>Score</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-700">
              {displayedPlayers.map((player) => (
                <div 
                  key={player.rank} 
                  className="grid grid-cols-3 gap-4 p-4 hover:bg-gray-700/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {getRankIcon(player.rank)}
                    <span className="text-white font-bold">#{player.rank}</span>
                  </div>
                  <div className="text-white font-medium">{player.name}</div>
                  <div className="text-cyan-400 font-bold">{player.score.toLocaleString()}</div>
                </div>
              ))}
            </div>
            
            {hasMorePlayers && (
              <div className="p-4 bg-gray-800/30 text-center">
                <Button 
                  variant="outline" 
                  className="text-gray-300 border-gray-600 hover:bg-gray-700"
                  onClick={loadMorePlayers}
                >
                  <Users className="w-4 h-4 mr-2" />
                  View Full Leaderboard
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};