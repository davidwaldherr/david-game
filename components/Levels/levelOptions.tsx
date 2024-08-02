'use client'

import React, { useEffect } from 'react';
import { cardLevels } from '@/src/app/data/levelOptions';
import Image from 'next/image';
import Home from '@/components/Backgrounds/HomeBackground';

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
    <>
    <div className="flex flex-col w-full mx-auto relative items-center pb-5">
    <div
      className="flex flex-col w-full mx-auto relative items-center pb-5"
      style={{
        height: '400px',
        width: '400px',
        maxWidth: '560px',
        borderWidth: card.BorderWidth,
        borderImageSource: card.BorderImageSource,
        borderImageSlice: card.BorderImageSlice,
        borderImageRepeat: card.BorderImageRepeat,
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
        objectFit: 'cover',
        width: '200%',
        height: '200%'
       }}
       priority={true}
       
     />
   </div>
      <div
        className="justify-center items-center bg-black"
        style={{
          borderWidth: 15,
          width: '400px',
          height: '75px',
          borderImageSource: card.BorderImageSource,
          borderImageSlice: card.BorderImageSlice,
          borderImageRepeat: card.BorderImageRepeat,
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%) translateY(10%)' // Updated to only center horizontally and vertically
        }}
      >
        <h1 className="text-center text-4xl">{card.Title}</h1>
      </div>
    </div>
          <button
          className="flex justify-center items-center mt-10 bottom-0 text-white text-4xl"
          style={{
            width: '150px',
            height: '75px',
            borderImageSource: card.BorderImageButton,
            borderImageSlice: card.BorderImageButtonSlice,
            borderWidth: 15,
            borderImageRepeat: card.BorderImageButtonRepeat
          }}
          onClick={() => window.location.href = card.Link}
        >
          CLICK
        </button>
    </div>
    </>
  );
};

export default LevelOptions;
