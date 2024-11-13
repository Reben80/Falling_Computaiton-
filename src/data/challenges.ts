import { Challenge } from '../types';

export const generateDailyChallenges = (): Challenge[] => {
  const today = new Date().toISOString().split('T')[0];
  
  return [
    {
      id: `${today}-speed`,
      name: 'Speed Demon',
      description: 'Answer 5 questions in under 2 seconds each',
      reward: 500,
      requirement: {
        type: 'speed',
        target: 5,
        timeLimit: 2000
      },
      progress: 0,
      completed: false,
      expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
    },
    {
      id: `${today}-combo`,
      name: 'Combo Master',
      description: 'Achieve a 10x combo multiplier',
      reward: 750,
      requirement: {
        type: 'combo',
        target: 10
      },
      progress: 0,
      completed: false,
      expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
    },
    {
      id: `${today}-score`,
      name: 'High Roller',
      description: 'Score 2000 points in a single game',
      reward: 1000,
      requirement: {
        type: 'score',
        target: 2000
      },
      progress: 0,
      completed: false,
      expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
    }
  ];
};