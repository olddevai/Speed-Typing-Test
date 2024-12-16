export interface TestSettings {
  duration: number;
  language: string;
  theme: 'light' | 'dark';
  soundEnabled: boolean;
}

export interface TestResults {
  wpm: number;
  accuracy: number;
  totalWords: number;
  errors: number;
  cpm: number;
  timestamp: number;
}

export interface TestState {
  isRunning: boolean;
  timeLeft: number;
  currentPosition: number;
  mistakes: number;
  startTime: number | null;
  currentWPM: number;
  currentAccuracy: number;
}