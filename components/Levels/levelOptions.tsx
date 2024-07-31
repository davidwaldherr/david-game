import React from 'react';
import { cardLevels } from '@/src/app/data/levelOptions';

const LevelOptions = () => {
  const card = cardLevels[0];
  const borderColor = card.PixelBorder;

  return (
    <div className="flex flex-col w-full mx-auto stretch relative bg-black items-center shadow-lg" 
         style={{ height: '90%', width: '90%', maxWidth: '560px', boxShadow: `0 0 10px 10px ${borderColor}`, border: `2px solid ${borderColor}` }}>
      <h1 className="pt-10 text-center text-6xl">{card.Title}</h1>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" 
        onClick={() => window.location.href = card.Link}
      >
        CLICK
      </button>
    </div>
  );
};

export default LevelOptions;
