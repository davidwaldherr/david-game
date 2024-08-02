'use client'

import React, { useEffect } from 'react';
import { cardLevels } from '@/src/app/data/levelOptions';

const LevelOptions = ({ currentIndex, setCurrentIndex }: { currentIndex: number, setCurrentIndex: (index: number) => void }) => {
  const card = cardLevels[currentIndex];
  const ShadowColor = card.ShadowColor;
  const borderColor = card.BorderColor;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        const newIndex = (currentIndex + 1) % cardLevels.length;
        setCurrentIndex(newIndex);
      } else if (event.key === 'ArrowLeft') {
        const newIndex = (currentIndex - 1 + cardLevels.length) % cardLevels.length;
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, setCurrentIndex]); // Added currentIndex to the dependency array

  return (
    <div
      className="flex flex-col w-full mx-auto stretch relative items-center shadow-lg pb-5"
      style={{ height: '50%', width: '50%', maxWidth: '560px', boxShadow: `0 0 10px 10px ${ShadowColor}`, border: `10px solid ${borderColor}`, backgroundColor: card.BackgroundColor, borderRadius: '15px' }}
    >
      <h1 className="flex pt-10 text-center text-6xl">{card.Title}</h1>
      <button
        className="flex justify-center items-center bottom-0 mb-10 px-8 py-4 bg-blue-500 text-white text-4xl rounded hover:bg-blue-700"
        onClick={() => window.location.href = card.Link}
      >
        CLICK
      </button>
    </div>
  );
};

export default LevelOptions;
