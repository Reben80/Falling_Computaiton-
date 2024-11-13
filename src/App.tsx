import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, Star, Clock, SkipForward, ShoppingCart, DollarSign, Info } from 'lucide-react';
import { ShopModal } from './components/ShopModal';
import { GameBoard } from './components/GameBoard';
import { GameSummary } from './components/GameSummary';
import { About } from './components/About';
import { useLocalStorage } from './hooks/useLocalStorage';
import { themes } from './data/themes';
import { avatars } from './data/avatars';
import { powerups } from './data/powerups';
import { useSound } from './hooks/useSound';
import type { Theme, Avatar, PowerUp } from './types';

export default function App() {
  const [position, setPosition] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [answer, setAnswer] = useState('');
  const [problem, setProblem] = useState({ num1: 0, num2: 0, operator: '+' });
  const [gameActive, setGameActive] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [selectedOperations, setSelectedOperations] = useState(['+']);
  const [level, setLevel] = useState('1');
  const [currentTheme, setCurrentTheme] = useLocalStorage<Theme>('theme', themes[0]);
  const [currentAvatar, setCurrentAvatar] = useLocalStorage<Avatar>('avatar', avatars[0]);
  const [fallSpeed, setFallSpeed] = useState(100);
  const [showShop, setShowShop] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showGameSummary, setShowGameSummary] = useState(false);
  const [gameStats, setGameStats] = useState({
    score: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    maxCombo: 0,
    averageSpeed: 0,
    powerUpsUsed: 0
  });

  const { play } = useSound();

  const generateProblem = useCallback(() => {
    const operator = selectedOperations[Math.floor(Math.random() * selectedOperations.length)];
    let num1, num2;
    const maxNum = Math.min(100, Math.max(10, score / 10 + (Number(level) - 1) * 10));

    switch (operator) {
      case '×':
        num1 = Math.floor(Math.random() * Math.sqrt(maxNum)) + 1;
        num2 = Math.floor(Math.random() * Math.sqrt(maxNum)) + 1;
        break;
      case '÷':
        num2 = Math.floor(Math.random() * Math.sqrt(maxNum)) + 1;
        num1 = num2 * (Math.floor(Math.random() * Math.sqrt(maxNum)) + 1);
        break;
      default:
        num1 = Math.floor(Math.random() * maxNum) + 1;
        num2 = Math.floor(Math.random() * maxNum) + 1;
    }

    setProblem({ num1, num2, operator });
  }, [selectedOperations, level, score]);

  const calculateAnswer = useCallback(() => {
    const { num1, num2, operator } = problem;
    switch (operator) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '×': return num1 * num2;
      case '÷': return num1 / num2;
      default: return 0;
    }
  }, [problem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = calculateAnswer();
    if (Number(answer) === correctAnswer) {
      const positionScores = [100, 50, 25, 10, 5, 1];
      const scoreIndex = Math.floor(position / (100 / positionScores.length));
      const pointsEarned = positionScores[Math.min(scoreIndex, positionScores.length - 1)];
      setScore(score + pointsEarned);
      setCoins(coins + pointsEarned);
      setFeedback(`Correct! You earned $${pointsEarned}`);
      play('correct');
      setGameStats(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
        totalAnswers: prev.totalAnswers + 1
      }));
    } else {
      setScore(Math.max(0, score - 20));
      setFeedback('Wrong! -$20 penalty. Try the new question.');
      play('wrong');
      setGameStats(prev => ({
        ...prev,
        totalAnswers: prev.totalAnswers + 1
      }));
    }
    setAnswer('');
    generateProblem();
    setPosition(0);
  };

  const handlePurchaseTheme = (theme: Theme) => {
    if (coins >= theme.price) {
      setCoins(coins - theme.price);
      setCurrentTheme(theme);
      play('powerup');
      setFeedback(`Theme "${theme.name}" purchased and activated!`);
    }
  };

  const handleSelectAvatar = (avatar: Avatar) => {
    if (coins >= avatar.price) {
      setCoins(coins - avatar.price);
      setCurrentAvatar(avatar);
      play('powerup');
      setFeedback(`Avatar "${avatar.name}" purchased and selected!`);
    }
  };

  const handlePurchasePowerUp = (powerUpId: string) => {
    const powerUp = powerups.find(p => p.id === powerUpId);
    if (powerUp && coins >= powerUp.price) {
      setCoins(coins - powerUp.price);
      powerUp.effect(setFallSpeed);
      play('powerup');
      setFeedback(`Power-up "${powerUp.name}" activated!`);
      setGameStats(prev => ({
        ...prev,
        powerUpsUsed: prev.powerUpsUsed + 1
      }));
    }
  };

  const startGame = () => {
    if (selectedOperations.length === 0) {
      setFeedback('Please select at least one operation.');
      return;
    }
    setGameActive(true);
    generateProblem();
    setPosition(0);
    setFeedback('');
    setScore(0);
    setGameStats({
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      maxCombo: 0,
      averageSpeed: 0,
      powerUpsUsed: 0
    });
    play('powerup');
  };

  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev >= 100) {
          setGameActive(false);
          setShowGameSummary(true);
          play('gameover');
          setGameStats(prev => ({ ...prev, score }));
          return 0;
        }
        return prev + 0.5;
      });
    }, fallSpeed);

    return () => clearInterval(interval);
  }, [gameActive, fallSpeed, score]);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${currentTheme.background} text-${currentTheme.text} p-4`}>
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={currentAvatar.imageUrl}
              alt={currentAvatar.name}
              className="w-10 h-10 rounded-full border-2 border-yellow-500"
            />
            <div>
              <div className="font-bold">{currentAvatar.name}</div>
              <div className="text-sm opacity-75">Level {level}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAbout(true)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="About"
            >
              <Info className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
              <DollarSign className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">{coins}</span>
            </div>
            <button
              onClick={() => setShowShop(true)}
              className={`p-2 rounded-lg bg-gradient-to-r ${currentTheme.primary} hover:opacity-90 transition-opacity`}
            >
              <ShoppingCart className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Operations Selection */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['+', '-', '×', '÷'].map((op) => (
            <button
              key={op}
              onClick={() => {
                if (selectedOperations.includes(op)) {
                  if (selectedOperations.length > 1) {
                    setSelectedOperations(selectedOperations.filter((o) => o !== op));
                  }
                } else {
                  setSelectedOperations([...selectedOperations, op]);
                }
              }}
              className={`px-4 py-2 rounded-lg ${
                selectedOperations.includes(op)
                  ? `bg-gradient-to-r ${currentTheme.primary}`
                  : 'bg-white/10'
              } transition-colors`}
            >
              {op}
            </button>
          ))}
        </div>

        {/* Level Selection */}
        <div className="flex gap-2 justify-center">
          {['1', '2', '3', '4'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`px-4 py-2 rounded-lg ${
                level === lvl
                  ? `bg-gradient-to-r ${currentTheme.primary}`
                  : 'bg-white/10'
              } transition-colors`}
            >
              Level {lvl}
            </button>
          ))}
        </div>

        {/* Game Board */}
        <GameBoard
          problem={problem}
          position={position}
          theme={currentTheme}
        />

        {/* Game Controls */}
        {gameActive ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/40"
              placeholder="Enter answer"
            />
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg bg-gradient-to-r ${currentTheme.primary} font-bold`}
            >
              Submit
            </button>
          </form>
        ) : (
          <button
            onClick={startGame}
            className={`w-full py-3 rounded-lg bg-gradient-to-r ${currentTheme.primary} font-bold text-lg`}
          >
            Start Game
          </button>
        )}

        {/* Feedback Message */}
        {feedback && (
          <div className={`p-4 rounded-lg ${
            feedback.includes('Correct') ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <p>{feedback}</p>
            </div>
          </div>
        )}
      </div>

      <ShopModal
        isOpen={showShop}
        onClose={() => setShowShop(false)}
        theme={currentTheme}
        currentAvatar={currentAvatar}
        coins={coins}
        onPurchaseTheme={handlePurchaseTheme}
        onSelectAvatar={handleSelectAvatar}
        onPurchasePowerUp={handlePurchasePowerUp}
      />

      <GameSummary
        show={showGameSummary}
        onClose={() => setShowGameSummary(false)}
        stats={gameStats}
        theme={currentTheme}
      />

      <About
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        theme={currentTheme}
      />
    </div>
  );
}