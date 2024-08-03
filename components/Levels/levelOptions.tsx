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
  BorderButtonWidth: 15;
  BorderImageSource: string;
  BorderImageSlice: string;
  BorderImageRepeat: string;
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
      } else if (event.key === 'Enter') {
        window.location.href = cardLevels[currentIndex].Link;
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStartX = touch.clientX;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!touchStartX) return;

      const touch = event.touches[0];
      const touchEndX = touch.clientX;
      const diffX = touchStartX - touchEndX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swipe left
          const newIndex = (currentIndex + 1) % cardLevels.length;
          setCurrentIndex(newIndex);
        } else {
          // Swipe right
          const newIndex = (currentIndex - 1 + cardLevels.length) % cardLevels.length;
          setCurrentIndex(newIndex);
        }
        touchStartX = null;
      }
    };

    let touchStartX: number | null = null;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentIndex, setCurrentIndex]);

  return (
    <>
    <div className="flex flex-col w-full h-full mx-auto relative items-center" style={{ height: '100vh', overflow: 'hidden' }}>
    <div
      className="flex flex-col w-full h-full mx-auto relative items-center"
      style={{
        height: '360px',
        width: '360px',
        maxWidth: '560px',
        borderWidth: card.BorderWidth,
        borderImageSource: card.BorderImageSource,
        borderImageSlice: card.BorderImageSlice,
        borderImageRepeat: card.BorderImageRepeat,
      }}
    >
   <div className="grid place-items-center" >
     <Image
       src={card.BackgroundImage}
       alt="Background Image"
       className="object-cover w-auto h-auto max-w-full max-h-full"
       width={360}
       height={360}
       style={{
        objectFit: 'cover',
        width: '110%',
        height: '110%'
       }}
       priority={true}
       
     />
   </div>
      <div
        className="justify-center items-center"
        style={{
          backgroundColor: 'black',
          borderWidth: card.BorderButtonWidth,
          width: '360px',
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
        <h1 className="text-center text-4xl text-white">{card.Title}</h1>
      </div>
    </div>
          <div className="flex justify-center">
            <button
              className="flex justify-center items-center text-white text-4xl"
              style={{
                width: '100px',
                height: '75px',
                borderImageSource: card.BorderImageSource,
                borderImageSlice: card.BorderImageSlice,
                borderWidth: card.BorderButtonWidth,
                borderImageRepeat: card.BorderImageRepeat
              }}
              onClick={() => {
                const newIndex = (currentIndex - 1 + cardLevels.length) % cardLevels.length;
                setCurrentIndex(newIndex);
              }}
            >
              ⬅️
            </button>
            <button
              className="flex justify-center items-center text-white text-4xl mx-4"
              style={{
                width: '150px',
                height: '75px',
                borderImageSource: card.BorderImageSource,
                borderImageSlice: card.BorderImageSlice,
                borderWidth: card.BorderButtonWidth,
                borderImageRepeat: card.BorderImageRepeat
              }}
              onClick={() => window.location.href = card.Link}
            >
              ENTER
            </button>
            <button
              className="flex justify-center items-center text-white text-4xl"
              style={{
                width: '100px',
                height: '75px',
                borderImageSource: card.BorderImageSource,
                borderImageSlice: card.BorderImageSlice,
                borderWidth: card.BorderButtonWidth,
                borderImageRepeat: card.BorderImageRepeat
              }}
              onClick={() => {
                const newIndex = (currentIndex + 1) % cardLevels.length;
                setCurrentIndex(newIndex);
              }}
            >
              ➡️
            </button>
          </div>
    </div>
    </>
  );
};

export default LevelOptions;
