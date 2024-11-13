import React from 'react';
import { Challenge } from '../types';
import { Trophy } from 'lucide-react';

interface DailyChallengesProps {
  challenges: Challenge[];
  theme: Theme;
}

export const DailyChallenges: React.FC<DailyChallengesProps> = ({ challenges, theme }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold">Daily Challenges</h2>
      </div>
      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`p-4 rounded-lg ${
              challenge.completed
                ? 'bg-green-500/20 border-green-500/50'
                : 'bg-white/10 border-white/20'
            } border backdrop-blur-sm`}
          >
            <h3 className="font-bold text-lg mb-1">{challenge.name}</h3>
            <p className="text-sm text-gray-300 mb-3">{challenge.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-2 w-32 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${theme.primary} transition-all`}
                    style={{
                      width: `${(challenge.progress / challenge.requirement.target) * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm">
                  {challenge.progress}/{challenge.requirement.target}
                </span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Trophy className="w-4 h-4" />
                <span className="font-bold">${challenge.reward}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};