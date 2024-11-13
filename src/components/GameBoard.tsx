import React from 'react';
import { Theme } from '../types';

interface Problem {
  num1: number;
  num2: number;
  operator: string;
}

interface GameBoardProps {
  problem: Problem;
  position: number;
  theme: Theme;
  showAnswer?: boolean;
  answer?: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  problem, 
  position, 
  theme,
  showAnswer,
  answer 
}) => {
  return (
    <div className={`relative h-80 border-2 border-white/30 rounded-lg overflow-hidden`}>
      {/* Beautiful gradient background with animated subtle movement */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-blue-900/50 to-indigo-900/50 animate-gradient-slow" />
      
      {/* Scoring zones with glass effect */}
      <div className="absolute inset-0 flex flex-col">
        {[
          { value: 100, color: 'from-green-500/20' },
          { value: 50, color: 'from-teal-500/20' },
          { value: 25, color: 'from-blue-500/20' },
          { value: 10, color: 'from-indigo-500/20' },
          { value: 5, color: 'from-purple-500/20' },
          { value: 1, color: 'from-pink-500/20' }
        ].map(({ value, color }) => (
          <div
            key={value}
            className={`flex-1 border-b border-white/10 flex items-center justify-end px-4 bg-gradient-to-r ${color} to-transparent backdrop-blur-sm`}
          >
            <span className="text-sm font-bold text-white/90">${value}</span>
          </div>
        ))}
      </div>

      {/* Problem box with theme gradient */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 bg-gradient-to-r ${theme.primary} px-6 py-3 rounded-lg shadow-lg text-${theme.text} font-bold transition-all duration-300 z-10 backdrop-blur-md border border-white/20`}
        style={{ top: `${position}%` }}
      >
        <div className="text-xl">{problem.num1} {problem.operator} {problem.num2}</div>
        {showAnswer && (
          <div className="text-sm text-white/75 text-center mt-1">
            = {answer}
          </div>
        )}
      </div>

      {/* Decorative particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};