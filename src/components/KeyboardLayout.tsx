import React from 'react';
import { cn } from '../utils/cn';

interface KeyboardLayoutProps {
  pressedKey: string | null;
}

export const KeyboardLayout: React.FC<KeyboardLayoutProps> = ({ pressedKey }) => {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  return (
    <div className="mt-8 select-none">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 my-1">
          {row.map((key) => (
            <div
              key={key}
              className={cn(
                "w-10 h-10 rounded flex items-center justify-center text-sm font-medium border",
                pressedKey === key
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-200"
              )}
            >
              {key.toUpperCase()}
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-center mt-1">
        <div className={cn(
          "w-64 h-10 rounded flex items-center justify-center text-sm font-medium border",
          pressedKey === " "
            ? "bg-blue-500 text-white border-blue-600"
            : "bg-white text-gray-700 border-gray-200"
        )}>
          SPACE
        </div>
      </div>
    </div>
  );
};