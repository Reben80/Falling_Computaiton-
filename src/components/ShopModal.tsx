import React, { useState } from 'react';
import { X, ShoppingBag, Palette, User, Zap } from 'lucide-react';
import { Theme, Avatar } from '../types';
import { Shop } from './Shop';
import { AvatarShop } from './AvatarShop';
import { PowerUpShop } from './PowerUpShop';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  currentAvatar: Avatar;
  coins: number;
  onPurchaseTheme: (theme: Theme) => void;
  onSelectAvatar: (avatar: Avatar) => void;
  onPurchasePowerUp: (powerUpId: string) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  theme,
  currentAvatar,
  coins,
  onPurchaseTheme,
  onSelectAvatar,
  onPurchasePowerUp,
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'avatars' | 'powerups'>('themes');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`bg-gradient-to-b ${theme.background} rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden`}>
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-xl font-bold">Shop</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('themes')}
            className={`flex-1 p-3 flex items-center justify-center gap-2 ${
              activeTab === 'themes' ? `bg-gradient-to-r ${theme.primary}` : 'hover:bg-white/10'
            } transition-colors`}
          >
            <Palette className="w-4 h-4" />
            Themes
          </button>
          <button
            onClick={() => setActiveTab('avatars')}
            className={`flex-1 p-3 flex items-center justify-center gap-2 ${
              activeTab === 'avatars' ? `bg-gradient-to-r ${theme.primary}` : 'hover:bg-white/10'
            } transition-colors`}
          >
            <User className="w-4 h-4" />
            Avatars
          </button>
          <button
            onClick={() => setActiveTab('powerups')}
            className={`flex-1 p-3 flex items-center justify-center gap-2 ${
              activeTab === 'powerups' ? `bg-gradient-to-r ${theme.primary}` : 'hover:bg-white/10'
            } transition-colors`}
          >
            <Zap className="w-4 h-4" />
            Power-Ups
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {activeTab === 'themes' && (
            <Shop
              score={coins}
              currentTheme={theme}
              onPurchaseTheme={onPurchaseTheme}
            />
          )}
          {activeTab === 'avatars' && (
            <AvatarShop
              score={coins}
              currentAvatar={currentAvatar}
              theme={theme}
              onSelectAvatar={onSelectAvatar}
            />
          )}
          {activeTab === 'powerups' && (
            <PowerUpShop
              score={coins}
              theme={theme}
              onPurchasePowerUp={onPurchasePowerUp}
            />
          )}
        </div>
      </div>
    </div>
  );
};