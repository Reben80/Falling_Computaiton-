import React from 'react';
import { Theme } from '../types';
import { themes } from '../data/themes';

interface ShopProps {
  score: number;
  currentTheme: Theme;
  onPurchaseTheme: (theme: Theme) => void;
}

export const Shop: React.FC<ShopProps> = ({ score, currentTheme, onPurchaseTheme }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Themes</h3>
      <div className="grid gap-2">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`p-3 rounded-lg bg-gradient-to-r ${theme.primary} bg-opacity-20 flex justify-between items-center`}
          >
            <div>
              <span className="font-semibold">{theme.name}</span>
              {theme.id === currentTheme.id && (
                <span className="ml-2 text-sm bg-white/20 px-2 py-0.5 rounded">Active</span>
              )}
            </div>
            <button
              onClick={() => onPurchaseTheme(theme)}
              disabled={theme.price > score || theme.id === currentTheme.id}
              className={`px-3 py-1.5 rounded ${
                theme.price <= score && theme.id !== currentTheme.id
                  ? `bg-gradient-to-r ${theme.primary} text-${theme.text}`
                  : 'bg-gray-500 cursor-not-allowed'
              }`}
            >
              {theme.id === currentTheme.id ? 'Owned' : `$${theme.price}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};