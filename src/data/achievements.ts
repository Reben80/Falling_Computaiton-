import { Achievement } from '../types';
import { Trophy, Zap, Brain, Target, Crown, Rocket, Star, Medal } from 'lucide-react';

export const achievements: Achievement[] = [
  {
    id: 'quick-thinker',
    name: 'Quick Thinker',
    description: 'Answer 5 questions correctly in under 3 seconds each',
    icon: Zap,
    condition: (stats) => stats.fastAnswers >= 5,
    reward: 100,
    unlocked: false
  },
  {
    id: 'math-wizard',
    name: 'Math Wizard',
    description: 'Score 1000 points in a single game',
    icon: Brain,
    condition: (stats) => stats.totalScore >= 1000,
    reward: 200,
    unlocked: false
  },
  {
    id: 'power-player',
    name: 'Power Player',
    description: 'Use 10 power-ups',
    icon: Rocket,
    condition: (stats) => stats.powerUpsUsed >= 10,
    reward: 150,
    unlocked: false
  },
  {
    id: 'perfect-streak',
    name: 'Perfect Streak',
    description: 'Get 10 correct answers in a row',
    icon: Target,
    condition: (stats) => stats.correctAnswers >= 10,
    reward: 300,
    unlocked: false
  },
  {
    id: 'champion',
    name: 'Champion',
    description: 'Play 50 games',
    icon: Crown,
    condition: (stats) => stats.gamesPlayed >= 50,
    reward: 500,
    unlocked: false
  }
];