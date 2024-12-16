import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { KeyboardLayout } from './components/KeyboardLayout';
import { Timer } from './components/Timer';
import { TestResults } from './components/TestResults';
import { getRandomPassage } from './data/passages';
import type { TestSettings, TestResults as TestResultsType, TestState } from './types';

const DURATIONS = [30, 60, 120, 300];

function App() {
  const [settings, setSettings] = useState<TestSettings>({
    duration: 60,
    language: 'en',
    theme: 'light',
    soundEnabled: true,
  });

  const [text] = useState(getRandomPassage());
  const [state, setState] = useState<TestState>({
    isRunning: false,
    timeLeft: settings.duration,
    currentPosition: 0,
    mistakes: 0,
    startTime: null,
    currentWPM: 0,
    currentAccuracy: 100,
  });
  const [results, setResults] = useState<TestResultsType | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const textRef = useRef<HTMLDivElement>(null);

  const calculateStats = useCallback(() => {
    if (!state.startTime) return;
    
    const timeElapsed = (Date.now() - state.startTime) / 1000;
    const wordsTyped = state.currentPosition / 5;
    const currentWPM = Math.round((wordsTyped / timeElapsed) * 60);
    const accuracy = Math.round(((state.currentPosition - state.mistakes) / state.currentPosition) * 100);

    setState(prev => ({ ...prev, currentWPM, currentAccuracy: accuracy }));
  }, [state.startTime, state.currentPosition, state.mistakes]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!state.isRunning && !results) {
      setState(prev => ({
        ...prev,
        isRunning: true,
        startTime: Date.now(),
      }));
    }

    setPressedKey(e.key);
    setTimeout(() => setPressedKey(null), 100);

    if (e.key === text[state.currentPosition]) {
      setState(prev => ({
        ...prev,
        currentPosition: prev.currentPosition + 1,
      }));
    } else {
      setState(prev => ({
        ...prev,
        mistakes: prev.mistakes + 1,
      }));
    }
  }, [state.isRunning, state.currentPosition, text, results]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!state.isRunning) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          const finalResults: TestResultsType = {
            wpm: prev.currentWPM,
            accuracy: prev.currentAccuracy,
            totalWords: Math.round(prev.currentPosition / 5),
            errors: prev.mistakes,
            cpm: prev.currentPosition,
            timestamp: Date.now(),
          };
          setResults(finalResults);
          return { ...prev, timeLeft: 0, isRunning: false };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isRunning]);

  useEffect(() => {
    if (state.isRunning) {
      const statsTimer = setInterval(calculateStats, 200);
      return () => clearInterval(statsTimer);
    }
  }, [state.isRunning, calculateStats]);

  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const toggleSound = () => {
    setSettings(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  };

  const restart = () => {
    setState({
      isRunning: false,
      timeLeft: settings.duration,
      currentPosition: 0,
      mistakes: 0,
      startTime: null,
      currentWPM: 0,
      currentAccuracy: 100,
    });
    setResults(null);
  };

  if (results) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <TestResults results={results} onRestart={restart} />
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen transition-colors",
      settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'
    )}>
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={cn(
            "text-3xl font-bold",
            settings.theme === 'light' ? 'text-gray-900' : 'text-white'
          )}>
            Speed Typing Test
          </h1>
          <div className="flex gap-4">
            <button
              onClick={toggleSound}
              className={cn(
                "p-2 rounded-lg",
                settings.theme === 'light' ? 'bg-white' : 'bg-gray-800',
                settings.theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              )}
            >
              {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-lg",
                settings.theme === 'light' ? 'bg-white' : 'bg-gray-800',
                settings.theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              )}
            >
              {settings.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            {DURATIONS.map(duration => (
              <button
                key={duration}
                onClick={() => setSettings(prev => ({ ...prev, duration }))}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium",
                  duration === settings.duration
                    ? "bg-blue-500 text-white"
                    : settings.theme === 'light'
                    ? "bg-white text-gray-700"
                    : "bg-gray-800 text-gray-300"
                )}
              >
                {duration}s
              </button>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <div className={cn(
              "text-xl font-bold",
              settings.theme === 'light' ? 'text-gray-900' : 'text-white'
            )}>
              {state.currentWPM} WPM
            </div>
            <div className={cn(
              "text-xl font-bold",
              settings.theme === 'light' ? 'text-gray-900' : 'text-white'
            )}>
              {state.currentAccuracy}%
            </div>
            <Timer timeLeft={state.timeLeft} duration={settings.duration} />
          </div>
        </div>

        <div
          ref={textRef}
          className={cn(
            "p-8 rounded-lg font-mono text-lg leading-relaxed mb-8",
            settings.theme === 'light' ? 'bg-white' : 'bg-gray-800'
          )}
        >
          {text.split('').map((char, index) => (
            <span
              key={index}
              className={cn(
                index === state.currentPosition && "border-l-2 border-blue-500 animate-pulse",
                index < state.currentPosition && "text-green-500",
                settings.theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              )}
            >
              {char}
            </span>
          ))}
        </div>

        <KeyboardLayout pressedKey={pressedKey} />
      </div>
    </div>
  );
}

export default App;