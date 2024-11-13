import { PowerUp } from '../types';
import { Clock, Star, Shield, Brain, Zap, Target } from 'lucide-react';

export const powerups: PowerUp[] = [
  {
    id: 'slow-time',
    name: 'Time Slow',
    description: 'Slows down the falling speed for 15 seconds',
    icon: Clock,
    price: 50,
    duration: 15000,
    effect: (setFallSpeed) => {
      setFallSpeed(200);
      setTimeout(() => setFallSpeed(100), 15000);
    }
  },
  {
    id: 'double-points',
    name: 'Double Points',
    description: 'Double points for 20 seconds',
    icon: Star,
    price: 75,
    duration: 20000,
    effect: (_, setScoreMultiplier) => {
      setScoreMultiplier?.(2);
      setTimeout(() => setScoreMultiplier?.(1), 20000);
    }
  },
  {
    id: 'shield',
    name: 'Shield',
    description: 'Protects from one wrong answer',
    icon: Shield,
    price: 100,
    duration: 0,
    effect: (_, __, setShieldActive) => {
      setShieldActive?.(true);
    }
  },
  {
    id: 'instant-solve',
    name: 'Quick Brain',
    description: 'Shows the answer for 2 seconds',
    icon: Brain,
    price: 150,
    duration: 2000,
    effect: (_, __, ___, setShowAnswer) => {
      setShowAnswer?.(true);
      setTimeout(() => setShowAnswer?.(false), 2000);
    }
  },
  {
    id: 'combo-boost',
    name: 'Combo Boost',
    description: 'Doubles combo multiplier for 30 seconds',
    icon: Zap,
    price: 200,
    duration: 30000,
    effect: (_, __, ___, ____, setComboMultiplier) => {
      setComboMultiplier?.(2);
      setTimeout(() => setComboMultiplier?.(1), 30000);
    }
  }
];