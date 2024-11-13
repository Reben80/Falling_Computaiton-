import { Theme } from '../types';

export const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    price: 0,
    primary: 'from-blue-500 to-purple-500',
    secondary: 'from-blue-400 to-purple-400',
    accent: 'purple-500',
    background: 'from-blue-900 to-purple-900',
    text: 'white'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    price: 200,
    primary: 'from-orange-500 to-pink-500',
    secondary: 'from-orange-400 to-pink-400',
    accent: 'pink-500',
    background: 'from-orange-900 to-pink-900',
    text: 'white'
  },
  {
    id: 'forest',
    name: 'Forest',
    price: 300,
    primary: 'from-green-500 to-emerald-500',
    secondary: 'from-green-400 to-emerald-400',
    accent: 'emerald-500',
    background: 'from-green-900 to-emerald-900',
    text: 'white'
  },
  {
    id: 'cyber',
    name: 'Cyber',
    price: 400,
    primary: 'from-cyan-500 to-yellow-500',
    secondary: 'from-cyan-400 to-yellow-400',
    accent: 'cyan-500',
    background: 'from-slate-900 to-gray-900',
    text: 'white'
  },
  {
    id: 'royal',
    name: 'Royal',
    price: 500,
    primary: 'from-indigo-500 to-amber-500',
    secondary: 'from-indigo-400 to-amber-400',
    accent: 'indigo-500',
    background: 'from-indigo-900 to-slate-900',
    text: 'white'
  }
];