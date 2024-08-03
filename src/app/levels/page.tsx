'use client'

import { useState } from 'react';
import HomeBackground from "@/components/Backgrounds/HomeBackground";
import LevelOptions from "@/components/Levels/levelOptions";

function Levels() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 flex items-center justify-center">
          <HomeBackground />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <LevelOptions currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        </div>
      </div>
    </>
  );
}

export default Levels;
