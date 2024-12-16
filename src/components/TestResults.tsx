import React from 'react';
import { Share2 } from 'lucide-react';
import type { TestResults } from '../types';

interface TestResultsProps {
  results: TestResults;
  onRestart: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({ results, onRestart }) => {
  const shareResults = () => {
    const text = `🎯 Typing Test Results:\n📈 ${results.wpm} WPM\n✨ ${results.accuracy}% Accuracy\n🎹 ${results.cpm} CPM`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Test Results</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-blue-600">{results.wpm}</div>
          <div className="text-sm text-gray-600">WPM</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-green-600">{results.accuracy}%</div>
          <div className="text-sm text-gray-600">Accuracy</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-purple-600">{results.totalWords}</div>
          <div className="text-sm text-gray-600">Words</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-red-600">{results.errors}</div>
          <div className="text-sm text-gray-600">Errors</div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={onRestart}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={shareResults}
          className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Share2 size={18} />
          Share
        </button>
      </div>
    </div>
  );
};