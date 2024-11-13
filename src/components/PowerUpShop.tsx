import React from 'react';
import { powerups } from '../data/powerups';
import { Theme } from '../types';

interface PowerUpShopProps {
  score: number;
  theme: Theme;
  onPurchasePowerUp: (powerUpId: string) => void;
}

export const PowerUpShop: React.FC<PowerUpShopProps> = ({ score, theme, onPurchasePowerUp }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Power-Ups</h3>
      <div className="grid gap-2">
        {powerups.map((powerup) => (
          <div
            key={powerup.id}
            className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <powerup.icon className="w-5 h-5" />
              <div>
                <h4 className="font-semibold">{powerup.name}</h4>
                <p className="text-xs text-gray-300">{powerup.description}</p>
              </div>
            </div>
            <button
              onClick={() => onPurchasePowerUp(powerup.id)}
              disabled={score < powerup.price}
              className={`px-3 py-1.5 rounded ${
                score >= powerup.price
                  ? `bg-gradient-to-r ${theme.primary} hover:opacity-90`
                  : 'bg-gray-600 cursor-not-allowed'
              } transition-all whitespace-nowrap ml-2`}
            >
              ${powerup.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};