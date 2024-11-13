import React from 'react';
import { Trophy, Star, Zap, Target, Clock } from 'lucide-react';
import type { Theme } from '../types';

interface GameSummaryProps {
  show: boolean;
  onClose: () => void;
  stats: {
    score: number;
    correctAnswers: number;
    totalAnswers: number;
    maxCombo: number;
    averageSpeed: number;
    powerUpsUsed: number;
  };
  theme: Theme;
}

export const GameSummary: React.FC<GameSummaryProps> = ({
  show,
  onClose,
  stats,
  theme,
}) => {
  if (!show) return null;

  const accuracy = ((stats.correctAnswers / stats.totalAnswers) * 100) || 0;
  const grade = accuracy >= 90 ? 'A' : accuracy >= 80 ? 'B' : accuracy >= 70 ? 'C' : 'D';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`bg-gradient-to-b ${theme.background} rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all`}>
        <h2 className="text-2xl font-bold text-center mb-6">Game Summary</h2>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className={`text-6xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent mb-2`}>
              ${stats.score}
            </div>
            <div className="text-sm opacity-75">Final Score</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="flex justify-center mb-2">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-xl font-bold">{accuracy.toFixed(1)}%</div>
              <div className="text-sm opacity-75">Accuracy</div>
            </div>

            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="flex justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-xl font-bold">Grade {grade}</div>
              <div className="text-sm opacity-75">Performance</div>
            </div>

            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="flex justify-center mb-2">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-xl font-bold">{stats.maxCombo}x</div>
              <div className="text-sm opacity-75">Max Combo</div>
            </div>

            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="flex justify-center mb-2">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-xl font-bold">{stats.averageSpeed.toFixed(1)}s</div>
              <div className="text-sm opacity-75">Avg Speed</div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Achievements
            </h3>
            <ul className="space-y-2">
              {stats.maxCombo >= 5 && (
                <li className="text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Combo Master: Reach 5x combo
                </li>
              )}
              {accuracy >= 90 && (
                <li className="text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Precision Expert: 90%+ accuracy
                </li>
              )}
              {stats.score >= 1000 && (
                <li className="text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  High Scorer: Score 1000+ points
                </li>
              )}
            </ul>
          </div>

          <button
            onClick={onClose}
            className={`w-full py-3 rounded-lg bg-gradient-to-r ${theme.primary} font-bold text-lg`}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};