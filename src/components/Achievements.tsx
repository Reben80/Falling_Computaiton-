import React from 'react';
import { Achievement, GameStats } from '../types';
import { achievements } from '../data/achievements';

interface AchievementsProps {
  stats: GameStats;
}

export const Achievements: React.FC<AchievementsProps> = ({ stats }) => {
  return (
    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Achievements</h2>
      <div className="grid gap-3">
        {achievements.map((achievement) => {
          const isUnlocked = achievement.condition(stats);
          return (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg ${
                isUnlocked ? 'bg-green-500/20' : 'bg-white/10'
              } flex items-center gap-3`}
            >
              <achievement.icon className={`w-6 h-6 ${isUnlocked ? 'text-green-400' : 'text-gray-400'}`} />
              <div>
                <div className="font-semibold">{achievement.name}</div>
                <div className="text-sm text-gray-300">{achievement.description}</div>
                {isUnlocked && <div className="text-sm text-green-400">+${achievement.reward} bonus!</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};