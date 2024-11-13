import React from 'react';
import { Info, Github, Twitter } from 'lucide-react';
import type { Theme } from '../types';

interface AboutProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

export const About: React.FC<AboutProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`bg-gradient-to-b ${theme.background} rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all`}>
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${theme.primary} mx-auto flex items-center justify-center`}>
            <Info className="w-8 h-8" />
          </div>
          
          <h2 className="text-2xl font-bold">Math Master</h2>
          
          <p className="text-sm opacity-80">
            A beautiful and engaging math game designed to make learning fun and rewarding.
            Challenge yourself with various operations, unlock themes, and compete for high scores!
          </p>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <div>
              <p className="font-semibold">Created by</p>
              <p className="text-sm opacity-80">Rebin Muhammad</p>
            </div>
            <div>
              <p className="font-semibold">Design & Idea by</p>
              <p className="text-sm opacity-80">Camilo Diaz</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <a href="https://github.com/reben80" target="_blank" rel="noopener noreferrer" 
               className="opacity-70 hover:opacity-100 transition-opacity">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/rebin3" target="_blank" rel="noopener noreferrer"
               className="opacity-70 hover:opacity-100 transition-opacity">
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          <button
            onClick={onClose}
            className={`w-full py-2 rounded-lg bg-gradient-to-r ${theme.primary} font-medium mt-4`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};