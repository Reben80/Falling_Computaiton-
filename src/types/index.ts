export interface Avatar {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  bonus: {
    type: 'all' | 'multiplication';
    value: number;
    description: string;
  };
}

export interface Theme {
  id: string;
  name: string;
  price: number;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  price: number;
  duration: number;
  effect: (
    setFallSpeed: (speed: number) => void,
    setScoreMultiplier?: (multiplier: number) => void,
    setShieldActive?: (active: boolean) => void,
    setShowAnswer?: (show: boolean) => void,
    setComboMultiplier?: (multiplier: number) => void
  ) => void;
}

export interface GameStats {
  totalScore: number;
  correctAnswers: number;
  fastAnswers: number;
  powerUpsUsed: number;
  gamesPlayed: number;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  reward: number;
  requirement: {
    type: 'speed' | 'combo' | 'score';
    target: number;
    timeLimit?: number;
  };
  progress: number;
  completed: boolean;
  expiresAt: string;
}

export type SoundEffect = 'correct' | 'wrong' | 'powerup' | 'achievement' | 'gameover';