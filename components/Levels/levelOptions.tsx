'use client'

import React, { useEffect } from 'react';
import { cardLevels } from '@/src/app/data/levelOptions';
import Image from 'next/image';

interface cardLevels {
  Title: string;
  Link: string;
  BackgroundImage: string;
  BackgroundColor: string;

  BorderWidth: 30;
  BorderImageSource: string;
  BorderImageSlice: string;
  BorderImageRepeat: string;

  BorderImageButton: string;
  BorderImageButtonSlice: string;
  BorderImageButtonRepeat: string;

  BorderTopColor: string;
  BorderBottomColor: string;
  BorderTopWidth: 3;
  BorderBottomWidth: 3;
}

const LevelOptions = ({ currentIndex, setCurrentIndex }: { currentIndex: number, setCurrentIndex: (index: number) => void }) => {
  const card = cardLevels[currentIndex];
  console.log(card)

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
  }, [currentIndex, setCurrentIndex]);

  return (
    <div
      className="flex flex-col w-full mx-auto relative items-center pb-5"
      style={{
        height: '90%',
        width: '90%',
        maxWidth: '560px',
        borderWidth: card.BorderWidth,
        borderImageSource: card.BorderImageSource,
        borderImageSlice: card.BorderImageSlice,
        borderImageRepeat: card.BorderImageRepeat,
        // backgroundColor: card.BackgroundColor,
      }}
    >
   <div className="grid place-items-center" style={{ height: '50%' }}>
     <Image
       src={card.BackgroundImage}
       alt="Background Image"
       className="object-cover w-auto h-auto max-w-full max-h-full"
       width={560}
       height={560}
       style={{ 
         maxWidth: '100%', 
         maxHeight: '100%' 
       }}
     />
   </div>
      <div
        className="flex justify-center items-center w-full"
        style={{
          borderTop: `3px solid ${card.BorderTopColor}`,
          borderBottom: `3px solid ${card.BorderBottomColor}`,
        }}
      >
        <h1 className="text-center text-6xl">{card.Title}</h1>
      </div>
      {/* <h1 className="flex w-full text-center items-center text-6xl" style={{ borderTop: `3px solid ${card.BorderTopColor}`, borderBottom: `3px solid ${card.BorderTopColor}` }}>{card.Title}</h1> */}
      <button
        className="flex justify-center items-center bottom-0 mb-10 px-8 py-4 text-white text-4xl"
        style={{
          borderImageSource: card.BorderImageButton,
          borderImageSlice: card.BorderImageButtonSlice,
          borderWidth: card.BorderWidth,
          borderImageRepeat: card.BorderImageButtonRepeat
        }}
        onClick={() => window.location.href = card.Link}
      >
        CLICK
      </button>
    </div>
  );
};

export default LevelOptions;
