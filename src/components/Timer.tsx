import React from 'react';

interface TimerProps {
  timeLeft: number;
  duration: number;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, duration }) => {
  const percentage = (timeLeft / duration) * 100;
  
  return (
    <div className="w-20 h-20 relative">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eee"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeDasharray={`${percentage}, 100`}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
        {timeLeft}
      </div>
    </div>
  );
};