import { Avatar } from '../types';
import { Calculator, Palette, Brain, Star } from 'lucide-react';

export const avatars: Avatar[] = [
  {
    id: 'default',
    name: 'Student',
    description: 'A curious learner',
    price: 0,
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=student&backgroundColor=b6e3f4',
    bonus: {
      type: 'all',
      value: 1.0,
      description: 'No special bonus'
    }
  },
  {
    id: 'mathematician',
    name: 'Mathematician',
    description: 'Master of numbers',
    price: 200,
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=mathematician&backgroundColor=ffdfba',
    bonus: {
      type: 'multiplication',
      value: 1.5,
      description: '50% bonus on multiplication problems'
    }
  },
  {
    id: 'genius',
    name: 'Math Genius',
    description: 'Natural problem solver',
    price: 500,
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=genius&backgroundColor=c1f4c5',
    bonus: {
      type: 'all',
      value: 1.2,
      description: '20% bonus on all calculations'
    }
  },
  {
    id: 'master',
    name: 'Grand Master',
    description: 'Legendary calculator',
    price: 1000,
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=master&backgroundColor=e6c3f4',
    bonus: {
      type: 'all',
      value: 1.5,
      description: '50% bonus on all calculations'
    }
  }
];