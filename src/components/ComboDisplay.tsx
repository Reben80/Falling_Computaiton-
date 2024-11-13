import React from 'react';
import { Theme } from '../types';
import { Flame } from 'lucide-react';

interface ComboDisplayProps {
  combo: number;
  theme: Theme;
}

export const ComboDisplay: React.FC<ComboDisplayProps> = ({ combo, theme }) => {
  if (combo <= 1) return null;

  return (
    <div className="fixed top-4 right-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
      <Flame className={`w-6 h-6 ${combo >= 5 ? 'animate-bounce text-orange-500' : ''}`} />
      <div className="font-bold text-2xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        {combo}x
      </div>
    </div>
  );
};