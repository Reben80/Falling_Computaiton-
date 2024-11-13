import React from 'react';
import { Avatar, Theme } from '../types';
import { avatars } from '../data/avatars';
import { Star } from 'lucide-react';

interface AvatarShopProps {
  score: number;
  currentAvatar: Avatar;
  theme: Theme;
  onSelectAvatar: (avatar: Avatar) => void;
}

export const AvatarShop: React.FC<AvatarShopProps> = ({
  score,
  currentAvatar,
  theme,
  onSelectAvatar,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Avatars</h3>
      <div className="grid gap-2">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            className={`p-3 rounded-lg bg-white/10 backdrop-blur-sm border ${
              currentAvatar.id === avatar.id ? 'border-yellow-500' : 'border-white/20'
            } flex items-center justify-between`}
          >
            <div className="flex items-center gap-3">
              <img
                src={avatar.imageUrl}
                alt={avatar.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">{avatar.name}</h4>
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  {avatar.bonus.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => onSelectAvatar(avatar)}
              disabled={avatar.price > score || currentAvatar.id === avatar.id}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                currentAvatar.id === avatar.id
                  ? 'bg-yellow-500/20 text-yellow-500'
                  : avatar.price > score
                  ? 'bg-gray-600 cursor-not-allowed'
                  : `bg-gradient-to-r ${theme.primary}`
              }`}
            >
              {currentAvatar.id === avatar.id
                ? 'Selected'
                : avatar.price === 0
                ? 'Free'
                : `$${avatar.price}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};