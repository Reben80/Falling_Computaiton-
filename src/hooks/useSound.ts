import { useCallback } from 'react';
import { SoundEffect } from '../types';

const sounds = {
  correct: new Audio('https://assets.mixkit.co/active_storage/sfx/2190/2190-preview.mp3'),
  wrong: new Audio('https://assets.mixkit.co/active_storage/sfx/2205/2205-preview.mp3'),
  powerup: new Audio('https://assets.mixkit.co/active_storage/sfx/2044/2044-preview.mp3'),
  achievement: new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'),
  gameover: new Audio('https://assets.mixkit.co/active_storage/sfx/2032/2032-preview.mp3')
};

export const useSound = () => {
  const play = useCallback((effect: SoundEffect) => {
    const sound = sounds[effect];
    sound.currentTime = 0;
    sound.play().catch(() => {
      // Ignore errors - some browsers block autoplay
    });
  }, []);

  return { play };
};